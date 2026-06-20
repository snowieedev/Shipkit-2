# ShipKit - Manual Setup Guide

Welcome to the ShipKit setup guide. Since ShipKit relies on several services (like Supabase, Resend, PostHog, etc.), this guide explains how to configure your environment and run the local development server.

## 1. Environment Variables

Create a `.env.local` file in the root of the project by copying `.env.example` (or creating a new one). You will need the following values:

### Supabase
Sign up at [Supabase](https://supabase.com/) and create a new project.
* `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL.
* `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anon public key.
* `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase service role key (keep this secret).

### Encryption
Used for securing provider credentials within the database.
* `ENCRYPTION_SECRET`: A 64-character (32-byte) hex string.
  _You can generate one using Node.js:_
  `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

## 2. Database Initialization

ShipKit uses Supabase for database schemas. The migrations are located in `supabase/migrations`.

Ensure you have the Supabase CLI installed, then link and push the migrations to your remote project:
```bash
npx supabase login
npx supabase link --project-ref <your-project-id>
npx supabase db push
```

*Note: Migrations are idempotent, so if you run them multiple times or run into a trigger error, they should apply correctly.*

## 3. Provider Configurations (Optional for Core App)

You can connect additional providers directly through the ShipKit Dashboard once you are logged in.
However, to fully use them, ensure you have API keys from:
* **Resend**: Transactional emails.
* **PostHog**: Product analytics.
* **Razorpay**: Payment processing.
* **GitHub**: For OAuth / repository integrations.

## 4. Running Locally

Install dependencies:
```bash
npm install
```

Start the development server:
```bash
npm run dev
```

Your app will be running at [http://localhost:3000](http://localhost:3000).

## 5. Security & Deployment

* **Authentication**: All dashboard pages are protected via middleware (`src/middleware.ts`).
* **RLS**: Row-Level Security is strictly enforced on all tables. Users only see their own `projects`, `provider_connections`, and `api_keys`.
* **API Keys**: Keys are hashed using SHA-256 before storage.

When deploying to Vercel or your preferred host, ensure all environment variables are securely added to the deployment settings.
