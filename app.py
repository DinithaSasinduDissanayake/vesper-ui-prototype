import json
from pathlib import Path
import streamlit as st
import pandas as pd

# -----------------------------------------------------------------------------
# Configuration & Styling
# -----------------------------------------------------------------------------
st.set_page_config(
    page_title="VESPER | Vulnerability Prioritization & Explainability Engine",
    page_icon="🛡️",
    layout="wide",
    initial_sidebar_state="expanded",
)

st.markdown(
    """
    <style>
    .metric-card {
        background-color: #f8f9fa;
        border-radius: 8px;
        padding: 14px 18px;
        border-left: 4px solid #0d6efd;
        box-shadow: 0 1px 3px rgba(0,0,0,0.05);
    }
    .metric-crit {
        border-left-color: #dc3545 !important;
    }
    .metric-warn {
        border-left-color: #ffc107 !important;
    }
    .metric-safe {
        border-left-color: #198754 !important;
    }
    .cve-header {
        font-size: 1.25rem;
        font-weight: 700;
        margin-bottom: 0.25rem;
    }
    .badge {
        display: inline-block;
        padding: 0.25em 0.6em;
        font-size: 80%;
        font-weight: 600;
        border-radius: 4px;
        margin-right: 6px;
    }
    .badge-crit { background-color: #ffe5e5; color: #b02a37; border: 1px solid #f5c2c7; }
    .badge-high { background-color: #fff3cd; color: #664d03; border: 1px solid #ffecb5; }
    .badge-routine { background-color: #e8f5e9; color: #1b5e20; border: 1px solid #c8e6c9; }
    </style>
    """,
    unsafe_allow_html=True,
)

# -----------------------------------------------------------------------------
# Data Loader
# -----------------------------------------------------------------------------
DATA_PATH = Path(__file__).parent / "data" / "mock_scans.json"

@st.cache_data
def load_scan_data():
    if not DATA_PATH.exists():
        st.error("Scan database not found.")
        return []
    with open(DATA_PATH, "r", encoding="utf-8") as f:
        return json.load(f)

cves = load_scan_data()

# -----------------------------------------------------------------------------
# Sidebar: Controls & Operational Context
# -----------------------------------------------------------------------------
with st.sidebar:
    st.title("🛡️ VESPER")
    st.caption("Machine Learning Vulnerability Prioritization & Explainability Engine")
    st.divider()

    st.subheader("1. Target Environment")
    env_choice = st.selectbox(
        "Select Scan Source",
        [
            "Acme Corp — Production Cloud Cluster (1,240 Total CVEs)",
            "FinTech Global — Core Payment Gateway (850 Total CVEs)",
        ],
        index=0,
    )

    st.subheader("2. SecOps Triage Capacity")
    capacity_limit = st.select_slider(
        "Weekly Team Patching Capacity",
        options=[10, 25, 50],
        value=10,
        help="Simulates 0/1 knapsack resource allocation based on your security team's bandwidth."
    )

    st.divider()
    st.info(
        f"**Capacity Filter Active:** Showing top **{capacity_limit}** actionable items "
        f"optimized to eliminate the maximum breach risk."
    )

# -----------------------------------------------------------------------------
# Top KPI Metrics Banner
# -----------------------------------------------------------------------------
st.markdown("### 📊 Enterprise Triage Overview")

col_kpi1, col_kpi2, col_kpi3 = st.columns(3)

immediate_count = len([c for c in cves if c["tier"] == "CRITICAL"])
scheduled_count = len([c for c in cves if c["tier"] == "HIGH"])
deferred_count = 1240 - (immediate_count + scheduled_count)

with col_kpi1:
    st.markdown(
        f"""
        <div class="metric-card metric-crit">
            <div style="font-size: 0.85rem; color: #6c757d; font-weight: 600;">🔴 IMMEDIATE ATTENTION (&lt; 24H)</div>
            <div style="font-size: 1.8rem; font-weight: 700; color: #dc3545;">{immediate_count} CVEs</div>
            <div style="font-size: 0.8rem; color: #495057;">Active in-wild attacks (CISA KEV)</div>
        </div>
        """,
        unsafe_allow_html=True,
    )

with col_kpi2:
    st.markdown(
        f"""
        <div class="metric-card metric-warn">
            <div style="font-size: 0.85rem; color: #6c757d; font-weight: 600;">🟡 SCHEDULED TRIAGE (&lt; 7D)</div>
            <div style="font-size: 1.8rem; font-weight: 700; color: #b78103;">{scheduled_count} CVEs</div>
            <div style="font-size: 0.8rem; color: #495057;">Weaponized public exploit PoCs</div>
        </div>
        """,
        unsafe_allow_html=True,
    )

with col_kpi3:
    st.markdown(
        f"""
        <div class="metric-card metric-safe">
            <div style="font-size: 0.85rem; color: #6c757d; font-weight: 600;">🛡️ SAFELY DEFERRED BACKLOG</div>
            <div style="font-size: 1.8rem; font-weight: 700; color: #198754;">{deferred_count:,} CVEs</div>
            <div style="font-size: 0.8rem; color: #495057;">No known exploitation signals</div>
        </div>
        """,
        unsafe_allow_html=True,
    )

st.write("")

# -----------------------------------------------------------------------------
# Main Workspace: Prioritized Queue & Explainability Panel
# -----------------------------------------------------------------------------
col_table, col_detail = st.columns([7, 5])

# Filter down to the capacity limit
display_cves = cves[:capacity_limit]

with col_table:
    st.markdown("### 📋 Prioritized Action Queue")
    st.caption("Ranked by VESPER multimodal risk score under weekly capacity constraints.")

    # Prepare tabular data
    table_rows = []
    for idx, c in enumerate(display_cves, 1):
        table_rows.append({
            "Rank": idx,
            "CVE ID": c["cve_id"],
            "Affected Component": c["component"],
            "Tier": c["tier"],
            "CVSS": f"{c['cvss_score']:.1f}",
            "Urgency": c["exploit_urgency"],
            "Triage Window": c["action_window"],
        })
    df_queue = pd.DataFrame(table_rows)

    # Interactive selection using single-column radio or selectbox
    selected_cve_id = st.selectbox(
        "Select a CVE to inspect risk drivers and explainability:",
        options=[c["cve_id"] for c in display_cves],
        format_func=lambda x: f"{x} — {next(c['name'] for c in display_cves if c['cve_id'] == x)}",
        index=0,
    )

    st.dataframe(
        df_queue,
        use_container_width=True,
        hide_index=True,
    )

# Retrieve selected CVE details
selected_cve = next(c for c in cves if c["cve_id"] == selected_cve_id)

with col_detail:
    st.markdown("### 🔍 Explainability & Risk Drivers")
    st.caption(f"Multi-modal decision intelligence for **{selected_cve['cve_id']}**")

    # Header Card
    tier_class = "badge-crit" if selected_cve["tier"] == "CRITICAL" else "badge-high"
    st.markdown(
        f"""
        <div style="padding: 14px; background: #ffffff; border: 1px solid #e9ecef; border-radius: 8px; margin-bottom: 12px;">
            <div class="cve-header">{selected_cve['cve_id']}</div>
            <div style="color: #495057; font-weight: 500; margin-bottom: 8px;">{selected_cve['name']}</div>
            <div>
                <span class="badge {tier_class}">{selected_cve['tier']}</span>
                <span class="badge" style="background:#e9ecef; color:#495057;">CVSS {selected_cve['cvss_score']}</span>
                <span class="badge" style="background:#e0f2fe; color:#0369a1;">Window: {selected_cve['action_window']}</span>
            </div>
            <div style="margin-top: 10px; font-size: 0.9rem; color: #212529;">
                <b>Why Prioritized:</b> {selected_cve['why_prioritized']}
            </div>
        </div>
        """,
        unsafe_allow_html=True,
    )

    # 4 Multimodal Explainability Dimension Cards
    with st.expander("📝 1. Semantic Threat Indicators (NLP Text Risk)", expanded=True):
        sem = selected_cve["semantic_text"]
        st.markdown(f"- **Vulnerability Pattern:** `{sem['cwe']}`")
        st.markdown(f"- **Semantic Risk Level:** **{sem['semantic_risk']}**")
        st.markdown(f"- **Extracted Threat Signal:** {sem['signal']}")

    with st.expander("⏱️ 2. Exploit Timing & Weaponization Forecast (Survival Analysis)", expanded=True):
        time_info = selected_cve["timing_forecast"]
        st.markdown(f"- **Observed Exploitation Status:** **{time_info['status']}**")
        st.markdown(f"- **Time-to-Exploit Forecast:** `{time_info['time_to_exploit']}`")
        st.markdown(f"- **Weaponization Velocity:** {time_info['velocity']}")

    with st.expander("🌐 3. Asset & Ecosystem Reachability (Graph Topology)", expanded=False):
        reach = selected_cve["asset_reachability"]
        st.markdown(f"- **Network Attack Surface:** `{reach['exposure']}`")
        st.markdown(f"- **Target Asset Criticality:** **{reach['criticality']}**")
        st.markdown(f"- **Enterprise Blast Radius:** {reach['blast_radius']}")

    with st.expander("⚖️ 4. Capacity-Constrained Resource Optimization (Knapsack)", expanded=False):
        alloc = selected_cve["triage_allocation"]
        st.markdown(f"- **Allocation Status:** **{alloc['decision']}**")
        st.markdown(f"- **Decision Rationale:** {alloc['rationale']}")
