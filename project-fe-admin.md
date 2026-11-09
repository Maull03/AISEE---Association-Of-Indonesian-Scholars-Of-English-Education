# AISEE Portal — Frontend Admin Project Specification

> **Dokumen:** `project-fe-admin.md`  
> **Scope:** Admin Frontend Only  
> **Arsitektur:** Next.js 15 App Router  
> **Design Direction:** Editorial Corporate Administration  
> **Tanggal basis:** 9 September 2026  
> **Tim:** 2 developers

---

## 1. Tujuan Dokumen

Dokumen ini menjadi spesifikasi implementasi **Frontend Admin AISEE Portal**.

Admin panel harus terasa sebagai **professional institutional control room**: serius, terstruktur, cepat dipindai, dan nyaman dipakai untuk pekerjaan administratif harian.

Admin UI bukan versi gelap dari website publik dan bukan dashboard SaaS generik.

### Prinsip utama

- Tetap menggunakan Next.js 15 App Router.
- Admin route wajib protected.
- Role yang memiliki akses admin: `admin` dan `super_admin`.
- Data berasal dari backend API; jangan membuat business logic/database logic di frontend.
- TanStack Query digunakan untuk server state, cache, pagination, mutation, loading dan error state.
- Zustand hanya digunakan untuk client state yang memang kompleks.
- React Hook Form + Zod digunakan untuk form.
- Cookie-based session authentication tetap digunakan.
- UI harus **Editorial Corporate**, tetapi lebih utilitarian daripada public-facing website.
- Prioritas admin: **clarity > speed > information density > decoration**.
- Jangan membuat admin panel terlihat seperti template dashboard hasil AI.

Route admin yang sudah ditetapkan adalah `/admin`, `/admin/members`, dan `/admin/news`. fileciteturn0file0L30-L35

---

# 2. Design Direction — Editorial Corporate Admin

## 2.1 Core Concept

Gunakan konsep:

> **Editorial Corporate Control Room**

Gabungkan karakter editorial dengan sistem administrasi yang presisi.

### Editorial

- Strong typography hierarchy.
- Banyak whitespace yang terkontrol.
- Section title yang jelas.
- Garis horizontal sebagai structural divider.
- Nomor/label kecil untuk membantu scanning.
- Layout tidak selalu berupa card grid simetris.
- Data terasa seperti bagian dari institutional report.

### Corporate

- Serious.
- Precise.
- Restrained.
- Professional.
- Trustworthy.
- Consistent.
- Tidak terlalu dekoratif.

### Administrative

- Dense enough untuk pekerjaan sehari-hari.
- Table-first untuk data management.
- Search dan filter mudah ditemukan.
- Status sangat jelas.
- Action predictable.
- Confirmation untuk destructive action.
- Feedback cepat setelah mutation.

---

# 3. Visual Principles

## 3.1 Jangan Gunakan

Hindari:

- Glassmorphism.
- Gradient dashboard yang berlebihan.
- Neon accent.
- Excessive rounded cards.
- Semua elemen dibungkus card.
- Floating blobs.
- Dashboard dengan 8–12 statistic cards.
- Excessive shadows.
- Massive animated counters.
- Decorative 3D objects.
- Continuous floating animations.
- Generic SaaS dashboard template.
- Layout "sidebar + card grid" tanpa hierarchy.
- Icon besar sebagai pengganti informasi.
- Warna berbeda untuk setiap statistic.
- Chart yang tidak membantu keputusan admin.

Admin harus terlihat seperti **internal system milik organisasi besar**, bukan startup analytics template.

---

# 4. Layout System

## 4.1 Desktop

Gunakan:

- Sidebar fixed/sticky di kiri.
- Main content area fluid.
- Maximum content width sekitar 1440px.
- Horizontal spacing konsisten.
- Vertical rhythm 8px-based.
- Table dapat menggunakan full available width.
- Detail panel/modal tidak boleh terlalu sempit.

Recommended structure:

```text
┌──────────────────────────────────────────────────────────────┐
│ SIDEBAR │ TOP CONTEXT BAR                                   │
│         ├────────────────────────────────────────────────────┤
│         │                                                    │
│         │ PAGE HEADER                                        │
│         │ eyebrow / title / description / actions            │
│         │                                                    │
│         │ ────────────────────────────────────────────────── │
│         │                                                    │
│         │ PRIMARY CONTENT                                    │
│         │                                                    │
│         │ table / editorial panel / form / activity          │
│         │                                                    │
│         └────────────────────────────────────────────────────┘
└──────────────────────────────────────────────────────────────┘
```

## 4.2 Mobile

Sidebar berubah menjadi:

- drawer.
- compact top bar.
- menu trigger.
- user/profile access.

Table pada mobile:

- Jangan memaksakan 10 kolom.
- Gunakan horizontal scroll jika data memang tabular.
- Prioritaskan kolom utama.
- Action tetap mudah dijangkau.

---

# 5. Typography

Gunakan kombinasi typography yang konsisten dengan public Editorial Corporate.

### Display / Page Heading

Recommended:

- Cormorant Garamond
- atau editorial serif setara.

Gunakan untuk:

- Main page heading.
- Section heading tertentu.
- Empty state yang bersifat editorial.

### UI / Body / Data

Recommended:

- Manrope
- atau modern grotesk sans yang setara.

Gunakan untuk:

- Sidebar.
- Navigation.
- Table.
- Button.
- Form.
- Badge.
- Metadata.
- Pagination.
- Helper text.

### Rule

Jangan menggunakan serif untuk:

- Table body.
- Button.
- Form input.
- Navigation.
- Dense admin information.

Serif digunakan sebagai **editorial accent**, bukan sebagai default seluruh interface.

---

# 6. Color System

Admin menggunakan warna institutional yang restrained.

### Base

- Warm off-white / very light neutral background.
- Near-black text.
- Muted gray secondary text.
- White atau slightly warm panel surface.

### Accent

Gunakan:

- Deep institutional green / teal.

Accent digunakan untuk:

- Active navigation.
- Primary CTA.
- Links.
- Focus state.
- Important status.
- Selected state.

### Semantic colors

Tetap gunakan semantic colors untuk status:

- Success → green.
- Warning → amber.
- Error → red.
- Info → blue.

Tetapi gunakan secara restrained.

### Rule

Jangan membuat:

```text
Users = blue
Members = purple
News = orange
Revenue = green
Reports = pink
```

Setiap module tidak perlu memiliki warna sendiri.

---

# 7. Admin Shell

## 7.1 Sidebar

Sidebar adalah identitas utama admin interface.

### Struktur

```text
AISEE
ADMINISTRATION

Overview
Members
News

────────────────

System
   Account
   Documentation

────────────────

Admin User
Role
Logout
```

Jika item belum memiliki route/function, **jangan membuat fake navigation**. Hanya render navigation yang benar-benar tersedia.

### Sidebar behavior

- Active route sangat jelas.
- Gunakan subtle background/accent.
- Active indicator tipis, bukan pill besar.
- Icon Lucide kecil dan konsisten.
- Label readable.
- Collapse pada tablet jika diperlukan.
- Drawer pada mobile.

### Sidebar visual

Hindari:

- gradient background.
- giant logo.
- glowing active state.
- oversized icons.
- rounded floating sidebar.

---

# 8. Top Context Bar

Top bar berfungsi sebagai context layer.

Isi minimum:

```text
[menu]  AISEE Administration

                              [notifications if implemented]
                              [admin identity]
```

Jangan menambahkan notification system jika backend belum menyediakan datanya.

Admin identity dapat menampilkan:

```text
Admin Name
admin@example.com
```

Jika data email tersedia dari `/api/auth/me`.

---

# 9. Global Page Header

Semua admin page menggunakan struktur header yang konsisten.

Contoh:

```text
ADMINISTRATION / MEMBERS

Members
Manage membership records and review member status.

[Search] [Filter]                         [optional primary action]
```

### Hierarchy

1. Eyebrow / breadcrumb kecil.
2. H1.
3. Short description.
4. Primary action jika ada.
5. Divider.
6. Content.

Hindari:

```text
Members Management Dashboard
Manage all your members in one place with powerful tools...
```

Copy harus singkat dan institutional.

---

# 10. Admin Dashboard — `/admin`

## 10.1 Purpose

Dashboard hanya menjadi **operational overview**, bukan analytics suite.

Route `/admin` sudah memiliki UI awal berupa stat cards. fileciteturn0file0L30-L35

Redesign stat cards agar tidak terlihat seperti dashboard SaaS.

## 10.2 Recommended Layout

### Header

```text
ADMINISTRATION / OVERVIEW

Good morning, Admin.

A concise overview of current portal activity.
```

Jangan membuat greeting terlalu casual jika tidak sesuai brand.

### Operational Summary

Gunakan maksimal 4 summary metrics:

```text
MEMBERS
Total registered members

APPLICATIONS
Pending applications

ARTICLES
Published articles

PENDING REVIEW
Applications requiring action
```

### Visual treatment

Bukan:

```text
┌──────────┐ ┌──────────┐ ┌──────────┐
│ 1,203     │ │ 82       │ │ 42       │
│ BIG ICON  │ │ BIG ICON │ │ BIG ICON │
└──────────┘ └──────────┘ └──────────┘
```

Gunakan:

```text
01  MEMBERS
────────────────────────
1,203
Registered members

02  APPLICATIONS
────────────────────────
82
Pending review
```

Lebih editorial dan lebih mudah discan.

## 10.3 Recent Activity

Jika API mendukung data yang diperlukan, tampilkan:

- Recent membership applications.
- Recent articles.
- Latest status changes.

Jika backend belum menyediakan activity endpoint:

**jangan membuat fake activity data.**

Gunakan data yang memang tersedia dari endpoint existing.

---

# 11. Members — `/admin/members`

Endpoint admin membership yang sudah ditetapkan:

```text
GET    /api/memberships
PATCH  /api/memberships/:id/approve
PATCH  /api/memberships/:id/reject
PATCH  /api/memberships/:id/revoke
```

fileciteturn0file0L62-L66

## 11.1 Page Objective

Halaman ini digunakan admin untuk:

- Melihat membership.
- Search member.
- Filter status.
- Membuka detail.
- Approve.
- Reject.
- Revoke.

## 11.2 Main Layout

```text
ADMINISTRATION / MEMBERS

Members
Review and manage registered membership records.

[Search members...] [Status ▼]

──────────────────────────────────────────────────────────────

MEMBER             TYPE        STATUS       JOINED       ACTION
──────────────────────────────────────────────────────────────
John Doe            Individual  Active       12 Aug 2026  View
Jane Doe            Corporate   Pending      10 Aug 2026  View
...
```

## 11.3 Table

Table harus menjadi primary interface.

### Recommended columns

- Member / name.
- Membership type jika tersedia.
- Status.
- Date.
- Action.

Jangan membuat terlalu banyak kolom.

### Table rules

- Header uppercase kecil.
- Typography compact.
- Row height cukup untuk scanning.
- Horizontal divider subtle.
- Hover state subtle.
- Tidak perlu shadow setiap row.
- Jangan membuat setiap row menjadi card.

---

# 12. Member Detail

Ketika admin memilih member:

Gunakan:

- Side panel / modal besar.
- Bukan modal kecil dengan 15 field.

### Structure

```text
MEMBER DETAIL

John Doe
Member since 12 August 2026

────────────────────────────

PERSONAL
Name
Email
Phone
Address

PROFESSIONAL
Organization
Position
...

MEMBERSHIP
Status
Type
Joined
Expires

────────────────────────────

[Reject] [Approve]
```

Jika revoke tersedia:

```text
[Revoke membership]
```

### Detail design

Gunakan label-value pairs:

```text
EMAIL
john@example.com

STATUS
ACTIVE
```

Bukan form input disabled untuk semua informasi.

---

# 13. Membership Status

Status harus sangat mudah dipahami.

Recommended badge:

```text
ACTIVE
PENDING
APPROVED
REJECTED
REVOKED
EXPIRED
```

### Badge design

Gunakan:

- small text.
- medium weight.
- subtle background.
- border optional.

Hindari pill yang terlalu besar.

---

# 14. Membership Actions

## Approve

Flow:

```text
Click Approve
↓
Confirmation
↓
Mutation
↓
Loading state
↓
Success toast
↓
Update query cache
```

Confirmation:

```text
Approve this membership?

The member will be moved to an approved/active state.
```

## Reject

Confirmation wajib.

Jika backend membutuhkan alasan, tampilkan field alasan.

Jika backend contract belum menyediakan alasan:

**jangan menambahkan required rejection reason ke frontend.**

## Revoke

Revoke adalah destructive action.

Gunakan:

- destructive confirmation.
- clear warning.
- disabled state saat mutation.
- success/error feedback.

Technical debt sebelumnya mencatat duplicate `revokeMembership`; implementasi baru harus memiliki satu API abstraction saja. fileciteturn0file0L81-L85

---

# 15. Members Search & Filter

Search harus:

- Debounced.
- Tidak menyebabkan request setiap keypress.
- Clear button tersedia.
- Empty state jelas.

Filter:

- Status.
- Membership type jika data tersedia.

Jangan membuat filter palsu untuk field yang tidak tersedia dari API.

---

# 16. News — `/admin/news`

Admin article API:

```text
GET    /api/admin/articles?page=&limit=
POST   /api/admin/articles          (multipart — image upload)
PUT    /api/admin/articles/:id      (multipart — image upload)
DELETE /api/admin/articles/:id
```

fileciteturn0file0L52-L56

## 16.1 Page Objective

Admin dapat:

- View article list.
- Search jika endpoint/data mendukung.
- Create article.
- Edit article.
- Delete article.
- Upload article image.

---

# 17. News List

Gunakan editorial content management layout.

```text
ADMINISTRATION / NEWS

News
Create and manage editorial content.

                                             [Create article]

────────────────────────────────────────────────────────────

FEATURED / RECENT

[thumbnail]  Article title
             Short metadata
             Published / Draft
             Updated date                    Edit · Delete
```

Jika backend tidak memiliki status draft/published, jangan membuat fake status system.

---

# 18. Article Table vs Editorial List

Untuk news, **jangan memaksa table murni** jika visual thumbnail dan title merupakan informasi penting.

Gunakan hybrid editorial list:

```text
┌──────┬─────────────────────────────────────────────┬─────────┐
│ IMG  │ TITLE + META                                │ ACTION  │
├──────┼─────────────────────────────────────────────┼─────────┤
│ IMG  │ AISEE ...                                   │ Edit    │
│      │ Published · 12 Sep 2026                     │ Delete  │
└──────┴─────────────────────────────────────────────┴─────────┘
```

Ini membuat admin news terasa connected dengan public editorial identity.

---

# 19. Create / Edit Article

Gunakan dedicated page atau large panel.

Recommended structure:

```text
ADMINISTRATION / NEWS / NEW ARTICLE

Create article
Publish a new editorial article.

────────────────────────────────────────────

CONTENT

Title
[........................................]

Slug
[........................................]

Excerpt
[........................................]

Body
[........................................]

────────────────────────────────────────────

MEDIA

Cover image
[ Upload image ]

Preview

────────────────────────────────────────────

[Cancel]                         [Save article]
```

## 19.1 Form Rules

Gunakan:

- React Hook Form.
- Zod.
- Clear field labels.
- Inline validation.
- Character guidance jika diperlukan.
- Loading state.
- Unsaved changes protection jika form panjang.

## 19.2 Image Upload

Backend contract menggunakan multipart untuk create/update article. fileciteturn0file0L52-L56

Frontend harus menyediakan:

- Drag & drop optional.
- Click upload.
- Image preview.
- File name.
- File size.
- Replace image.
- Remove image jika supported.

Jangan menganggap upload berhasil sebelum API mengonfirmasi.

---

# 20. Rich Text Editor

Jika backend menyimpan HTML/Markdown/rich content, gunakan editor yang kompatibel dengan format tersebut.

Jangan memasang editor hanya karena terlihat modern.

Editor harus memiliki minimal:

- Heading.
- Paragraph.
- Bold.
- Italic.
- Link.
- List.
- Quote.
- Image jika backend mendukung.

### Editorial behavior

Editor toolbar harus restrained.

Hindari toolbar dengan 30 icon.

---

# 21. Delete Article

Delete adalah destructive action.

Flow:

```text
Delete
↓
Confirmation modal
↓
"Delete this article?"
↓
Confirm
↓
Loading
↓
Mutation
↓
Invalidate article query
↓
Success toast
```

Jangan menggunakan `window.confirm()`.

---

# 22. Loading State

Jangan menggunakan blank screen.

Gunakan:

- Skeleton.
- Table row skeleton.
- Content placeholder.

Skeleton harus mengikuti bentuk content asli.

Contoh:

```text
MEMBERS

████████████████████████
────────────────────────
████████    ██████
████████    ██████
████████    ██████
```

Hindari spinner besar di tengah layar untuk semua request.

---

# 23. Empty State

Empty state harus informative.

### Members

```text
NO MEMBERS FOUND

There are no membership records matching the current criteria.

[Clear filters]
```

### News

```text
NO ARTICLES YET

No editorial articles have been created.

[Create article]
```

Jangan menggunakan illustration besar yang dekoratif jika tidak diperlukan.

---

# 24. Error State

Gunakan page-level atau section-level error state.

Contoh:

```text
UNABLE TO LOAD MEMBERS

We couldn't retrieve membership data right now.

[Try again]
```

Jangan hanya:

```text
Something went wrong!!!
```

Global error boundary wajib tersedia karena frontend lama belum memilikinya. fileciteturn0file0L86-L89

---

# 25. Toast / Feedback

Gunakan toast untuk:

- Successful create.
- Successful update.
- Successful delete.
- Successful approve/reject/revoke.
- Upload success.
- Non-blocking API error.

Toast harus:

- Short.
- Clear.
- Action-oriented.

Contoh:

```text
Article updated successfully.
Membership approved.
Article deleted.
```

Jangan:

```text
YAY! Your article has been successfully and amazingly updated!!!
```

---

# 26. Confirmation Modal

Semua destructive/high-impact action menggunakan confirmation.

### Modal structure

```text
DELETE ARTICLE

Are you sure you want to delete this article?

This action cannot be undone.

[Cancel] [Delete article]
```

Primary destructive action harus jelas.

Modal tidak boleh terlalu rounded atau memiliki shadow berlebihan.

---

# 27. Authentication & Authorization

Admin UI menggunakan cookie-based session authentication.

Security contract:

- `httpOnly`
- `secure`
- `sameSite: strict`
- Database session.
- RBAC: `user`, `admin`, `super_admin`.
- CSRF protection.

fileciteturn0file0L173-L186

## 27.1 Route Guard

Semua route:

```text
/admin
/admin/members
/admin/news
```

harus protected.

Behavior:

```text
Unauthenticated
→ redirect /login

Authenticated user role=user
→ deny / redirect

Authenticated role=admin
→ allow

Authenticated role=super_admin
→ allow
```

Jangan hanya menyembunyikan menu.

Authorization harus benar-benar dicek oleh backend juga.

---

# 28. Role-Aware UI

Frontend boleh menyembunyikan action yang tidak relevan berdasarkan role.

Contoh:

```text
admin
→ normal membership/article management

super_admin
→ elevated administrative actions
```

Tetapi frontend **bukan security boundary**.

Backend tetap menjadi authority.

---

# 29. Data Fetching Architecture

Gunakan TanStack Query.

Recommended structure:

```text
features/
├── admin/
│   ├── dashboard/
│   ├── members/
│   │   ├── api.ts
│   │   ├── queries.ts
│   │   ├── mutations.ts
│   │   ├── schemas.ts
│   │   └── components/
│   └── news/
│       ├── api.ts
│       ├── queries.ts
│       ├── mutations.ts
│       ├── schemas.ts
│       └── components/
```

### Query rules

- Stable query keys.
- Pagination state in URL when useful.
- Invalidate after mutation.
- Optimistic update hanya jika safe.
- Jangan duplicate fetch logic di banyak component.

---

# 30. Suggested Query Keys

```text
['admin', 'members']
['admin', 'members', filters]
['admin', 'articles']
['admin', 'articles', page]
['auth', 'me']
```

Jangan menggunakan random string query key.

---

# 31. API Client

Centralize API configuration.

Jangan hardcode:

```text
https://api.aisee-elt.org
```

Technical debt lama mencatat hardcoded API URL yang harus dihilangkan. fileciteturn0file0L81-L84

Gunakan environment-based configuration:

```text
NEXT_PUBLIC_API_BASE_URL
```

Jika memungkinkan, buat wrapper:

```text
apiClient.get(...)
apiClient.post(...)
apiClient.patch(...)
apiClient.delete(...)
```

Cookie credentials harus dikirim sesuai auth architecture.

---

# 32. URL & Filter State

Untuk members:

```text
/admin/members?status=pending&page=1
```

Untuk news:

```text
/admin/news?page=1
```

Jika search/filter cukup penting untuk workflow, simpan state di URL agar:

- refresh tidak kehilangan state.
- browser back/forward bekerja.
- halaman dapat dibagikan internal.

---

# 33. Responsive Behavior

## Desktop

Prioritaskan:

- table.
- side panel.
- keyboard navigation.
- dense information.

## Tablet

- sidebar collapse.
- table horizontal scroll.
- action grouping.

## Mobile

- drawer navigation.
- stacked page header.
- filters menjadi collapsible.
- detail menjadi full-screen panel.
- table menjadi horizontal scroll atau responsive list.

Admin tetap usable, bukan sekadar mengecilkan desktop layout.

---

# 34. Motion Design

Motion harus subtle.

### Allowed

- Page fade-in.
- Panel slide.
- Modal transition.
- Table row hover.
- Image preview fade.
- Button loading transition.
- Sidebar drawer transition.
- Underline hover.

### Avoid

- Parallax.
- Floating cards.
- Bouncing buttons.
- Continuous animation.
- Excessive stagger.
- Scroll-triggered animation di setiap element.

Admin adalah working environment.

Animation tidak boleh mengganggu speed.

---

# 35. Accessibility

Minimum:

- Semantic HTML.
- Keyboard accessible sidebar.
- Visible focus state.
- Form labels.
- Form error association.
- Modal focus trap.
- Escape closes modal.
- Proper aria labels.
- Touch target minimum sekitar 44px.
- Color tidak menjadi satu-satunya indikator status.
- `prefers-reduced-motion`.
- Alt text untuk article images.

---

# 36. Component System

Suggested shared admin components:

```text
AdminShell
AdminSidebar
AdminTopbar
PageHeader
Breadcrumbs
SectionLabel
StatBlock
DataTable
DataTableSkeleton
FilterBar
SearchInput
StatusBadge
Pagination
DetailPanel
ConfirmDialog
FormField
FileUpload
ImagePreview
EmptyState
ErrorState
LoadingState
Toast
```

### Component rule

Jangan membuat component terlalu generic hanya demi "clean architecture".

Component harus reusable jika memang memiliki behavior/visual contract yang sama.

---

# 37. Suggested Project Structure

```text
frontend/
├── app/
│   ├── (public)/
│   ├── (auth)/
│   ├── admin/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── members/
│   │   │   └── page.tsx
│   │   └── news/
│   │       ├── page.tsx
│   │       ├── new/
│   │       │   └── page.tsx
│   │       └── [id]/
│   │           └── edit/
│   │               └── page.tsx
│   └── ...
│
├── components/
│   ├── admin/
│   ├── forms/
│   ├── ui/
│   └── layout/
│
├── features/
│   └── admin/
│       ├── dashboard/
│       ├── members/
│       └── news/
│
├── lib/
│   ├── api/
│   ├── auth/
│   ├── utils/
│   └── validation/
│
├── hooks/
├── stores/
├── schemas/
├── types/
└── public/
```

---

# 38. Admin Layout Strategy

`app/admin/layout.tsx` menjadi shell utama.

Responsibilities:

- Auth/session validation boundary.
- Admin navigation.
- Sidebar.
- Topbar.
- Main content container.
- Global admin providers jika diperlukan.

Page-specific data fetching tetap berada di page/feature layer.

---

# 39. Performance

Admin harus terasa fast.

### Rules

- Jangan load editor berat sebelum dibutuhkan.
- Lazy load rich text editor.
- Optimalkan image preview.
- Pagination untuk data list.
- Jangan fetch seluruh database.
- Debounce search.
- Cache query.
- Invalidate hanya query terkait.
- Gunakan skeleton daripada blocking spinner.

---

# 40. SEO

Admin pages tidak perlu menjadi public SEO content.

Gunakan:

```text
robots: noindex
```

Admin route tidak boleh diindeks search engine.

---

# 41. Security UX

Frontend harus membantu security tanpa membuat UX buruk.

### Sensitive actions

Untuk:

- Delete article.
- Revoke membership.
- Reject membership.

Selalu:

1. Explain action.
2. Explain consequence.
3. Confirm.
4. Show loading.
5. Prevent duplicate submit.
6. Show result.

---

# 42. No Fake Data Rule

Sangat penting:

**Jangan mengisi dashboard dengan dummy metrics atau fake activities hanya agar UI terlihat penuh.**

Jika backend belum menyediakan data:

- gunakan empty state,
- gunakan loading state,
- atau gunakan hanya data dari endpoint yang tersedia.

Publication data lama memang masih dummy, tetapi itu merupakan issue integrasi OJS dan bukan alasan untuk membuat fake data baru di admin. fileciteturn0file0L86-L90

---

# 43. Editorial Corporate Copywriting

Gunakan copy pendek.

### Good

```text
Members
Review and manage membership records.

News
Create and manage editorial content.

Overview
A concise view of current portal activity.
```

### Avoid

```text
Welcome back! Here's everything you need to know about what's happening inside your amazing dashboard.
```

Tone:

- Institutional.
- Calm.
- Direct.
- Professional.
- Confident.

---

# 44. Design Tokens

Define tokens centrally.

Example:

```css
--admin-bg
--admin-surface
--admin-text
--admin-muted
--admin-border
--admin-accent
--admin-success
--admin-warning
--admin-danger

--radius-sm
--radius-md

--space-1
--space-2
--space-3
--space-4
--space-6
--space-8
--space-12
```

Radius harus restrained.

Recommended:

- Inputs: small/moderate radius.
- Buttons: small/moderate radius.
- Panels: moderate radius.
- Avoid excessive `rounded-full`.

---

# 45. Definition of Done

Admin frontend dianggap selesai jika:

## Architecture

- [ ] Next.js 15 App Router.
- [ ] `/admin` layout terpisah.
- [ ] Protected admin routes.
- [ ] Role-aware UI.
- [ ] TanStack Query.
- [ ] React Hook Form + Zod.
- [ ] Centralized API client.
- [ ] Environment-based API URL.

## Dashboard

- [ ] Operational overview.
- [ ] No fake metrics.
- [ ] Loading/empty/error states.
- [ ] Editorial Corporate hierarchy.

## Members

- [ ] Member listing.
- [ ] Pagination.
- [ ] Search/filter bila didukung API.
- [ ] Detail panel.
- [ ] Approve.
- [ ] Reject.
- [ ] Revoke.
- [ ] Confirmation states.
- [ ] Mutation feedback.

## News

- [ ] Article listing.
- [ ] Pagination.
- [ ] Create.
- [ ] Edit.
- [ ] Delete.
- [ ] Image upload.
- [ ] Preview.
- [ ] Form validation.
- [ ] Mutation feedback.

## UX

- [ ] Responsive.
- [ ] Keyboard accessible.
- [ ] Visible focus states.
- [ ] No blocking unnecessary animation.
- [ ] No fake data.
- [ ] No generic AI dashboard visual patterns.
- [ ] No excessive cards.
- [ ] No excessive gradients.
- [ ] No decorative UI that reduces usability.

## Quality

- [ ] Global error boundary.
- [ ] API errors handled.
- [ ] Loading states handled.
- [ ] Empty states handled.
- [ ] Destructive actions confirmed.
- [ ] Duplicate submission prevented.
- [ ] Admin routes marked `noindex`.
- [ ] Production build passes.
- [ ] Mobile layout tested.
- [ ] Desktop layout tested.

---

# 46. Final Visual Acceptance Criteria

Sebelum dianggap selesai, buka `/admin`, `/admin/members`, dan `/admin/news` lalu lakukan visual review.

Admin UI harus memenuhi kesan berikut:

> **"Internal administration system milik organisasi profesional yang sudah matang."**

Bukan:

> "Template dashboard SaaS."

Bukan:

> "AI-generated admin panel."

Bukan:

> "Public website yang diberi sidebar."

### Visual checklist

- [ ] Typography memiliki karakter.
- [ ] Hierarchy jelas.
- [ ] Whitespace terkontrol.
- [ ] Data mudah discan.
- [ ] Table terasa professional.
- [ ] Sidebar understated.
- [ ] Accent color restrained.
- [ ] Status mudah dibedakan.
- [ ] Action jelas.
- [ ] Modal tidak berlebihan.
- [ ] Animation subtle.
- [ ] Tidak ada decorative noise.
- [ ] Tidak semua element berbentuk card.
- [ ] Tidak ada gradient berlebihan.
- [ ] Tidak ada giant icons.
- [ ] Tidak ada fake analytics.
- [ ] Mobile tetap usable.

---

# 47. Implementation Instruction untuk Antigravity

Saat mengimplementasikan dokumen ini:

1. Audit struktur frontend existing sebelum mengubah component.
2. Pertahankan business flow, API contract, field, dan route yang sudah ditentukan.
3. Jangan mengarang endpoint baru tanpa kebutuhan yang jelas.
4. Jangan mengarang data baru.
5. Pisahkan admin layout dari public layout.
6. Buat reusable admin components hanya jika benar-benar dibutuhkan.
7. Gunakan TanStack Query untuk server state.
8. Gunakan RHF + Zod untuk form.
9. Implementasikan loading, empty, error, success, dan destructive states.
10. Gunakan Editorial Corporate Administration sebagai visual direction.
11. Prioritaskan usability dan information hierarchy daripada dekorasi.
12. Jangan menghasilkan visual yang terlihat seperti template AI/SaaS generik.
13. Setelah implementasi, review seluruh `/admin` area secara visual dan konsistensi responsive.
14. Jangan mengubah public-facing design hanya untuk memenuhi spesifikasi admin ini.

## Final principle

> **AISEE Admin should feel like an institutional publication system turned into a precise operational interface: editorial in character, corporate in discipline, and administrative in usability.**
