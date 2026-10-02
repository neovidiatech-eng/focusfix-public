import DynamicLoader from "./DynamicLoader";

// Server Component — metadata + JSON-LD live in layout.tsx
// The actual interactive content loads client-side via DynamicLoader
export default function HomePage() {
  return <DynamicLoader />;
}
