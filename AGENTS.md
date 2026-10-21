# Agent Instructions

Link shortener app. Stack: Next.js 16 (App Router), React 19, TypeScript (strict), Clerk, Drizzle ORM + Neon Postgres, Tailwind CSS v4, shadcn/ui (base-nova, Base UI).

## CRITICAL: READ THE DOCS FIRST

**It is incredibly important that you ALWAYS read the relevant standards file(s) in `/docs` BEFORE generating any code.** No exceptions: not for small changes, quick fixes, or code that seems obvious. Do not write, edit, or suggest code until you have read every doc that applies to the task.

- The docs are the source of truth. If code conflicts with a doc, follow the doc.
- If a task touches several areas (e.g. auth and UI), read all the matching docs.
- If you are unsure which doc applies, read the likely candidates before writing code.
- Re-read the doc if you have not read it in the current task.

## Standards files (read BEFORE generating any code)

- [docs/authentication.md](docs/authentication.md) - Clerk auth, protected `/dashboard`, homepage redirect, modal sign-in/up. Read before touching anything auth-related.
- [docs/ui.md](docs/ui.md) - shadcn/ui only, no custom components. Read before creating or changing any UI.

## Non-negotiable rules

1. **Next.js 16 differs from older versions.** Do not rely on memory of Next 13-15. Use `proxy.ts` (not `middleware.ts`), async `params`/`searchParams`, and the global `PageProps`/`LayoutProps` helper types. Check `node_modules/next/dist/docs/` if present when unsure.
2. **Auth is Clerk only.** Never build custom auth or read user IDs from client input. Always derive the user from `auth()` on the server.
3. **Every database query that touches user data must be scoped by the authenticated `userId`.**
4. **Use Drizzle for all DB access.** No raw SQL strings with interpolated input.
5. **All UI uses shadcn/ui components from `@/components/ui`** and the `cn()` helper from `@/lib/utils`. Do not create custom components; add missing ones with the shadcn CLI.
6. **TypeScript strict; no `any`, no `@ts-ignore`.** Use the `@/*` path alias for imports.
7. **Never commit or log secrets.** Environment variables live in `.env.local` (`DATABASE_URL`, Clerk keys).
8. **Do not add dependencies** unless required for the task; prefer what is already in `package.json`.

## Commands

- `npm run dev` - start dev server
- `npm run build` - production build (must pass before finishing a task)
- `npm run lint` - ESLint (must pass before finishing a task)
- `npx drizzle-kit generate` / `npx drizzle-kit migrate` - create/apply migrations
- `npx shadcn@latest add <component>` - add a UI component

## Definition of done

- `npm run lint` and `npm run build` succeed.
- No unused code, imports, or console logs left behind.
- New behavior follows the matching docs file.
