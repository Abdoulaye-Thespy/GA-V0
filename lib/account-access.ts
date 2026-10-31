/** Pure entitlement rules shared by UI, server actions, and API routes. */
export type AccountTier = "free" | "pro"
export type CourseCategory = "free-course" | "short-course" | "lab" | "exam"

export type CertificateAccessContext = {
  authenticated: boolean
  tier?: AccountTier
  certificatePurchased?: boolean
  courseCategory: CourseCategory
}

export type CertificateOffer =
  | { kind: "unavailable" }
  | { kind: "login-required" }
  | { kind: "included" }
  | { kind: "already-purchased" }
  | { kind: "purchase-single"; priceXaf: 5_000 }
  | { kind: "upgrade"; priceXaf: 15_000 }

/** The blog index and article details have different access rules. */
export function canReadBlogListing() {
  return true
}

export function canReadBlogArticle(authenticated: boolean) {
  return authenticated
}

export function canAccessCourse(tier: AccountTier, category: CourseCategory) {
  if (category === "free-course") return true
  if (category === "short-course" || category === "lab") return tier === "pro"
  return false
}

export function getCertificateOffer(context: CertificateAccessContext): CertificateOffer {
  if (context.courseCategory === "exam") return { kind: "unavailable" }
  if (!context.authenticated) return { kind: "login-required" }
  if (context.tier === "pro") return { kind: "included" }
  if (context.certificatePurchased) return { kind: "already-purchased" }
  return { kind: "purchase-single", priceXaf: 5_000 }
}

export function canDownloadCertificate(context: CertificateAccessContext) {
  const offer = getCertificateOffer(context)
  return offer.kind === "included" || offer.kind === "already-purchased"
}
