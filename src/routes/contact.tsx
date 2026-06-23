import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Phone, Mail, MessageCircle, Clock } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { SectionHeading } from "@/components/dm/SectionHeading";
import { businessInfo } from "@/components/dm/data";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — D&M Parlour | Ongata Rongai" },
      { name: "description", content: "Visit D&M Parlour in Ongata Rongai, Kenya. Address, phone, WhatsApp, opening hours and contact form." },
      { property: "og:title", content: "Contact D&M Parlour" },
      { property: "og:description", content: "Address, phone, WhatsApp and opening hours for D&M Parlour, Ongata Rongai." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HairSalon",
          name: "D&M Parlour",
          telephone: businessInfo.phoneRaw,
          email: businessInfo.email,
          address: {
            "@type": "PostalAddress",
            streetAddress: "Maasai Mall",
            addressLocality: "Ongata Rongai",
            addressRegion: "Kajiado",
            addressCountry: "KE",
          },
          openingHours: ["Mo-Fr 09:00-20:00", "Sa 08:00-21:00", "Su 10:00-18:00"],
        }),
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all fields");
      return;
    }
    toast.success("Message sent", { description: "We'll get back to you within a day." });
    setForm({ name: "", email: "", message: "" });
  }

  return (
    <>
      <section className="border-b border-primary/20 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Drop In"
            title="Get In Touch"
            description="Slide into the DMs, ring the chair or just walk in. We're easy to find."
          />
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2">
          {/* Info + map */}
          <div>
            <div className="grid gap-4 sm:grid-cols-2">
              <ContactCard icon={<MapPin className="h-5 w-5" />} label="Address" value={businessInfo.address} />
              <ContactCard icon={<Phone className="h-5 w-5" />} label="Phone" value={businessInfo.phone} href={`tel:${businessInfo.phoneRaw}`} />
              <ContactCard icon={<MessageCircle className="h-5 w-5" />} label="WhatsApp" value="Chat with us" href={businessInfo.whatsapp} />
              <ContactCard icon={<Mail className="h-5 w-5" />} label="Email" value={businessInfo.email} href={`mailto:${businessInfo.email}`} />
            </div>

            <div className="mt-8 rounded-sm border border-primary/30 bg-card p-6">
              <div className="flex items-center gap-2 font-display text-sm font-bold uppercase tracking-widest text-primary">
                <Clock className="h-4 w-4" /> Opening Hours
              </div>
              <ul className="mt-4 space-y-2">
                {businessInfo.hours.map((h) => (
                  <li key={h.day} className="flex justify-between border-b border-border/40 py-2 text-sm last:border-0">
                    <span className="font-display font-semibold uppercase tracking-wide text-foreground">{h.day}</span>
                    <span className="text-muted-foreground">{h.time}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 aspect-video overflow-hidden rounded-sm border border-primary/30">
              <iframe
                title="D&M Parlour location"
                src="https://www.google.com/maps?q=Ongata+Rongai,+Kenya&output=embed"
                className="h-full w-full grayscale"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Form */}
          <div>
            <div className="rounded-sm border border-primary/30 bg-card p-6 sm:p-8">
              <h3 className="font-display text-2xl font-bold uppercase tracking-wide">Send a message</h3>
              <p className="mt-1 text-sm text-muted-foreground">For collabs, group bookings or general questions.</p>

              <form onSubmit={handleSubmit} className="mt-6 grid gap-5">
                <div>
                  <Label htmlFor="cname">Name</Label>
                  <Input
                    id="cname"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your name"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="cemail">Email</Label>
                  <Input
                    id="cemail"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@example.com"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="cmsg">Message</Label>
                  <Textarea
                    id="cmsg"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="How can we help?"
                    rows={5}
                    className="mt-1"
                  />
                </div>
                <Button type="submit" className="font-display font-semibold uppercase tracking-wider">
                  Send message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ContactCard({
  icon, label, value, href,
}: { icon: React.ReactNode; label: string; value: string; href?: string }) {
  const inner = (
    <div className="rounded-sm border border-primary/30 bg-card p-5 transition hover:border-primary">
      <div className="flex items-center gap-2 text-primary">{icon}<span className="font-display text-xs font-bold uppercase tracking-widest">{label}</span></div>
      <div className="mt-2 text-sm text-foreground">{value}</div>
    </div>
  );
  return href ? <a href={href} className="block">{inner}</a> : inner;
}
