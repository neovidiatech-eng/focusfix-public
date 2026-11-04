export function egp(value: number | string | null | undefined): string {
  const n = Number(value || 0);
  return `${n.toLocaleString("en-US")} ج.م`;
}

export function feeLabel(fee: number | string | null | undefined): string {
  return Number(fee || 0) === 0 ? "انتقال مجاني" : `انتقال ${egp(fee)}`;
}

/** "13:00" → "1:00 م" */
export function to12h(time: string): string {
  const [h, m] = time.split(":").map(Number);
  const hour = h % 12 === 0 ? 12 : h % 12;
  return `${hour}:${String(m).padStart(2, "0")} ${h < 12 ? "ص" : "م"}`;
}

export function periodName(start: string): string {
  const h = Number(start.split(":")[0]);
  if (h < 12) return "الصبح";
  if (h < 16) return "الضهر";
  if (h < 19) return "العصر";
  return "بالليل";
}

export const WEEKDAYS_AR = ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];

/** Bookings are scheduled in Cairo time regardless of the visitor's device clock */
export function cairoToday(): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Africa/Cairo" }).format(new Date());
}

export function addDays(isoDate: string, days: number): string {
  const d = new Date(`${isoDate}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

export function arabicDate(isoDate: string, opts: Intl.DateTimeFormatOptions = { day: "numeric", month: "long" }): string {
  return new Intl.DateTimeFormat("ar-EG-u-nu-latn", { ...opts, timeZone: "UTC" }).format(new Date(`${isoDate.slice(0, 10)}T12:00:00Z`));
}

export function minutesLabel(min: number): string {
  return `${min} دقيقة`;
}

export function warrantyLabel(days: number): string {
  if (!days) return "بدون ضمان";
  if (days % 365 === 0) return days === 365 ? "ضمان سنة" : `ضمان ${days / 365} سنين`;
  if (days % 30 === 0) return days === 30 ? "ضمان شهر" : `ضمان ${days / 30} شهور`;
  return `ضمان ${days} يوم`;
}
