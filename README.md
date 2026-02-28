# ⚖️ Aequitas

**Autonomous AI-driven Retroactive Public Goods Funding (RetroPGF) on GenLayer**

Aequitas is a decentralized application that uses GenLayer's Intelligent Contracts and AI consensus to evaluate open-source projects and allocate funding based on community impact — all governed by a transparent "Funding Constitution."

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│  Layer 3 — CLIENT (Next.js 16 + genlayer-js)                   │
│  ┌─────────────┐  ┌──────────────┐  ┌────────────────────────┐ │
│  │  Dashboard   │  │  SubmitForm  │  │  TransactionTracker    │ │
│  │  • Treasury  │  │  • GitHub    │  │  • PROPOSED→FINALIZING │ │
│  │  • Projects  │  │    URL       │  │  • AI Score Display    │ │
│  │  • Scores    │  │  • Funds     │  │  • Appeal to Jury 🗳️  │ │
│  └─────────────┘  └──────────────┘  └────────────────────────┘ │
│                           │                      │              │
│  ┌────────────────────────┴──────────────────────┴────────────┐ │
│  │            genlayer-js SDK (TypeScript)                     │ │
│  │  writeContract() • readContract() • appealTransaction()    │ │
│  └────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────┴───────────────────────────────────┐
│  Layer 2 — PROTOCOL (GenLayer Optimistic Democracy)             │
│  • Validators reach consensus on AI evaluations                 │
│  • Disagreements → Bond-staked Appeals → Digital Jury           │
│  • Transaction states: PROPOSED → FINALIZING → FINALIZED        │
└─────────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────┴───────────────────────────────────┐
│  Layer 1 — LOGIC (GenLayer Intelligent Contract: aequitas.py)   │
│  ┌──────────────────┐  ┌──────────────────────────────────────┐ │
│  │  Storage          │  │  evaluate_project()                  │ │
│  │  • constitution   │  │  1. gl.get_webpage(github_url)       │ │
│  │  • treasury       │  │  2. Build AI prompt + constitution   │ │
│  │  • projects       │  │  3. eq_principle_prompt_non_comp()   │ │
│  │    (TreeMap)      │  │  4. Store {score, funds, reasoning}  │ │
│  └──────────────────┘  └──────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

## Key Design Decisions

| Decision | Rationale |
|----------|-----------|
| **TreeMap[str, str]** for projects | GenVM has known stability issues with complex storage types (classes, nested dicts) during AI calls. JSON-serialized strings in TreeMap is the proven reliable pattern. |
| **No appeal logic in contract** | Appeals are a GenLayer **protocol-level** feature. The frontend calls `client.appealTransaction()` when a transaction is in `FINALIZING` state. |
| **Non-Comparative Equivalence** | The AI generates subjective natural language evaluations. Validators verify output meets criteria without requiring exact match. |
| **Separate fetch + evaluate** | GitHub data is fetched with `gl.eq_principle_strict_eq` (deterministic). AI evaluation uses `eq_principle_prompt_non_comparative` (subjective). |

## Data Schema

```python
# On-chain storage (in aequitas.py)
owner: str                        # Contract deployer address
treasury_balance: int             # Available funding pool
funding_constitution: str         # Rules governing evaluations
project_count: int                # Auto-incrementing ID counter
projects: TreeMap[str, str]       # project_id → JSON string

# Project JSON structure:
{
    "project_id": "proj_0",
    "applicant": "0x...",
    "github_url": "https://github.com/org/repo",
    "requested_funds": 10000,
    "status": "EVALUATED",
    "evaluation_result": "{ impact_score, approved_funds, ai_reasoning }"
}
```

## Workflow

1. **Owner deploys** the contract with a Funding Constitution and initial treasury
2. **Developer submits** a project via `evaluate_project(github_url, requested_funds)`
3. **GenLayer AI** fetches the GitHub repo, scores it against the constitution
4. **Validators** reach consensus using Non-Comparative Equivalence Principle
5. **Transaction enters `FINALIZING`** — anyone can view the AI's evaluation
6. **If disagreement** — users stake a bond and appeal via `client.appealTransaction()`
7. **Digital Jury** (more validators) re-evaluates the transaction
8. **Transaction `FINALIZED`** — result is permanently recorded on-chain

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Smart Contract | Python (GenLayer Intelligent Contract) |
| Frontend | Next.js 16, React 19, TypeScript |
| Styling | Tailwind CSS 4 |
| Blockchain SDK | genlayer-js |
| AI Consensus | GenLayer Optimistic Democracy + LLMs |
| Data Fetching | `gl.get_webpage()` (native GenLayer) |

## Project Structure

```
aequitas/
├── contracts/
│   └── aequitas.py          # GenLayer Intelligent Contract
├── src/
│   ├── app/                 # Next.js App Router pages
│   ├── components/          # React UI components
│   └── lib/                 # genlayer-js client & utilities
├── public/                  # Static assets
├── package.json
├── tsconfig.json
└── README.md
```

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# The contract is deployed separately via GenLayer CLI or Studio
```

## License

MIT
