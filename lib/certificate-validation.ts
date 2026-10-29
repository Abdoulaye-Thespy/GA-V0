export function sanitizeCertificateName(value: unknown) {
  if (typeof value !== "string") return null
  const name = value.trim().replace(/[<>]/g, "")
  return name.length >= 2 && name.length <= 120 ? name : null
}
