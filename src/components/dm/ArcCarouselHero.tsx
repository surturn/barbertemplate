import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ChevronUp, ChevronDown, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

import braids1 from "@/assets/carousel/braids-1.jpg.asset.json";
import braids2 from "@/assets/carousel/braids-2.jpg.asset.json";
import kids1 from "@/assets/carousel/Kids-style1.jpg.asset.json";
import kids2 from "@/assets/carousel/KidsStyle-2.jpg.asset.json";
import locs from "@/assets/carousel/men-locs.jpg.asset.json";
import men1 from "@/assets/carousel/Men-style1.jpg.asset.json";
import men2 from "@/assets/carousel/men-stlye2.jpg.asset.json";
import men3 from "@/assets/carousel/men-style3.jpg.asset.json";
import men4 from "@/assets/carousel/men-style4.jpg.asset.json";

type Slide = { src: string; title: string; tag: string };

const SLIDES: Slide[] = [
  { src: men1.url, title: "Skin Fade", tag: "Barbershop" },
  { src: braids2.url, title: "Stitch Braids", tag: "Salon" },
  { src: men4.url, title: "Beard Sculpt", tag: "Barbershop" },
  { src: braids1.url, title: "Knotless Braids", tag: "Salon" },
  { src: locs.url, title: "Loc Styling", tag: "Barbershop" },
  { src: kids1.url, title: "Kids Fresh", tag: "Kids" },
  { src: men3.url, title: "360 Waves", tag: "Barbershop" },
  { src: kids2.url, title: "Hair Design", tag: "Kids" },
  { src: men2.url, title: "Tapered Curls", tag: "Barbershop" },
];

export function ArcCarouselHero() {
  const [active, setActive] = useState(Math.floor(SLIDES.length / 2));
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setActive((a) => (a + 1) % SLIDES.length);
    }, 3800);
    return () => clearInterval(id);
  }, [paused]);

  const next = () => setActive((a) => (a + 1) % SLIDES.length);
  const prev = () => setActive((a) => (a - 1 + SLIDES.length) % SLIDES.length);

  // Arc geometry — center sits off-screen left, cards fan along right edge.
  const ARC_STEP = 9; // degrees between cards
  const RADIUS = 460; // px

  return (
    <section className="relative isolate overflow-hidden border-b border-primary/20">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 lg:grid-cols-[45fr_55fr]">
        {/* LEFT — text column */}
        <div className="relative flex flex-col justify-between overflow-hidden px-6 py-16 sm:px-10 lg:min-h-[760px] lg:py-20">
          {/* Subtle texture */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, hsl(var(--primary)/0.6) 1px, transparent 0)",
              backgroundSize: "22px 22px",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -left-32 top-1/3 h-[460px] w-[460px] rounded-full bg-primary/10 blur-3xl"
          />

          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-background/60 px-3 py-1 backdrop-blur">
              <MapPin className="h-3.5 w-3.5 text-primary" />
              <span className="font-display text-[10px] font-semibold uppercase tracking-[0.25em] text-foreground/90">
                Ongata Rongai · Kenya
              </span>
            </div>

            <h1 className="mt-6 font-display text-5xl font-bold uppercase leading-[0.95] tracking-tight sm:text-6xl xl:text-7xl">
              D<span className="text-primary">&amp;</span>M
              <br />
              Parlour
            </h1>

            <div className="mt-5 flex items-center gap-4">
              <span className="h-px w-12 bg-primary" />
              <p className="font-display text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                The Showcase
              </p>
            </div>

            <p className="mt-6 max-w-md text-sm text-foreground/75 sm:text-base">
              Signature cuts, braids and beard work from the chairs of Rongai's
              boldest unisex parlour.
            </p>
          </div>

          {/* Featured list */}
          <ul className="relative mt-12 space-y-1">
            <li className="font-display text-[10px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              Now Featured
            </li>
            {SLIDES.map((s, i) => {
              const isActive = i === active;
              return (
                <li key={s.title}>
                  <button
                    onClick={() => setActive(i)}
                    className={`group flex w-full items-center gap-4 border-b border-border/60 py-2 text-left transition-colors ${
                      isActive ? "text-primary" : "text-foreground/70 hover:text-foreground"
                    }`}
                  >
                    <span
                      className={`font-display text-xs tabular-nums transition-opacity ${
                        isActive ? "opacity-100" : "opacity-50"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1 truncate font-display text-base font-semibold uppercase tracking-wide sm:text-lg">
                      {s.title}
                    </span>
                    <span
                      className={`h-px transition-all duration-500 ${
                        isActive ? "w-10 bg-primary" : "w-4 bg-border group-hover:w-6"
                      }`}
                    />
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Bottom logo slot + CTA */}
          <div className="relative mt-12 flex flex-wrap items-center justify-between gap-6 border-t border-primary/20 pt-6">
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-primary text-primary">
                <span className="font-display text-lg font-bold">D&amp;M</span>
              </div>
              <div className="min-w-0">
                <div className="font-display text-sm font-bold uppercase tracking-widest">
                  D&amp;M Parlour
                </div>
                <div className="text-[11px] uppercase tracking-widest text-muted-foreground">
                  Est. Rongai
                </div>
              </div>
            </div>
            <Button asChild size="lg" className="font-display text-xs font-semibold uppercase tracking-wider gold-glow">
              <Link to="/book">
                Book Now <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        {/* RIGHT — arc carousel */}
        <div
          className="relative min-h-[560px] overflow-hidden bg-gradient-to-br from-card via-background to-background lg:min-h-[760px]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-40 top-1/2 h-[700px] w-[700px] -translate-y-1/2 rounded-full bg-primary/10 blur-3xl"
          />

          {/* Desktop arc */}
          <div className="hidden h-full w-full lg:block">
            <div className="relative h-full w-full">
              {SLIDES.map((s, i) => {
                const offset = i - active;
                const angle = offset * ARC_STEP;
                const isActive = i === active;
                const distance = Math.abs(offset);
                const opacity = distance > 4 ? 0 : 1 - distance * 0.12;
                const z = 100 - distance;
                const scale = isActive ? 1.08 : 1 - distance * 0.05;
                return (
                  <button
                    key={s.title}
                    onClick={() => setActive(i)}
                    aria-label={s.title}
                    className="absolute left-0 top-1/2 transition-all duration-700 ease-out"
                    style={{
                      transform: `translateY(-50%) rotate(${angle}deg) translateX(${RADIUS}px) rotate(${-angle * 0.55}deg) translateX(-50%) scale(${scale})`,
                      zIndex: z,
                      opacity,
                    }}
                  >
                    <div
                      className={`relative h-[360px] w-[180px] overflow-hidden rounded-[140px] border transition-all duration-500 ${
                        isActive
                          ? "border-primary shadow-[0_20px_60px_-10px_hsl(var(--primary)/0.45)]"
                          : "border-primary/15"
                      }`}
                      style={{
                        clipPath:
                          "polygon(20% 0%, 80% 0%, 100% 50%, 80% 100%, 20% 100%, 0% 50%)",
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
                            ? "bg-gradient-to-t from-background/80 via-background/10 to-transparent"
                            : "bg-background/15"
                        }`}
                      />
                      {isActive && (
                        <div className="absolute inset-x-0 bottom-6 px-5 text-center">
                          <div className="font-display text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">
                            {s.tag}
                          </div>
                          <div className="mt-1 font-display text-lg font-bold uppercase tracking-wide text-foreground">
                            {s.title}
                          </div>
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}

              {/* Controls */}
              <div className="absolute right-8 top-1/2 z-[200] flex -translate-y-1/2 flex-col gap-3">
                <button
                  onClick={prev}
                  aria-label="Previous"
                  className="grid h-11 w-11 place-items-center rounded-full border border-primary/40 bg-background/70 text-primary backdrop-blur transition hover:border-primary hover:gold-glow"
                >
                  <ChevronUp className="h-5 w-5" />
                </button>
                <button
                  onClick={next}
                  aria-label="Next"
                  className="grid h-11 w-11 place-items-center rounded-full border border-primary/40 bg-background/70 text-primary backdrop-blur transition hover:border-primary hover:gold-glow"
                >
                  <ChevronDown className="h-5 w-5" />
                </button>
              </div>

              {/* index counter */}
              <div className="absolute bottom-8 left-8 z-[200] font-display text-xs uppercase tracking-[0.3em] text-muted-foreground">
                <span className="text-primary">{String(active + 1).padStart(2, "0")}</span>
                <span className="mx-2">/</span>
                <span>{String(SLIDES.length).padStart(2, "0")}</span>
              </div>
            </div>
          </div>

          {/* Mobile / tablet — horizontal snap carousel */}
          <div className="lg:hidden">
            <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 py-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {SLIDES.map((s, i) => (
                <button
                  key={s.title}
                  onClick={() => setActive(i)}
                  className={`relative h-[420px] w-[240px] shrink-0 snap-center overflow-hidden rounded-[120px] border transition ${
                    i === active ? "border-primary gold-glow" : "border-primary/20"
                  }`}
                  style={{
                    clipPath:
                      "polygon(20% 0%, 80% 0%, 100% 50%, 80% 100%, 20% 100%, 0% 50%)",
                  }}
                >
                  <img src={s.src} alt={s.title} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                  <div className="absolute inset-x-0 bottom-5 px-4 text-center">
                    <div className="font-display text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">
                      {s.tag}
                    </div>
                    <div className="mt-1 font-display text-base font-bold uppercase tracking-wide">
                      {s.title}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
