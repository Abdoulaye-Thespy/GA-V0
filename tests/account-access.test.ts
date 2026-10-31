import { describe, expect, it } from "vitest"
import { canAccessCourse, canDownloadCertificate, canReadBlogArticle, canReadBlogListing, getCertificateOffer } from "@/lib/account-access"

describe("course access by account tier", () => {
  it("keeps the blog listing public but requires login for full articles", () => {
    expect(canReadBlogListing()).toBe(true)
    expect(canReadBlogArticle(false)).toBe(false)
    expect(canReadBlogArticle(true)).toBe(true)
  })

  it("lets free accounts follow free courses", () => {
    expect(canAccessCourse("free", "free-course")).toBe(true)
  })

  it("reserves paid short courses and labs for pro accounts", () => {
    expect(canAccessCourse("free", "short-course")).toBe(false)
    expect(canAccessCourse("free", "lab")).toBe(false)
    expect(canAccessCourse("pro", "short-course")).toBe(true)
    expect(canAccessCourse("pro", "lab")).toBe(true)
  })

  it("keeps exam courses outside the pro offer", () => {
    expect(canAccessCourse("free", "exam")).toBe(false)
    expect(canAccessCourse("pro", "exam")).toBe(false)
  })
})

describe("certificate access and offers", () => {
  const shortCourse = { courseCategory: "short-course" as const }

  it("requires login before offering a certificate", () => {
    expect(getCertificateOffer({ authenticated: false, ...shortCourse })).toEqual({ kind: "login-required" })
    expect(canDownloadCertificate({ authenticated: false, ...shortCourse })).toBe(false)
  })

  it("offers a one-certificate purchase for 5,000 XAF to a free account", () => {
    expect(getCertificateOffer({ authenticated: true, tier: "free", ...shortCourse })).toEqual({ kind: "purchase-single", priceXaf: 5_000 })
    expect(canDownloadCertificate({ authenticated: true, tier: "free", ...shortCourse })).toBe(false)
  })

  it("unlocks the purchased certificate for its owner", () => {
    const context = { authenticated: true, tier: "free" as const, certificatePurchased: true, ...shortCourse }
    expect(getCertificateOffer(context)).toEqual({ kind: "already-purchased" })
    expect(canDownloadCertificate(context)).toBe(true)
  })

  it("includes certificates in the lifetime pro tier", () => {
    const context = { authenticated: true, tier: "pro" as const, ...shortCourse }
    expect(getCertificateOffer(context)).toEqual({ kind: "included" })
    expect(canDownloadCertificate(context)).toBe(true)
  })

  it("does not sell exam certificates through the pro or single-certificate offer", () => {
    expect(getCertificateOffer({ authenticated: true, tier: "pro", courseCategory: "exam" })).toEqual({ kind: "unavailable" })
    expect(getCertificateOffer({ authenticated: true, tier: "free", courseCategory: "exam" })).toEqual({ kind: "unavailable" })
    expect(canDownloadCertificate({ authenticated: true, tier: "pro", courseCategory: "exam" })).toBe(false)
  })
})
