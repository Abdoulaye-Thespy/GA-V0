import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://globalacademy.cm"
  return ["/", "/blog", "/blog/local-llm-docker-ollama", "/courses/ai-fluency", "/programs", "/community", "/register"].map((path) => ({ url: `${baseUrl}${path}`, lastModified: new Date(), changeFrequency: path === "/courses/ai-fluency" ? "weekly" : "monthly", priority: path === "/" ? 1 : 0.7 }))
}
