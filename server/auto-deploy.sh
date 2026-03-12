#!/bin/bash

# ========================================
# Auto Deploy Script for Ponditi API
# ========================================

# Enable strict mode
set -euo pipefail
trap 'echo -e "\033[1;31m[ERROR]\033[0m An error occurred. Exiting..."; exit 1' ERR

# Define colors
GREEN='\033[1;32m'
YELLOW='\033[1;33m'
RED='\033[1;31m'
CYAN='\033[1;36m'
NC='\033[0m' # No color

# Variables
PROJECT_NAME="ponditi-lms"
APP_NAME="ponditi-api"
GIT_REPO="https://github.com/MdSamsuzzohaShayon/ponditi-lms.git"
HOME_DIR="$HOME"
PROJECT_DIR="$HOME_DIR/$APP_NAME"
CLONE_DIR="$HOME_DIR/$PROJECT_NAME"

# ===============================
# Helper Functions
# ===============================
function info() { echo -e "${CYAN}➤ $1${NC}"; }
function success() { echo -e "${GREEN}✔ $1${NC}"; }
function warn() { echo -e "${YELLOW}! $1${NC}"; }
function error_exit() { echo -e "${RED}✘ $1${NC}"; exit 1; }

# ===============================
# 1️⃣ Clone or Update Repo
# ===============================
info "Removing old clone (if exists)..."
rm -rf "$CLONE_DIR"

info "Cloning repository..."
git clone "$GIT_REPO" "$CLONE_DIR"
success "Repository cloned."

info "Checking latest commits..."
cd "$CLONE_DIR"
git log -n 5 --oneline
cd "$HOME_DIR"

# ===============================
# 2️⃣ Move Backend Code
# ===============================
info "Preparing project directory..."
rm -rf "$PROJECT_DIR"
mkdir -p "$PROJECT_DIR"

mv "$CLONE_DIR/server/"* "$PROJECT_DIR"
rm -rf "$CLONE_DIR"
success "Backend code moved to $PROJECT_DIR"

# ===============================
# 3️⃣ Install Node.js (if missing)
# ===============================
if ! command -v node >/dev/null 2>&1; then
  info "Node.js not found. Installing..."
  curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo bash -
  sudo apt install -y nodejs
  success "Node.js installed."
else
  info "Node.js already installed: $(node -v)"
fi

if ! command -v npm >/dev/null 2>&1; then
  error_exit "npm not found. Please install Node.js properly."
fi

# ===============================
# 4️⃣ Install Dependencies
# ===============================
info "Installing npm dependencies..."
cd "$PROJECT_DIR"
npm install --force
success "Dependencies installed."

# ===============================
# 5️⃣ Setup Environment Variables
# ===============================
ENV_FILE="$PROJECT_DIR/.env"
if [ ! -f "$ENV_FILE" ]; then
  info "Creating .env file..."
  echo "# Ponditi environment variables here" > "$ENV_FILE"
  nano "$ENV_FILE"
  success ".env file created."
else
  info ".env file exists."
fi

# ===============================
# 6️⃣ PM2 Deployment
# ===============================
if ! command -v pm2 >/dev/null 2>&1; then
  info "PM2 not found. Installing..."
  npm install -g pm2
  success "PM2 installed."
fi

info "Stopping previous PM2 process (if any)..."
pm2 stop "$APP_NAME" 2>/dev/null || warn "No process to stop."
pm2 delete "$APP_NAME" 2>/dev/null || warn "No process to delete."
pm2 flush

info "Starting PM2 process..."
export NODE_ENV=production
pm2 start server.js --name "$APP_NAME"

# ===============================
# PM2 Startup — safe version
# ===============================
info "Configuring PM2 to start on system boot..."
# This may return non-zero if already configured, so we allow it
sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u $USER --hp $HOME || warn "PM2 startup might already be configured."
pm2 save
success "PM2 process started and configured for boot."

# ===============================
# 7️⃣ Test Deployment (Optional)
# ===============================
info "Testing API..."
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:5000/api || echo "000")
if [ "$HTTP_CODE" -eq 200 ]; then
  success "API is running (HTTP $HTTP_CODE)."
else
  warn "API might not be running properly (HTTP $HTTP_CODE)."
fi

# ===============================
# 8️⃣ Show PM2 Logs
# ===============================
info "Showing PM2 logs..."
pm2 logs "$APP_NAME"