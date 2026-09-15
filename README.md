# VESPER UI Prototype

> **VESPER:** Machine Learning-Based Prioritization of Software Vulnerabilities for Patching  
> **Specialization:** B.Sc. (Hons) in IT Specializing in Data Science (Group J26-DS-344)

---

## Overview
This repository contains the standalone, interactive **UI Prototype** for the VESPER project. It is designed specifically for **Security Analysts, SecOps Teams, Evaluators, and Academic Supervisors** to demonstrate:
1. **Capacity-Aware Prioritization:** How VESPER filters a massive backlog of 1,200+ raw vulnerability alerts into an actionable weekly triage queue (10, 25, or 50 CVEs) tailored to engineering bandwidth.
2. **Deep Explainability:** Clear, multi-modal risk drivers showing *why* each vulnerability was prioritized without any "auto-patching" gimmicks.

---

## Quick Start Guide

### Prerequisites
- Python 3.9+ installed.

### Setup Instructions
1. Clone or download this repository:
   ```bash
   git clone <repository-url>
   cd vesper-ui-prototype
   ```

2. Create and activate a virtual environment:
   ```bash
   python3 -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   ```

3. Install the minimal dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Launch the interactive prototype:
   ```bash
   streamlit run app.py
   ```
   The application will automatically open in your default web browser at `http://localhost:8501`.

---

## Guide for Group Members (Appendix 2 UI Wireframes)

Each group member can use this prototype to capture clean, high-resolution screenshots for **Appendix 2 (UI Wireframes / Sketches)** in their individual proposal reports:

| Member | Specialization Focus | Prototype Section to Screenshot |
|:---|:---|:---|
| **Bhuvani (Lead/Fusion)** | Capacity-Constrained Resource Allocation | Top KPI Banner & the Capacity Slider (10 / 25 / 50 Triage Queue) |
| **Dinitha (Component A)** | Semantic NLP & Text Risk Signals | Expander 1: *Semantic Threat Indicators (CWE patterns & text signals)* |
| **Sithmini (Component B)** | Exploit Timing & Survival Analysis | Expander 2: *Exploit Timing & Weaponization Forecast (Velocity window)* |
| **Thilanka (Component C)** | Asset Topology & Knowledge Graph | Expander 3: *Asset & Ecosystem Reachability (Blast radius & exposure)* |

### Customizing the UI
- **Add or Modify Vulnerabilities:** Edit `data/mock_scans.json` to change CVE details, CWE categories, or blast radius stats.
- **Tweak Layout & Widgets:** Edit `app.py` directly using standard Streamlit components (`st.metric`, `st.expander`, `st.dataframe`).
