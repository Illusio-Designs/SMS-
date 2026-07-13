# Scholr — Brand Guide

**Scholr** — School Management System, *by Finvera*.


## Logo
- **Full logo:** [`public/brand/logo-full.svg`](../public/brand/logo-full.svg) — mark + wordmark + tagline
- **Mark only:** [`public/brand/logo-mark.svg`](../public/brand/logo-mark.svg) — the app icon / favicon
- In-app: rendered live by [`components/BrandMark.jsx`](../components/BrandMark.jsx) (`BrandGlyph` inside themed containers, `BrandMark` as a standalone badge)

The mark is a **mortarboard** (education) with an **emerald tassel bead** (the
"spark" of insight / analytics), on an indigo→violet gradient squircle.

## Colour palette (hex codes)

| Role | Name | Hex | Use |
|---|---|---|---|
| **Primary** | Scholr Indigo | `#4F46E5` | Brand primary, buttons, active states, links |
| **Primary 2** | Violet | `#7C3AED` | Gradient partner (logo, hero, charts) |
| **Accent** | Emerald | `#10B981` | Success, positive metrics, the tassel bead |
| **Ink** | Midnight | `#141726` | Headings, body text, dark sidebar (`#171A2B`) |
| **Muted** | Slate | `#5B6178` | Secondary text, captions |
| **Line** | Cloud Border | `#E6E8EF` | Borders, dividers |
| **Surface** | White | `#FFFFFF` | Cards, panels |
| **Background** | Mist | `#F5F6FA` | App background |

### Semantic (status)
| | Hex | Soft tint |
|---|---|---|
| Success | `#16A34A` | `#E7F7EC` |
| Warning | `#D97706` | `#FDF3E3` |
| Danger | `#DC2626` | `#FDEAEA` |
| Info | `#2563EB` | `#E8F0FE` |

### Gradients
- **Brand:** `linear-gradient(135deg, #4F46E5, #7C3AED)`
- These map to the app's live `--accent` / `--accent-2` CSS variables, so the
  whole product (and this palette) auto-adapts when an admin uploads a logo and
  the colours are extracted from it.

## Typography
- **Inter** (system-ui fallback). Headings 700–800 weight, tight letter-spacing;
  body 400–550; tabular numerals for data.
