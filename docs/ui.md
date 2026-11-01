# UI Coding Standards

## Component Library

**Only shadcn/ui components are permitted in this project.**

- Do NOT create custom UI components of any kind.
- Do NOT use raw HTML elements for UI (buttons, inputs, cards, dialogs, etc.) when a shadcn/ui equivalent exists.
- Do NOT use any other component library (MUI, Chakra, Radix primitives directly, etc.).
- All UI must be composed exclusively from components installed via `npx shadcn@latest add <component>`.

If a shadcn/ui component does not cover a use case, add the closest shadcn/ui component and style it using Tailwind utility classes — do not build a new component from scratch.

## Date Formatting

All dates must be formatted using **date-fns**.

Dates are displayed in the following format: `do MMM yyyy`

| Date | Display |
|------|---------|
| 2025-09-01 | 1st Sep 2025 |
| 2025-08-02 | 2nd Aug 2025 |
| 2026-01-03 | 3rd Jan 2026 |
| 2024-06-04 | 4th Jun 2024 |

```ts
import { format } from "date-fns";

format(date, "do MMM yyyy"); // e.g. "1st Sep 2025"
```

- Never use `Date.toLocaleDateString()`, `Intl.DateTimeFormat`, or hand-rolled formatters.
- Always import from `date-fns` (not `date-fns/esm` or sub-paths unless tree-shaking requires it).
