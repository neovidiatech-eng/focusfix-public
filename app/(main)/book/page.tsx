import type { Metadata } from "next";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import { Container } from "@/src/components/ui/Section";
import { BookingFlow } from "@/src/components/book/BookingFlow";
import { getAllPriceMatrices, getAreas } from "@/src/lib/api";
import { SITE_URL } from "@/src/shared/utils/site";

export const metadata: Metadata = {
  title: "احجز فني صيانة آيفون في البيت | FocusFix",
  description: "احجز فني FocusFix في دقيقة: اختار جهازك والعطل والميعاد، والفني يوصلك ويصلح قدامك بقطع أصلية وضمان.",
  alternates: { canonical: `${SITE_URL}/book` },
};

export default async function BookPage() {
  const [catalog, areas] = await Promise.all([getAllPriceMatrices(), getAreas()]);
  return (
    <div className="grain min-h-screen pt-24 pb-32 sm:pt-32 lg:pb-20">
      <Container className="max-w-5xl">
        <h1 className="mb-6 text-3xl font-bold sm:text-4xl">احجز فني FocusFix</h1>
        <Suspense fallback={<div className="grid h-80 place-items-center"><Loader2 className="h-6 w-6 animate-spin text-brand-500" /></div>}>
          <BookingFlow catalog={catalog} areas={areas} />
        </Suspense>
      </Container>
    </div>
  );
}
