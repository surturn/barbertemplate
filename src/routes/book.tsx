import { createFileRoute } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { SectionHeading } from "@/components/dm/SectionHeading";
import { BookingWizard } from "@/components/dm/BookingWizard";

const bookSearchSchema = z.object({
  service: fallback(z.string().optional(), undefined),
  stylist: fallback(z.string().optional(), undefined),
});

export const Route = createFileRoute("/book")({
  validateSearch: zodValidator(bookSearchSchema),
  head: () => ({
    meta: [
      { title: "Book Now — D&M Parlour | Ongata Rongai" },
      { name: "description", content: "Book your barbershop or salon appointment at D&M Parlour, Ongata Rongai. Pick a service, stylist, date and time in under a minute." },
      { property: "og:title", content: "Book Now — D&M Parlour" },
      { property: "og:description", content: "Book your appointment at D&M Parlour, Ongata Rongai." },
      { property: "og:url", content: "/book" },
    ],
    links: [{ rel: "canonical", href: "/book" }],
  }),
  component: BookPage,
});

function BookPage() {
  const { service, stylist } = Route.useSearch();
  return (
    <>
      <section className="border-b border-primary/20 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Reserve Your Chair"
            title="Book An Appointment"
            description="Five quick steps. No deposit. We'll confirm by SMS."
            align="center"
          />
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <BookingWizard initialServiceId={service} initialStylistId={stylist} />
        </div>
      </section>
    </>
  );
}
