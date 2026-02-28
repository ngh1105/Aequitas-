# Aequitas Design System (MASTER)

## 🌌 Brand Identity
**Vision:** Autonomous, Transparent, and AI-driven Funding.
**Keywords:** Tech-Trust, RetroPGF, Autonomous, Grid-based, Futuristic.

## 🎨 Color Palette
| Token | Hex | Usage |
|-------|-----|-------|
| Background | `#0B0E14` | Deep Slate base |
| Surface | `#151921` | Bento Box surface |
| Primary | `#3B82F6` | Electric Blue / Accents |
| Secondary | `#8B5CF6` | Royal Purple / Highlights |
| Success | `#10B981` | Approved / Grant Received |
| Danger | `#EF4444` | Rejected / Appeal Button |
| Border | `rgba(255, 255, 255, 0.08)` | Subtle Glass Borders |

## Typography
- **Headings:** `Space Grotesk` (Modern, Tech-oriented)
- **Body:** `Geist` (Clean, highly readable)
- **Code:** `JetBrains Mono` (For Applicant addresses/TX hashes)

## 🧩 Components
### 1. Bento Box Grid
- Use CSS Grid for the layout.
- Padding: `gap-6`.
- Cards: `bg-surface/50 backdrop-blur-xl border border-border rounded-3xl`.

### 2. Button Styles
- **Primary:** Gradient blue-to-purple, slight glow.
- **Appeal:** High-contrast red gradient with micro-interactions (subtle pulse on `REVEALING` state).
- **Secondary:** Transparent with white border.

### 3. State Indicators (AI Status)
- **PENDING:** Pulse animation.
- **FINALIZING:** Rotating ring (wait-state).
- **FINALIZED:** Static status badge.

## 📸 Icons
**Set:** Phosphor Icons (`@phosphor-icons/react`)
- Use `thin` or `light` weight for that high-end look.
- Never use emojis.

## 🏃 UX Rules
- **Skeleton Loaders:** MANDATORY for all AI evaluation wait-states.
- **Micro-interactions:** 
  - Hover on Appeal button should trigger a "Digital Jury" glitch effect.
  - Success transitions should use `framer-motion` layout animations.

## 🛠 Tech Stack
- Next.js 16 (App Router)
- Tailwind CSS
- shadcn/ui
- genlayer-js (SimulatorClient/GenLayerClient)
- Phosphor Icons
