import { API_BASE_URL } from "./site";

/** Public settings managed from the dashboard (Settings page) */
export interface SiteSettings {
  phone: string;
  whatsapp: string;
  supportEmail: string;
  working_hours_start: string;
  working_hours_end: string;
  booking_days_ahead: string;
  banner_enabled: string;
  banner_text: string;
  banner_text_en: string;
  banner_badge: string;
  banner_badge_en: string;
  banner_link: string;
  banner_bg_color: string;
  [key: string]: string;
}

export const DEFAULT_SETTINGS: SiteSettings = {
  phone: "+201009911934",
  whatsapp: "201009911934",
  supportEmail: "support@focusfix.net",
  working_hours_start: "10:00",
  working_hours_end: "22:00",
  booking_days_ahead: "7",
  banner_enabled: "true",
  banner_text: "",
  banner_text_en: "",
  banner_badge: "",
  banner_badge_en: "",
  banner_link: "/book",
  banner_bg_color: "from-amber-500 via-amber-400 to-amber-500",
};

/** Server-side fetch, cached and refreshed when the dashboard saves settings (tag "settings") */
export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const res = await fetch(`${API_BASE_URL}/settings/public`, { next: { revalidate: 300, tags: ["settings"] } });
    if (res.ok) return { ...DEFAULT_SETTINGS, ...(await res.json()) };
  } catch {
    // API unreachable during build — fall back to defaults
  }
  return DEFAULT_SETTINGS;
}

/** "+201009911934" → "01009911934" (how Egyptians write it) */
export function displayPhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  return digits.startsWith("20") ? `0${digits.slice(2)}` : digits;
}

export function telHref(phone: string): string {
  return `tel:+${phone.replace(/\D/g, "").replace(/^0/, "20")}`;
}

export function whatsappHref(whatsapp: string, text?: string): string {
  const digits = whatsapp.replace(/\D/g, "").replace(/^0/, "20");
  return `https://wa.me/${digits}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
}
