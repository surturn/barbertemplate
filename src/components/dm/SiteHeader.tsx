import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, Scissors } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";

const navItems = [
  { to: "/", label: "Home", exact: true },
  { to: "/about", label: "About", exact: false },
  { to: "/services", label: "Services", exact: false },
  { to: "/book", label: "Book", exact: false },
  { to: "/contact", label: "Contact", exact: false },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-primary/20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          to="/"
          className="flex shrink-0 items-center gap-2"
          aria-label="D&M Parlour home"
        >
          <Scissors className="h-5 w-5 text-primary" strokeWidth={2.5} />
          <span className="font-display text-2xl font-bold tracking-wider text-foreground">
            D<span className="text-primary">&amp;</span>M
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.exact }}
              activeProps={{ className: "text-primary" }}
              inactiveProps={{ className: "text-foreground/80 hover:text-foreground" }}
              className="gold-underline font-display text-sm font-semibold uppercase tracking-widest transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            asChild
            className="hidden font-display font-semibold uppercase tracking-wider sm:inline-flex"
          >
            <Link to="/book">Book Now</Link>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="border-l border-primary/20 bg-background">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <div className="mt-8 flex flex-col gap-6">
                {navItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    activeOptions={{ exact: item.exact }}
                    activeProps={{ className: "text-primary" }}
                    className="font-display text-2xl font-semibold uppercase tracking-wider text-foreground"
                  >
                    {item.label}
                  </Link>
                ))}
                <Button asChild className="mt-4 font-display font-semibold uppercase tracking-wider">
                  <Link to="/book" onClick={() => setOpen(false)}>Book Now</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
