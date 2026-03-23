# Scope Creep Tracker

**Detect, document & bill scope changes — for freelancers and agencies.**

[![CI](https://github.com/mysterekkk/scope-creep-tracker/actions/workflows/ci.yml/badge.svg)](https://github.com/mysterekkk/scope-creep-tracker/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-14-black.svg)](https://nextjs.org/)
[![Demo](https://img.shields.io/badge/Demo-Live-brightgreen.svg)](https://scope-creep-tracker.vercel.app)

**[Live Demo](https://scope-creep-tracker.vercel.app)** | Free, open-source, **100% client-side** scope creep detection tool. Your data never leaves your browser.

---

## The Problem

Freelancers and agencies lose thousands every year to untracked scope creep. Clients ask for "just one more thing" — and before you know it, you've done 40% more work than agreed, for free.

## The Solution

Scope Creep Tracker gives you a complete workflow:

1. **Define** your original project scope with tasks and time estimates
2. **Track** time and log client messages as you work
3. **Detect** scope creep automatically — new tasks, hour overruns, client requests
4. **Generate** a professional change request PDF to send to your client

## Features

- **Automatic Scope Detection** — Tasks added after project start are auto-flagged as out-of-scope
- **Built-in Time Tracking** — Start/stop timer or manual entries, no external tools needed
- **Client Message Analysis** — Heuristic keyword detection flags potential scope creep in client messages
- **Scope Dashboard** — Visual metrics: scope creep %, budget burn rate, overrun hours, additional cost
- **PDF Change Requests** — Professional change request / annex PDF with itemized costs and signature lines
- **Client-Ready Messages** — Auto-generated text template summarizing scope changes, ready to copy & send
- **Multi-Format Export** — PDF, CSV, JSON
- **Platform Independent** — Works for any type of project or industry
- **Privacy First** — 100% client-side processing with localStorage, zero data collection
- **Dark/Light Mode** — Automatic theme detection with manual toggle
- **Multi-Language** — English, Polish, Spanish, German, French

## How It Works

| Step | Action |
|------|--------|
| 1 | Create a project and define your original scope (tasks + estimated hours) |
| 2 | Track time with the built-in timer as you work |
| 3 | Log client messages — scope creep keywords are auto-detected |
| 4 | Review the scope dashboard for creep metrics |
| 5 | Generate a change request PDF and send to your client |

## Quick Start

```bash
git clone https://github.com/mysterekkk/scope-creep-tracker.git
cd scope-creep-tracker
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Tech Stack

- [Next.js 14](https://nextjs.org/) — React framework with App Router
- [TypeScript](https://www.typescriptlang.org/) — Type-safe development
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first styling
- [Zustand](https://zustand-demo.pmnd.rs/) — State management with localStorage persistence
- [next-intl](https://next-intl-docs.vercel.app/) — Internationalization
- [@react-pdf/renderer](https://react-pdf.org/) — Client-side PDF generation
- [Lucide React](https://lucide.dev/) — Icons

## Scripts

```bash
npm run dev          # Start development server
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
npm run test         # Run tests
npm run test:watch   # Tests in watch mode
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

[MIT](LICENSE)

## Author

**[LuroWeb - Łukasz Rosikoń](https://luroweb.pl)**

---

If you find this tool useful, please give it a star on GitHub!
