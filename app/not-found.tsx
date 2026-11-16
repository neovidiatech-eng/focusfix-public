import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";
import { Container } from "@/src/components/ui/Section";
import { ButtonLink } from "@/src/components/ui/Button";
import MainLayout from "./(main)/layout";

// Unknown URLs render here, outside the (main) group, so wrap with the site chrome
export default function NotFound() {
  return (
    <MainLayout>
      <section className="grain flex min-h-[70vh] items-center pt-28 pb-20">
        <Container className="max-w-xl text-center">
          <p className="num font-display text-7xl font-bold text-brand-500">404</p>
          <h1 className="mt-4 text-3xl font-bold">الصفحة دي مش موجودة</h1>
          <p className="mt-3 text-lg text-ink-2">يمكن اللينك اتغير أو اتكتب غلط. جرّب من هنا:</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href="/book" size="lg">احجز فني <ArrowLeft className="h-4 w-4" /></ButtonLink>
            <ButtonLink href="/" variant="outline" size="lg">الرئيسية</ButtonLink>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm font-semibold text-brand-600">
            <Link href="/prices" className="hover:underline">الأسعار</Link>
            <Link href="/areas" className="hover:underline">المناطق</Link>
            <Link href="/track" className="inline-flex items-center gap-1 hover:underline"><Search className="h-4 w-4" />تتبع حجزك</Link>
          </div>
        </Container>
      </section>
    </MainLayout>
  );
}
