"use client";

import { useCallback, useState } from "react";
import { CONTACT, waMeLink, mailtoQuote } from "@/lib/constants";
import { SectionHeader } from "@/components/SectionHeader";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, MessageCircle, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { FileDropzone } from "@/components/quote/FileDropzone";

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

export function QuoteForm() {
  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>(
    {},
  );
  const [quoteFiles, setQuoteFiles] = useState<File[]>([]);
  const [serverStatus, setServerStatus] = useState<
    "idle" | "loading" | "ok" | "err"
  >("idle");
  const [serverMessage, setServerMessage] = useState<string | null>(null);

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

  function buildSummary() {
    return [
      `Name: ${form.name}`,
      `Phone/WhatsApp: ${form.phone}`,
      `Email: ${form.email}`,
      `Print type: ${form.printType}`,
      `Material: ${form.material}`,
      `Quantity: ${form.quantity}`,
      `Size estimate: ${form.sizeEstimate || "—"}`,
      `Color: ${form.color || "—"}`,
      `Strength needs: ${form.strength || "—"}`,
      `Deadline: ${form.deadline || "—"}`,
      `Files: ${
        quoteFiles.length
          ? quoteFiles.map((f) => f.name).join(", ")
          : "Will attach via WhatsApp/email"
      }`,
      "",
      form.message,
    ].join("\n");
  }

  function sendEmailDraft() {
    if (!validate()) return;
    const summary = buildSummary();
    const subj = `Quote request — ${CONTACT.businessName}`;
    window.location.href = mailtoQuote(subj, summary);
  }

  function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (!validate()) return;
    const summary = buildSummary();
    window.open(waMeLink(summary), "_blank", "noopener,noreferrer");
  }

  async function submitToServer() {
    setServerMessage(null);
    if (!validate()) return;
    if (quoteFiles.length === 0) {
      setServerStatus("err");
      setServerMessage(
        "Add at least one file to submit here, or use WhatsApp / email instead.",
      );
      return;
    }
    setServerStatus("loading");
    const fd = new FormData();
    fd.append("objective", form.printType);
    fd.append("material", form.material);
    fd.append(
      "toleranceNotes",
      [
        `Qty: ${form.quantity}`,
        form.sizeEstimate && `Size: ${form.sizeEstimate}`,
        form.color && `Color: ${form.color}`,
        form.strength && `Strength: ${form.strength}`,
        form.deadline && `Deadline: ${form.deadline}`,
      ]
        .filter(Boolean)
        .join(" · "),
    );
    fd.append("name", form.name.trim());
    fd.append("email", form.email.trim());
    fd.append("phone", form.phone.trim());
    fd.append("notes", form.message.trim());
    quoteFiles.forEach((f) => fd.append("files", f));

    try {
      const res = await fetch("/api/quote", { method: "POST", body: fd });
      const data = (await res.json().catch(() => null)) as {
        ok?: boolean;
        message?: string;
        error?: string;
      } | null;
      if (!res.ok) {
        throw new Error(data?.error ?? "Submission failed");
      }
      setServerStatus("ok");
      setServerMessage(data?.message ?? "Received — we will follow up soon.");
      setQuoteFiles([]);
    } catch (e) {
      setServerStatus("err");
      setServerMessage(
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
          subtitle="We validate on your device, then you can send via WhatsApp or email — or upload CAD files here for a logged intake while you wire email/CRM later."
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

          <div className="space-y-2">
            <Label>File upload (optional)</Label>
            <FileDropzone files={quoteFiles} onChange={setQuoteFiles} />
            <p className="text-xs text-muted-foreground">
              Server intake logs metadata in development — replace with email or
              cloud storage in production. WhatsApp and mailto work without
              uploads.
            </p>

            {serverStatus === "ok" && serverMessage ? (
              <p className="text-sm text-filament-green" role="status">
                {serverMessage}
              </p>
            ) : null}
            {serverStatus === "err" && serverMessage ? (
              <p className="text-sm text-destructive" role="alert">
                {serverMessage}
              </p>
            ) : null}
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

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button
              type="submit"
              size="lg"
              className="rounded-full bg-filament-cyan text-carbon shadow-[0_0_24px_-8px_var(--filament-cyan)] hover:bg-filament-cyan/90"
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              Send via WhatsApp
            </Button>
            <Button
              type="button"
              size="lg"
              variant="secondary"
              className="rounded-full border border-white/15"
              disabled={serverStatus === "loading"}
              onClick={() => void submitToServer()}
            >
              {serverStatus === "loading" ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Submit files (server log)
            </Button>
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="rounded-full"
              onClick={sendEmailDraft}
            >
              <Mail className="mr-2 h-4 w-4" />
              Prefill email instead
            </Button>
            <a
              href={waMeLink()}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "rounded-full")}
            >
              Open WhatsApp only
            </a>
            <a
              href={`mailto:${CONTACT.email}`}
              className={cn(buttonVariants({ variant: "ghost", size: "lg" }), "rounded-full")}
            >
              <Mail className="mr-2 h-4 w-4" />
              Email only
            </a>
          </div>
        </form>
      </div>
    </section>
  );
}
