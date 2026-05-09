# CompLens | Compensation Intelligence Platform

CompLens is a full-stack, production-grade compensation intelligence platform inspired by Levels.fyi. It provides transparency into tech salaries across companies, roles, and locations.

## 🚀 Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Components**: [shadcn/ui](https://ui.shadcn.com/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Database**: PostgreSQL
- **Validation**: [Zod](https://zod.dev/)

## ✨ Key Features

- **Backend-Focused Architecture**: Clean separation of concerns with a dedicated service layer.
- **API-First Design**: Robust API endpoints with server-side filtering and pagination.
- **Modern UI/UX**: Premium, responsive dashboard with a clean aesthetic.
- **Advanced Filtering**: Filter by company, role, location, total compensation, and experience.
- **Robust Validation**: Zod-powered validation with automatic string normalization, trimming, and strict range checks.
- **Structured Error Handling**: API returns detailed, field-specific validation errors.
- **Production Grade**: Structured for scalability and maintainability.

## 📁 Project Structure

```text
src/
├── app/            # Next.js pages and API routes
├── components/     # UI components (Layout, Salary, shadcn/ui)
├── lib/            # Shared utilities and Prisma client singleton
├── prisma/         # Database schema and seed scripts
├── services/       # Business logic and data access layer
├── types/          # TypeScript definitions and interfaces
├── validators/     # Zod schemas for request validation
```

## 🛠️ Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/Neha91-svg/Compensation-Intelligence-Platform
cd Compensation-Intelligence-Platform
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup Environment
Copy the example environment file and update your PostgreSQL connection string:
```bash
cp .env.example .env
```

### 4. Initialize Database
```bash
npx prisma generate
npx prisma migrate dev --name init
npx prisma db seed
```

### 5. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📡 API Endpoints

### `GET /api/salaries`
Retrieve compensation data with server-side filtering.
- **Query Params**: `company`, `role`, `location`, `minTotalComp`, `maxTotalComp`, `experienceYears`, `page`, `limit`

### `POST /api/ingest-salary`
Submit new compensation data.
- **Features**: Automatic normalization, total compensation calculation, and duplicate rejection.
- **Body**:
  ```json
  {
    "company": "Google",
    "role": "Software Engineer",
    "location": "Mountain View, CA",
    "experienceYears": 2,
    "baseSalary": 150000,
    "bonus": 20000,
    "stock": 40000
  }
  ```

## 📊 Database Schema

The core `Salary` model includes:
- `company`, `role`, `level`, `location`
- `experienceYears`
- `baseSalary`, `bonus`, `stock`
- `totalCompensation` (Calculated)
- `confidenceScore`
- Timestamps and Indexes for performance

## 🛣️ Roadmap

- [ ] User Authentication (NextAuth.js)
- [ ] Interactive Salary Trend Charts (Recharts)
- [ ] Community Forums & Benefits Discussion
- [ ] Company-specific Salary Distribution pages
- [ ] AI-powered Salary Negotiation Insights

## 📄 License

This project is licensed under the MIT License.
