import assert from "node:assert/strict"
import { test } from "node:test"
import { academyPrograms, freeShortCourses } from "../lib/academy-data.ts"
import { slugifyCourseTitle } from "../lib/course-utils.js"

test("course titles become stable URL slugs", () => {
  assert.equal(slugifyCourseTitle("Douane et Transit"), "douane-et-transit")
  assert.equal(
    slugifyCourseTitle("AI Trainer — former et entraîner les modèles d’IA"),
    "ai-trainer-former-et-entrainer-les-modeles-d-ia",
  )
  assert.equal(slugifyCourseTitle("  École & métiers  "), "ecole-metiers")
})

test("every catalog course has a unique, non-empty slug", () => {
  const courses = [...academyPrograms, ...freeShortCourses]
  const slugs = courses.map((course) => slugifyCourseTitle(course.title))

  assert.ok(slugs.every(Boolean), "each course should produce a URL segment")
  assert.equal(new Set(slugs).size, slugs.length, "course URLs should not collide")
})
