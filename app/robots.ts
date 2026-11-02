import { MetadataRoute } from "next";
import { SITE_URL } from "@/src/shared/utils/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/book/success"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
