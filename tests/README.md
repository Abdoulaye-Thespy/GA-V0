# Tests

Run the current fast unit checks with `pnpm test` (or `npm test`). They use the
Node test runner and need no additional test dependencies. Node 22.14 or newer is
needed because these tests import the app's TypeScript course data directly.

## Test plan

| Level | Example cases | Why run it |
| --- | --- | --- |
| Unit (started) | Accented and punctuated titles produce stable slugs; every catalog course has a unique URL. | Catch broken detail links and slug collisions whenever course names change. |
| Form integration | A known paid or free course in `?course=` is selected; unknown values leave the form unselected; invalid submissions are rejected before database access. | Protect the path from a course detail page to a valid admission request. |
| Browser/mobile | At 320, 375, 768, and desktop widths, open a course detail, use “S’inscrire”, check the selected course, and confirm no horizontal overflow. | Catch layout and navigation issues that unit tests cannot see. |
| Submission integration | With database and email providers mocked, cover successful persistence, missing configuration, and provider errors. | Confirm error paths without writing to production services or sending real email. |

The current tests are deliberately limited to pure course URL behavior. The next
useful step is a small component test around query-string preselection, followed
by a mocked submission test; browser tests can come after a browser runner is
chosen for the project.
