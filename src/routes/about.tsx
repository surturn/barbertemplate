import { createFileRoute, Link } from "@tanstack/react-router";
import { Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/dm/SectionHeading";
import { stylists } from "@/components/dm/data";

import interiorImg from "@/assets/interior.jpg";
import heroImg from "@/assets/hero.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery3 from "@/assets/gallery-3.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About & Team — D&M Parlour | Ongata Rongai" },
      { name: "description", content: "Meet the barbers and stylists behind D&M Parlour. Our story, our shop and our chair-side crew in Ongata Rongai." },
      { property: "og:title", content: "About & Team — D&M Parlour" },
      { property: "og:description", content: "Meet the barbers and stylists behind D&M Parlour in Ongata Rongai." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

const stats = [
  { value: "2019", label: "Established" },
  { value: "5,000+", label: "Fresh Clients" },
  { value: "12+", label: "Services" },
  { value: "4.9★", label: "Avg Rating" },
];

function AboutPage() {
  return (
    <>
      {/* Story */}
      <section className="border-b border-primary/20 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <SectionHeading
                eyebrow="Our Story"
                title="Built in Rongai, made for the culture."
              />
              <div className="mt-6 space-y-4 text-muted-foreground">
                <p>
                  D&amp;M Parlour started in 2019 as a one-chair barbershop tucked between matatu stages in Ongata Rongai. Two brothers, one mission: bring big-city precision to the neighbourhood.
                </p>
                <p>
                  Five years on, we're a full-service barbershop and unisex salon — same neighbourhood energy, sharper tools, more hands on deck. Whether it's a quick fade on lunch break or a four-hour braiding session, the chair is yours.
                </p>
                <p className="font-display text-foreground">No deposits. No drama. Just sharp work.</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {stats.map((s) => (
                <div key={s.label} className="rounded-sm border border-primary/30 bg-card p-6 text-center">
                  <div className="font-display text-4xl font-bold text-primary sm:text-5xl">{s.value}</div>
                  <div className="mt-2 font-display text-xs font-bold uppercase tracking-widest text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Shop photo grid */}
      <section className="bg-card/50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading eyebrow="The Shop" title="Inside D&M" align="center" />
          <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4">
            <div className="hover-zoom col-span-2 row-span-2 aspect-square overflow-hidden rounded-sm border border-primary/20 md:col-span-2 md:row-span-2">
              <img src={interiorImg} alt="D&M Parlour interior" loading="lazy" className="h-full w-full object-cover" />
            </div>
            <div className="hover-zoom aspect-square overflow-hidden rounded-sm border border-primary/20">
              <img src={heroImg} alt="Barber at work" loading="lazy" className="h-full w-full object-cover" />
            </div>
            <div className="hover-zoom aspect-square overflow-hidden rounded-sm border border-primary/20">
              <img src={gallery3} alt="Hot towel shave" loading="lazy" className="h-full w-full object-cover" />
            </div>
            <div className="hover-zoom aspect-square overflow-hidden rounded-sm border border-primary/20">
              <img src={gallery1} alt="Fresh fade" loading="lazy" className="h-full w-full object-cover" />
            </div>
            <div className="hover-zoom aspect-square overflow-hidden rounded-sm border border-primary/20">
              <img src={interiorImg} alt="Salon stations" loading="lazy" className="h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading eyebrow="The Crew" title="Meet The Masters" align="center" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stylists.map((s) => (
              <article key={s.id} className="group flex flex-col overflow-hidden rounded-sm border border-primary/20 bg-card transition hover:border-primary">
                <div className="hover-zoom aspect-[4/5] overflow-hidden">
                  <img src={s.photo} alt={s.name} loading="lazy" className="h-full w-full object-cover" />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-xl font-bold uppercase tracking-wide">{s.name}</h3>
                  <p className="text-xs font-semibold uppercase tracking-widest text-primary">{s.role}</p>
                  <p className="mt-3 flex-1 text-sm text-muted-foreground">{s.bio}</p>
                  <div className="mt-5 flex items-center justify-between">
                    <a href="#" aria-label={`${s.name} on Instagram`} className="text-foreground/70 hover:text-primary">
                      <Instagram className="h-4 w-4" />
                    </a>
                    <Button asChild size="sm" className="font-display text-xs font-semibold uppercase tracking-wider">
                      <Link to="/book" search={{ stylist: s.id }}>
                        Book with {s.name.split(" ")[0]}
                      </Link>
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
