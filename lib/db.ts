import { drizzle } from "drizzle-orm/node-postgres"
import { boolean, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"
import { Pool } from "pg"

export const registrations = pgTable("registrations", {
  id: uuid("id").defaultRandom().primaryKey(),
  studentName: text("student_name").notNull(),
  referenceName: text("reference_name").notNull().default(""),
  lastDiploma: text("last_diploma").notNull().default(""),
  whatsappPhone: text("whatsapp_phone").notNull().default(""),
  whatsappSameAsPhone: boolean("whatsapp_same_as_phone").notNull().default(false),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  course: text("course").notNull(),
  message: text("message").notNull().default(""),
  status: text("status").notNull().default("pending"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
})

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
export const db = drizzle(pool)

export function closeDb() {
  return pool.end()
}

export type Registration = typeof registrations.$inferInsert

export function isDatabaseConfigured() {
  return Boolean(process.env.DATABASE_URL)
}

export function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export function isSafeText(value: string, maxLength = 500) {
  return value.trim().length > 0 && value.length <= maxLength
}

export function getRegistrationErrorMessage(error: unknown) {
  console.error("[v0] Registration persistence failed", error)
  return "Votre demande n’a pas pu être enregistrée. Veuillez réessayer ou nous contacter directement."
}
