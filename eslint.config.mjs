import { FlatCompat } from "@eslint/eslintrc"
import js from "@eslint/js"
import path from "node:path"
import { fileURLToPath } from "node:url"

const dirname = path.dirname(fileURLToPath(import.meta.url))
const compat = new FlatCompat({ baseDirectory: dirname, recommendedConfig: js.configs.recommended })

export default [...compat.extends("next/core-web-vitals", "next/typescript"), { ignores: [".next/**", "node_modules/**", "coverage/**"] }]
