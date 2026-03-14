import { memo } from "react";

const BrandLogo = memo(() => (
  <svg width="42" height="42" viewBox="0 0 42 42" fill="none">
    
    {/* Background */}
    <rect width="42" height="42" rx="12" fill="#4A3D8F" />

    <defs>
      {/* Purple gradient using your palette */}
      <linearGradient id="pondGradient" x1="0" y1="0" x2="42" y2="42">
        <stop offset="0%" stopColor="#6355B5" />
        <stop offset="100%" stopColor="#2D2460" />
      </linearGradient>

      {/* Green glow */}
      <radialGradient id="pondGlow" cx="0.5" cy="0.5" r="0.6">
        <stop offset="0%" stopColor="#3EC878" />
        <stop offset="100%" stopColor="#25A85A" />
      </radialGradient>
    </defs>

    {/* Inner panel */}
    <rect
      x="6"
      y="6"
      width="30"
      height="30"
      rx="9"
      fill="url(#pondGradient)"
      opacity="0.35"
    />

    {/* Open Book Shape */}
    <path
      d="M12 15L21 11L30 15V23L21 31L12 23V15Z"
      stroke="#FFFFFF"
      strokeWidth="2"
      strokeLinejoin="round"
      fill="none"
    />

    {/* Inner knowledge symbol */}
    <path
      d="M17 19L21 17L25 19V22L21 25L17 22V19Z"
      fill="#EEE9FF"
    />

    {/* Knowledge spark */}
    <circle cx="21" cy="21" r="2.2" fill="url(#pondGlow)" />

    {/* Decorative learning spark */}
    <path
      d="M31 11L32.2 13.2L34.5 14L32.2 14.8L31 17L29.8 14.8L27.5 14L29.8 13.2L31 11Z"
      fill="#F5C842"
    />

  </svg>
));

BrandLogo.displayName = "BrandLogo";

export default BrandLogo;