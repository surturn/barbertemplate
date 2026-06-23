import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SectionHeading } from "@/components/dm/SectionHeading";
import { services, formatKES, type ServiceCategory } from "@/components/dm/data";

import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import heroImg from "@/assets/hero.jpg";
import interiorImg from "@/assets/interior.jpg";
import team1 from "@/assets/team-1.jpg";
import team3 from "@/assets/team-3.jpg";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services & Gallery — D&M Parlour | Cuts, Beards, Braids" },
      { name: "description", content: "Barbershop and salon services in Ongata Rongai. Skin fades, beard trims, braids, weaves, mani-pedi and makeup — with KES pricing." },
      { property: "og:title", content: "Services & Gallery — D&M Parlour" },
      { property: "og:description", content: "Full menu of barber and salon services with KES pricing." },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesPage,
});

const galleryImages = [
  { src: gallery1, alt: "Sharp skin fade" },
  { src: gallery2, alt: "Long box braids" },
  { src: heroImg, alt: "Barber at work" },
  { src: gallery3, alt: "Hot towel shave" },
  { src: gallery4, alt: "Manicure with gold accent" },
  { src: interiorImg, alt: "Shop interior" },
  { src: team1, alt: "Barber portrait" },
  { src: team3, alt: "Stylist portrait" },
];

function ServiceList({ category }: { category: ServiceCategory }) {
  const list = services.filter((s) => s.category === category);
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {list.map((s) => (
        <article
          key={s.id}
          className="flex flex-col rounded-sm border border-primary/20 bg-card p-6 transition hover:border-primary hover:gold-glow"
        >
          <h3 className="font-display text-xl font-bold uppercase tracking-wide">{s.name}</h3>
          <p className="mt-2 flex-1 text-sm text-muted-foreground">{s.description}</p>
          <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
            <div>
              <div className="font-display text-2xl font-bold text-primary">{formatKES(s.price)}</div>
              <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" /> {s.duration} min
              </div>
            </div>
            <Button asChild size="sm" className="font-display text-xs font-semibold uppercase tracking-wider">
              <Link to="/book" search={{ service: s.id }}>
                Book <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </Button>
          </div>
        </article>
      ))}
    </div>
  );
}

function ServicesPage() {
  return (
    <>
      <section className="border-b border-primary/20 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="The Menu"
            title="Services & Pricing"
            description="Transparent KES pricing for every chair. Tap a service to start a booking."
          />
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Tabs defaultValue="barbershop" className="w-full">
            <TabsList className="mx-auto grid h-auto max-w-md grid-cols-2 rounded-sm border border-primary/30 bg-card p-1">
              <TabsTrigger
                value="barbershop"
                className="font-display text-sm font-bold uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Barbershop
              </TabsTrigger>
              <TabsTrigger
                value="salon"
                className="font-display text-sm font-bold uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Salon
              </TabsTrigger>
            </TabsList>

            <TabsContent value="barbershop" className="mt-10">
              <ServiceList category="barbershop" />
            </TabsContent>
            <TabsContent value="salon" className="mt-10">
              <ServiceList category="salon" />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <section className="border-t border-primary/20 bg-card/50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading eyebrow="Receipts" title="Gallery" align="center" description="A look at recent work from the chairs." />
          <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4">
            {galleryImages.map((img, i) => (
              <div
                key={i}
                className="hover-zoom group relative aspect-square overflow-hidden rounded-sm border border-primary/20 transition hover:border-primary"
              >
                <img src={img.src} alt={img.alt} loading="lazy" className="h-full w-full object-cover" />
                <div className="pointer-events-none absolute inset-0 ring-0 ring-primary/0 transition group-hover:ring-2 group-hover:ring-primary/60" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
