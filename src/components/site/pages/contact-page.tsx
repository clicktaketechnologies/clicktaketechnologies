'use client'

import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail, Phone, MapPin, Clock, CheckCircle2, MessageSquare,
  Calendar, Send, X, AlertCircle, MessageCircle,
} from "lucide-react";
import{
  NxPageLayout, NxPageHero, NxPageSection, NxSectionHeader, NxButton} from "../nx-page-layout";
// v6: 3D scene removed // import { Nx3DScene } from "../nx-3d-scene";
// v6: 3D character removed // import { Nx3DCharacter } from "../nx-3d-character";
// v6: story scene removed // import { NxStoryScene } from "../nx-story-scene";
import { TiltCard } from "@/components/site/tilt-card";
import { TurnstileWidget } from "../turnstile-widget";
import { FloatingInput, validators } from "@/components/site/enhanced/floating-input";
import { toast } from "sonner";
import {
  inquirySchema,
  bookingSchema,
  type InquiryFormValues,
  type BookingFormValues,
} from "@/lib/contact-schema";
import { OFFICES, CONTACT_METHODS, CONTACT_BENEFITS, BOOKING_TIMES, getBookingDates } from "@/lib/site-data";

const ICONS: Record<string, any> = { MessageCircle, Phone, Mail, MapPin, Clock };

export function ContactPage() {
  // ─── Inquiry form ───
  const {
    register: registerInquiry,
    handleSubmit: handleInquiryFormSubmit,
    formState: { errors: inquiryErrors, isSubmitting: inquirySubmitting },
    setValue: setInquiryValue,
    watch: watchInquiry,
    reset: resetInquiryForm,
  } = useForm<InquiryFormValues>({
    resolver: zodResolver(inquirySchema),
    defaultValues: { service: "Web Dev", budget: "£5,000 - £10,000" },
  });

  const [inquirySuccess, setInquirySuccess] = useState(false);
  const [inquiryResetTrigger, setInquiryResetTrigger] = useState(0);
  const [submittedInquiryName, setSubmittedInquiryName] = useState("");
  const [submittedInquiryEmail, setSubmittedInquiryEmail] = useState("");

  const onInquirySubmit = async (values: InquiryFormValues) => {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind: "inquiry", data: values }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Submission failed");

      setSubmittedInquiryName(values.name);
      setSubmittedInquiryEmail(values.email);
      setInquirySuccess(true);
      resetInquiryForm();
    } catch (err: any) {
      toast.error(err.message || "Something went wrong. Please try again.");
      setInquiryResetTrigger((n) => n + 1);
      setInquiryValue("turnstileToken", "");
    }
  };

  // ─── Booking form ───
  const bookingDates = useMemo(() => getBookingDates(), []);
  const {
    register: registerBooking,
    handleSubmit: handleBookingFormSubmit,
    formState: { errors: bookingErrors, isSubmitting: bookingSubmitting },
    setValue: setBookingValue,
    reset: resetBookingForm,
    watch: watchBooking,
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      date: `${bookingDates[0].day}, ${bookingDates[0].num} ${bookingDates[0].month}`,
      time: BOOKING_TIMES[0],
    },
  });

  const [selectedDateIdx, setSelectedDateIdx] = useState(0);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingResetTrigger, setBookingResetTrigger] = useState(0);
  const [submittedBooking, setSubmittedBooking] = useState({ name: "", email: "", date: "", time: "" });
  const selectedTime = watchBooking("time");

  const onBookingSubmit = async (values: BookingFormValues) => {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind: "booking", data: values }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Booking failed");

      setSubmittedBooking({ name: values.name, email: values.email, date: values.date, time: values.time });
      setBookingSuccess(true);
      resetBookingForm();
    } catch (err: any) {
      toast.error(err.message || "Something went wrong. Please try again.");
      setBookingResetTrigger((n) => n + 1);
      setBookingValue("turnstileToken", "");
    }
  };

  // ─── Floating chat ───
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<Array<{ sender: "user" | "agent"; text: string }>>([
    { sender: "agent", text: "Hey! Zain here from ClickTake. What digital challenge can we help you solve today?" },
  ]);

  const sendChatMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const userMsg = chatInput;
    setChatMessages((prev) => [...prev, { sender: "user", text: userMsg }]);
    setChatInput("");
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          sender: "agent",
          text: "Thanks for reaching out! A specialist will get in touch with you shortly, or feel free to book a direct call on our scheduler above.",
        },
      ]);
    }, 1500);
  };

  return (
    <NxPageLayout>
        {/* v6: 3D scenes removed — solid editorial background */}
        {/* <NxStoryScene variant="contact" /> */}
        {/* <div className="pointer-events-none absolute right-0 top-24 lg:top-32 xl:top-40 z-[5] hidden lg:block" aria-hidden="true">
          <Nx3DCharacter variant="contact" size="md" />
        </div> */}
        {/* <Nx3DScene density="low" /> */}

              {/* HERO */}
        <section className="relative overflow-hidden py-12 lg:py-16">
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* v6: ambient orbs removed — solid charcoal background */}
          </div>

          <div className="relative mx-auto max-w-7xl px-4 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center gap-2 rounded-[8px] border border-[#EC4899]/30 bg-transparent px-4 py-1.5 text-xs mb-6">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400" />
                Get in Touch
              </div>
              <h1 className="font-display text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
                Let&apos;s start the <span className="text-[#EC4899]">conversation.</span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                Submit a project inquiry or book a discovery call directly on our calendar.
                Our team follows up within 24 hours.
              </p>
            </motion.div>
          </div>
        </section>

        {/* OFFICES */}
        <section className="mx-auto max-w-7xl px-4 mt-8">
          <div className="grid gap-4 md:grid-cols-3">
            {OFFICES.map((o, i) => (
              <motion.div
                key={o.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group rounded-2xl border border-border/40 bg-[#14141A] p-5 transition-all hover:border-[#EC4899]/30"
              >
                <div className="flex items-start gap-3">
                  <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#EC4899]/15 text-[#EC4899]`}>
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">{o.label}</div>
                    <div className="mt-2 text-sm leading-relaxed text-foreground">{o.addr}</div>
                    <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Phone className="h-3 w-3" /> {o.phone}
                    </div>
                    <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" /> {o.hours}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FORMS */}
        <section className="mx-auto max-w-7xl px-4 mt-16">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* INQUIRY FORM */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="relative overflow-hidden rounded-3xl border border-border/60 bg-[#14141A] p-6 lg:p-8"
            >
              {/* v6: ambient orb removed */}
              <div className="relative">
                <div className="flex items-center gap-2 mb-6">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#EC4899] text-white">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="font-display text-xl font-bold">Project Inquiry</h2>
                    <p className="text-xs text-muted-foreground">Tell us about your project — we respond within 24 hours.</p>
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {inquirySuccess ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="rounded-2xl border border-green-500/30 bg-green-500/5 p-6 text-center"
                    >
                      <CheckCircle2 className="mx-auto h-12 w-12 text-green-500" />
                      <h3 className="mt-4 text-lg font-bold">Thanks, {submittedInquiryName}!</h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        We&apos;ve received your inquiry and sent a confirmation to {submittedInquiryEmail}.
                        A senior team member will be in touch within 24 hours.
                      </p>
                      <button
                        onClick={() => setInquirySuccess(false)}
                        className="mt-4 text-xs underline text-muted-foreground hover:text-foreground"
                      >
                        Submit another inquiry
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleInquiryFormSubmit(onInquirySubmit)}
                      className="space-y-4"
                    >
                      <div className="grid gap-4 sm:grid-cols-2">
                        <FloatingInput
                          id="inquiry-name"
                          label="Name"
                          value={watchInquiry("name") || ""}
                          onChange={(v) => setInquiryValue("name", v, { shouldValidate: true })}
                          required
                          autoComplete="name"
                          draftKey="inquiry-name"
                          validate={validators.required("Name")}
                          touched={!!inquiryErrors.name}
                          placeholder="Jane Doe"
                        />
                        <FloatingInput
                          id="inquiry-email"
                          label="Email"
                          type="email"
                          value={watchInquiry("email") || ""}
                          onChange={(v) => setInquiryValue("email", v, { shouldValidate: true })}
                          required
                          autoComplete="email"
                          draftKey="inquiry-email"
                          validate={(v) => validators.required("Email")(v) || validators.email(v)}
                          touched={!!inquiryErrors.email}
                          placeholder="jane@company.com"
                        />
                      </div>

                      <FloatingInput
                        id="inquiry-company"
                        label="Company (optional)"
                        value={watchInquiry("company") || ""}
                        onChange={(v) => setInquiryValue("company", v)}
                        autoComplete="organization"
                        placeholder="Acme Inc."
                      />

                      <div className="grid gap-4 sm:grid-cols-2">
                        <Field label="Service" error={inquiryErrors.service?.message}>
                          <select {...registerInquiry("service")} className="input-base">
                            <option>Web Dev</option>
                            <option>AI Solutions</option>
                            <option>SEO Marketing</option>
                            <option>Creative Branding</option>
                            <option>Starter Kit</option>
                          </select>
                        </Field>
                        <Field label="Budget" error={inquiryErrors.budget?.message}>
                          <select {...registerInquiry("budget")} className="input-base">
                            <option>Under £5,000</option>
                            <option>£5,000 - £10,000</option>
                            <option>£10,000 - £25,000</option>
                            <option>£25,000+</option>
                          </select>
                        </Field>
                      </div>

                      <FloatingInput
                        id="inquiry-message"
                        label="Project details"
                        multiline
                        rows={4}
                        value={watchInquiry("message") || ""}
                        onChange={(v) => setInquiryValue("message", v, { shouldValidate: true })}
                        required
                        maxLength={2000}
                        draftKey="inquiry-message"
                        validate={validators.required("Project details")}
                        touched={!!inquiryErrors.message}
                        placeholder="Tell us about your goals, timeline, and any constraints..."
                      />

                      <Field label="Verification" error={inquiryErrors.turnstileToken?.message}>
                        <TurnstileWidget
                          onChange={(t) => setInquiryValue("turnstileToken", t)}
                          resetTrigger={inquiryResetTrigger}
                        />
                      </Field>

                      <button
                        type="submit"
                        disabled={inquirySubmitting}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#EC4899] px-6 py-3 font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5 transition"
                      >
                        {inquirySubmitting ? "Sending..." : "Send Inquiry"} <Send className="h-4 w-4" />
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* BOOKING FORM */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="relative overflow-hidden rounded-3xl border border-border/60 bg-[#14141A] p-6 lg:p-8"
            >
              {/* v6: ambient orb removed */}
              <div className="relative">
                <div className="flex items-center gap-2 mb-6">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#EC4899] text-white">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="font-display text-xl font-bold">Book a Discovery Call</h2>
                    <p className="text-xs text-muted-foreground">30 minutes — free, no obligation.</p>
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {bookingSuccess ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="rounded-2xl border border-green-500/30 bg-green-500/5 p-6 text-center"
                    >
                      <CheckCircle2 className="mx-auto h-12 w-12 text-green-500" />
                      <h3 className="mt-4 text-lg font-bold">Booked, {submittedBooking.name}!</h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        We&apos;ve sent a calendar invite to {submittedBooking.email} for{" "}
                        <strong>{submittedBooking.date} at {submittedBooking.time}</strong>.
                      </p>
                      <button
                        onClick={() => setBookingSuccess(false)}
                        className="mt-4 text-xs underline text-muted-foreground hover:text-foreground"
                      >
                        Book another slot
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleBookingFormSubmit(onBookingSubmit)}
                      className="space-y-4"
                    >
                      <FloatingInput
                        id="booking-name"
                        label="Name"
                        value={watchBooking("name") || ""}
                        onChange={(v) => setBookingValue("name", v, { shouldValidate: true })}
                        required
                        autoComplete="name"
                        draftKey="booking-name"
                        validate={validators.required("Name")}
                        touched={!!bookingErrors.name}
                        placeholder="Jane Doe"
                      />
                      <FloatingInput
                        id="booking-email"
                        label="Email"
                        type="email"
                        value={watchBooking("email") || ""}
                        onChange={(v) => setBookingValue("email", v, { shouldValidate: true })}
                        required
                        autoComplete="email"
                        draftKey="booking-email"
                        validate={(v) => validators.required("Email")(v) || validators.email(v)}
                        touched={!!bookingErrors.email}
                        placeholder="jane@company.com"
                      />

                      {/* Date picker — v5: bumped day/month label contrast for AA */}
                      <Field label="Select a date" error={bookingErrors.date?.message}>
                        <div className="grid grid-cols-5 gap-2">
                          {bookingDates.map((d, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => {
                                setSelectedDateIdx(idx);
                                setBookingValue("date", `${d.day}, ${d.num} ${d.month}`);
                              }}
                              className={`rounded-xl border p-3 text-center transition ${
                                selectedDateIdx === idx
                                  ? "border-primary bg-primary/10 text-foreground"
                                  : "border-border bg-card/40 hover:border-primary/40"
                              }`}
                            >
                              <div className="text-[10px] uppercase tracking-wider text-foreground/70 dark:text-white/85">{d.day}</div>
                              <div className="text-base font-bold">{d.num}</div>
                              <div className="text-[10px] text-foreground/70 dark:text-white/85">{d.month}</div>
                            </button>
                          ))}
                        </div>
                      </Field>

                      <Field label="Select a time" error={bookingErrors.time?.message}>
                        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                          {BOOKING_TIMES.map((t) => (
                            <button
                              key={t}
                              type="button"
                              onClick={() => setBookingValue("time", t)}
                              className={`rounded-lg border px-3 py-2 text-xs font-medium transition ${
                                selectedTime === t
                                  ? "border-primary bg-primary/10 text-foreground"
                                  : "border-border bg-card/40 hover:border-primary/40"
                              }`}
                            >
                              {t}
                            </button>
                          ))}
                        </div>
                      </Field>

                      <Field label="Verification" error={bookingErrors.turnstileToken?.message}>
                        <TurnstileWidget
                          onChange={(t) => setBookingValue("turnstileToken", t)}
                          resetTrigger={bookingResetTrigger}
                        />
                      </Field>

                      <button
                        type="submit"
                        disabled={bookingSubmitting}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#EC4899] px-6 py-3 font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5 transition"
                      >
                        {bookingSubmitting ? "Booking..." : "Confirm Booking"} <Calendar className="h-4 w-4" />
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </section>

        {/* BENEFITS / CONTACT METHODS */}
        <section className="mx-auto max-w-7xl px-4 mt-16">
          <div className="grid gap-6 md:grid-cols-3">
            {CONTACT_METHODS.map((m, i) => {
              const Icon = ICONS[m.icon] || Mail;
              return (
                <motion.div
                  key={m.href}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <TiltCard
                    className="group/tilt flex items-center gap-4 overflow-hidden rounded-2xl border border-border/60 bg-[#14141A] p-4 transition-colors duration-300 hover:border-[#EC4899]/40"
                    glow={true}
                    shine={true}
                    maxTilt={8}
                  >
                    <a href={m.href} target="_blank" rel="noreferrer" className="contents">
                      <div className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-[#EC4899]/15 text-[#EC4899]`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">{m.label}</div>
                        <div className="mt-1 truncate font-medium text-foreground">{m.value}</div>
                      </div>
                    </a>
                  </TiltCard>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {CONTACT_BENEFITS.map((b) => (
              <div key={b} className="flex items-center gap-3 text-sm text-muted-foreground rounded-xl border border-border/40 bg-card/30 p-3">
                <CheckCircle2 className="h-4 w-4 text-primary" /> {b}
              </div>
            ))}
          </div>
        </section>

      {/* FLOATING CHAT — v5: gradient border + multi-layer glow + idle pulse */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        <AnimatePresence>
          {chatOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="w-[20rem] max-w-[calc(100vw-3rem)] rounded-2xl border border-border bg-[#14141A] shadow-2xl overflow-hidden"
            >
              <div className="bg-[#EC4899] p-4 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold">Chat with us</div>
                    <div className="text-xs opacity-80">Typically replies in a few minutes</div>
                  </div>
                  <button onClick={() => setChatOpen(false)} className="rounded-full hover:bg-white/20 hover:text-white p-1" aria-label="Close chat">
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="h-64 overflow-y-auto p-3 space-y-2">
                {chatMessages.map((m, i) => (
                  <div
                    key={i}
                    className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-3 py-2 text-xs ${
                        m.sender === "user"
                          ? "bg-primary text-white"
                          : "bg-secondary text-foreground"
                      }`}
                    >
                      {m.text}
                    </div>
                  </div>
                ))}
              </div>
              <form onSubmit={sendChatMessage} className="border-t border-border p-2 flex gap-2">
                <input
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 bg-transparent text-sm outline-none px-2"
                />
                <button type="submit" className="rounded-lg bg-primary px-3 py-1 text-xs font-semibold text-white">
                  Send
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setChatOpen(!chatOpen)}
          className="nx-fab-v5 group grid h-14 w-14 place-items-center rounded-full text-white transition-transform duration-200 hover:scale-110 active:scale-95"
          aria-label={chatOpen ? "Close chat" : "Open chat"}
        >
          {/* Inner gradient core */}
          <span className="absolute inset-0 rounded-full bg-[#EC4899]" />
          {/* Glossy highlight */}
          <span className="absolute inset-0 rounded-full bg-white/10" />
          {/* Idle pulse ring (hidden when open) */}
          {!chatOpen && (
            <span className="absolute inset-0 rounded-full bg-[#EC4899]/60 animate-ping opacity-40" aria-hidden />
          )}
          {/* Icon */}
          <span className="relative z-10">
            {chatOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
          </span>
        </button>
      </div>
    </NxPageLayout>
  );
}

// ─── Reusable Field wrapper — v5: bumped label contrast for AA on dark ───
function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-semibold uppercase tracking-widest text-foreground/80 dark:text-white/85 mb-2">
        {label}
      </label>
      {children}
      {error && (
        <div className="mt-1.5 flex items-center gap-1.5 text-xs text-red-400">
          <AlertCircle className="h-3 w-3" /> {error}
        </div>
      )}
    </div>
  );
}
