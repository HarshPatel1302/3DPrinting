"use client";

import { useCallback, useState } from "react";
import { CONTACT } from "@/lib/constants";
import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

type FormState = {
  name: string;
  phone: string;
  email: string;
  printType: string;
  material: string;
  quantity: string;
  sizeEstimate: string;
  color: string;
  strength: string;
  deadline: string;
  message: string;
};

const initial: FormState = {
  name: "",
  phone: "",
  email: "",
  printType: "",
  material: "",
  quantity: "",
  sizeEstimate: "",
  color: "",
  strength: "",
  deadline: "",
  message: "",
};

function isValidEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

type Status = "idle" | "loading" | "ok" | "err";

export function QuoteForm() {
  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>(
    {},
  );
  const [status, setStatus] = useState<Status>("idle");
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const set = useCallback(<K extends keyof FormState>(k: K, v: FormState[K]) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  }, []);

  function validate(): boolean {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) e.name = "Name is required.";
    if (!form.phone.trim()) e.phone = "Phone or WhatsApp is required.";
    if (!form.email.trim()) e.email = "Email is required.";
    else if (!isValidEmail(form.email)) e.email = "Enter a valid email.";
    if (!form.printType.trim()) e.printType = "Select or describe print type.";
    if (!form.material.trim()) e.material = "Material preference helps us quote.";
    if (!form.quantity.trim()) e.quantity = "Quantity is required.";
    if (!form.message.trim()) e.message = "Tell us a bit about the project.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    setStatusMessage(null);
    if (!validate()) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await res.json().catch(() => null)) as {
        ok?: boolean;
        message?: string;
        error?: string;
      } | null;
      if (!res.ok || !data?.ok) {
        throw new Error(data?.error ?? "Submission failed");
      }
      setStatus("ok");
      setStatusMessage(
        data.message ?? "Thanks — your quote request has been sent.",
      );
      setForm(initial);
    } catch (e) {
      setStatus("err");
      setStatusMessage(
        e instanceof Error ? e.message : "Something went wrong.",
      );
    }
  }

  return (
    <section
      id="quote"
      className="scroll-mt-24 md:scroll-mt-28 border-y border-white/5 bg-black/30 px-4 py-20 sm:px-6 lg:px-10"
      aria-labelledby="quote-heading"
    >
      <div className="mx-auto max-w-3xl">
        <SectionHeader
          eyebrow="Estimate"
          titleId="quote-heading"
          title="Tell us what you are building."
          subtitle={`Fill in the details and hit submit — it will email everything to ${CONTACT.email} for a follow-up.`}
          align="center"
          className="mx-auto max-w-2xl text-center"
        />
        <form
          onSubmit={onSubmit}
          className="mt-10 space-y-5 rounded-3xl border border-white/10 glass-panel p-6 sm:p-8"
          noValidate
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="qf-name">Name</Label>
              <Input
                id="qf-name"
                name="name"
                autoComplete="name"
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "err-name" : undefined}
              />
              {errors.name && (
                <p id="err-name" className="text-xs text-destructive">
                  {errors.name}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="qf-phone">Phone / WhatsApp</Label>
              <Input
                id="qf-phone"
                name="tel"
                type="tel"
                autoComplete="tel"
                placeholder={CONTACT.phone}
                value={form.phone}
                onChange={(e) => set("phone", e.target.value)}
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? "err-phone" : undefined}
              />
              {errors.phone && (
                <p id="err-phone" className="text-xs text-destructive">
                  {errors.phone}
                </p>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="qf-email">Email</Label>
            <Input
              id="qf-email"
              name="email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "err-email" : undefined}
            />
            {errors.email && (
              <p id="err-email" className="text-xs text-destructive">
                {errors.email}
              </p>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="qf-type">Print type</Label>
              <select
                id="qf-type"
                name="printType"
                value={form.printType}
                onChange={(e) => set("printType", e.target.value)}
                className={cn(
                  "flex h-10 w-full rounded-lg border border-input bg-input/30 px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50",
                  !form.printType && "text-muted-foreground",
                )}
                aria-invalid={!!errors.printType}
              >
                <option value="">Select type</option>
                <option value="Prototype">Prototype</option>
                <option value="Functional part">Functional part</option>
                <option value="Miniature / display">Miniature / display</option>
                <option value="Replacement part">Replacement part</option>
                <option value="Batch / small run">Batch / small run</option>
                <option value="Gift / custom">Gift / custom</option>
                <option value="Other">Other</option>
              </select>
              {errors.printType && (
                <p className="text-xs text-destructive">{errors.printType}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="qf-material">Material preference</Label>
              <select
                id="qf-material"
                name="material"
                value={form.material}
                onChange={(e) => set("material", e.target.value)}
                className={cn(
                  "flex h-10 w-full rounded-lg border border-input bg-input/30 px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50",
                  !form.material && "text-muted-foreground",
                )}
                aria-invalid={!!errors.material}
              >
                <option value="">Select material</option>
                <option value="PLA">PLA</option>
                <option value="PLA+">PLA+</option>
                <option value="PETG">PETG</option>
                <option value="TPU">TPU</option>
                <option value="ABS / ASA">ABS / ASA</option>
                <option value="Multi-color (AMS)">Multi-color (AMS)</option>
                <option value="Not sure — recommend">Not sure — recommend</option>
              </select>
              {errors.material && (
                <p className="text-xs text-destructive">{errors.material}</p>
              )}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="qf-qty">Quantity</Label>
              <Input
                id="qf-qty"
                name="quantity"
                inputMode="numeric"
                value={form.quantity}
                onChange={(e) => set("quantity", e.target.value)}
                aria-invalid={!!errors.quantity}
              />
              {errors.quantity && (
                <p className="text-xs text-destructive">{errors.quantity}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="qf-size">Size estimate</Label>
              <Input
                id="qf-size"
                name="sizeEstimate"
                placeholder="e.g. 120×80×40 mm"
                value={form.sizeEstimate}
                onChange={(e) => set("sizeEstimate", e.target.value)}
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="qf-color">Color preference</Label>
              <Input
                id="qf-color"
                name="color"
                placeholder="e.g. Black matte, brand orange"
                value={form.color}
                onChange={(e) => set("color", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="qf-strength">Strength requirement</Label>
              <Input
                id="qf-strength"
                name="strength"
                placeholder="e.g. Load-bearing bracket"
                value={form.strength}
                onChange={(e) => set("strength", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="qf-deadline">Deadline</Label>
            <Input
              id="qf-deadline"
              name="deadline"
              type="date"
              value={form.deadline}
              onChange={(e) => set("deadline", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="qf-msg">Message</Label>
            <Textarea
              id="qf-msg"
              name="message"
              rows={4}
              value={form.message}
              onChange={(e) => set("message", e.target.value)}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "err-msg" : undefined}
              placeholder="Context, tolerance needs, surface expectations, references…"
            />
            {errors.message && (
              <p id="err-msg" className="text-xs text-destructive">
                {errors.message}
              </p>
            )}
          </div>

          <p className="text-sm text-muted-foreground">
            Final pricing depends on model size, material, print time, weight,
            finishing, and complexity.
          </p>

          <div className="flex flex-col items-center gap-3">
            <Button
              type="submit"
              size="lg"
              disabled={status === "loading"}
              className="rounded-full bg-filament-cyan px-10 text-carbon shadow-[0_0_24px_-8px_var(--filament-cyan)] hover:bg-filament-cyan/90 disabled:opacity-70"
            >
              {status === "loading" ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Mail className="mr-2 h-4 w-4" />
              )}
              {status === "loading" ? "Sending…" : "Submit"}
            </Button>
            {status === "ok" && statusMessage ? (
              <p
                className="text-sm text-filament-green"
                role="status"
                aria-live="polite"
              >
                {statusMessage}
              </p>
            ) : null}
            {status === "err" && statusMessage ? (
              <p className="text-sm text-destructive" role="alert">
                {statusMessage}
              </p>
            ) : null}
          </div>
        </form>
      </div>
    </section>
  );
}
