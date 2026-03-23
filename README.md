# Gujarat Tourism Platform

Customer-facing travel discovery app and admin dashboard for Gujarat, India — built with Angular 21.

## Tech Stack

- **Framework**: Angular 21 (standalone components, zoneless-ready)
- **Styling**: SCSS with CSS custom properties design system
- **Icons**: Feather Icons (via angular-feather)
- **Fonts**: Cormorant Garamond + DM Sans (Google Fonts)
- **HTTP**: Angular HttpClient with JWT interceptor

## Project Structure

```
src/
├── app/
│   ├── admin/                     # Admin dashboard (auth-gated)
│   │   ├── dashboard/             # Stats overview
│   │   ├── login/                 # Admin login
│   │   ├── places/                # Place list + create/edit form
│   │   └── shared/admin-layout/   # Sidebar shell
│   ├── core/
│   │   ├── guards/                # Auth route guard
│   │   ├── interceptors/          # JWT auth interceptor
│   │   └── services/              # AuthService, PlacesService
│   ├── customer/                  # Public-facing pages
│   │   ├── home/                  # Hero + featured + categories
│   │   ├── place-list/            # Searchable/filterable grid
│   │   └── place-detail/          # Image gallery + description
│   └── shared/
│       ├── components/            # Navbar, Footer, PlaceCard
│       ├── icons.module.ts        # Feather icon module
│       └── models/                # TypeScript interfaces
├── environments/
│   ├── environment.ts             # Development config
│   └── environment.prod.ts        # Production config
└── styles.scss                    # Global design tokens + resets
```

## Getting Started

### Prerequisites

- Node.js 18+
- Angular CLI 21: `npm install -g @angular/cli`
- The [Gujarat Tourism API](https://github.com/hritikutekar/gujarat-tourism-api) running locally

### 1. Clone the repository

```bash
git clone git@github.com:hritikutekar/gujarat-tourism.git
cd gujarat-tourism
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure the API URL

Open `src/environments/environment.ts` and set your API base URL:

```ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
};
```

For a production build, update `src/environments/environment.prod.ts` with your deployed API URL.

### 4. Run the development server

```bash
ng serve
```

The app will be available at `http://localhost:4200`.

### 5. Build for production

```bash
ng build
```

Output is placed in `dist/gujarat-tourism/`.

## Admin Access

Navigate to `http://localhost:4200/admin/login` and log in with the credentials configured in the API's `.env` file (`ADMIN_USERNAME` / `ADMIN_PASSWORD`).

From the admin panel you can:
- Add, edit, and delete tourist destinations
- Upload multiple images per destination
- Add a Google Maps link per destination
- Filter and browse all places

## Design System

All spacing, colours, and typography are driven by CSS custom properties defined in `src/styles.scss`:

| Token             | Value                          | Usage                        |
|-------------------|--------------------------------|------------------------------|
| `--page-margin`   | `clamp(1.5rem, 6vw, 5rem)`    | Consistent horizontal margins |
| `--brown`         | `#1C1511`                      | Primary dark colour           |
| `--sienna`        | `#C4571A`                      | Accent / CTA colour           |
| `--gold`          | `#D4A853`                      | Highlight / badge colour      |
| `--ivory`         | `#FAF7F2`                      | Background                    |
| `--font-display`  | Cormorant Garamond             | Headings                      |
| `--font-body`     | DM Sans                        | Body text                     |
