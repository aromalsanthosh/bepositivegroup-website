"use client";

import { useState } from "react";
import { CheckCircle, PaperPlaneTilt } from "@phosphor-icons/react";
import { brand, contact } from "@/content/site";

type Errors = Partial<Record<"name" | "email" | "interest" | "message", string>>;

const field =
  "lg-thin h-12 w-full rounded-[14px] px-4 text-[16px] text-white placeholder:text-muted/80 outline-none transition-shadow focus:shadow-[inset_0_0_0_1.5px_#7aa2ff]";

// Enquiry form. Until a backend is connected it composes the enquiry in the
// visitor's email app (as the approved prototype did). Labels sit above
// inputs; errors appear inline and the first invalid field gets focus.
export function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    const next: Errors = {};
    if (!data.name?.trim()) next.name = "Please enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(data.email ?? "")) next.email = "Please enter a valid email address.";
    if (!data.interest) next.interest = "Please choose an area.";
    if (!data.message?.trim()) next.message = "Please tell us about your requirement.";
    setErrors(next);
    const first = Object.keys(next)[0];
    if (first) {
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    const subject = `Enquiry: ${data.interest} from ${data.name}`;
    const body = [
      `Name: ${data.name}`,
      data.company && `Company: ${data.company}`,
      `Email: ${data.email}`,
      data.phone && `Phone: ${data.phone}`,
      data.country && `Country: ${data.country}`,
      `Interested in: ${data.interest}`,
      "",
      data.message,
    ]
      .filter(Boolean)
      .join("\n");
    window.location.href = `mailto:${brand.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const err = (k: keyof Errors) =>
    errors[k] ? (
      <p id={`${k}-error`} className="mt-1.5 text-[14px] text-[#ff9aa2]">
        {errors[k]}
      </p>
    ) : null;

  return (
    <form noValidate onSubmit={onSubmit} className="lg grid gap-5 rounded-[32px] p-6 sm:grid-cols-2 sm:p-8">
      <div>
        <label htmlFor="name" className="mb-2 block text-[14px] font-semibold text-silver">Name *</label>
        <input id="name" name="name" autoComplete="name" className={field} aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} />
        {err("name")}
      </div>
      <div>
        <label htmlFor="company" className="mb-2 block text-[14px] font-semibold text-silver">Company</label>
        <input id="company" name="company" autoComplete="organization" className={field} />
      </div>
      <div>
        <label htmlFor="email" className="mb-2 block text-[14px] font-semibold text-silver">Email *</label>
        <input id="email" name="email" type="email" autoComplete="email" spellCheck={false} className={field} aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} />
        {err("email")}
      </div>
      <div>
        <label htmlFor="phone" className="mb-2 block text-[14px] font-semibold text-silver">Phone</label>
        <input id="phone" name="phone" type="tel" autoComplete="tel" className={field} />
      </div>
      <div>
        <label htmlFor="country" className="mb-2 block text-[14px] font-semibold text-silver">Country</label>
        <select id="country" name="country" defaultValue="" className={`${field} appearance-none bg-[#0d1322]`}>
          <option value="">Select country</option>
          {contact.countries.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="interest" className="mb-2 block text-[14px] font-semibold text-silver">I&apos;m interested in *</label>
        <select id="interest" name="interest" defaultValue="" className={`${field} appearance-none bg-[#0d1322]`} aria-invalid={!!errors.interest} aria-describedby={errors.interest ? "interest-error" : undefined}>
          <option value="">Select an area</option>
          {contact.interests.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        {err("interest")}
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="message" className="mb-2 block text-[14px] font-semibold text-silver">Tell us about your requirement *</label>
        <textarea id="message" name="message" rows={5} className={`${field} h-auto py-3`} aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-error" : undefined} />
        {err("message")}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-4 sm:col-span-2">
        <p aria-live="polite" className="text-[14px] text-muted">
          {sent ? (
            <span className="inline-flex items-center gap-2 text-silver">
              <CheckCircle size={18} weight="fill" className="text-blue-bright" aria-hidden />
              Your email app should open with the enquiry ready to send.
            </span>
          ) : (
            "Opens your email app with the enquiry filled in."
          )}
        </p>
        <button type="submit" className="btn-glass-blue inline-flex h-12 items-center gap-2 rounded-full px-6 text-[15px] font-semibold active:translate-y-px">
          <PaperPlaneTilt size={18} aria-hidden />
          Send enquiry
        </button>
      </div>
    </form>
  );
}
