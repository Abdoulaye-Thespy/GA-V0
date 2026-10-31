export type AccountTier = "free" | "pro"
export type CourseCategory = "free-course" | "short-course" | "lab" | "exam"
export type CertificateAccess = "included" | "unit-purchase" | "excluded"

export type CourseAccess = {
  slug: string
  title: string
  category: CourseCategory
  certificateAccess: CertificateAccess
  freePreview: boolean
}

export const CERTIFICATE_PRICE_XAF = 5_000
export const PRO_LIFETIME_PRICE_XAF = 15_000

export const courseAccessCatalog: readonly CourseAccess[] = [
  { slug: "ai-fluency-free", title: "AI Fluency pour étudiants", category: "free-course", certificateAccess: "unit-purchase", freePreview: true },
  { slug: "ai-fluency-enseignants", title: "AI Fluency pour enseignants", category: "free-course", certificateAccess: "unit-purchase", freePreview: true },
  { slug: "local-llm-docker-ollama", title: "Lab Docker + Ollama", category: "lab", certificateAccess: "included", freePreview: false },
  { slug: "ai-fluency-dirigeants", title: "AI Fluency pour dirigeants", category: "short-course", certificateAccess: "included", freePreview: false },
  { slug: "dqp-developpeur-web", title: "Développeur Web", category: "exam", certificateAccess: "excluded", freePreview: false },
]

export function getCourseAccess(slug: string) {
  return courseAccessCatalog.find((course) => course.slug === slug) ?? null
}

export function canReadCourse(tier: AccountTier | null, course: CourseAccess) {
  if (course.freePreview || course.category === "free-course") return true
  return tier === "pro" && course.category !== "exam"
}

export function canEnroll(tier: AccountTier | null, course: CourseAccess) {
  return course.category === "free-course" || (tier === "pro" && course.category !== "exam")
}

export function certificateAccessFor(tier: AccountTier | null, course: CourseAccess, hasUnitPurchase: boolean) {
  if (course.category === "exam" || course.certificateAccess === "excluded") return "excluded" as const
  if (tier === "pro" && course.certificateAccess === "included") return "included" as const
  if (hasUnitPurchase || (tier === "free" && course.category === "free-course")) return "unit-purchase" as const
  return "requires-payment" as const
}

export function isValidCourseAccess(course: Partial<CourseAccess>): course is CourseAccess {
  return Boolean(course.slug && course.title && course.category && course.certificateAccess && typeof course.freePreview === "boolean")
}
