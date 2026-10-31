import { describe, expect, it } from "vitest"
import { CERTIFICATE_PRICE_XAF, PRO_LIFETIME_PRICE_XAF, canEnroll, canReadCourse, certificateAccessFor, courseAccessCatalog, isValidCourseAccess } from "@/lib/account-access"

const freeCourse = courseAccessCatalog[0]
const lab = courseAccessCatalog[2]
const exam = courseAccessCatalog[4]

describe("account and certificate access rules", () => {
  it("keeps the published XAF prices stable", () => {
    expect(CERTIFICATE_PRICE_XAF).toBe(5000)
    expect(PRO_LIFETIME_PRICE_XAF).toBe(15000)
  })

  it("allows public previews but protects paid course details", () => {
    expect(canReadCourse(null, freeCourse)).toBe(true)
    expect(canReadCourse(null, lab)).toBe(false)
    expect(canReadCourse("free", lab)).toBe(false)
    expect(canReadCourse("pro", lab)).toBe(true)
  })

  it("allows free enrollment only for explicitly free courses", () => {
    expect(canEnroll(null, freeCourse)).toBe(true)
    expect(canEnroll("free", lab)).toBe(false)
    expect(canEnroll("pro", lab)).toBe(true)
    expect(canEnroll("pro", exam)).toBe(false)
  })

  it("includes lab certificates for Pro and excludes exams", () => {
    expect(certificateAccessFor("pro", lab, false)).toBe("included")
    expect(certificateAccessFor("free", lab, false)).toBe("requires-payment")
    expect(certificateAccessFor("free", lab, true)).toBe("unit-purchase")
    expect(certificateAccessFor("pro", exam, true)).toBe("excluded")
  })

  it("rejects catalog records without explicit entitlement metadata", () => {
    expect(isValidCourseAccess({ slug: "missing-category", title: "Incomplete" })).toBe(false)
    expect(isValidCourseAccess(freeCourse)).toBe(true)
  })
})
