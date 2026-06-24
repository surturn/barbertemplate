import { useEffect, useState, useCallback } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

import braids1 from "@/assets/Gallery/braids-1.jpg";
import braids2 from "@/assets/Gallery/braids-2.jpg";
import kids1 from "@/assets/Gallery/Kids-style1.jpg";
import kids2 from "@/assets/Gallery/KidsStyle-2.jpg";
import locs from "@/assets/Gallery/men-locs.jpg";
import men1 from "@/assets/Gallery/Men-style1.jpg";
import men2 from "@/assets/Gallery/men-stlye2.jpg";
import men3 from "@/assets/Gallery/men-style3.jpg";
import men4 from "@/assets/Gallery/men-style4.jpg";

type Slide = { src: string; title: string; tag: string };

const SLIDES: Slide[] = [
  { src: men1, title: "Skin Fade", tag: "Barbershop" },
  { src: braids2, title: "Stitch Braids", tag: "Salon" },
  { src: men4, title: "Beard Sculpt", tag: "Barbershop" },
  { src: braids1, title: "Knotless Braids", tag: "Salon" },
  { src: locs, title: "Loc Styling", tag: "Barbershop" },
  { src: kids1, title: "Kids Fresh", tag: "Kids" },
  { src: men3, title: "360 Waves", tag: "Barbershop" },
  { src: kids2, title: "Hair Design", tag: "Kids" },
  { src: men2, title: "Tapered Curls", tag: "Barbershop" },
];

function useWindowWidth() {
  const [width, setWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1024);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return width;
}

export function ArcCarouselHero() {
  const [active, setActive] = useState(Math.floor(SLIDES.length / 2));
  const [paused, setPaused] = useState(false);
  const width = useWindowWidth();

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setActive((a) => (a + 1) % SLIDES.length);
    }, 3800);
    return () => clearInterval(id);
  }, [paused]);

  const next = useCallback(() => setActive((a) => (a + 1) % SLIDES.length), []);
  const prev = useCallback(() => setActive((a) => (a - 1 + SLIDES.length) % SLIDES.length), []);

  // Responsive arc geometry
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;

  const ARC_STEP = isMobile ? 16 : isTablet ? 11 : 9;
  const RADIUS = isMobile ? 180 : isTablet ? 340 : 460;
  const CARD_W = isMobile ? 120 : isTablet ? 140 : 180;
  const CARD_H = isMobile ? 180 : isTablet ? 240 : 360;
  const CARD_RADIUS = isMobile ? 14 : isTablet ? 18 : 22;

  // Touch handling
  const [touchStart, setTouchStart] = useState(0);

  return (
    <section
      className="relative isolate overflow-hidden border-b border-primary/20"
      onTouchStart={(e) => {
        setTouchStart(e.touches[0].clientX);
        setPaused(true);
      }}
      onTouchEnd={(e) => {
        const diff = touchStart - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 40) {
          if (diff > 0) next();
          else prev();
        }
        setPaused(false);
      }}
    >
      {/* Background texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, hsl(var(--primary)/0.6) 1px, transparent 0)",
          backgroundSize: "22px 22px",
        }}
      />

      <div
        className="relative mx-auto min-h-[600px] max-w-[1400px] sm:min-h-[700px] lg:min-h-[780px]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* ===== ARC OF IMAGES — right side, all screens ===== */}
        <div className="pointer-events-none absolute inset-y-0 right-0 w-[65%] sm:w-[50%] lg:w-[55%]">
          {/* Subtle glow behind arc */}
          <div
            aria-hidden
            className="absolute -right-20 top-1/2 h-[600px] w-[600px] -translate-y-1/2 rounded-full bg-primary/10 blur-3xl sm:h-[700px] sm:w-[700px]"
          />

          <div className="relative h-full w-full">
            {SLIDES.map((s, i) => {
              const offset = i - active;
              const angle = offset * ARC_STEP;
              const isActive = i === active;
              const distance = Math.abs(offset);
              const opacity = distance > 4 ? 0 : 1 - distance * 0.15;
              const z = 100 - distance;
              const scale = isActive ? 1.06 : 1 - distance * 0.04;

              return (
                <button
                  key={s.title}
                  onClick={() => setActive(i)}
                  aria-label={s.title}
                  className="pointer-events-auto absolute left-0 top-1/2 transition-all duration-700 ease-out"
                  style={{
                    transform: `translateY(-50%) rotate(${angle}deg) translateX(${RADIUS}px) rotate(${-angle * 0.5}deg) translateX(-50%) scale(${scale})`,
                    zIndex: z,
                    opacity,
                  }}
                >
                  <div
                    className={`relative overflow-hidden border-2 transition-all duration-500 ${
                      isActive
                        ? "border-primary shadow-[0_12px_40px_-8px_oklch(0.74_0.13_85/0.45)]"
                        : "border-foreground/10"
                    }`}
                    style={{
                      width: CARD_W,
                      height: CARD_H,
                      borderRadius: CARD_RADIUS,
                    }}
                  >
                    <img
                      src={s.src}
                      alt={s.title}
                      className="h-full w-full object-cover"
                      loading={distance > 2 ? "lazy" : "eager"}
                    />
                    <div
                      className={`absolute inset-0 transition-opacity duration-500 ${
                        isActive
                          ? "bg-gradient-to-t from-foreground/70 via-transparent to-transparent"
                          : "bg-background/15"
                      }`}
                    />
                    {isActive && (
                      <div className="absolute inset-x-0 bottom-3 px-2 text-center sm:bottom-5 sm:px-4">
                        <div className="font-display text-[8px] font-semibold uppercase tracking-[0.2em] text-primary sm:text-[10px] sm:tracking-[0.3em]">
                          {s.tag}
                        </div>
                        <div className="mt-0.5 font-display text-xs font-bold uppercase tracking-wide text-background sm:mt-1 sm:text-base lg:text-lg">
                          {s.title}
                        </div>
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ===== LEFT CONTENT — text + featured list ===== */}
        <div className="relative z-[150] flex min-h-[600px] flex-col justify-between py-10 pl-5 pr-[45%] sm:min-h-[700px] sm:py-14 sm:pl-8 sm:pr-[52%] lg:min-h-[780px] lg:py-20 lg:pl-12 lg:pr-[56%]">
          {/* Header */}
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-background/60 px-2.5 py-1 backdrop-blur sm:gap-2 sm:px-3">
              <MapPin className="h-3 w-3 text-primary sm:h-3.5 sm:w-3.5" />
              <span className="font-display text-[8px] font-semibold uppercase tracking-[0.2em] text-foreground/90 sm:text-[10px] sm:tracking-[0.25em]">
                Ongata Rongai · Kenya
              </span>
            </div>

            <h1 className="mt-4 font-display text-3xl font-bold uppercase leading-[0.95] tracking-tight sm:mt-6 sm:text-5xl lg:text-6xl xl:text-7xl">
              D<span className="text-primary">&amp;</span>M
              <br />
              Parlour
            </h1>

            <div className="mt-3 flex items-center gap-3 sm:mt-5 sm:gap-4">
              <span className="h-px w-8 bg-primary sm:w-12" />
              <p className="font-display text-[9px] font-semibold uppercase tracking-[0.2em] text-primary sm:text-xs sm:tracking-[0.3em]">
                The Showcase
              </p>
            </div>

            <p className="mt-3 max-w-xs text-xs text-foreground/70 sm:mt-6 sm:max-w-md sm:text-sm lg:text-base">
              Signature cuts, braids and beard work from the chairs of Rongai's
              boldest unisex parlour.
            </p>
          </div>

          {/* Now Featured list — centered in the layout */}
          <ul className="relative mt-6 space-y-0 sm:mt-10">
            <li className="font-display text-[8px] font-semibold uppercase tracking-[0.25em] text-muted-foreground sm:text-[10px] sm:tracking-[0.3em]">
              Now Featured
            </li>
            {SLIDES.map((s, i) => {
              const isActive = i === active;
              return (
                <li key={s.title}>
                  <button
                    onClick={() => setActive(i)}
                    className={`group flex w-full items-center gap-2 border-b border-border/40 py-1.5 text-left transition-colors sm:gap-4 sm:py-2 ${
                      isActive ? "text-primary" : "text-foreground/60 hover:text-foreground"
                    }`}
                  >
                    <span
                      className={`font-display text-[10px] tabular-nums transition-opacity sm:text-xs ${
                        isActive ? "opacity-100" : "opacity-40"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1 truncate font-display text-xs font-semibold uppercase tracking-wide sm:text-base lg:text-lg">
                      {s.title}
                    </span>
                    <span
                      className={`hidden h-px transition-all duration-500 sm:block ${
                        isActive ? "w-8 bg-primary sm:w-10" : "w-3 bg-border group-hover:w-5 sm:w-4 sm:group-hover:w-6"
                      }`}
                    />
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Bottom — logo + CTA + counter */}
          <div className="relative mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-primary/20 pt-4 sm:mt-10 sm:gap-6 sm:pt-6">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-primary text-primary sm:h-12 sm:w-12">
                <span className="font-display text-xs font-bold sm:text-lg">D&amp;M</span>
              </div>
              <div className="min-w-0">
                <div className="font-display text-[10px] font-bold uppercase tracking-widest sm:text-sm">
                  D&amp;M Parlour
                </div>
                <div className="text-[8px] uppercase tracking-widest text-muted-foreground sm:text-[11px]">
                  Est. Rongai
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="font-display text-[10px] uppercase tracking-[0.2em] text-muted-foreground sm:text-xs sm:tracking-[0.3em]">
                <span className="text-primary">{String(active + 1).padStart(2, "0")}</span>
                <span className="mx-1 sm:mx-2">/</span>
                <span>{String(SLIDES.length).padStart(2, "0")}</span>
              </div>
              <Button asChild size="sm" className="h-8 font-display text-[10px] font-semibold uppercase tracking-wider gold-glow sm:h-10 sm:text-xs">
                <Link to="/book">
                  Book Now <ArrowRight className="ml-1.5 h-3.5 w-3.5 sm:ml-2 sm:h-4 sm:w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
