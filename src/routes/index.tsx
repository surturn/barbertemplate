import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, ArrowRight, Star, Scissors, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/dm/SectionHeading";
import { services, testimonials, formatKES } from "@/components/dm/data";

import heroImg from "@/assets/hero.jpg";
import interiorImg from "@/assets/interior.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "D&M Parlour — Sharp Cuts. Bold Style. | Ongata Rongai" },
      { name: "description", content: "Barbershop and unisex salon in Ongata Rongai, Kenya. Fades, beards, braids, weaves, mani-pedi and makeup. Book your chair online." },
      { property: "og:title", content: "D&M Parlour — Sharp Cuts. Bold Style." },
      { property: "og:description", content: "Barbershop and unisex salon in Ongata Rongai, Kenya. Book your chair online." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

const highlights = services.filter((s) =>
  ["skin-fade", "fade-beard-combo", "knotless-braids", "makeup"].includes(s.id),
);

function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src={heroImg}
            alt="Barber giving a fade haircut in a dimly lit shop"
            width={1920}
            height={1280}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>

        <div className="mx-auto flex min-h-[88vh] max-w-7xl flex-col justify-center px-4 py-24 sm:px-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-background/60 px-3 py-1 backdrop-blur">
              <MapPin className="h-3.5 w-3.5 text-primary" />
              <span className="font-display text-xs font-semibold uppercase tracking-widest text-foreground/90">
                Ongata Rongai · Kenya
              </span>
            </div>

            <h1 className="mt-6 font-display text-6xl font-bold uppercase leading-[0.95] tracking-tight sm:text-7xl md:text-8xl lg:text-9xl">
              D<span className="text-primary">&amp;</span>M
              <br />
              Parlour
            </h1>

            <div className="mt-6 flex items-center gap-4">
              <span className="h-px w-14 bg-primary" />
              <p className="font-display text-lg font-semibold uppercase tracking-[0.25em] text-primary">
                Sharp Cuts. Bold Style.
              </p>
            </div>

            <p className="mt-6 max-w-lg text-base text-foreground/80 sm:text-lg">
              Barbershop and unisex salon. Fades, beards, braids, weaves and glam — all under one roof, walking distance from Maasai Mall.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Button asChild size="lg" className="font-display text-sm font-semibold uppercase tracking-wider gold-glow">
                <Link to="/book">Book Now <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary/50 font-display text-sm font-semibold uppercase tracking-wider hover:border-primary">
                <Link to="/services">View Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="border-y border-primary/20 bg-background py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading
              eyebrow="One House"
              title="Barbershop. Salon. One House."
              description="Whether you want a clean skin fade, a beard sculpt, fresh knotless braids or full glam — D&M is the spot. Two craft-driven teams, one bold address in Rongai."
            />
            <div className="mt-8 grid grid-cols-2 gap-4 sm:max-w-md">
              <div className="rounded-sm border border-primary/30 bg-card p-5">
                <Scissors className="h-6 w-6 text-primary" />
                <div className="mt-3 font-display text-2xl font-bold">Barbershop</div>
                <p className="mt-1 text-xs text-muted-foreground">Fades, beards, shaves, kids cuts</p>
              </div>
              <div className="rounded-sm border border-primary/30 bg-card p-5">
                <Sparkles className="h-6 w-6 text-primary" />
                <div className="mt-3 font-display text-2xl font-bold">Salon</div>
                <p className="mt-1 text-xs text-muted-foreground">Braids, weaves, mani-pedi, glam</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="hover-zoom col-span-2 aspect-[4/5] overflow-hidden rounded-sm border border-primary/20">
              <img src={interiorImg} alt="Inside D&M Parlour" loading="lazy" className="h-full w-full object-cover" />
            </div>
            <div className="flex flex-col gap-3">
              <div className="hover-zoom aspect-square overflow-hidden rounded-sm border border-primary/20">
                <img src={gallery1} alt="Fresh fade" loading="lazy" className="h-full w-full object-cover" />
              </div>
              <div className="hover-zoom aspect-square overflow-hidden rounded-sm border border-primary/20">
                <img src={gallery2} alt="Box braids" loading="lazy" className="h-full w-full object-cover" />
              </div>
              <div className="hover-zoom aspect-square overflow-hidden rounded-sm border border-primary/20">
                <img src={gallery3} alt="Hot towel shave" loading="lazy" className="h-full w-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICE HIGHLIGHTS */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow="What We Do" title="Signature Services" />
            <Button asChild variant="outline" className="border-primary/40 font-display uppercase tracking-wider">
              <Link to="/services">All services <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {highlights.map((s) => (
              <Link
                key={s.id}
                to="/book"
                search={{ service: s.id }}
                className="group block rounded-sm border border-primary/20 bg-card p-6 transition hover:border-primary hover:gold-glow"
              >
                <div className="flex items-center gap-2 font-display text-xs font-bold uppercase tracking-widest text-primary">
                  {s.category === "barbershop" ? <Scissors className="h-3.5 w-3.5" /> : <Sparkles className="h-3.5 w-3.5" />}
                  {s.category}
                </div>
                <h3 className="mt-3 font-display text-xl font-bold uppercase tracking-wide">{s.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.description}</p>
                <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
                  <span className="font-display text-lg font-bold text-primary">{formatKES(s.price)}</span>
                  <span className="text-xs text-muted-foreground">{s.duration} min</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="border-y border-primary/20 bg-card/50 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading eyebrow="Word on the Street" title="What Clients Say" align="center" />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {testimonials.map((t) => (
              <figure key={t.id} className="flex h-full flex-col rounded-sm border border-primary/20 bg-background p-6">
                <div className="flex gap-1 text-primary">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-sm text-foreground/90">
                  <span className="font-display text-3xl leading-none text-primary">"</span>
                  {t.quote}
                </blockquote>
                <figcaption className="mt-6 border-t border-border pt-4">
                  <div className="font-display text-sm font-bold uppercase tracking-wider">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.service}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative isolate overflow-hidden py-24">
        <div className="absolute inset-0 -z-10">
          <img src={heroImg} alt="" className="h-full w-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-background/80" />
        </div>
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="font-display text-4xl font-bold uppercase tracking-wide sm:text-5xl md:text-6xl">
            Ready for a <span className="text-primary">fresh look?</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Book in under a minute. No deposits, no hassle — just sharp work.
          </p>
          <div className="mt-8">
            <Button asChild size="lg" className="font-display text-sm font-semibold uppercase tracking-wider gold-glow">
              <Link to="/book">Book Your Chair <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
