# Mural Medical Supply | اللوحة الجدارية للمستلزمات الطبية

Official enterprise web platform and B2B procurement portal for **Mural Medical Supply (اللوحة الجدارية للمستلزمات الطبية)**, a leading healthcare solutions and medical supplies provider based in Riyadh, Saudi Arabia.

---

## Overview

Mural is a specialized B2B medical supply company serving hospitals, medical centers, clinics, pharmacies, and healthcare institutions. The platform serves as the company's official bilingual digital presence and institutional procurement portal.

> **Important Domain Context:**  
> Mural is **not a standard consumer e-commerce store with an instant shopping cart or payment gateway**.  
> The purchasing flow is structured around **institutional purchase order requests and quotation inquiries**. Business clients browse verified medical equipment, specify quantities and specifications, and submit official requests for procurement and logistics fulfillment.

---

## Key Features

### 🌐 Public Portal (Bilingual EN / AR)

- **Full Internationalization (`next-intl`):** First-class support for English (`en`) and Arabic (`ar`) with native Right-to-Left (RTL) typography and layout adaptation.
- **Product Catalog & Discovery:** Categorized medical supplies, live search, faceted category filters, and detailed technical specification pages with related solutions.
- **Featured Medical Solutions:** Curated homepage showcase highlighting up to 4 premier medical supplies with responsive layout balancing.
- **B2B Purchase Order Request Workflow:** Multi-item purchase inquiry builder where institutions select products, define quantities, enter facility details, delivery locations, and attach supporting documentation.
- **International Partners Showcase:** Infinite motion scroller and directory highlighting verified OEM manufacturers and global healthcare partners.
- **Careers & Talent Portal:** Listing of open career vacancies with an online application workflow supporting CV/resume file uploads.
- **Company Profile:** Informational sections highlighting Mural’s mission, vision, clinical quality standards, and healthcare distribution network.
- **User Authentication:** Auth.js (NextAuth v5) supporting credentials (with bcrypt encryption) and Google OAuth, including email verification and secure password reset workflows.

### 🛡️ Administrative Dashboard (`/admin/dashboard`)

- **Role-Based Access Control:** Strict permission segregation between general accounts and administrators.
- **Product Management:** Full CRUD operations for medical supplies, multilingual content, technical specs, manufacturer metadata, and gallery/card image uploads.
- **Category Management:** Management of medical supply categories with image uploads and featured category toggles.
- **Banner Management:** Homepage hero slide and promotional banner manager.
- **Partner Management:** Profiles, logos, and external reference links for international manufacturing partners.
- **Purchase Order Inquiries:** Centralized tracking of incoming B2B purchase requests, facility requirements, requested line items, and uploaded documents.
- **Career Postings & Applications:** Recruitment management with job vacancy creation and applicant tracking with CV downloads.
- **User Administration:** Management of user profiles and administrative roles.

---

## Technology Stack

| Layer                    | Technology                                                                       | Details                                                             |
| :----------------------- | :------------------------------------------------------------------------------- | :------------------------------------------------------------------ |
| **Framework**            | [Next.js 16](https://nextjs.org/) (App Router)                                   | React 19, TypeScript, Server Components & Server Actions            |
| **Styling**              | [Tailwind CSS v4](https://tailwindcss.com/)                                      | Modern CSS utilities, responsive design, native RTL support         |
| **UI Components**        | [shadcn/ui](https://ui.shadcn.com/) & Radix UI                                   | Accessible, high-contrast UI primitives                             |
| **Icons**                | [Lucide React](https://lucide.dev/)                                              | Clean medical-grade icon set                                        |
| **Motion**               | [Motion](https://motion.dev/)                                                    | Subtle, high-performance entrance animations and carousels          |
| **Database & ORM**       | [PostgreSQL (Neon)](https://neon.tech/) & [Prisma ORM 7](https://www.prisma.io/) | Serverless database with strongly-typed client generation           |
| **Authentication**       | [Auth.js (NextAuth v5)](https://authjs.dev/)                                     | Credentials & Google OAuth, JWT sessions, role management           |
| **Internationalization** | [next-intl](https://next-intl-docs.vercel.app/)                                  | Locale routing (`/en`, `/ar`), JSON message bundles, RTL support    |
| **File Storage**         | [UploadThing](https://uploadthing.com/)                                          | Cloud storage for product images, banners, logos, and applicant CVs |
| **Email Delivery**       | [Resend](https://resend.com/)                                                    | Transactional emails for account verification and password resets   |
| **Forms & Validation**   | [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)        | Robust client and server-side schema validation                     |
| **Testing**              | [Vitest](https://vitest.dev/)                                                    | Unit and service-level test suite                                   |

---

## Architecture & Conventions

### 1. Server-First Next.js Architecture

- The application uses Next.js as a unified full-stack solution.
- **No separate REST API layer:** Backend business logic is organized under `server/<entity>/` and invoked directly by Server Components and Server Actions.
  ```text
  server/
  └── products/
      ├── services.ts    # Database access & business logic (Prisma)
      ├── validators.ts  # Centralized Zod validation schemas
      └── types.ts       # Domain & service TypeScript definitions
  ```
- Preferred data flow:
  ```text
  UI / Form  →  Server Action  →  server/<entity>/services.ts  →  Prisma  →  PostgreSQL
  ```

### 2. Design System & Visual Identity

- **Brand Colors:**
  - Primary Teal: `#0b8b99`
  - Secondary Navy: `#062b56`
- **Three-Background System on Public Pages:**
  - `bg-[#062b56]` (Dark Navy): Hero and prominent call-to-action sections.
  - `bg-white` (Pure White): Main content sections.
  - `bg-[#f0fafb]` (Teal Wash): Supporting content sections and featured blocks.
- **Public Page Alignment:** Section headings, descriptions, badges, and action rows are center-aligned.
- **Typography:** Sentence case is used across titles and labels (avoiding ALL CAPS and unnecessary Title Case).

### 3. Brand Naming Rules

- **English:** **Mural**
- **Arabic:** **اللوحة الجدارية للمستلزمات الطبية**
- _Do not_ transliterate or translate "Mural" into "ميرال". Always use the official name: **اللوحة الجدارية للمستلزمات الطبية**.

### 4. Featured Products Limit

- The database enforces a maximum of **4 featured products** on the homepage (`MAXIMUM_FEATURED_PRODUCTS_REACHED`). The homepage grid dynamically scales and balances whether 1, 2, 3, or 4 items are active.

---

## Project Structure

```text
Mural-Website/
├── app/
│   ├── [locale]/               # Public localized routes (en/ar)
│   │   ├── (auth)/             # Authentication pages (login, register, reset)
│   │   ├── about/              # About Mural & partner scroller
│   │   ├── careers/            # Careers list & job details
│   │   ├── categories/         # Category catalog
│   │   ├── partners/           # Partner grid & brand profiles
│   │   ├── products/           # Product listing, filtering & details
│   │   ├── submit-application/ # Job application form with CV upload
│   │   ├── submit-purchase-request/ # B2B purchase order request form
│   │   └── page.tsx            # Localized homepage
│   ├── admin/                  # Admin authentication & dashboard
│   │   └── dashboard/          # Products, categories, banners, orders, etc.
│   └── api/                    # API route handlers (UploadThing, Auth.js)
├── components/
│   ├── common/                 # Reusable buttons, navbar, footer, modals
│   ├── home/                   # Homepage sections (Hero, Featured, About, etc.)
│   ├── products/               # Product cards, grid, filters, details
│   ├── dashboard/              # Admin dashboard data tables, forms & dialogs
│   └── ui/                     # shadcn/ui primitives
├── lib/                        # Prisma client, auth config, helpers & constants
├── messages/                   # Translation dictionaries (en.json, ar.json)
├── prisma/                     # Database schema definition
├── server/                     # Domain services, validators, and backend types
└── types/                      # Shared application types
```

---

## Getting Started

### Prerequisites

- **Node.js:** v20.x or higher
- **Package Manager:** npm (or pnpm / yarn)
- **PostgreSQL Database:** A hosted PostgreSQL instance (e.g. [Neon](https://neon.tech/)) or a local database.

### 1. Clone the Repository

```bash
git clone https://github.com/muralmsjo-hub/Mural-Website.git
cd Mural-Website
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Copy the example environment file and fill in your credentials:

```bash
cp .env.example .env
```

| Variable                       | Description                       | Example / Default                                |
| :----------------------------- | :-------------------------------- | :----------------------------------------------- |
| `DATABASE_URL`                 | PostgreSQL connection string      | `postgresql://user:pass@host/db?sslmode=require` |
| `AUTH_SECRET`                  | NextAuth secret key               | Generated via `openssl rand -hex 32`             |
| `APP_NAME`                     | Website name                      | `Mural`                                          |
| `NEXT_PUBLIC_APP_URL`          | Public site URL                   | `http://localhost:3000`                          |
| `API_URL`                      | Internal API URL                  | `http://localhost:3000`                          |
| `UPLOADTHING_TOKEN`            | UploadThing API token             | From UploadThing dashboard                       |
| `UPLOADTHING_SECRET`           | UploadThing secret key            | From UploadThing dashboard                       |
| `UPLOADTHING_APP_ID`           | UploadThing app ID                | From UploadThing dashboard                       |
| `GOOGLE_CLIENT_ID`             | Google OAuth client ID (optional) | From Google Cloud Console                        |
| `GOOGLE_SECRET`                | Google OAuth secret (optional)    | From Google Cloud Console                        |
| `RESEND_API_KEY`               | Resend API key for emails         | `re_...`                                         |
| `ADMIN_EMAIL`                  | Default administrator email       | `admin@mural.com`                                |
| `NEXT_PUBLIC_CONTACT_EMAIL`    | Display contact email             | `info@mural.com`                                 |
| `NEXT_PUBLIC_CONTACT_PHONE`    | Display contact phone             | `+9xx xx xxx xxxx`                               |
| `NEXT_PUBLIC_CONTACT_LOCATION` | Display office location           | `City, Country`                                  |

### 4. Initialize Database & Prisma Client

Generate the Prisma Client and sync the schema with your database:

```bash
npx prisma generate
npx prisma db push
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The default localized redirect will take you to `/en` or `/ar`.

---

## Available Scripts

| Command              | Description                                              |
| :------------------- | :------------------------------------------------------- |
| `npm run dev`        | Starts the Next.js development server with hot-reload    |
| `npm run build`      | Builds the application for production deployment         |
| `npm run start`      | Starts the production server                             |
| `npm run lint`       | Runs ESLint to check for code style and syntax issues    |
| `npm test`           | Runs the Vitest test suite                               |
| `npm run test:watch` | Runs Vitest in interactive watch mode                    |
| `npx prisma studio`  | Opens the visual database management GUI in your browser |
| `npx prisma db push` | Pushes the schema state directly to the database         |

---

## License & Organization

Copyright © 2026 **Mural Medical Supply (اللوحة الجدارية للمستلزمات الطبية)**. All rights reserved.
