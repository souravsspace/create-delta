# Create Delta

A modern, full-stack Next.js starter template designed for building scalable SaaS applications.

## Features

- 🔐 Authentication with multiple providers
  - Magic Link (Email)
  - Google OAuth
  - GitHub OAuth
- 🎨 Beautiful UI with Shadcn/ui components
- 🌓 Dark mode support
- 📱 Fully responsive design
- 🔄 Real-time updates with React Query
- 🚀 API routes with Hono.js
- 🗃️ Type-safe database with Drizzle ORM
- 📧 Email handling with Resend
- ⚡ Performance optimized
- 🔒 Rate limiting
- 🎯 Type safety with TypeScript
- 🎨 Styling with Tailwind CSS

## Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/)
- **Database:** [PostgreSQL](https://www.postgresql.org/) with [Drizzle ORM](https://orm.drizzle.team/)
- **Authentication:** Custom implementation with OAuth providers
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [Shadcn/ui](https://ui.shadcn.com/)
- **Email:** [Resend](https://resend.com/)
- **API Layer:** [Hono.js](https://hono.dev/)
- **State Management:** [TanStack Query](https://tanstack.com/query)
- **Deployment:** Ready for deployment on [Vercel](https://vercel.com)

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- Resend account for email functionality
- OAuth credentials (for Google and GitHub authentication)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/souravsspace/create-delta.git
```

2. Install dependencies:

```bash
bun install
```

3. Copy the example environment file:

```bash
cp .env.example .env
```

4. Update the environment variables in `.env`:

```bash
DATABASE_URL=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
EMAIL_SERVER_USER=
EMAIL_SERVER_PASSWORD=
EMAIL_SERVER_HOST=
EMAIL_SERVER_PORT=
EMAIL_FROM=
RESEND_AUDIENCE_ID=
APP_URL=
NEXT_PUBLIC_APP_URL=
```

5. Set up the database:

```bash
bun run db:generate
bun run db:migrate
```

6. Start the development server:

```bash
bun run dev
```

## Project Structure

├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   │   ├── verify-email/
│   │   │   │   └── page.tsx
│   │   │   ├── magic-error/
│   │   │   │   └── page.tsx
│   │   │   ├── components/
│   │   │   │   └── magic-link-form.tsx
│   │   │   └── page.tsx
│   │   └── signed-out/
│   │       └── page.tsx
│   ├── (dashboard)/
│   │   └── page.tsx
│   ├── api/
│   │   └── [[...route]]/
│   │       ├── route.ts
│   │       └── routes/
│   │           └── auth/
│   │               ├── magic.ts
│   │               ├── google.ts
│   │               ├── github.ts
│   │               └── logout.ts
│   └── layout.tsx
├── components/
│   ├── providers/
│   │   ├── index.tsx
│   │   ├── query-provider.tsx
│   │   ├── theme-provider.tsx
│   │   └── top-loader.tsx
│   ├── shared/
│   │   ├── icons.tsx
│   │   └── loader-button.tsx
│   └── ui/
│       ├── button.tsx
│       ├── form.tsx
│       ├── input.tsx
│       └── [other shadcn components]
├── lib/
│   ├── auth.ts
│   ├── env.ts
│   ├── errors.ts
│   ├── get-ip.ts
│   ├── hono.ts
│   ├── limiter.ts
│   ├── send-email.tsx
│   ├── session.ts
│   └── utils.ts
├── styles/
│   └── globals.css
├── db/
│   ├── migrations/
│   ├── index.ts
│   ├── migrate.ts
│   └── schema.ts
├── others/
│   ├── data-access/
│   │   ├── auth.ts
│   │   ├── magic-links.ts
│   │   ├── profiles.ts
│   │   └── types.ts
│   └── use-case/
│       ├── auth.ts
│       ├── magic-links.tsx
│       └── errors.ts
├── emails/
│   └── magic-link.tsx
└── constant/
    └── app-config.ts

## Features in Detail

### Authentication

- Magic link authentication with secure token generation
- OAuth integration with Google and GitHub
- Session management with HTTP-only cookies
- Protected routes with middleware
- Email verification

### Database

- Type-safe database queries with Drizzle ORM
- Automatic migration management
- Efficient connection pooling
- PostgreSQL with Neon serverless

### Email

- Transactional emails with Resend
- React email templates
- Email rate limiting
- Custom email templates for authentication

### API

- Type-safe API routes with Hono.js
- Built-in rate limiting
- Error handling with custom error classes
- Request validation with Zod
- API route middleware

### UI/UX

- Dark mode with next-themes
- Custom fonts (Geist Sans & Mono)
- Loading states and animations
- Toast notifications with Sonner
- Responsive design
- Form handling with React Hook Form

## Available Scripts

```bash
bun run dev # Start development server
bun run build # Build for production
bun run start # Start production server
bun run lint # Run ESLint
bun run db:generate # Generate database migrations
bun run db:migrate # Run database migrations
bun run db:push # Push schema changes to database
bun run db:studio # Open Drizzle Studio
bun run email:dev # Start email preview server
```

## Best Practices

- Type-safe database operations
- Secure authentication flow
- Rate limiting on sensitive routes
- Error handling and logging
- Code organization and modularity
- Performance optimization
- SEO friendly
- Accessibility considerations

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you find this project helpful, please consider giving it a ⭐️ on GitHub!

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Drizzle ORM](https://orm.drizzle.team/)
- [Hono.js](https://hono.dev/)
- [TanStack Query](https://tanstack.com/query)
