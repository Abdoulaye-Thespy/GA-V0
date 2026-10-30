import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://globalacademy.cm"
  return { rules: [{ userAgent: "*", allow: "/", disallow: ["/api/", "/certificates/"] }], sitemap: `${baseUrl}/sitemap.xml` }
}
