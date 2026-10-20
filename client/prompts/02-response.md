I'll build a complete, type-safe admin dashboard that fits into your existing Next.js App Router project. Using your Educamb design tokens (green `#3EC878`, purple `#4A3D8F`, soft shadows, section badges) and Bootstrap 5 utilities for layout.

Let me create all files in parallel where possible.
Now the main `ResourcePage` template — generic over `T`, with all the state management baked in:
Now the comprehensive SCSS file following the Educamb design system:
Now the admin layout, redirect page, and the 4 resource pages:
Let me verify the directory structure and run a TypeScript check:
Built a fully type-safe admin dashboard that mirrors your Educamb homepage design language. The 4 tabs (Medium / Class Type / Subject / Users) live as separate routes under `/admin/*` with the default `/admin` redirecting to Class Type — all sharing one sticky topbar + tab navigation via Next.js layout.

**What you get:**
- `ResourcePage<T>` generic template → each page is ~30 lines of config (badge, columns, fields, endpoint, response key)
- `useResourceCrud` hook handles fetch/add/delete with proper loading/error states
- Desktop: real `<table>` with hover rows • Mobile: auto-collapses to stacked cards
- Add modal + Delete confirm modal wired in, with body-scroll lock and Escape-to-close
- Bootstrap 5 utilities for layout, SCSS module only for brand visuals (green/purple tokens, gradients, soft shadows)

**To run it:** copy the `src/app/admin/`, `src/components/admin/`, `src/hooks/`, `src/types/admin.ts`, and `src/styles/Admin.module.scss` files into your project, then visit `/admin`.

**Likely tweaks you'll need:**
1. If `/user/all` returns `{ customers: [] }` instead of `{ users: [] }`, change `responseKey="users"` → `"customers"` in `users/page.tsx`
2. If your `/user/add` controller expects different fields than `{ name, email, phone, password, role, cc }`, edit `buildAddPayload` in the same file
3. The existing `@/config/axios` import path is used as-is — adjust if your axios file lives elsewhere

Want me to add an **Edit** flow next (click row → pre-filled modal → PUT/PATCH), or add a **toast notification system** for success/error feedback after add/delete?


-> https://chat.z.ai/c/56c6efa8-3cf5-40c5-b3d5-117364666387