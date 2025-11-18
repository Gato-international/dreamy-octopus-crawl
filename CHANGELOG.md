# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-07-26

### Added
- **Project Documentation**: Created a comprehensive `README.md` file. This includes a detailed breakdown of the tech stack, step-by-step installation instructions, environment variable setup, and a guide for configuring backend services (Supabase and Resend).
- **License File**: Added a detailed `LICENSE` file (Apache License 2.0) to clearly define the permissions, limitations, and conditions for using, modifying, and distributing the software.
- **Changelog**: Implemented this `CHANGELOG.md` to provide a clear and organized history of all notable changes to the project.

### Fixed
- **UI Loading Transition**: Eliminated a jarring white flash that appeared between the initial loading animation and the main site content. The fix involved setting a persistent background color on the `<body>` element in `src/globals.css`, ensuring a smooth and seamless visual transition for users.

### Changed
- **License Enhancement**: Upgraded the project license from the standard MIT License to the more comprehensive and detailed Apache License 2.0, as requested, to provide more explicit legal terms.

### Initial Project
- The initial version of the Fragancao marketing website was established, featuring a complete setup with React, TypeScript, Tailwind CSS, and shadcn/ui.
- Core functionalities included multiple pages (Home, Pricing, Contact), internationalization (i18n), and backend integration with Supabase for database storage and serverless Edge Functions for handling form submissions via Resend.