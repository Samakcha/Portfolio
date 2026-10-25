import js from "@eslint/js";
import { globalIgnores } from "eslint/config";

export default [
  globalIgnores([".next/**", "out/**", "node_modules/**"]),
  js.configs.recommended,
  {
    files: ["**/*.{js,mjs,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: {
        Intl: "readonly",
        window: "readonly",
      },
    },
    rules: {
      "no-unused-vars": "off",
    },
  },
];
