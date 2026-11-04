/**
 * Photography from Unsplash (free licence, https://unsplash.com/license).
 * To swap in your own photos later, replace an id with a path under /public (e.g. "/team.jpg").
 */
export const PHOTOS = {
  heroRepair: "1639776739297-f7e1f21526f4", // gloved hands repairing an iPhone
  screwdriver: "1699550403361-27dee0f2a415",
  crackedOnMat: "1746005718004-1f992c399428", // cracked iPhone + tools on repair mat
  partsFlatlay: "1746005514011-ea00280f3b6e", // opened iPhone, battery visible
  openedPhone: "1746005514010-e7ab2bc3d210",
  repairMat: "1746005514014-2637647a26ee",
  crackedBack: "1706972612625-d5be9a7aadd8",
  twoIphones: "1758186374131-d542d2beae0c",
  watch: "1546868871-7041f2a55e12",
  watchWrist: "1434493789847-2f02dc6ca35d",
  ipads: "1759820941220-fed6a1010146",
  handIphone: "1677161842229-0b8324c1e461",
  womanPhone: "1567925034354-b1d753b4ba24",
  handsPhone: "1522125670776-3c7abb882bc2",
  technician: "1550041473-d296a3a8a18a",
} as const;

export function photo(idOrPath: string, width = 1200, height?: number): string {
  if (idOrPath.startsWith("/") || idOrPath.startsWith("http")) return idOrPath;
  const size = height ? `&h=${height}&fit=crop` : "";
  return `https://images.unsplash.com/photo-${idOrPath}?auto=format&q=75&w=${width}${size}`;
}

/** Best photo for a service, matched on its slug/name */
export function servicePhoto(slug: string): string {
  const s = slug.toLowerCase();
  if (s.includes("screen") || s.includes("شاش")) return PHOTOS.crackedOnMat;
  if (s.includes("battery") || s.includes("بطار")) return PHOTOS.partsFlatlay;
  if (s.includes("back") || s.includes("ظهر")) return PHOTOS.crackedBack;
  if (s.includes("camera") || s.includes("كامير")) return PHOTOS.twoIphones;
  if (s.includes("charg") || s.includes("port") || s.includes("شحن")) return PHOTOS.screwdriver;
  return PHOTOS.openedPhone;
}

export function deviceTypePhoto(slug: string): string {
  if (slug.includes("watch")) return PHOTOS.watch;
  if (slug.includes("ipad")) return PHOTOS.ipads;
  return PHOTOS.twoIphones;
}
