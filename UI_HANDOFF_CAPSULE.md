# HANDOFF CAPSULE: VESPER Standalone UI Prototype & Frontend Development

**Target Project:** VESPER Standalone UI Prototype (Group J26-DS-344)  
**Root Repository Path:** `/home/sasindu/Documents/Projects/vesper-ui-prototype`  
**Frontend Path:** `/home/sasindu/Documents/Projects/vesper-ui-prototype/frontend`  
**Date:** September 15, 2026 @ 10:52 AM +05:30  
**Git Branch:** `main` (clean, verified)

---

## 1. Project Mission & Identity

- **What VESPER IS:** An **Enterprise Vulnerability Prioritization and Explainability Engine** for SecOps teams and security analysts. It takes high-volume scanner findings (e.g., 1,240 raw CVEs) and triages them into an actionable, capacity-aware queue with deep, multi-modal risk rationales.
- **What VESPER IS NOT:** An auto-patching / auto-remediation tool. It **does NOT** install packages, run bash scripts, or alter code. It is an intelligent decision-support system.
- **Core User Problem Solved:** Security teams have thousands of alerts but can only triage 10 to 50 vulnerabilities a week. VESPER optimizes the queue under the team's weekly capacity limit so they eliminate maximum breach risk.

---

## 2. Current Technical Status & Architecture

The repository is completely standalone, has its own Git history, and contains **zero confidential backend ML models or raw datasets**.

### Project File Tree:
```text
/home/sasindu/Documents/Projects/vesper-ui-prototype/
├── app.py                      # Python Streamlit version (clean fallback)
├── requirements.txt            # streamlit, pandas
├── data/
│   └── mock_scans.json         # Realistic multi-modal scan records with CWEs & risk drivers
└── frontend/                   # Modern React + Tailwind + Lucide + shadcn prototype
    ├── package.json            # Vite + React 19 + Tailwind CSS v4 + Lucide React
    ├── src/
    │   ├── App.tsx             # Main interactive dashboard layout
    │   ├── main.tsx
    │   └── index.css           # Modern dark-mode styling (Linear/Vercel/Snyk aesthetic)
    └── dist/                   # Production build verified via `bun run build` (211ms)
```

### Key UI Features Already Built:
1. **Interactive Triage Capacity Slider:** `[ 10 | 25 | 50 ] CVEs/week` dynamically re-slices the queue in real time.
2. **Executive KPI Cards:**
   - 🔴 Immediate Attention (`< 24h`) — 4 CVEs (Active In-Wild CISA KEV)
   - 🟡 Scheduled Triage (`< 7d`) — 6 CVEs (Weaponized Public PoCs)
   - 🛡️ Safely Deferred Backlog — 1,230 CVEs (Eliminates 99% alert fatigue)
3. **Split-Screen Layout:**
   - **Left (Action Queue Table):** Ranked CVEs, components, CVSS scores, threat tiers, and deadlines.
   - **Right (Explainability Panel):** Selected CVE hero card + 4 multi-modal expandable risk drivers:
     * 📝 **Component A (Dinitha):** Semantic NLP text indicators & CWE patterns.
     * ⏱️ **Component B (Sithmini):** Exploit timing & weaponization velocity window.
     * 🌐 **Component C (Thilanka):** Asset reachability, exposure, and blast radius.
     * ⚖️ **Component D (Bhuvani):** Knapsack resource optimization rationale.

---

## 3. How to Run & Develop

In terminal:
```bash
cd /home/sasindu/Documents/Projects/vesper-ui-prototype/frontend
bun run dev
```
*(Runs immediately at `http://localhost:5173`)*

---

## 4. Immediate Goals for this UI Session

1. **Refine & Polish the Visual Experience:**
   - Add tabbed switching or filter views (e.g., filter by Exploit Status, CWE category, or Attack Surface).
   - Enhance the Explainability Panel with mini charts/radars (e.g. SVG or Lucide visual gauges for Risk Score, Velocity, and Blast Radius).
   - Ensure the layout looks 100% production-grade for screenshots.
2. **Generate Appendix 2 Wireframe Screenshots for Teammates:**
   - Facilitate high-resolution screenshots for each group member:
     * **Dinitha (Component A):** Semantic Threat Indicators panel.
     * **Sithmini (Component B):** Timing & Exploit Forecast panel.
     * **Thilanka (Component C):** Asset Reachability & Blast Radius panel.
     * **Bhuvani (Component D):** Capacity Slider & Triage Queue view.
3. **Prepare for Team Handoff:**
   - Push this standalone repository to a dedicated GitHub repo so team members can clone, customize, and experiment freely.
