# Moneyflow - Supabase Authentication Flow

This repository now includes a TypeScript Supabase authentication flow for email/password auth.

## What was added

- Supabase client bootstrap (`src/supabaseClient.ts`)
- Authentication helpers (`src/auth.ts`) for:
  - Sign up
  - Sign in
  - Sign out
  - Get current session
  - Subscribe to auth state changes
- Environment template (`.env.example`)

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy env file:
   ```bash
   cp .env.example .env
   ```
3. Fill in your Supabase values in `.env`.

## Usage

Import and call the helper functions:

```ts
import {
  signUpWithEmail,
  signInWithEmail,
  signOut,
  getCurrentSession,
  onAuthChange
} from './src/auth.js';
```

You can wire these functions into API routes, UI forms, or server actions depending on your runtime.
