# Fragancao Website

![Fragancao Logo](/public/Fragancao-Logo-TEXT-TRANSPARANT.png)

Welcome to the official repository for the Fragancao marketing website. This project is a modern, responsive, and performant web application designed to showcase Fragancao's luxury perfume vending machines and attract potential partners.

## Table of Contents

- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [Backend Services Setup](#backend-services-setup)
  - [Supabase (Database & Edge Functions)](#supabase-database--edge-functions)
  - [Resend (Transactional Emails)](#resend-transactional-emails)
- [Project Structure](#project-structure)
- [License](#license)

## Tech Stack

This project is built with a modern, robust, and scalable technology stack:

- **Framework**: [React](https://reactjs.org/) (via [Vite](https://vitejs.dev/))
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Internationalization**: [i18next](https://www.i18next.com/)
- **Forms**: [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/) for validation
- **Backend-as-a-Service**: [Supabase](https://supabase.io/)
  - **Database**: Storing callback requests.
  - **Edge Functions**: Serverless function for handling contact form submissions.
- **Email Service**: [Resend](https://resend.com/) for sending emails via the edge function.

## Getting Started

Follow these instructions to get the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [npm](https://www.npmjs.com/) or any other package manager like [Yarn](https://yarnpkg.com/) or [pnpm](https://pnpm.io/).

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd <repository-folder>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

### Environment Variables

This project requires environment variables to connect to Supabase. Create a file named `.env` in the root of the project and add the following variables.

**Note:** The Supabase client is already configured in `src/integrations/supabase/client.ts`. You just need to provide the credentials below.

```
# .env

# Get these from your Supabase project dashboard > Project Settings > API
VITE_SUPABASE_URL="https://oqhvemhomwksenicoktf.supabase.co"
VITE_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xaHZlbWhvbXdrc2VuaWNva3RmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMxNjcwNTksImV4cCI6MjA3ODc0MzA1OX0.SsIwES8kEI84V2XGe9VNAhFtrgvEjqjn467CG34WbWQ"
```

### Running the Development Server

Once the installation is complete and the environment variables are set, you can start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:8080`.

## Backend Services Setup

The website relies on Supabase and Resend for its backend functionality.

### Supabase (Database & Edge Functions)

The Supabase project is already configured with the necessary database tables and an edge function.

-   **Database Tables**:
    -   `callback_requests`: Stores phone numbers submitted through the footer form for a callback.
    -   `pricing_tiers`, `site_config`, `testimonials`: Content tables for the website.
-   **Edge Function**:
    -   `send-email`: Located in `supabase/functions/send-email`, this function handles the logic for the contact form. It uses the Resend API to forward form submissions to the admin email address.

**IMPORTANT: Setting Up Secrets**

For the `send-email` function to work, it needs an API key from Resend. This must be configured as a secret in your Supabase project.

1.  Navigate to your [Supabase Project Dashboard](https://app.supabase.com/).
2.  Go to the **Edge Functions** section from the left sidebar.
3.  Select the `send-email` function.
4.  Click on the **Secrets** tab.
5.  Click **Add new secret** and create a secret with the following details:
    -   **Name**: `RESEND_API_KEY`
    -   **Value**: Your API key from Resend (see instructions below).

### Resend (Transactional Emails)

The contact form uses Resend to send emails.

1.  **Create a Resend Account**: If you don't have one, sign up at [resend.com](https://resend.com/).
2.  **Verify Your Domain**: To send emails from your domain (e.g., `info@fragancao.com`), you must add and verify your domain in the Resend dashboard.
3.  **Generate an API Key**:
    -   Go to the **API Keys** section in your Resend dashboard.
    -   Click **Create API Key**.
    -   Give it a name (e.g., `Fragancao Website`) and set permissions to **Full access**.
    -   Copy the generated API key.
4.  **Add the API Key to Supabase**: Use the copied key as the value for the `RESEND_API_KEY` secret in your Supabase project, as described in the section above.

## Project Structure

The codebase is organized to be clean, maintainable, and easy to navigate.

```
/
├── public/                  # Static assets, fonts, and i18n translation files
├── src/
│   ├── components/          # Reusable React components (UI, layout, sections)
│   ├── hooks/               # Custom React hooks
│   ├── integrations/        # Third-party service integrations (e.g., Supabase client)
│   ├── lib/                 # Utility functions
│   ├── pages/               # Page components corresponding to routes
│   ├── App.tsx              # Main application component with routing setup
│   └── main.tsx             # Application entry point
├── supabase/
│   └── functions/           # Supabase Edge Functions
│       └── send-email/
│           └── index.ts     # Logic for the contact form emailer
└── README.md                # This file
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.