# AISEE Portal — Frontend Project Specification

> **Dokumen:** `project-fe.md`  
> **Arsitektur:** Next.js 15 App Router  
> **Status:** Rewrite dari Vite + React 19 ke Next.js  
> **Tanggal basis:** 6 September 2026  
> **Tim:** 2 developers

## 1. Scope

Frontend adalah public-facing portal dan admin interface AISEE. Dokumen ini memisahkan seluruh kebutuhan frontend dari backend/infrastruktur, tanpa mengubah business flow, route, data, atau API contract yang sudah ditetapkan.

### Prinsip utama

- Next.js 15 App Router.
- SSR/SSG/ISR dipakai sesuai karakter halaman.
- Tailwind CSS v4.
- React Context untuk auth; Zustand untuk state kompleks.
- TanStack Query untuk data fetching, caching, pagination, dan mutation.
- React Hook Form + Zod untuk form dan validasi.
- Cookie-based authentication tetap dipertahankan.
- Backend menjadi sumber data; frontend tidak memiliki business logic database.
- Publication data berasal dari backend cache OJS, bukan hardcoded dummy data.
- UI harus **Editorial Corporate**: terasa seperti portal institusi/perusahaan yang kredibel, bukan template SaaS generik atau AI-generated landing page.

## 2. Migration Baseline

Frontend lama menggunakan Vite 7.2.4 + React 19.2.0 + react-router-dom 7.11.0 + Tailwind CSS v4 + Axios + AOS + Lucide React + React Toastify + React Context. fileciteturn0file0L20-L32

### Mapping teknologi

| Existing | Next.js target |
|---|---|
| Vite | Next.js 15 |
| React Router | App Router / file-based routing |
| Axios | native `fetch` + TanStack Query |
| React Context | Context untuk auth |
| — | Zustand untuk complex client state |
| Tailwind v4 | Tailwind CSS v4 |
| AOS | CSS/Intersection Observer atau animation library seperlunya |
| React Hook Form | React Hook Form |
| Manual validation | Zod |
| React 19 components | React/Next.js components |

## 3. Route Architecture

### Public

| Route | Rendering / behavior | Requirement |
|---|---|---|
| `/` | ISR/SSR | Hero, vision & mission, news feed, footer |
| `/login` | Client interaction | Login + validation |
| `/register` | Client interaction | Registration |
| `/about` | SSG | Static institutional content |
| `/contact` | SSG | Static contact content |
| `/news` | ISR | Paginated article listing |
| `/news/[slug]` | ISR | SEO-friendly article detail |
| `/membership` | Dynamic | Membership status |
| `/membership/apply` | Client-heavy | Multi-step application |
| `/membership/payment` | Client-heavy | Payment proof upload |
| `/profile` | Dynamic/authenticated | User membership profile |
| `/publications` | ISR | Journal listing from backend |
| `/publications/[id]` | ISR | Journal detail |

### Admin

| Route | Behavior |
|---|---|
| `/admin` | Protected client dashboard |
| `/admin/members` | Protected membership management |
| `/admin/news` | Protected article CRUD |

Admin routes remain protected by role: `user`, `admin`, `super_admin`. fileciteturn0file0L53-L58

## 4. Data & API Boundary

Frontend consumes the existing contract; endpoint implementation belongs to `project-be.md`.

### Auth
```text
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
POST /api/auth/logout
POST /api/auth/verify-email
POST /api/auth/forgot-password
POST /api/auth/reset-password
```

### Articles
```text
GET    /api/articles?page=&limit=
GET    /api/articles/:slug
GET    /api/admin/articles?page=&limit=
POST   /api/admin/articles
PUT    /api/admin/articles/:id
DELETE /api/admin/articles/:id
```

### Membership
```text
POST  /api/memberships
GET   /api/memberships/me
GET   /api/memberships
PATCH /api/memberships/:id/approve
PATCH /api/memberships/:id/reject
PATCH /api/memberships/:id/revoke
```

### Membership applications
```text
POST   /api/membership-applications/draft
POST   /api/membership-applications/submit
GET    /api/membership-applications/me
POST   /api/membership-applications/:id/payment
GET    /api/membership-applications
PATCH  /api/membership-applications/:id/approve
PATCH  /api/membership-applications/:id/reject
DELETE /api/membership-applications/:id
```

### Publications
```text
GET  /api/publications/journals
GET  /api/publications/journals/:id
GET  /api/publications/journals/:id/issues/:issueId
POST /api/admin/publications/sync
```

API contract dan status endpoint tersebut berasal dari dokumen arsitektur awal. fileciteturn0file0L60-L99

## 5. Rendering Strategy

| Area | Strategy | Reason |
|---|---|---|
| Home | ISR | SEO + frequently updated news |
| About / Contact | SSG | Mostly static |
| News | ISR, `revalidate=60` | Fresh content without per-request SSR |
| Publications | ISR, `revalidate=60` | Journal metadata changes periodically |
| News detail | ISR | SEO + shareable pages |
| Membership | Dynamic | User-specific |
| Profile | Dynamic | Authenticated |
| Application/payment | Client-heavy | Form/upload interaction |
| Admin | Client-side | CRUD and interactive tables |

Target migration ini secara eksplisit menetapkan static pages ke SSG, news/publications ke ISR, dan admin sebagai client-side. fileciteturn0file0L238-L248

# 6. Editorial Corporate Design System

## 6.1 Design Direction

**Editorial Corporate** berarti kombinasi karakter:

- **Editorial:** hierarchy kuat, whitespace terkontrol, typography berkarakter, layout seperti annual report / institutional publication.
- **Corporate:** serius, precise, restrained, credible, structured.
- **Institutional:** cocok untuk organisasi yang bergerak pada knowledge, research, engineering, infrastructure, business, dan publication.

### Yang harus dihindari

- Gradient berlebihan.
- Glassmorphism sebagai gaya utama.
- Card grid identik berulang.
- Rounded corner ekstrem.
- Floating blobs / abstract AI shapes.
- Excessive shadows.
- Semua section terlihat seperti template SaaS.
- Animasi yang tidak memiliki fungsi.
- Headline generik ala AI.
- Icon + heading + paragraph yang berulang di seluruh section.

## 6.2 Visual Language

### Layout

Gunakan layout editorial dengan:

- container lebar dan konsisten.
- asymmetric grid ketika relevan.
- strong horizontal rules.
- numbered sections.
- oversized editorial headlines.
- compact metadata.
- generous whitespace.
- intentional negative space.
- image cropping yang tegas.
- visual rhythm seperti magazine / annual report.

### Grid

Desktop:
```text
12-column grid
max-width: 1280–1440px
gutter: 24–32px
```

Tablet:
```text
8-column grid
```

Mobile:
```text
4-column grid
```

Jangan memaksa seluruh content menjadi card. Gunakan text block, divider, editorial list, image block, table, dan card hanya ketika semantik memang membutuhkan card.

## 6.3 Typography

Gunakan **dua-font system**:

### Display / Editorial
**Cormorant Garamond** atau serif editorial setara.

Dipakai untuk:
- Hero headline.
- Section statement.
- Featured article title.
- Publication/editorial highlight.

Karakter: authoritative, intellectual, premium.

### UI / Corporate
**Manrope** atau sans-serif corporate setara.

Dipakai untuk:
- Navbar.
- Body text.
- Button.
- Metadata.
- Form.
- Dashboard.
- Table.
- Navigation.

> Jika brand guideline AISEE sudah menentukan font resmi, brand guideline mengalahkan rekomendasi ini.

## 6.4 Color Direction

Base:
- Warm/off-white background.
- Near-black text.
- Deep institutional green/teal sebagai primary accent.
- Muted gray untuk secondary information.

Gunakan warna accent secara hemat. Tujuannya bukan membuat website "berwarna", tetapi menciptakan **recognizable institutional identity**.

## 6.5 Component Rules

### Navbar
- Editorial masthead feel.
- Logo kiri.
- Primary navigation terstruktur.
- CTA membership tidak dibuat seperti SaaS "Get Started".
- Active route jelas tetapi understated.
- Mobile drawer clean dan typographic.

### Hero
Struktur:
```text
[eyebrow / organization label]

Large editorial headline
Short institutional statement

[primary action] [secondary action]

                    [featured visual]
```

Hero tidak harus centered. Prefer asymmetric composition.

### News
Prioritaskan:
1. Featured article besar.
2. Secondary article list.
3. Metadata: category / date / reading time.
4. Thumbnail sebagai supporting visual.

Jangan membuat semua artikel menjadi 3-column cards identik.

### Publications
Gunakan bahasa visual akademik/editorial:
- journal identity.
- ISSN.
- volume/issue.
- publication year.
- indexing.
- article count.
- DOI / PDF action.

Publication listing harus terasa seperti **journal catalogue**, bukan product marketplace.

### Membership
Flow harus terasa administratif tetapi premium:
- progress indicator.
- clear form hierarchy.
- grouped fields.
- review summary.
- status timeline.

### Admin
Admin boleh lebih utilitarian daripada public site.

Prioritas:
- density yang efisien.
- clear table hierarchy.
- filter/search.
- status badges.
- predictable actions.
- confirmation untuk destructive action.

## 6.6 Motion

Animation harus **subtle and purposeful**.

Gunakan:
- fade/translate pendek.
- image reveal.
- stagger ringan pada editorial list.
- hover underline.
- micro-interaction pada buttons.
- page transition bila stabil.

Hindari:
- parallax berat.
- continuous floating animation.
- excessive scroll-triggered animation.
- bouncing UI.
- animation pada setiap element.

Target: website terasa **alive, not animated**.

## 7. Accessibility & UX

- Semantic HTML.
- Keyboard navigation.
- Visible focus state.
- Proper form labels.
- Error message dekat field.
- Minimum touch target mobile.
- `alt` text untuk editorial images.
- Respect `prefers-reduced-motion`.
- Loading/skeleton hanya pada area yang benar-benar menunggu data.
- Error state dan empty state harus designed, bukan raw text.

## 8. SEO

Next.js metadata harus digunakan pada:
- Home.
- About.
- Contact.
- News listing.
- News detail.
- Publications.
- Publication detail.

`news/[slug]` dan publication detail harus memiliki:
- title.
- description.
- canonical.
- Open Graph.
- Twitter/X metadata bila dibutuhkan.
- structured data bila konten mendukung.

News memakai slug sebagai SEO URL. fileciteturn0file0L365-L375

## 9. Suggested Frontend Structure

```text
frontend/
├── app/
│   ├── (public)/
│   │   ├── page.tsx
│   │   ├── about/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── news/page.tsx
│   │   ├── news/[slug]/page.tsx
│   │   ├── publications/page.tsx
│   │   ├── publications/[id]/page.tsx
│   │   └── membership/...
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── admin/
│   │   ├── page.tsx
│   │   ├── members/page.tsx
│   │   └── news/page.tsx
│   ├── profile/page.tsx
│   ├── layout.tsx
│   ├── loading.tsx
│   ├── error.tsx
│   └── not-found.tsx
├── components/
│   ├── layout/
│   ├── navigation/
│   ├── editorial/
│   ├── news/
│   ├── publications/
│   ├── membership/
│   ├── admin/
│   └── ui/
├── features/
│   ├── auth/
│   ├── articles/
│   ├── membership/
│   └── publications/
├── lib/
│   ├── api/
│   ├── auth/
│   ├── seo/
│   └── utils/
├── stores/
├── hooks/
├── schemas/
├── types/
└── public/
```

## 10. Migration Checklist

- [ ] Initialize Next.js 15 App Router.
- [ ] Configure Tailwind v4.
- [ ] Establish Editorial Corporate design tokens.
- [ ] Port Navbar, Footer, layouts, and shared UI.
- [ ] Replace React Router with App Router.
- [ ] Replace Axios with `fetch` + TanStack Query where client caching is needed.
- [ ] Move API URL to environment variables.
- [ ] Implement auth/session handling.
- [ ] Add global `loading.tsx`, `error.tsx`, and `not-found.tsx`.
- [ ] Migrate all public routes.
- [ ] Migrate membership flow.
- [ ] Migrate admin routes.
- [ ] Replace dummy publications with backend API.
- [ ] Implement metadata/SEO.
- [ ] Implement responsive Editorial Corporate layouts.
- [ ] Audit accessibility.
- [ ] Test mobile/tablet/desktop.
- [ ] Verify Cloudflare caching behavior.

## 11. Definition of Done

Frontend dianggap selesai apabila:

1. Seluruh 16 route lama memiliki equivalent route di App Router.
2. Tidak ada hardcoded production API URL.
3. Auth tetap cookie-based.
4. News dan publications mengambil data dari backend.
5. Admin route protected.
6. SEO metadata tersedia untuk public content.
7. Responsive pada mobile/tablet/desktop.
8. Tidak ada placeholder/dummy publication data.
9. UI konsisten dengan Editorial Corporate design system.
10. Loading, error, empty, dan success states tersedia.
11. Tidak ada global error boundary gap.
12. Tidak ada visual pattern yang terasa seperti generic AI/SaaS template.
