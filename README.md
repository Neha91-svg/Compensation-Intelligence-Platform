# CompLens: Compensation Intelligence Platform

CompLens is a production-grade, full-stack compensation intelligence platform inspired by Levels.fyi. It enables users to explore verified salary data, visualize company-specific compensation trends, and perform head-to-head comparisons between roles.

## 🏗️ Architecture Explanation

CompLens follows a **Backend-Focused, Service-Oriented Architecture** built on the Next.js 15 App Router.

- **Frontend**: React 19 + Tailwind CSS + shadcn/ui. Highly responsive and accessible components.
- **Backend**: API-first design using Next.js Route Handlers. Logic is decoupled into a centralized **Service Layer** (`src/services/`).
- **Data Layer**: PostgreSQL database managed via **Prisma ORM**. Optimized with indexes for fast searching and filtering.
- **Validation**: Strict schema enforcement using **Zod** across both API ingestion and query parameters.
- **Reliability**: Centralized error handling wrapper for APIs and global frontend error boundaries.

## 📡 API Documentation

### Salaries API
- `GET /api/salaries`: Search and filter compensation data.
  - Params: `search`, `company`, `role`, `location`, `minTotalComp`, `maxTotalComp`, `sortBy`, `page`.
- `POST /api/ingest-salary`: Submit new data. Includes duplicate rejection and automatic normalization.

### Company API
- `GET /api/company/[name]`: Aggregated insights for a specific company.
  - Returns: Median TC, Level Distribution (via Prisma `groupBy`), and recent entries.

### Comparison API
- `GET /api/compare`: Head-to-head analysis between two entries.
  - Params: `id1`, `id2`.
  - Returns: Absolute and percentage differences across base, bonus, stock, and TC.

## 🚀 Setup & Deployment Guide

### Local Development
1. **Clone the repo**
2. **Install dependencies**: `npm install`
3. **Environment**: Copy `.env.example` to `.env` and provide a PostgreSQL URL.
4. **Database Migration**: `npx prisma migrate dev`
5. **Seed Data**: `npm run prisma:seed`
6. **Start Dev Server**: `npm run dev`

### Deployment (Vercel + Neon)
1. **Database**: Create a project on [Neon.tech](https://neon.tech) and copy the Connection String.
2. **Vercel**:
   - Push code to GitHub.
   - Import project in Vercel.
   - Add `DATABASE_URL` to Vercel Environment Variables.
   - Deploy. Vercel will automatically run `npm run build` which includes `prisma generate`.
3. **Initialization**: Run `npx prisma db push` or `migrate deploy` from your local machine targeting the Neon URL to set up the schema.

## 🛠️ Tech Stack
- **Framework**: Next.js 15 (App Router, Server Components)
- **Database**: PostgreSQL (Neon / Supabase ready)
- **ORM**: Prisma
- **Validation**: Zod
- **UI**: shadcn/ui + Tailwind CSS
- **Visualization**: Recharts

## 📊 Key Features
- **Salaries Database**: Advanced filtering, search, and pagination.
- **Company Insights**: Visualized level distribution charts.
- **Head-to-Head Compare**: Automated delta calculations for role comparisons.
- **Production Reliable**: Global error boundaries and sanitized API responses.
