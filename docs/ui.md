# UI Components (shadcn/ui)

**Every UI element in this app is a shadcn/ui component. Do NOT create custom components.** If a UI need exists, find or install the matching shadcn component and use it directly.

## Context

- Presentation layer of the app: Tailwind CSS v4 + shadcn/ui, style `base-nova`, built on **Base UI** (`@base-ui/react`), not Radix.
- Config: `components.json`. Components live in `components/ui/`; imports use `@/components/ui/<name>`.
- Icons: `lucide-react` only.
- Currently installed: `button`. Check `components/ui/` before every task.

## Rules

1. **Use shadcn/ui for all UI**: buttons, inputs, forms, dialogs, cards, tables, dropdowns, toasts, badges, skeletons, etc.
2. **Do not hand-write components** (no `components/link-card.tsx`, `components/header.tsx`, etc.) and do not wrap shadcn components in new reusable components. Compose them inline in the page or layout that needs them.
3. **If a component is missing, install it** instead of building it:
   ```bash
   npx shadcn@latest add card input dialog
   ```
   Browse available components at [ui.shadcn.com/docs/components](https://ui.shadcn.com/docs/components).
4. **Do not rebuild shadcn primitives** with raw HTML + Tailwind (`<button className="...">`, `<input className="...">`, hand-made modals/cards/dropdowns). Structural layout elements (`div`, `main`, `section`, `header`, `h1`, `p`, `ul`) are fine for page layout and text, styled with Tailwind utilities.
5. **Do not modify files in `components/ui/`** except to fix a real bug. Customize through props (`variant`, `size`, `className`), not by editing the source.
6. **Never add another UI library** (MUI, Chakra, Mantine, Headless UI, Radix directly, etc.).
7. **Clerk components** (`SignInButton`, `SignUpButton`, `UserButton`) are the only non-shadcn UI allowed, and only for auth. Style the trigger with a shadcn `Button` child (see [authentication.md](authentication.md)). Clerk theming already uses the shadcn theme in `app/layout.tsx`.

## Usage

Compose with props and `cn()`:

```tsx
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

<Button variant="outline" size="sm" className={cn(isActive && "bg-muted")}>
  Copy link
</Button>;
```

Base UI composition: use the `render` prop (not Radix's `asChild`) to render a component as another element:

```tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";

<Button render={<Link href="/dashboard" />}>Go to dashboard</Button>;
```

Page-level composition (inline, no new component files):

```tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function Page() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Shorten a link</CardTitle>
      </CardHeader>
      <CardContent className="flex gap-2">
        <Input placeholder="https://example.com" />
        <Button>Shorten</Button>
      </CardContent>
    </Card>
  );
}
```

| Need                        | Use                                                                         |
| --------------------------- | --------------------------------------------------------------------------- |
| Action / link-styled button | `Button` (`variant`: default, outline, secondary, ghost, destructive, link) |
| Text fields, forms          | `Input`, `Label`, `Form`/`Field` components from shadcn                     |
| Container / panel           | `Card`                                                                      |
| Confirm / edit overlay      | `Dialog` / `AlertDialog`                                                    |
| Menus                       | `DropdownMenu`                                                              |
| Data list                   | `Table`                                                                     |
| Feedback                    | `Sonner` (toast), `Alert`, `Skeleton`                                       |

## Styling

- Tailwind v4 utilities and theme tokens only (`bg-background`, `text-muted-foreground`, `border`, ...). No hard-coded colors, no inline `style`, no custom CSS files.
- Merge classes with `cn()` from `@/lib/utils`. Mobile-first responsive classes. Must work in light and dark mode.

## Troubleshooting

- **Component not found**: it is not installed yet; run `npx shadcn@latest add <name>`.
- **`asChild` type error**: this is Base UI; use the `render` prop.
- **Variant/prop does not exist**: read the generated file in `components/ui/` for its actual API before using it.
- **Generated file imports `cn` from `"cn"` instead of `@/lib/utils`** (seen in `components/ui/button.tsx`): fix the import to `@/lib/utils`; the `cn` npm package is not the project helper.
- **Needs a pattern shadcn lacks**: compose existing shadcn components inline; ask the user before creating anything custom.

## Maintaining this doc

- Update the "Currently installed" list and the examples table when components are added.
- Re-verify Base UI patterns (`render` prop) against the installed `@base-ui/react` and `shadcn` versions after upgrades.
- References: [shadcn/ui docs](https://ui.shadcn.com/docs), [Base UI docs](https://base-ui.com/react/overview/quick-start).
