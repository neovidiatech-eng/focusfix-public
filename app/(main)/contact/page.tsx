import type { Metadata } from "next";
import { Phone, Mail, Clock } from "lucide-react";
import { PageHero, Container } from "@/src/components/ui/Section";
import { ContactForm } from "@/src/components/site/ContactForm";
import { WhatsAppIcon } from "@/src/components/site/WhatsAppIcon";
import { displayPhone, getSiteSettings, telHref, whatsappHref } from "@/src/shared/utils/settings";
import { to12h } from "@/src/lib/format";
import { SITE_URL } from "@/src/shared/utils/site";

export const metadata: Metadata = {
  title: "تواصل مع FocusFix",
  description: "كلمنا واتساب أو تليفون أو ابعتلنا رسالة، وهنرد عليك في أسرع وقت.",
  alternates: { canonical: `${SITE_URL}/contact` },
};

export default async function ContactPage() {
  const settings = await getSiteSettings();
  const channels = [
    { icon: WhatsAppIcon, label: "واتساب", value: "أسرع رد", href: whatsappHref(settings.whatsapp, "أهلاً FocusFix"), tone: "bg-[#1fa855] text-white" },
    { icon: Phone, label: "اتصل بينا", value: displayPhone(settings.phone), href: telHref(settings.phone), tone: "bg-brand-500 text-white" },
    { icon: Mail, label: "الإيميل", value: settings.supportEmail, href: `mailto:${settings.supportEmail}`, tone: "bg-ink text-white" },
  ];
  return (
    <>
      <PageHero crumbs={[{ label: "الرئيسية", href: "/" }, { label: "تواصل معانا" }]} eyebrow="تواصل معانا" title="عندك سؤال؟ إحنا هنا" desc="اختار الطريقة اللي تريحك، أو ابعتلنا رسالة وهنكلمك." />
      <Container className="grid gap-8 py-14 sm:py-20 lg:grid-cols-[1fr_1.3fr]">
        <div className="space-y-3">
          {channels.map((c) => (
            <a key={c.label} href={c.href} {...(c.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-soft ring-1 ring-ink/5 transition-transform hover:-translate-y-0.5">
              <span className={`grid h-12 w-12 place-items-center rounded-xl ${c.tone}`}><c.icon className="h-5 w-5" /></span>
              <span>
                <span className="block text-sm text-ink-3">{c.label}</span>
                <span className="num block font-semibold" dir="auto">{c.value}</span>
              </span>
            </a>
          ))}
          <p className="flex items-center gap-2 px-2 pt-2 text-ink-2">
            <Clock className="h-4 w-4" />
            <span className="num">بنرد من {to12h(settings.working_hours_start)} لـ {to12h(settings.working_hours_end)}</span>
          </p>
        </div>
        <ContactForm />
      </Container>
    </>
  );
}
