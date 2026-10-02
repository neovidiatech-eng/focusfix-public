"use client";

import dynamic from "next/dynamic";

// ssr: false is only allowed inside a Client Component in Next.js 15
const ClientPage = dynamic(() => import("./ClientPage"), {
  ssr: false,
  loading: () => <div className="min-h-screen bg-slate-50" />,
});

export default function DynamicLoader() {
  return <ClientPage />;
}
