import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Phone, MapPin, Mail, MessageCircle, Scissors } from "lucide-react";
import { businessInfo } from "./data";

// TikTok lucide isn't always present; use inline svg
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.43a8.16 8.16 0 0 0 4.77 1.52V6.5a4.85 4.85 0 0 1-1.84-.19" />
    </svg>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-primary/30 bg-background">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2" aria-label="D&M Parlour home">
              <Scissors className="h-5 w-5 text-primary" strokeWidth={2.5} />
              <span className="font-display text-2xl font-bold tracking-wider">
                D<span className="text-primary">&amp;</span>M PARLOUR
              </span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Barbershop. Salon. One house. Sharp cuts and bold style in the heart of Ongata Rongai.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a href={businessInfo.instagram} aria-label="Instagram" className="text-foreground/70 transition hover:text-primary">
                <Instagram className="h-5 w-5" />
              </a>
              <a href={businessInfo.tiktok} aria-label="TikTok" className="text-foreground/70 transition hover:text-primary">
                <TikTokIcon className="h-5 w-5" />
              </a>
              <a href={businessInfo.facebook} aria-label="Facebook" className="text-foreground/70 transition hover:text-primary">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-widest text-primary">Visit</h3>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>{businessInfo.address}</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <a href={`tel:${businessInfo.phoneRaw}`} className="hover:text-foreground">{businessInfo.phone}</a>
              </li>
              <li className="flex items-start gap-2">
                <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <a href={businessInfo.whatsapp} className="hover:text-foreground">WhatsApp us</a>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <a href={`mailto:${businessInfo.email}`} className="hover:text-foreground">{businessInfo.email}</a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-widest text-primary">Hours</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {businessInfo.hours.map((h) => (
                <li key={h.day} className="flex justify-between gap-4">
                  <span className="text-foreground/90">{h.day}</span>
                  <span>{h.time}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Map */}
          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-widest text-primary">Find Us</h3>
            <div className="mt-4 aspect-video overflow-hidden rounded-sm border border-primary/30">
              <iframe
                title="Map of Ongata Rongai"
                src="https://www.google.com/maps?q=Ongata+Rongai,+Kenya&output=embed"
                className="h-full w-full grayscale"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-primary/20 pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} D&amp;M Parlour. All rights reserved.</p>
          <p className="font-display uppercase tracking-widest text-primary/80">Ongata Rongai · Kenya</p>
        </div>
      </div>
    </footer>
  );
}
