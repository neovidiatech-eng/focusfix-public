import { Header } from "@/src/components/site/Header";
import { Footer } from "@/src/components/site/Footer";
import { MobileDock } from "@/src/components/site/MobileDock";
import { AnnouncementBar } from "@/src/components/site/AnnouncementBar";
import { getSiteSettings } from "@/src/shared/utils/settings";

export default async function MainLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings();
  const hasBanner = settings.banner_enabled === "true" && !!settings.banner_text;
  return (
    <div className="relative min-h-screen">
      <AnnouncementBar settings={settings} />
      <Header hasBanner={hasBanner} />
      <main className={hasBanner ? "pt-9" : undefined}>{children}</main>
      <Footer settings={settings} />
      <MobileDock />
    </div>
  );
}
