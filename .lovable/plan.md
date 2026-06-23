# D&M Parlour — Multi-Page Mockup Site

A 5-route TanStack Start site for a Kenyan barbershop + unisex salon, with a simulated booking flow. No backend, auth, or payments — all state is local. Black/white/gold theme, bold condensed display headings, urban barbershop attitude.

## Design system (`src/styles.css`)

Update tokens to a dark-only palette (no theme toggle needed):

- `--background` `oklch(0.10 0 0)` (~#0A0A0A), `--foreground` near white
- `--card` slightly lifted black; `--muted` for subtle surfaces
- `--primary` gold `oklch(0.78 0.13 85)` ≈ #D4AF37, `--primary-foreground` black
- `--border` low-opacity gold for hairline dividers
- Custom tokens: `--gradient-gold`, `--shadow-gold-glow` (button hover halo)
- `@utility gold-underline` for animated hover underline; `@utility hover-zoom` for gallery
- Fonts via `<link>` in root head (Google Fonts), registered in `@theme`:
  - `--font-display: "Oswald"` (bold condensed)
  - `--font-sans: "Inter"`

## Route structure

Files under `src/routes/`:

```
__root.tsx       — shell: header + <Outlet/> + footer, sitewide meta, fonts
index.tsx        — Home (/)
about.tsx        — About & Team
services.tsx     — Services & Gallery
book.tsx         — Booking flow (reads search params)
contact.tsx      — Contact
```

Each route defines its own `head()` with unique title, description, og:title, og:description, og:url, and a self-canonical link. Root holds only sitewide defaults (charset, viewport, og:site_name, Organization JSON-LD).

## Shared layout (in `__root.tsx`)

- **StickyHeader** (`src/components/dm/SiteHeader.tsx`): black bg, gold "D&M" wordmark, nav links using `<Link>` with `activeProps` for gold underline (`activeOptions: { exact: true }` for `/`). Persistent gold "Book Now" CTA → `/book`. Mobile: shadcn `Sheet` hamburger.
- **SiteFooter** (`src/components/dm/SiteFooter.tsx`): gold-on-black, address (Ongata Rongai), phone, WhatsApp `https://wa.me/...` link, opening hours, socials (Instagram, TikTok, Facebook lucide icons), small Google Maps `<iframe>` of Ongata Rongai, copyright.

## Page contents

### Home (`/`)
- Full-bleed hero image with overlay; huge "D&M PARLOUR" Oswald wordmark, tagline "Sharp Cuts. Bold Style.", gold location chip, gold "Book Now" CTA → `/book`.
- Intro band: "Barbershop. Salon. One House." with 2–3 supporting images in an asymmetric grid.
- 4 service highlight cards linking to `/services`.
- Testimonials: 4 quote cards with star ratings.
- Closing CTA banner → `/book`.

### About & Team (`/about`)
- Brand story block with 3 stat tiles (Est. 2019, 5,000+ clients, 12+ services).
- Interior/exterior photo grid (4–5 images).
- Team grid: 4 stylist cards (photo, name, specialty, socials, "Book with [Name]" → `/book?stylist=<id>`).

### Services & Gallery (`/services`)
- shadcn `Tabs`: Barbershop | Salon.
- Service cards (name, description, KES price, duration, "Book" button → `/book?service=<id>`).
  - Barber: Classic Cut 500, Fade 800, Beard Trim 300, Hot Towel Shave 700, Kids Cut 400, Skin Fade + Beard 1,500.
  - Salon: Box Braids 2,500, Knotless Braids 2,500, Weaving 2,000, Silk Press 1,500, Mani+Pedi 1,200, Makeup 2,000, Hair Treatment 800.
- Gallery: 8–10 image masonry, `hover-zoom` with gold border.

### Book (`/book`)
- `validateSearch` with Zod (`service?`, `stylist?`) using `zodValidator` + `fallback`.
- 5-step wizard with local `useState`, progress indicator across top:
  1. Choose service (filterable list, two category groups)
  2. Choose stylist (filtered by chosen service's category)
  3. Date (shadcn `Calendar` with `pointer-events-auto`) + mock time slots (some disabled)
  4. Name + phone form (react-hook-form + zod, no submit endpoint)
  5. Confirmation: gold check, summary card, "Book another" reset
- Pre-fills initial step state from search params (`service`/`stylist`). Gold Back/Next buttons; sonner toast on completion.

### Contact (`/contact`)
- Address, phone (tel:), WhatsApp link, email (mailto:).
- Opening hours table (Mon–Sun).
- Embedded Google Maps `<iframe>` for Ongata Rongai.
- Contact form (name, email, message; zod validated; on submit shows toast, resets — no network).
- Social links.

## Images

Generate ~14 images via `imagegen` (fast tier, JPG) into `src/assets/`, depicting an African barbershop + unisex salon, moody warm/gold lighting:

- 1 hero (wide), 2 about-intro, 4 interior/exterior, 4 team portraits (2 barbers, 2 stylists), 8–10 gallery (cuts, fades, braids, weaves, shop ambience). Reuse some across pages to keep count reasonable.

## Components to add

`src/components/dm/`: `SiteHeader.tsx`, `SiteFooter.tsx`, `Hero.tsx`, `ServiceCard.tsx`, `TeamCard.tsx`, `TestimonialCard.tsx`, `GalleryGrid.tsx`, `BookingWizard.tsx` (+ step subcomponents), `SectionHeading.tsx`, `data.ts` (services, team, testimonials, hours constants).

## shadcn pieces used

`button`, `card`, `tabs`, `calendar`, `popover`, `input`, `textarea`, `form`, `label`, `sheet`, `badge`, `separator`, `sonner`.

## Technical notes

- TanStack Router `<Link>` everywhere, no `<a href>` for internal nav. Preload on intent (already default-friendly).
- All routes are public; no loaders needed beyond static content, no server functions.
- Mobile-first: header collapses to Sheet < md; service/team grids stack; booking wizard single-column with sticky bottom action bar on mobile.
- Accessibility: alt text on every image, focus-visible gold ring utility, `aria-current` via TanStack active link, keyboard-navigable wizard.
- SEO: per-route `title`/`description`/`og:*` + self-canonical; single H1 per page; Organization JSON-LD at root, LocalBusiness JSON-LD on `/contact`.

## Out of scope

Real bookings, auth, payments, Lovable Cloud, dark/light toggle, blog, i18n.
