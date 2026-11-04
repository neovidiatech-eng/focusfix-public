import ClientPage from "./ClientPage";

// Server Component — metadata + JSON-LD live in layout.tsx
// ClientPage is a client component but is still server-rendered so crawlers get the full HTML
export default function HomePage() {
  return <ClientPage />;
}
