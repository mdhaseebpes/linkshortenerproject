# Authentication (Clerk)

All authentication and user identity in this app is handled by **Clerk** (`@clerk/nextjs`). **No other auth method may be used**: no custom sessions, JWTs, cookies, passwords, NextAuth/Auth.js, Supabase Auth, or hand-rolled login forms.

## Requirements

1. `/dashboard` (and everything under it) is **protected**. Unauthenticated users must not be able to view it.
2. A signed-in user who visits the homepage (`/`) must be **redirected to `/dashboard`**.
3. Sign in and sign up **always open as a Clerk modal**. Never navigate to a dedicated sign-in/sign-up page.
4. The user identity always comes from `auth()` on the server, never from client input.

## Existing setup

- `proxy.ts` (Next.js 16's replacement for `middleware.ts`) runs `clerkMiddleware()`. Do not create `middleware.ts`.
- `app/layout.tsx` wraps the app in `<ClerkProvider appearance={{ theme: shadcn }}>`. Keep the shadcn theme.
- Clerk skills for deeper reference: `.agents/skills/clerk-nextjs-patterns`, `.agents/skills/clerk-custom-ui`.

## Protecting `/dashboard` and redirecting the homepage

Do both in `proxy.ts` so enforcement happens before rendering:

```ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();

  if (isProtectedRoute(req)) {
    await auth.protect();
  }

  if (userId && req.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
```

Keep the existing `matcher` unchanged.

Defense in depth: every dashboard page, Server Action, and route handler must still call `auth()` itself and reject a null `userId`:

```tsx
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const { userId } = await auth();
  if (!userId) redirect("/");
  // fetch data scoped to userId
}
```

`auth()` is async; always `await` it.

## Sign in / sign up: modal only

Use Clerk's button components with `mode="modal"`, and send users to the dashboard afterward:

```tsx
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { Suspense } from "react";

<Suspense fallback={<div className="size-8" />}>
  <Show when="signed-out">
    <SignInButton mode="modal" forceRedirectUrl="/dashboard" />
    <SignUpButton mode="modal" forceRedirectUrl="/dashboard" />
  </Show>
  <Show when="signed-in">
    <UserButton />
  </Show>
</Suspense>;
```

- Every `SignInButton` / `SignUpButton` must set `mode="modal"`. A bare `<SignInButton />` redirects, so it is not allowed.
- To use a custom trigger, wrap a shadcn `Button` as the child: `<SignInButton mode="modal"><Button>Sign in</Button></SignInButton>`.
- Do not render `<SignIn />` or `<SignUp />` as full pages, and do not link to `/sign-in` or `/sign-up`.
- The existing `app/sign-in/[[...sign-in]]` and `app/sign-up/[[...sign-up]]` pages are legacy and conflict with the modal-only rule. Do not extend them; remove them when asked or when touching that area.
- Use `<Show when="signed-in" | "signed-out">` for conditional UI. `SignedIn` / `SignedOut` are not used in this project.
- Keep Clerk UI inside `Suspense` with a fixed-size fallback to avoid layout shift.

## Server and client usage

| Need                                         | Use                                                           |
| -------------------------------------------- | ------------------------------------------------------------- |
| User ID on the server                        | `const { userId } = await auth()` from `@clerk/nextjs/server` |
| Profile data (name, email) on the server     | `await currentUser()`                                         |
| Display-only user data in a Client Component | `useUser()` / `useAuth()`                                     |

Client-side auth state is never an authorization check. Every query touching user data is scoped by `userId` (see [database.md](database.md) when present).

## Environment variables

`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` live in `.env.local`. Never commit, log, or hard-code them. Do not set `NEXT_PUBLIC_CLERK_SIGN_IN_URL` / `NEXT_PUBLIC_CLERK_SIGN_UP_URL` to page routes, since that would reintroduce redirect-based flows.

## Examples

| Scenario                                | Expected behavior                                         |
| --------------------------------------- | --------------------------------------------------------- |
| Signed-out user opens `/dashboard`      | Blocked by `auth.protect()`; never sees dashboard content |
| Signed-in user opens `/`                | Redirected to `/dashboard`                                |
| Signed-out user clicks "Sign in" on `/` | Clerk modal opens over the page; no navigation            |
| User completes sign-up in the modal     | Lands on `/dashboard`                                     |
| Server Action called with no session    | Returns an error / rejects; no DB access occurs           |

## Troubleshooting

- **Modal does not open, page navigates instead**: `mode="modal"` is missing on the button.
- **Redirect loop between `/` and `/dashboard`**: the dashboard page redirects signed-in users to `/`. Only redirect when `userId` is null.
- **`auth()` returns `userId: null` in a route**: the path is excluded by the `proxy.ts` matcher, or `clerkMiddleware` is not running.
- **Hydration/layout shift on header**: Clerk components are missing a `Suspense` fallback.
- **Redirect not firing**: the file must be `proxy.ts` at the repo root (not `middleware.ts`).

## Maintaining this doc

- Update it whenever protected routes, redirect rules, or the sign-in/up flow change; add new protected paths to `isProtectedRoute` and to the examples table.
- Verify API names against the installed `@clerk/nextjs` version after upgrades (`Show`, `auth.protect()`, button props).
- References: [Clerk Next.js docs](https://clerk.com/docs/nextjs), [Clerk `clerkMiddleware()`](https://clerk.com/docs/reference/nextjs/clerk-middleware).
