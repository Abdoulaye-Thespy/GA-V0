import { beforeEach, describe, expect, it, vi } from "vitest"
import { sanitizeCertificateName } from "@/lib/certificate-validation"

const insert = vi.hoisted(() => vi.fn(() => ({ values: vi.fn().mockResolvedValue(undefined) })))
vi.mock("@/lib/db", () => ({ db: { insert } }))
vi.mock("@/lib/certificates", () => ({ certificates: {}, createCertificateToken: () => "test-token-123" }))
vi.mock("@/lib/academy-data", () => ({ academyAccreditation: "Arrêté/Order N° 000325 / MINFOP/SG/DFOP/SDGSF/CSACD/CBAC" }))

import { POST } from "@/app/api/certificates/lab-completion/route"

describe("certificate name validation", () => {
  it("trims valid names", () => expect(sanitizeCertificateName("  Ada Lovelace  ")).toBe("Ada Lovelace"))
  it("rejects missing, short, and oversized values", () => {
    expect(sanitizeCertificateName(undefined)).toBeNull()
    expect(sanitizeCertificateName("A")).toBeNull()
    expect(sanitizeCertificateName("a".repeat(121))).toBeNull()
  })
  it("removes HTML brackets", () => expect(sanitizeCertificateName("<Ada>")).toBe("Ada"))
})

describe("lab completion certificate endpoint", () => {
  beforeEach(() => insert.mockClear())
  it("rejects an invalid name without writing to the database", async () => {
    const response = await POST(new Request("http://localhost/api/certificates/lab-completion", { method: "POST", body: JSON.stringify({ name: "A" }) }))
    expect(response.status).toBe(400)
    expect(insert).not.toHaveBeenCalled()
  })
  it("creates a certificate for a valid completion name", async () => {
    const response = await POST(new Request("http://localhost/api/certificates/lab-completion", { method: "POST", body: JSON.stringify({ name: "Ada Lovelace" }) }))
    expect(response.status).toBe(200)
    expect(await response.json()).toEqual({ token: "test-token-123" })
    expect(insert).toHaveBeenCalledOnce()
  })
  it("handles malformed JSON safely", async () => {
    const response = await POST(new Request("http://localhost/api/certificates/lab-completion", { method: "POST", body: "not-json" }))
    expect(response.status).toBe(500)
  })
})
