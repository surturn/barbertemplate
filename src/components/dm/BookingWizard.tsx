import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Check, ChevronLeft, ChevronRight, Calendar as CalIcon, User2, Sparkles, Phone, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

import { services, stylists, timeSlots, formatKES, type Service, type Stylist } from "./data";

const steps = [
  { id: 1, label: "Service", icon: Sparkles },
  { id: 2, label: "Stylist", icon: User2 },
  { id: 3, label: "Date & Time", icon: CalIcon },
  { id: 4, label: "Details", icon: Phone },
  { id: 5, label: "Confirm", icon: CheckCircle2 },
] as const;

export function BookingWizard({
  initialServiceId,
  initialStylistId,
}: {
  initialServiceId?: string;
  initialStylistId?: string;
}) {
  const navigate = useNavigate();
  const initialService = services.find((s) => s.id === initialServiceId);
  const initialStylist = stylists.find((s) => s.id === initialStylistId);

  // If stylist passed but no service, start at step 1 still; pre-pick category.
  const [step, setStep] = useState<number>(initialService ? 2 : 1);
  const [service, setService] = useState<Service | undefined>(initialService);
  const [stylist, setStylist] = useState<Stylist | undefined>(initialStylist);
  const [date, setDate] = useState<Date | undefined>();
  const [time, setTime] = useState<string | undefined>();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});

  const filteredStylists = service
    ? stylists.filter((s) => s.category === service.category)
    : stylists;

  function next() {
    if (step === 4) {
      const e: typeof errors = {};
      if (name.trim().length < 2) e.name = "Enter your full name";
      if (!/^\+?\d[\d\s]{7,}$/.test(phone.trim())) e.phone = "Enter a valid phone number";
      setErrors(e);
      if (Object.keys(e).length > 0) return;
      toast.success("Booking request received", {
        description: `We'll text ${phone} shortly to confirm.`,
      });
    }
    setStep((s) => Math.min(5, s + 1));
  }

  function back() {
    setStep((s) => Math.max(1, s - 1));
  }

  function reset() {
    setStep(1);
    setService(undefined);
    setStylist(undefined);
    setDate(undefined);
    setTime(undefined);
    setName("");
    setPhone("");
    setErrors({});
    navigate({ to: "/book", search: {} });
  }

  const canAdvance =
    (step === 1 && !!service) ||
    (step === 2 && !!stylist) ||
    (step === 3 && !!date && !!time) ||
    step === 4 ||
    step === 5;

  return (
    <div className="mx-auto max-w-4xl">
      {/* Progress */}
      <ol className="mb-10 grid grid-cols-5 gap-2">
        {steps.map((s) => {
          const active = step === s.id;
          const done = step > s.id;
          const Icon = s.icon;
          return (
            <li key={s.id} className="flex flex-col items-center gap-2">
              <div
                className={cn(
                  "grid h-10 w-10 place-items-center rounded-full border-2 transition",
                  done && "border-primary bg-primary text-primary-foreground",
                  active && "border-primary text-primary gold-glow",
                  !active && !done && "border-border text-muted-foreground",
                )}
              >
                {done ? <Check className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
              </div>
              <span
                className={cn(
                  "hidden text-[10px] font-display font-bold uppercase tracking-widest sm:block",
                  (active || done) ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {s.label}
              </span>
            </li>
          );
        })}
      </ol>

      <div className="rounded-sm border border-primary/20 bg-card p-6 sm:p-8">
        {step === 1 && (
          <StepWrap title="Choose a service" subtitle="Pick what you're coming in for.">
            {(["barbershop", "salon"] as const).map((cat) => (
              <div key={cat} className="mb-8 last:mb-0">
                <h4 className="mb-3 font-display text-sm font-bold uppercase tracking-widest text-primary">
                  {cat === "barbershop" ? "Barbershop" : "Salon"}
                </h4>
                <div className="grid gap-3 sm:grid-cols-2">
                  {services.filter((s) => s.category === cat).map((s) => {
                    const selected = service?.id === s.id;
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => {
                          setService(s);
                          // reset stylist if category changes
                          if (stylist && stylist.category !== s.category) setStylist(undefined);
                        }}
                        className={cn(
                          "group flex items-start justify-between gap-4 rounded-sm border p-4 text-left transition",
                          selected
                            ? "border-primary bg-primary/5 gold-glow"
                            : "border-border hover:border-primary/60",
                        )}
                      >
                        <div className="min-w-0">
                          <div className="font-display text-base font-bold uppercase tracking-wide">{s.name}</div>
                          <div className="mt-1 text-xs text-muted-foreground">{s.duration} min</div>
                        </div>
                        <div className="shrink-0 font-display text-sm font-bold text-primary">
                          {formatKES(s.price)}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </StepWrap>
        )}

        {step === 2 && (
          <StepWrap title="Choose your stylist" subtitle={service ? `Available for ${service.name}` : "Pick anyone."}>
            <div className="grid gap-4 sm:grid-cols-2">
              {filteredStylists.map((s) => {
                const selected = stylist?.id === s.id;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setStylist(s)}
                    className={cn(
                      "flex items-center gap-4 rounded-sm border p-4 text-left transition",
                      selected ? "border-primary bg-primary/5 gold-glow" : "border-border hover:border-primary/60",
                    )}
                  >
                    <img src={s.photo} alt={s.name} className="h-16 w-16 shrink-0 rounded-sm object-cover" />
                    <div className="min-w-0">
                      <div className="font-display text-base font-bold uppercase tracking-wide">{s.name}</div>
                      <div className="text-xs text-primary">{s.role}</div>
                      <div className="mt-1 truncate text-xs text-muted-foreground">{s.bio}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </StepWrap>
        )}

        {step === 3 && (
          <StepWrap title="Pick a date & time" subtitle="Greyed slots are already booked.">
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0))}
                  className={cn("rounded-sm border border-border bg-background p-3 pointer-events-auto")}
                />
              </div>
              <div>
                <Label className="font-display text-xs font-bold uppercase tracking-widest text-primary">
                  Time slot
                </Label>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {timeSlots.map((slot) => {
                    const selected = time === slot.time;
                    return (
                      <button
                        key={slot.time}
                        type="button"
                        disabled={!slot.available}
                        onClick={() => setTime(slot.time)}
                        className={cn(
                          "rounded-sm border px-2 py-2 text-xs font-semibold transition",
                          !slot.available && "cursor-not-allowed border-border/40 text-muted-foreground/40 line-through",
                          slot.available && !selected && "border-border hover:border-primary",
                          selected && "border-primary bg-primary text-primary-foreground",
                        )}
                      >
                        {slot.time}
                      </button>
                    );
                  })}
                </div>
                {date && time && (
                  <p className="mt-4 text-sm text-muted-foreground">
                    Selected: <span className="text-foreground">{format(date, "EEE, d MMM yyyy")} · {time}</span>
                  </p>
                )}
              </div>
            </div>
          </StepWrap>
        )}

        {step === 4 && (
          <StepWrap title="Your details" subtitle="We'll send a confirmation by SMS or WhatsApp.">
            <div className="grid max-w-lg gap-5">
              <div>
                <Label htmlFor="name">Full name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Mwangi"
                  className="mt-1"
                />
                {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
              </div>
              <div>
                <Label htmlFor="phone">Phone number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+254 712 345 678"
                  className="mt-1"
                />
                {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone}</p>}
              </div>
            </div>
          </StepWrap>
        )}

        {step === 5 && (
          <div className="py-6 text-center">
            <div className="mx-auto mb-6 grid h-20 w-20 place-items-center rounded-full border-2 border-primary text-primary gold-glow">
              <Check className="h-10 w-10" strokeWidth={3} />
            </div>
            <h3 className="font-display text-3xl font-bold uppercase tracking-wide">Booking confirmed</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Thanks {name.split(" ")[0]}! Your appointment is on the books.
            </p>

            <div className="mx-auto mt-8 max-w-md rounded-sm border border-primary/30 bg-background p-6 text-left">
              <SummaryRow label="Service" value={service ? `${service.name} · ${formatKES(service.price)}` : ""} />
              <SummaryRow label="Stylist" value={stylist?.name ?? ""} />
              <SummaryRow label="Date" value={date ? format(date, "EEE, d MMM yyyy") : ""} />
              <SummaryRow label="Time" value={time ?? ""} />
              <SummaryRow label="Contact" value={`${name} · ${phone}`} />
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button onClick={reset} variant="outline">Book another</Button>
              <Button asChild>
                <a href="/">Back to home</a>
              </Button>
            </div>
          </div>
        )}

        {/* Nav buttons */}
        {step < 5 && (
          <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-primary/20 pt-6">
            <Button
              variant="ghost"
              onClick={back}
              disabled={step === 1}
              className="font-display uppercase tracking-wider"
            >
              <ChevronLeft className="mr-1 h-4 w-4" /> Back
            </Button>

            {/* Summary chips */}
            <div className="hidden flex-wrap items-center gap-2 sm:flex">
              {service && <Badge variant="outline" className="border-primary/40 text-foreground">{service.name}</Badge>}
              {stylist && <Badge variant="outline" className="border-primary/40 text-foreground">{stylist.name}</Badge>}
              {date && <Badge variant="outline" className="border-primary/40 text-foreground">{format(date, "d MMM")}</Badge>}
              {time && <Badge variant="outline" className="border-primary/40 text-foreground">{time}</Badge>}
            </div>

            <Button
              onClick={next}
              disabled={!canAdvance}
              className="font-display uppercase tracking-wider"
            >
              {step === 4 ? "Confirm booking" : "Next"} <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

function StepWrap({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="font-display text-2xl font-bold uppercase tracking-wide">{title}</h3>
      {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
      <div className="mt-6">{children}</div>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-border/50 py-2 text-sm last:border-0">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-right font-medium text-foreground">{value}</span>
    </div>
  );
}
