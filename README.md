# Fragancao - Luxury Automated Fragrance Vending

![Fragancao Logo](/public/Fragancao-Logo-TEXT-TRANSPARANT.png)

**Where Luxury Meets Innovation.**

Fragancao is a modern, elegant, and fully responsive website for a luxury automated fragrance vending machine business. It's designed to attract partners and showcase the product's unique value proposition. The application is built with a modern tech stack, ensuring a fast, scalable, and maintainable codebase.

---

### 📸 Screenshots

| Hero Section | How It Works |
| :---: | :---: |
| *![Screenshot of the website's hero section with a video background and slogan.](./docs/screenshot-hero.png)* | *![Screenshot of the 'How It Works' section with four steps.](./docs/screenshot-howitworks.png)* |

| Specs Section | Contact Form |
| :---: | :---: |
| *![Screenshot of the machine specifications with interactive hotspots.](./docs/screenshot-specs.png)* | *![Screenshot of the contact form page.](./docs/screenshot-contact.png)* |

---

## ✨ Features

- **Fully Responsive Design**: A seamless experience on all devices, from mobile phones to desktops.
- **Internationalization (i18n)**: Supports both English and Dutch, with an easy-to-use language switcher.
- **Dynamic Video Hero**: An engaging hero section with a video background to capture user attention.
- **Interactive Sections**: Visually appealing sections explaining the product, its benefits, and specifications.
- **Backend Integration**: Powered by Supabase for database interactions and serverless functions.
- **Contact Form**: A functional contact form that sends emails to the site admin using a Resend and a Supabase Edge Function.
- **Callback Request**: Users can request a callback via a form in the footer, with data saved directly to the Supabase database.
- **Cookie Consent Banner**: A non-intrusive banner to handle user cookie preferences.
- **SEO Friendly**: Includes `react-helmet-async` for managing meta tags, a `sitemap.xml`, and `robots.txt`.

---

## 🛠️ Tech Stack

This project is built with a range of modern technologies:

- **Frontend**:
  - **Framework**: [React](https://reactjs.org/)
  - **Build Tool**: [Vite](https://vitejs.dev/)
  - **Language**: [TypeScript](https://www.typescriptlang.org/)
  - **Styling**: [Tailwind CSS](https://tailwindcss.com/)
  - **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
  - **Routing**: [React Router](https://reactrouter.com/)
  - **Animations**: [Framer Motion](https://www.framer.com/motion/)
  - **Form Management**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
  - **Internationalization**: [i18next](https://www.i18next.com/)

- **Backend & Services**:
  - **Backend-as-a-Service**: [Supabase](https://supabase.com/)
    - **Database**: Supabase Postgres DB
    - **Serverless Functions**: Supabase Edge Functions (Deno)
  - **Transactional Emails**: [Resend](https://resend.com/)

---

## 🚀 Getting Started

Follow these instructions to get the project up and running on your local machine.

### 1. Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer)
- [npm](https://www.npmjs.com/) or another package manager
- A [Supabase](https://supabase.com/) account and project.
- A [Resend](https://resend.com/) account and API key.

### 2. Installation

Clone the repository and install the dependencies.

```bash
git clone <repository-url>
cd <repository-folder>
npm install
```

### 3. Environment Variables

You need to set up your environment variables to connect to Supabase.

1.  Create a new file named `.env` in the root of the project.
2.  Copy the contents of `.env.example` into your new `.env` file.
3.  Fill in the required values:

```env
# .env

# Get these from your Supabase project dashboard > Project Settings > API
VITE_SUPABASE_URL="YOUR_SUPABASE_PROJECT_URL"
VITE_SUPABASE_ANON_KEY="YOUR_SUPABASE_ANON_KEY"
```

### 4. Supabase & Resend Configuration

This project relies on Supabase for its database and edge functions, and Resend for sending emails.

**Database:**
The database schema (tables, policies) is already configured in the provided Supabase project. If you are starting from scratch, you would need to create the following tables and their corresponding Row Level Security (RLS) policies:
- `callback_requests`
- `pricing_tiers`
- `site_config`
- `testimonials`

**Edge Function for Emails:**
The contact form uses a Supabase Edge Function located at `supabase/functions/send-email/index.ts` to send emails via Resend.

To make this work, you must set a secret in your Supabase project:

1.  Log in to your Supabase dashboard.
2.  Go to **Edge Functions** in the left sidebar.
3.  Select your project.
4.  Go to the **Secrets** tab.
5.  Create a new secret with the name `RESEND_API_KEY` and paste your Resend API key as the value.

### 5. Running the Application

Once your environment variables are set, you can start the development server.

```bash
npm run dev
```

The application will be available at `http://localhost:8080`.

---

## 📄 License

This project is covered by the license detailed in the [LICENSE](./LICENSE) file.