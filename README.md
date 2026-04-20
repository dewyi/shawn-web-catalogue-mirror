# ShawnShop - Modular E-Commerce Platform

A full-featured e-commerce website built with Next.js 15, TypeScript, PostgreSQL, and Stripe.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL (via Drizzle ORM)
- **Auth**: NextAuth.js v5 (Credentials)
- **Payments**: Stripe
- **State Management**: Zustand (client cart state)
- **Forms**: React Hook Form + Zod validation
- **Testing**: Vitest (unit) + Playwright (E2E)
- **Linting/Formatting**: Biome

## Project Structure

```
src/
├── app/                    # Next.js App Router pages & API routes
│   ├── (auth)/            # Auth route group (login, register)
│   ├── (shop)/            # Shop route group (home, products, cart, checkout)
│   ├── (dashboard)/       # Admin route group
│   └── api/               # API endpoints
├── modules/               # Feature modules (domain-driven)
│   ├── auth/              # Authentication
│   ├── products/          # Product catalog
│   ├── cart/              # Shopping cart
│   ├── checkout/          # Checkout & payments
│   ├── orders/            # Order management
│   └── shared/            # Cross-cutting utilities
├── db/                    # Database layer
│   └── schema/            # Drizzle table definitions
└── lib/                   # Shared libraries (Stripe, S3, etc.)
```

Each module follows the same pattern:
- `components/` - React components
- `lib/` - Business logic & utilities
- `services/` - Data access & orchestration
- `types/` - TypeScript type definitions

## Getting Started

### Prerequisites

- Node.js 20+
- PostgreSQL 16+

### Installation

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env.local

# Edit .env.local with your database credentials
```

### Database Setup

```bash
# Run migrations
npm run db:migrate

# Seed development data
npm run db:seed
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Test Credentials

After seeding:
- **Admin**: admin@shawnshop.com / admin123
- **User**: user@shawnshop.com / admin123

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Lint and auto-fix
npm run db:migrate   # Run database migrations
npm run db:seed      # Seed development data
npm run db:studio    # Open Drizzle Studio
npm run test         # Run unit tests
npm run test:e2e     # Run E2E tests
```

## Features

- Product catalog with filtering and search
- User authentication (login/register)
- Shopping cart (localStorage for anonymous, DB for logged-in)
- Stripe checkout integration
- Order management (user history + admin dashboard)
- Responsive design
