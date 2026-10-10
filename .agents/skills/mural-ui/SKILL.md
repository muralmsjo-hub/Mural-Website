---
name: mural-ui
description: Defines UI design conventions for building Mural interfaces that follow the project's visual style, brand identity, content presentation, and component guidelines.
---

---

# Mural UI

## Brand Identity

The `resources/mural-logo.pdf` file contains the official Mural logo.

Use it as a visual reference when working on branding and UI.

The brand uses:

- Primary color: #0b8b99
- Secondary color: #062b56

Use these brand colors consistently throughout the interface. Avoid introducing arbitrary colors that conflict with the established brand identity.

---

## Visual Style

Mural's visual style should be:

- Formal
- Professional
- Official
- Modern
- Clean
- Trustworthy
- Healthcare-focused

The interface should reflect the credibility and professional nature of a medical supplies company and its B2B audience.

Avoid designs that feel overly playful, casual, childish, or like a typical consumer-focused ecommerce website.

Prioritize clarity, readability, consistency, and professional presentation over unnecessary visual effects.

---

## Content and Typography

### Use sentence case

Use sentence case for headings, labels, buttons, navigation items, and other user-facing text.

Good:

Our vision
Our products
Medical supplies
Related products
Submit purchase request

Avoid unnecessary uppercase text:

OUR VISION
OUR PRODUCTS
MEDICAL SUPPLIES
RELATED PRODUCTS
SUBMIT PURCHASE REQUEST

Do not use ALL CAPS as a way to create emphasis.

Use typography, font weight, size, spacing, and visual hierarchy to emphasize important content instead.

### Avoid unnecessary title case

Prefer natural sentence case for general UI text.

Good:

Medical products
Purchase order request
International partners
Areas of expertise

Avoid:

Medical Products
Purchase Order Request
International Partners
Areas Of Expertise

unless the text is a proper name or the existing design system specifically requires title case.

---

## Visual Hierarchy

Use clear visual hierarchy to distinguish:

- Page titles
- Section headings
- Subheadings
- Body content
- Labels
- Supporting information
- Primary and secondary actions

Important information should be easy to identify without making the interface visually noisy.

Do not rely on ALL CAPS, excessive colors, or excessive font weights to establish hierarchy.

---

## Consistency

Maintain consistency across the website in:

- Typography
- Font sizes
- Font weights
- Spacing
- Border radius
- Shadows
- Buttons
- Form controls
- Cards
- Tables
- Icons
- Colors

When an existing component or pattern already establishes a visual convention, reuse it instead of creating a visually different version without a clear reason.

---

## Medical and B2B Context

The website represents a professional medical supplies company.

UI decisions should therefore support a sense of:

- Trust
- Reliability
- Professionalism
- Clarity
- Experience
- Credibility

Avoid unnecessary decorative elements or visual effects that make the website feel like a casual consumer ecommerce store.

Visual design should support the content rather than compete with it.

---

## Arabic and English

The website supports both Arabic and English.

UI components must work correctly in both LTR and RTL layouts.

When creating or modifying components:

- Consider text expansion between languages.
- Do not assume text always flows from left to right.
- Ensure icons and directional elements behave correctly in RTL.
- Avoid fixed layouts that break when Arabic text is longer or differently shaped.
- Test important layouts with both languages when appropriate.

Arabic should be treated as a first-class language rather than an afterthought.

---

## Responsive Design

Interfaces should work across:

- Desktop
- Tablet
- Mobile

Do not design only for desktop and attempt to make the result responsive afterward.

Consider responsive behavior when creating each component and page.

---

## UI Components

Follow the project's existing component system.

When an appropriate existing component is available:

1. Reuse it.
2. Customize it when necessary.
3. Avoid creating a duplicate component with the same purpose.

Maintain a consistent visual language throughout the website.

---

## Design Decisions

When making UI decisions, prefer:

1. Existing Mural design patterns
2. Existing shared components
3. Established Mural brand guidelines
4. Clear and accessible UI patterns
5. New visual patterns only when they are genuinely required

The goal is to create a cohesive Mural website rather than a collection of independently designed pages.

## Motion & Animation

Use motion intentionally to enhance the user experience, not as decoration.

- Prefer CSS transitions for simple hover, focus, and state changes.
- Prefer Motion for React component animations such as:
  - entrance animations
  - staggered content reveals
  - modal/dialog transitions
  - subtle card interactions
  - layout transitions
- Use GSAP only when advanced animation control is genuinely needed, such as:
  - complex timelines
  - scroll-driven sequences
  - coordinated multi-element animations
- Avoid excessive animations, bouncing effects, flashy transitions, and constant motion.
- Keep animations subtle, professional, and appropriate for a medical B2B company.
- Respect `prefers-reduced-motion`.
- Do not animate every element on the page.
- Animations should support hierarchy and guide attention rather than distract from content.

---

## Public Pages Layout

These styling rules apply to **all public/non-admin pages** of the website, including:

- Home
- About
- Products
- Product Details
- Careers
- Any other customer-facing/public pages

They do **not** apply to admin/dashboard pages.

### Text Alignment

All section headings, descriptions, badges, and body text on public pages must be **center-aligned**.

Do not use left or right alignment for public page section content. Use `text-center` and center the content container with `mx-auto`.

This applies to:

- Section badges
- Section headings (`h1`, `h2`, `h3`)
- Section description paragraphs
- Supporting text
- Other section-level textual content

Button groups and action rows should also be centered using `justify-center`.

### Three-Background System

All public pages should use exactly **three background types** to maintain a consistent visual identity and create visual rhythm between sections.

| Type          | Value                          | Usage                                                                                        |
| ------------- | ------------------------------ | -------------------------------------------------------------------------------------------- |
| **Dark**      | `bg-[#062b56]` gradient (navy) | Hero sections, CTA sections, and other intentionally prominent dark sections with white text |
| **White**     | `bg-white`                     | Main content sections and clean neutral sections                                             |
| **Teal wash** | `bg-[#f0fafb]`                 | Supporting/content sections that need subtle visual separation                               |

Alternate between these background types across sections where appropriate to create visual rhythm and separation.

Do **not** introduce additional background colors or ad-hoc greys such as `bg-slate-50`, `bg-slate-100`, etc. for public pages.

Use only these three background systems unless a specific component requires a different color for a functional reason.

### Scope

These rules are **global design rules for the public website**, not rules specific to the Home page.

Apply them consistently across all non-admin pages while adapting the section structure and content to each page.
