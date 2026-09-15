export interface SemanticText {
  cwe: string;
  semantic_risk: string;
  signal: string;
}

export interface TimingForecast {
  status: string;
  time_to_exploit: string;
  velocity: string;
}

export interface AssetReachability {
  exposure: string;
  criticality: string;
  blast_radius: string;
}

export interface TriageAllocation {
  decision: string;
  rationale: string;
}

export interface CVEItem {
  cve_id: string;
  name: string;
  component: string;
  cvss_score: number;
  tier: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
  exploit_urgency: string;
  action_window: string;
  why_prioritized: string;
  semantic_text: SemanticText;
  timing_forecast: TimingForecast;
  asset_reachability: AssetReachability;
  triage_allocation: TriageAllocation;
}
