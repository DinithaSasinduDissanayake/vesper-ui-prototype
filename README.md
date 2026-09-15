# VESPER UI Prototype

> **VESPER:** Machine Learning-Based Prioritization of Software Vulnerabilities for Patching  
> **Specialization:** B.Sc. (Hons) in IT Specializing in Data Science (Group J26-DS-344)

---

## Overview
This repository contains the interactive **UI Prototypes** for the VESPER project. It is designed specifically for **Security Analysts, SecOps Teams, Evaluators, and Academic Supervisors** to demonstrate:
1. **Capacity-Aware Prioritization:** How VESPER filters a massive backlog of 1,200+ raw vulnerability alerts into an actionable weekly triage queue (10, 25, or 50 CVEs) tailored to engineering bandwidth.
2. **Deep Explainability:** Clear, multi-modal risk drivers showing *why* each vulnerability was prioritized across all four research components without any auto-patching gimmicks.

Available implementations:
- **`frontend/` (Recommended):** High-performance, modern React + Tailwind CSS + Lucide Icons + shadcn-style dashboard (Vercel / Linear SecOps aesthetic).
- **`app.py`:** Legacy lightweight Streamlit prototype.

---

## Modern React + Tailwind Prototype (`frontend/`)

### Quick Start with Bun (Fastest)
```bash
cd frontend
bun install
bun run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Quick Start with Node / NPM
```bash
cd frontend
npm install
npm run dev
```

### Production Build
```bash
cd frontend
bun run build
# or: npm run build
```

---

## Legacy Streamlit Prototype (`app.py`)

### Prerequisites & Setup
```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
streamlit run app.py
```
Default URL: `http://localhost:8501`

---

## Guide for Group Members (Appendix 2 UI Wireframes)

Each group member can use the React dashboard (`frontend/`) or Streamlit prototype to capture crisp, high-resolution screenshots for **Appendix 2 (UI Wireframes / Sketches)** in their individual proposal reports:

| Member | Specialization Focus | Prototype Section to Screenshot |
|:---|:---|:---|
| **Bhuvani (Lead/Fusion)** | Capacity-Constrained Resource Allocation | Top KPI Banner & the Capacity Toggle (`10 / 25 / 50 /wk`) + Section 4 (Knapsack Optimization) |
| **Dinitha (Component A)** | Semantic NLP & Text Risk Signals | Explainability Accordion 1: *Semantic Threat Signals (CWE patterns & text trigger semantics)* |
| **Sithmini (Component B)** | Exploit Timing & Survival Analysis | Explainability Accordion 2: *Exploit Timing Forecast (Survival analysis, velocity window & wild status)* |
| **Thilanka (Component C)** | Asset Topology & Knowledge Graph | Explainability Accordion 3: *Asset & Ecosystem Reachability (Network exposure, criticality & blast radius)* |

---

## Directory Structure
```
vesper-ui-prototype/
├── frontend/                # Modern React + Vite + Tailwind CSS + Lucide dashboard
│   ├── src/
│   │   ├── components/      # Header, MetricsOverview, VulnerabilityTable, ExplainabilityPanel
│   │   ├── data/            # mock_scans.json
│   │   ├── types/           # cve.ts interface types
│   │   └── App.tsx          # Main dashboard container
│   ├── package.json
│   └── vite.config.ts
├── data/
│   └── mock_scans.json      # Curated multi-modal scan benchmark dataset
├── app.py                   # Streamlit fallback prototype
└── README.md
```
