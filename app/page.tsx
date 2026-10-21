import { SignUpButton } from "@clerk/nextjs";
import {
  ArrowDown,
  ArrowRight,
  BarChart3,
  Check,
  Link2,
  MousePointer2,
  ShieldCheck,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Zap,
    title: "Short links in seconds",
    description:
      "Turn long, unwieldy URLs into clean links that are easy to share anywhere.",
  },
  {
    icon: BarChart3,
    title: "Everything in one place",
    description:
      "Keep your links organized in a simple dashboard and find the right one whenever you need it.",
  },
  {
    icon: ShieldCheck,
    title: "Your links, your account",
    description:
      "Sign in to keep your links together and manage them from one personal workspace.",
  },
];

export default function Home() {
  return (
    <main className="flex-1">
      <section className="relative overflow-hidden border-b bg-muted/30">
        <div className="mx-auto grid min-h-[calc(100svh-4rem)] max-w-6xl items-center gap-16 px-6 py-20 lg:grid-cols-[1fr_0.9fr] lg:px-8 lg:py-24">
          <div className="relative z-10">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1.5 text-sm text-muted-foreground">
              <span className="size-2 rounded-full bg-primary" />
              A simpler way to share links
            </div>
            <h1 className="max-w-2xl text-5xl font-semibold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              Make your links
              <span className="block text-muted-foreground">work smarter.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
              Clean up long URLs, keep every link close at hand, and share with
              confidence. The little link tool that makes a big difference.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <SignUpButton mode="modal" forceRedirectUrl="/dashboard">
                <Button size="lg" className="h-11 gap-2 px-5">
                  Get started for free
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Button>
              </SignUpButton>
              <Button
                render={<Link href="#features" />}
                variant="outline"
                size="lg"
                className="h-11 gap-2 px-5"
              >
                See how it works
                <ArrowDown aria-hidden="true" className="size-4" />
              </Button>
            </div>
            <div className="mt-8 flex items-center gap-2 text-sm text-muted-foreground">
              <Check aria-hidden="true" className="size-4 text-foreground" />
              Free to get started. No setup required.
            </div>
          </div>

          <div aria-label="Link shortening preview" className="relative mx-auto w-full max-w-lg">
            <div className="absolute -inset-8 rounded-full bg-muted/80 blur-3xl" />
            <div className="relative rounded-2xl border bg-background p-5 shadow-xl shadow-foreground/5 sm:p-7">
              <div className="mb-8 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                    <Link2 aria-hidden="true" className="size-5" />
                  </span>
                  <span className="font-semibold tracking-tight">Your links</span>
                </div>
                <span className="rounded-full border px-3 py-1 text-xs text-muted-foreground">
                  Workspace
                </span>
              </div>
              <div className="rounded-xl border bg-muted/30 p-4">
                <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Your long link
                </p>
                <p className="truncate text-sm text-muted-foreground">
                  https://example.com/blog/guides/making-links-easier-to-share
                </p>
                <div className="my-4 flex items-center gap-2 text-muted-foreground">
                  <span className="h-px flex-1 bg-border" />
                  <ArrowDown aria-hidden="true" className="size-4" />
                  <span className="h-px flex-1 bg-border" />
                </div>
                <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Your short link
                </p>
                <div className="flex items-center justify-between gap-3 rounded-lg border bg-background px-3 py-2.5">
                  <span className="truncate text-sm font-medium">
                    linkshort.app/your-link
                  </span>
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
                    <Check aria-hidden="true" className="size-4" />
                  </span>
                </div>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-xl border p-4">
                  <div className="mb-3 flex size-8 items-center justify-center rounded-lg bg-muted">
                    <MousePointer2
                      aria-hidden="true"
                      className="size-4 text-muted-foreground"
                    />
                  </div>
                  <p className="text-sm font-medium">Easy to share</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Clean and memorable
                  </p>
                </div>
                <div className="rounded-xl border p-4">
                  <div className="mb-3 flex size-8 items-center justify-center rounded-lg bg-muted">
                    <BarChart3
                      aria-hidden="true"
                      className="size-4 text-muted-foreground"
                    />
                  </div>
                  <p className="text-sm font-medium">Easy to manage</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    All links, one place
                  </p>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-5 -left-5 hidden items-center gap-3 rounded-xl border bg-background px-4 py-3 shadow-lg sm:flex">
              <span className="flex size-9 items-center justify-center rounded-full bg-muted">
                <Check aria-hidden="true" className="size-4" />
              </span>
              <div>
                <p className="text-sm font-medium">Ready to share</p>
                <p className="text-xs text-muted-foreground">
                  One less long URL
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="features"
        className="mx-auto max-w-6xl scroll-mt-8 px-6 py-20 lg:px-8 lg:py-24"
      >
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
            Less link. More focus.
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            Sharing should be the easy part.
          </h2>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            Everything you need to make your links neater and easier to manage,
            without the extra clutter.
          </p>
        </div>

        <div className="mt-14 grid gap-8 border-t pt-8 md:grid-cols-3 md:gap-10">
          {features.map(({ icon: Icon, title, description }) => (
            <article key={title} className="pt-2">
              <span className="flex size-11 items-center justify-center rounded-xl border bg-muted/40">
                <Icon aria-hidden="true" className="size-5" />
              </span>
              <h3 className="mt-5 text-lg font-semibold">{title}</h3>
              <p className="mt-2 leading-7 text-muted-foreground">
                {description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t bg-muted/30">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-6 py-14 sm:flex-row sm:items-center lg:px-8">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              Ready to tidy up your links?
            </h2>
            <p className="mt-2 text-muted-foreground">
              Get started in moments and share your first short link.
            </p>
          </div>
          <SignUpButton mode="modal" forceRedirectUrl="/dashboard">
            <Button size="lg" className="h-11 gap-2 px-5">
              Create your account
              <ArrowRight aria-hidden="true" className="size-4" />
            </Button>
          </SignUpButton>
        </div>
      </section>
    </main>
  );
}
