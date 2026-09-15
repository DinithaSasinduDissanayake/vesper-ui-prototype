import React, { useState } from "react";
import type { CVEItem } from "../types/cve";
import {
  FileText,
  Clock,
  Network,
  Scale,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  Radio
} from "lucide-react";

interface ExplainabilityPanelProps {
  cve: CVEItem;
}

export const ExplainabilityPanel: React.FC<ExplainabilityPanelProps> = ({ cve }) => {
  const [copied, setCopied] = useState(false);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    semantic: true,
    timing: true,
    reachability: true,
    allocation: true,
  });

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cve.cve_id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isCritical = cve.tier === "CRITICAL";

  // Parse numeric values
  const semanticRiskMatch = cve.semantic_text.semantic_risk.match(/0\.\d+/);
  const semanticRiskScore = semanticRiskMatch ? parseFloat(semanticRiskMatch[0]) : 0.85;

  const blastRadiusMatch = cve.asset_reachability.blast_radius.match(/\d+/);
  const blastServices = blastRadiusMatch ? blastRadiusMatch[0] : "Local";

  return (
    <div className="flex flex-col h-full bg-[#121215] border border-zinc-800/80 rounded-lg overflow-hidden shadow-xs">
      {/* Inspector Header: CVE Identity & Action Window */}
      <div className="p-4.5 border-b border-zinc-800 bg-[#0f0f12]">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-mono text-base font-bold text-zinc-100 tracking-tight">
                {cve.cve_id}
              </span>
              <button
                onClick={copyToClipboard}
                title="Copy CVE ID"
                className="p-1 rounded text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>

              <span
                className={`text-[11px] font-mono font-semibold px-2 py-0.5 rounded ${
                  isCritical
                    ? "bg-rose-950/50 text-rose-300 border border-rose-900/60"
                    : "bg-amber-950/50 text-amber-300 border border-amber-900/60"
                }`}
              >
                {cve.tier} TIER
              </span>

              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-850 text-zinc-300 border border-zinc-750">
                CVSS {cve.cvss_score.toFixed(1)} Base
              </span>
            </div>

            <h3 className="text-base font-semibold text-zinc-100 mt-2 leading-snug">
              {cve.name}
            </h3>

            <div className="flex items-center gap-2 text-xs text-zinc-400 font-mono mt-1.5">
              <span>Component:</span>
              <span className="text-zinc-200 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">
                {cve.component}
              </span>
            </div>
          </div>

          <div className="text-right shrink-0">
            <span className="text-[11px] text-zinc-400 block uppercase tracking-wider font-mono">
              Action Window
            </span>
            <span
              className={`text-xs font-mono font-bold px-2.5 py-1 rounded mt-1 inline-block ${
                cve.action_window.includes("24")
                  ? "text-rose-300 bg-rose-950/40 border border-rose-900/50"
                  : "text-amber-300 bg-amber-950/40 border border-amber-900/50"
              }`}
            >
              {cve.action_window}
            </span>
          </div>
        </div>

        {/* Clean 4-Column Metric Grid: High-Density, Uncluttered, Legible */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-4 pt-3.5 border-t border-zinc-800">
          <div className="bg-zinc-900/70 border border-zinc-800 p-2.5 rounded">
            <span className="text-[11px] text-zinc-400 block uppercase font-mono tracking-wider">
              Base Severity
            </span>
            <div className="flex items-baseline gap-1.5 mt-1">
              <span className="text-base font-mono font-bold text-zinc-100">
                {cve.cvss_score.toFixed(1)}
              </span>
              <span className="text-[11px] text-zinc-400">/ 10</span>
            </div>
          </div>

          <div className="bg-zinc-900/70 border border-zinc-800 p-2.5 rounded">
            <span className="text-[11px] text-zinc-400 block uppercase font-mono tracking-wider">
              NLP Risk (A)
            </span>
            <div className="flex items-baseline gap-1.5 mt-1">
              <span className="text-base font-mono font-bold text-zinc-100">
                {semanticRiskScore.toFixed(2)}
              </span>
              <span className="text-[11px] text-zinc-400">score</span>
            </div>
          </div>

          <div className="bg-zinc-900/70 border border-zinc-800 p-2.5 rounded">
            <span className="text-[11px] text-zinc-400 block uppercase font-mono tracking-wider">
              Velocity (B)
            </span>
            <div className="mt-1">
              <span className="text-sm font-mono font-bold text-amber-300 truncate block">
                {cve.timing_forecast.velocity.split(" ")[0]}
              </span>
            </div>
          </div>

          <div className="bg-zinc-900/70 border border-zinc-800 p-2.5 rounded">
            <span className="text-[11px] text-zinc-400 block uppercase font-mono tracking-wider">
              Blast Radius (C)
            </span>
            <div className="flex items-baseline gap-1.5 mt-1">
              <span className="text-base font-mono font-bold text-zinc-100">
                {blastServices}
              </span>
              <span className="text-[11px] text-zinc-400">affected</span>
            </div>
          </div>
        </div>

        {/* Executive Decision Rationale */}
        <div className="mt-3.5 p-3 rounded bg-zinc-900/90 border border-zinc-800 text-xs text-zinc-300 leading-relaxed">
          <span className="font-semibold text-zinc-100 block mb-1">
            Prioritization Rationale:
          </span>
          <p className="text-zinc-300">{cve.why_prioritized}</p>
        </div>
      </div>

      {/* Accordion / Multi-Modal Evidence Breakdown */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {/* Component A: Semantic Threat Signals */}
        <div className="rounded border border-zinc-800 bg-[#0f0f12]">
          <button
            onClick={() => toggleSection("semantic")}
            className="w-full px-3.5 py-2.5 flex items-center justify-between text-left hover:bg-zinc-850 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <FileText className="w-4 h-4 text-zinc-400" />
              <div>
                <span className="text-xs font-semibold text-zinc-200 block">
                  1. Semantic Threat Indicators
                </span>
                <span className="text-[11px] text-zinc-400">
                  NLP CWE patterns &amp; trigger semantics • Component A (Dinitha)
                </span>
              </div>
            </div>
            {openSections.semantic ? (
              <ChevronUp className="w-4 h-4 text-zinc-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-zinc-400" />
            )}
          </button>

          {openSections.semantic && (
            <div className="px-3.5 pb-3.5 pt-2 text-xs border-t border-zinc-800 space-y-2.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <span className="text-[11px] text-zinc-400 block mb-0.5">
                    CWE Classification
                  </span>
                  <span className="text-zinc-200 font-mono text-xs">
                    {cve.semantic_text.cwe}
                  </span>
                </div>
                <div>
                  <span className="text-[11px] text-zinc-400 block mb-0.5">
                    Semantic Risk Score
                  </span>
                  <span className="text-zinc-200 font-mono text-xs font-semibold">
                    {cve.semantic_text.semantic_risk}
                  </span>
                </div>
              </div>

              <div>
                <span className="text-[11px] text-zinc-400 block mb-0.5">
                  NLP Extracted Signal
                </span>
                <p className="text-zinc-300 text-xs leading-relaxed bg-zinc-900 p-2 rounded border border-zinc-800/80 font-mono">
                  "{cve.semantic_text.signal}"
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Component B: Exploit Timing Forecast */}
        <div className="rounded border border-zinc-800 bg-[#0f0f12]">
          <button
            onClick={() => toggleSection("timing")}
            className="w-full px-3.5 py-2.5 flex items-center justify-between text-left hover:bg-zinc-850 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-zinc-400" />
              <div>
                <span className="text-xs font-semibold text-zinc-200 block">
                  2. Exploit Timing &amp; Weaponization Forecast
                </span>
                <span className="text-[11px] text-zinc-400">
                  Survival analysis &amp; velocity forecasting • Component B (Sithmini)
                </span>
              </div>
            </div>
            {openSections.timing ? (
              <ChevronUp className="w-4 h-4 text-zinc-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-zinc-400" />
            )}
          </button>

          {openSections.timing && (
            <div className="px-3.5 pb-3.5 pt-2 text-xs border-t border-zinc-800 space-y-2.5">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div>
                  <span className="text-[11px] text-zinc-400 block mb-0.5">
                    Wild Status
                  </span>
                  <span className="text-rose-300 font-medium text-xs flex items-center gap-1.5 font-mono">
                    <Radio className="w-2.5 h-2.5 text-rose-400" />
                    {cve.timing_forecast.status}
                  </span>
                </div>
                <div>
                  <span className="text-[11px] text-zinc-400 block mb-0.5">
                    Estimated Time to Exploit
                  </span>
                  <span className="text-zinc-200 font-mono text-xs">
                    {cve.timing_forecast.time_to_exploit}
                  </span>
                </div>
                <div>
                  <span className="text-[11px] text-zinc-400 block mb-0.5">
                    Weaponization Velocity
                  </span>
                  <span className="text-amber-300 font-mono text-xs">
                    {cve.timing_forecast.velocity}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Component C: Asset Reachability */}
        <div className="rounded border border-zinc-800 bg-[#0f0f12]">
          <button
            onClick={() => toggleSection("reachability")}
            className="w-full px-3.5 py-2.5 flex items-center justify-between text-left hover:bg-zinc-850 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <Network className="w-4 h-4 text-zinc-400" />
              <div>
                <span className="text-xs font-semibold text-zinc-200 block">
                  3. Asset Reachability &amp; Topology Exposure
                </span>
                <span className="text-[11px] text-zinc-400">
                  Network boundary exposure &amp; blast radius • Component C (Thilanka)
                </span>
              </div>
            </div>
            {openSections.reachability ? (
              <ChevronUp className="w-4 h-4 text-zinc-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-zinc-400" />
            )}
          </button>

          {openSections.reachability && (
            <div className="px-3.5 pb-3.5 pt-2 text-xs border-t border-zinc-800 space-y-2.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <span className="text-[11px] text-zinc-400 block mb-0.5">
                    Network Exposure
                  </span>
                  <span className="text-zinc-200 text-xs font-medium">
                    {cve.asset_reachability.exposure}
                  </span>
                </div>
                <div>
                  <span className="text-[11px] text-zinc-400 block mb-0.5">
                    Criticality Zone
                  </span>
                  <span className="text-zinc-200 text-xs font-medium">
                    {cve.asset_reachability.criticality}
                  </span>
                </div>
              </div>

              <div>
                <span className="text-[11px] text-zinc-400 block mb-0.5">
                  Downstream Blast Radius
                </span>
                <p className="text-zinc-300 text-xs">
                  {cve.asset_reachability.blast_radius}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Component D: Resource Allocation Rationale */}
        <div className="rounded border border-zinc-800 bg-[#0f0f12]">
          <button
            onClick={() => toggleSection("allocation")}
            className="w-full px-3.5 py-2.5 flex items-center justify-between text-left hover:bg-zinc-850 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <Scale className="w-4 h-4 text-zinc-400" />
              <div>
                <span className="text-xs font-semibold text-zinc-200 block">
                  4. Knapsack Resource Allocation Rationale
                </span>
                <span className="text-[11px] text-zinc-400">
                  Capacity constraint optimization • Component D (Bhuvani)
                </span>
              </div>
            </div>
            {openSections.allocation ? (
              <ChevronUp className="w-4 h-4 text-zinc-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-zinc-400" />
            )}
          </button>

          {openSections.allocation && (
            <div className="px-3.5 pb-3.5 pt-2 text-xs border-t border-zinc-800 space-y-2.5">
              <div>
                <span className="text-[11px] text-zinc-400 block mb-0.5">
                  Knapsack Decision
                </span>
                <span className="text-emerald-400 font-mono font-bold text-xs">
                  {cve.triage_allocation.decision}
                </span>
              </div>

              <div>
                <span className="text-[11px] text-zinc-400 block mb-0.5">
                  Mathematical Optimization Rationale
                </span>
                <p className="text-zinc-300 text-xs leading-relaxed">
                  {cve.triage_allocation.rationale}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
