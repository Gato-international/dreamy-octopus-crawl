# Changelog

All notable changes to this project will be documented in this file. This log provides a comprehensive history of the project's development from its inception to the current version.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] - 2024-07-26

This version marks the initial stable release of the Fragancao marketing website. It includes a full suite of features for showcasing the product, attracting partners, and providing contact methods, all supported by a modern tech stack and backend services.

### Added

#### **Core Application & Structure**
- **Initial Project Setup**: Scaffolding with Vite, React, and TypeScript for a modern, fast development experience.
- **Styling Foundation**: Integrated Tailwind CSS for utility-first styling and `shadcn/ui` for a comprehensive, accessible component library.
- **Routing**: Implemented `react-router-dom` to create a multi-page application structure, with routes defined in `App.tsx`.
- **Main Layout**: Created a consistent site structure with `MainLayout.tsx`, including a shared `Header`, `Footer`, and an animated background effect.
- **Mobile Navigation**: Added a dedicated `MobileNav.tsx` component using a dock-style menu for an improved user experience on smaller devices.

#### **Homepage (`pages/Index.tsx`)**
- **Loading Animation**: Implemented an initial loading screen (`Loader.tsx`) with a logo and shader animation to create a polished first impression.
- **Hero Section**: Designed a dynamic, full-screen video hero section (`NewHeroSection.tsx`) to immediately capture user attention.
- **Informational Sections**:
  - `WhatIsItSection.tsx`: Explains the product with text and imagery.
  - `HowItWorksSection.tsx`: A step-by-step visual guide to using the machine.
  - `SpecsSection.tsx`: An interactive section with a toggle to view machine specifications and metrics.
  - `BenefitsSection.tsx`: Highlights the advantages for partners using card-based layouts.
- **Animated CTA**: Added a final, animated hero section (`components/ui/animated-hero.tsx`) at the bottom of the page to drive engagement.

#### **Additional Pages**
- **Pricing Page (`pages/Pricing.tsx`)**: A detailed page outlining partnership tiers (Placement, Franchise, Enterprise) and direct purchase options.
- **Contact Page (`pages/Contact.tsx`)**: A comprehensive contact page featuring a functional contact form (`ContactForm.tsx`) and direct contact details.
- **Not Found Page (`pages/NotFound.tsx`)**: A user-friendly 404 page to handle invalid routes.

#### **Backend & Integrations (Supabase)**
- **Supabase Client**: Configured the Supabase client (`integrations/supabase/client.ts`) for seamless connection to backend services.
- **Contact Form Functionality**:
  - Created a Supabase Edge Function (`supabase/functions/send-email`) to process contact form submissions.
  - Integrated the `Resend` API for reliable email delivery to the site administrator.
- **Callback Request Feature**:
  - Implemented a "Request a Call Back" form in the site footer.
  - Created a `callback_requests` table in the Supabase database to store submissions.
  - Enabled public insert permissions with Row Level Security on the table.

#### **Key Features & UX**
- **Internationalization (i18n)**:
  - Integrated `i18next` to support multiple languages.
  - Provided complete translation files for English (`en`) and Dutch (`nl`).
  - Added a `LanguageSwitcher` component to the header for easy language selection.
- **Toast Notifications**: Implemented `sonner` to provide users with real-time feedback on form submissions (e.g., "Sending...", "Success!", "Error.").
- **SEO & Metadata**: Used `react-helmet-async` to manage page titles and meta descriptions for improved SEO on all pages.

#### **Project Governance & Documentation**
- **Comprehensive README**: Wrote a detailed `README.md` with information on the tech stack, setup instructions, and backend configuration.
- **Detailed License**: Implemented the Apache License 2.0 in the `LICENSE` file for clear legal guidelines.
- **Changelog**: Created this `CHANGELOG.md` file to track the project's history.

### Changed
- **License Enhancement**: Upgraded the project license from a basic MIT License to the more comprehensive and detailed Apache License 2.0 to provide explicit legal terms.

### Fixed
- **UI Loading Transition**: Eliminated a jarring white flash that occurred after the initial loader. This was resolved by applying a persistent background color to the `<body>` tag in `src/globals.css`, ensuring a smooth visual transition.