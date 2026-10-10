---

name: mural-technology
description: Use when developing, modifying, reviewing, or debugging Mural's application code. Defines the project's technology stack, full-stack Next.js architecture, Server Action and server-layer patterns, validation, authentication, data fetching, component boundaries, styling, and implementation conventions.
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

# Mural Technology

## Technology Stack

Mural is a full-stack Next.js application.

Core technologies:

* Next.js 16.2.10
* Next.js App Router
* TypeScript
* React
* PostgreSQL
* Neon
* Prisma
* Tailwind CSS
* shadcn/ui
* React Hook Form
* Zod
* Auth.js
* next-intl
* UploadThing
* Resend
* Lucide

---

# Application Architecture

## Next.js Full-Stack

Next.js is used as the full-stack framework.

The application does not use a separate backend application or REST API layer.

Backend functionality is implemented inside the Next.js project using Server Actions and the `server` directory.

Do not introduce API routes or a separate backend architecture unless explicitly requested.

---

# Server Architecture

All backend/domain code is organized under the root `server` directory.

Each database entity has its own folder.

Example:

```text
server/
└── products/
    ├── services.ts
    ├── validators.ts
    └── type.ts
```

The same structure should be followed when adding backend functionality for another entity.

### Responsibilities

#### `services.ts`

Contains the server-side business/data-access logic for the entity.

Database operations and reusable backend logic should be implemented here rather than duplicated across components or Server Actions.

#### `validators.ts`

Contains Zod schemas used to validate data related to the entity.

Validation should be defined centrally and reused where appropriate.

#### `type.ts`

Contains TypeScript types related to the entity's server-side functionality.

Keep entity-specific types close to the entity rather than creating unnecessary global types.

---

# Server Actions

Server Actions are the application's backend entry point for mutations and server-side operations initiated by the UI.

The project does not use REST API endpoints for these operations.

Preferred pattern:


Client Component / Form
        ↓
Server Action
        ↓
server/<entity>/services.ts
        ↓
Prisma
        ↓
PostgreSQL

Server Actions should remain focused on receiving the request, validating input, handling authorization where required, calling the appropriate service, and returning an appropriate result.

Business and database logic should not be unnecessarily duplicated inside Server Actions when it belongs in the entity service.

---

# Data Fetching

The application does not use TanStack Query.

Prefer server-side data fetching through Server Components.

Preferred read pattern:

Server Component
        ↓
server/<entity>/services.ts
        ↓
Prisma
        ↓
PostgreSQL

Use Server Components for data fetching whenever possible.

Do not introduce client-side data-fetching libraries when the data can be fetched directly on the server.

---

# Server and Client Components

Prefer Server Components by default.

Use `"use client"` only when client-side functionality is actually required, such as:

* Client-side interactivity
* React state
* Event handlers requiring client execution
* Browser APIs
* React Hook Form
* Other functionality that requires the client runtime

Do not add `"use client"` to components unnecessarily.

Keep the client boundary as small as practical.

---

# Prisma and Database

Prisma is the ORM used for database access.

The project uses PostgreSQL hosted on Neon.

The Prisma-related files are located in the root `prisma` directory.

Example:

prisma/
├── schema.prisma

generated/


Use the existing Prisma setup and generated client.

Database access should generally be performed through the appropriate entity service rather than directly from UI components.

Do not introduce another ORM or database access library.

---

# Validation

Zod is used for both backend and frontend validation.

Validation should not exist only on the client.

User-provided or externally received data must also be validated on the server.

Preferred pattern:

Frontend
    ↓
React Hook Form
    ↓
Zod
    ↓
Server Action
    ↓
Zod server validation
    ↓
Service
    ↓
Prisma

Reuse appropriate Zod schemas when possible instead of creating duplicate validation rules.

Client-side validation improves the user experience, but server-side validation remains authoritative.

---

# Forms

React Hook Form is the standard form-management library.

Use React Hook Form for application forms rather than manually managing complex form state.

Use Zod schemas for form validation.

Prefer the existing project's form patterns and reusable components before introducing a new form architecture.

---

# Authentication

Authentication is implemented using Auth.js.

The application supports two authentication methods:

1. Credentials
2. Google

Authentication and authorization logic should use the existing Auth.js implementation.

Do not introduce another authentication system or duplicate authentication mechanisms.

Backend/server-side operations must respect the existing authentication and authorization rules.

---

# Internationalization

The application uses `next-intl`.

Mural is a bilingual website supporting:

* English
* Arabic

New user-facing functionality should account for both languages.

Do not hardcode user-facing text when the project's internationalization architecture provides a translation mechanism.

Arabic support includes the project's RTL requirements where applicable.

---

# UI Components

The project uses shadcn/ui for UI components.

When an appropriate shadcn component already exists:

1. Use it instead of creating a duplicate component.
2. Customize the existing component when necessary.
3. Preserve the project's existing component patterns.

Do not introduce another UI component library without an explicit reason.

---

# Styling

Tailwind CSS is the primary styling solution.

Use Tailwind classes for component and page styling.

Do not introduce another CSS framework.

Avoid custom CSS unless it is genuinely necessary and cannot be handled cleanly with the existing Tailwind/shadcn approach.

When custom styling is required, first check whether the existing design system, Tailwind utilities, or shadcn component customization can achieve the desired result.

---

# Icons

Lucide is used for icons.

Prefer Lucide icons over introducing another icon library.

Reuse existing icon patterns and sizing conventions used throughout the application.

---

# File Uploads

UploadThing is used for file uploads.

Use the existing UploadThing implementation and utilities when implementing upload functionality.

Do not introduce another file-upload service unless explicitly requested.

---

# Email

Resend is used for application emails.

Use the existing Resend integration for email-related functionality.

Do not introduce another email provider for functionality that can be handled by the existing Resend setup.

---

# General Implementation Principles

When implementing a new feature:

1. Inspect the existing implementation patterns first.
2. Reuse existing utilities, components, services, and schemas when appropriate.
3. Follow the existing entity-based `server` structure.
4. Use Server Actions instead of creating API endpoints.
5. Put reusable backend/business logic in the appropriate service.
6. Validate input with Zod on the server.
7. Prefer Server Components for data fetching.
8. Use Client Components only where client-side behavior is required.
9. Use shadcn/ui for appropriate UI components.
10. Use Tailwind CSS for styling.
11. Respect English/Arabic internationalization.
12. Reuse existing authentication, upload, email, and database infrastructure.
13. Avoid introducing new dependencies when the existing stack already provides the required functionality.

---

# Avoid

Do not:

* Create REST API routes for functionality that should use Server Actions.
* Introduce TanStack Query for data fetching.
* Create a separate backend application.
* Put database logic directly into UI components.
* Duplicate business logic across Server Actions.
* Skip server-side validation.
* Use `"use client"` unnecessarily.
* Create duplicate UI components when an appropriate shadcn component exists.
* Introduce another CSS framework.
* Introduce another ORM.
* Introduce another authentication system.
* Introduce another upload or email provider without an explicit requirement.
* Ignore Arabic/English requirements when adding user-facing functionality.

---

# Implementation Priority

When deciding how to implement something, prefer the following order:

1. Existing Mural implementation/pattern
2. Existing project utility or shared component
3. Existing technology in the Mural stack
4. A new implementation only when the existing architecture cannot reasonably support the requirement

The goal is to extend the existing Mural architecture consistently rather than introducing unnecessary patterns or technologies.
