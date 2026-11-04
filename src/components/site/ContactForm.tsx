"use client";

import { useState } from "react";
import { Loader2, Check, AlertCircle } from "lucide-react";
import { Button } from "@/src/components/ui/Button";
import { API_BASE_URL } from "@/src/shared/utils/site";
import { cn } from "@/src/shared/utils/utils";

const inputClass = "w-full rounded-xl bg-white px-4 text-[16px] ring-1 ring-line outline-none placeholder:text-ink-3 focus:ring-2 focus:ring-brand-400";

/** Saves to the dashboard's Messages inbox (POST /contact) */
export function ContactForm() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name.trim().length < 2) return (setError("اكتب اسمك"), setState("error"));
    if (!/^01[0125][0-9]{8}$/.test(form.phone.trim())) return (setError("رقم الموبايل لازم يكون 11 رقم ويبدأ بـ 01"), setState("error"));
    if (form.message.trim().length < 5) return (setError("اكتب رسالتك"), setState("error"));
    setState("sending");
    try {
      const res = await fetch(`${API_BASE_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name.trim(), phone: form.phone.trim(), message: form.message.trim(), locale: "ar" }),
      });
      if (!res.ok) throw new Error();
      setState("sent");
    } catch {
      setError("مقدرناش نبعت الرسالة. جرّب تاني أو كلمنا واتساب.");
      setState("error");
    }
  };

  if (state === "sent") {
    return (
      <div className="grid place-items-center rounded-[1.75rem] bg-white p-10 text-center shadow-soft ring-1 ring-ink/5">
        <span className="grid h-14 w-14 place-items-center rounded-full bg-[#12a150] text-white"><Check className="h-7 w-7" /></span>
        <h2 className="mt-4 text-xl font-semibold">رسالتك وصلت</h2>
        <p className="mt-1 text-ink-2">هنرد عليك على رقم موبايلك في أقرب وقت.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4 rounded-[1.75rem] bg-white p-6 shadow-soft ring-1 ring-ink/5 sm:p-8" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-ink-2">اسمك</span>
          <input value={form.name} onChange={set("name")} autoComplete="name" className={cn(inputClass, "h-12")} />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-ink-2">رقم الموبايل</span>
          <input value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value.replace(/[^\d]/g, "").slice(0, 11) }))} inputMode="numeric" dir="ltr" placeholder="01xxxxxxxxx" autoComplete="tel-national" className={cn(inputClass, "num h-12 text-start")} />
        </label>
      </div>
      <label className="block">
        <span className="mb-2 block text-sm font-semibold text-ink-2">رسالتك</span>
        <textarea value={form.message} onChange={set("message")} rows={4} placeholder="قولنا محتاج إيه…" className={cn(inputClass, "py-3")} />
      </label>
      {state === "error" && (
        <p role="alert" className="flex items-start gap-2 rounded-xl bg-red-50 p-3 text-sm text-red-700"><AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />{error}</p>
      )}
      <Button type="submit" size="lg" className="w-full" disabled={state === "sending"}>
        {state === "sending" && <Loader2 className="h-5 w-5 animate-spin" />}
        ابعت الرسالة
      </Button>
    </form>
  );
}
