---
name: mural-domain
description: Use when developing or modifying functionality related to Mural's business domain, customers, products, purchase order requests, company information, careers, user interactions, or language requirements. Provides the business context and terminology that should guide Mural website development.
---

# Mural Domain

## Overview

Mural is a medical supplies company. Its website serves as the company's official digital profile and provides information about the company, its medical products and solutions, international partners, areas of expertise, and career opportunities.

The website should represent Mural as a professional and credible company operating in the medical supplies sector, with strong relationships with leading international companies.

The platform serves both informational and B2B purposes.

---

## Website Purpose

The website should:

* Present Mural and its areas of expertise.
* Provide information about the company's medical products and solutions.
* Showcase international partners.
* Allow visitors to explore available medical supplies.
* Provide product information and specifications.
* Allow business customers to submit B2B purchase order requests.
* Provide information about career opportunities.
* Provide an accessible digital presence for healthcare and business audiences.

The website is **not an online payment/ecommerce checkout platform**.

The B2B purchasing functionality is based on purchase order requests and quotation inquiries.

---

## Target Audiences

The website should provide a clear and easy-to-navigate experience for:

* Healthcare professionals
* Hospitals
* Clinics
* Pharmacies
* Medical institutions
* Other healthcare organizations
* Potential customers
* Business partners
* Job applicants
* General visitors seeking information about Mural

Not every visitor is necessarily a purchasing customer.

B2B purchase order requests are intended for businesses, healthcare organizations, medical institutions, and other organizations that need to purchase Mural's products.

---

## Products and Services

The website provides a structured product section for Mural's medical supplies and solutions.


Products can be organized into categories so visitors can browse and discover relevant medical supplies and solutions.

The product section should support:

* Product listing
* Product details
* Product search
* Product filtering
* Related products

---

## B2B Purchase Order Request

Mural provides a B2B purchase order request process through the website.

Business customers can:

1. Select products they are interested in.
2. Specify the required quantities.
3. Submit a structured purchase order request.

The system represents a **purchase order request and quotation inquiry**, not a direct ecommerce purchase.

### Important distinction

Do not treat the B2B purchase order request as a standard online checkout.

The website does **not** provide an online payment flow for these requests.

---

## Customer Interaction

The general website experience should allow visitors to:

* Learn about Mural.
* Explore products and categories.
* Search and filter products.
* View product details and specifications.
* Discover related products.
* Learn about Mural's partners and expertise.
* Explore career opportunities.

For B2B customers, the website additionally provides a way to submit purchase order requests for selected products and quantities.

---

## Language Requirements

The website must be fully available in:

* English
* Arabic

Both languages should be treated as first-class languages throughout the website.

User-facing content should support both languages, including:

* Navigation
* Product information
* Product descriptions
* Product specifications
* Forms
* Purchase order request flow
* Validation and error messages
* Company information
* Career-related content
* Other user-facing website content

When implementing a feature that introduces user-facing text, consider both English and Arabic versions.

---

## Domain Terminology

Use terminology that reflects Mural's B2B medical-supplies context.

### Preferred concepts

* Medical supplies
* Medical products
* Healthcare solutions
* Healthcare professionals
* Medical institutions
* Business customers
* Organizations
* Purchase order request
* Quotation inquiry
* Product availability
* Quantity
* International partners
* Areas of expertise

### Ecommerce distinction

The website is based on an existing ecommerce codebase, but Mural's business model should take precedence over assumptions inherited from the original ecommerce application.

When existing ecommerce concepts do not accurately represent Mural's business process, adapt the terminology and behavior to the Mural domain.

In particular:

* A purchase order request is not the same as an immediate ecommerce purchase.
* A quotation inquiry is not an online payment transaction.
* A business customer is not necessarily a typical B2C shopper.
* Submitting a purchase request does not necessarily mean that the transaction is completed.
* Product selection and quantity specification are part of the inquiry/request process.

---

## Domain Decision Rule

When implementing or modifying a feature, use Mural's business requirements as the source of truth.

If behavior inherited from the original ecommerce application conflicts with the Mural domain described in this Skill, do not assume that the ecommerce behavior should remain unchanged.

## Instead, determine how the functionality should work in the Mural B2B medical context.

## Out of Scope for This Skill

This Skill describes Mural's business and domain context.

It does not define:

* Technical architecture
* Coding conventions
* Database architecture
* UI component conventions
* Brand colors or visual design rules
* Authentication implementation
* Deployment configuration

Those concerns should be documented separately when needed.


### Brand Naming Rule

* The official brand name in **English** is: **Mural**
* The official brand name in **Arabic** is: **اللوحة الجدارية للمستلزمات الطبية**
* **Do not** transliterate or translate "Mural" into **ميرال**.
* Whenever the Arabic version of the brand/company name is displayed, use exactly:
  **اللوحة الجدارية للمستلزمات الطبية**
* Follow the correct language version based on the current locale:

  * English (`en`): **Mural**
  * Arabic (`ar`): **اللوحة الجدارية للمستلزمات الطبية**
* Keep the Arabic brand name consistent across the homepage, navigation, footer, metadata, headings, descriptions, and any other user-facing content.
* Do not invent alternative Arabic names or abbreviations unless they already exist in the project.

