import React, { useState } from "react";
import type { CVEItem } from "../types/cve";
import {
  FileText,
  Clock,
  Network,
  Scale,
  ChevronDown,
  ChevronUp,
  Zap,
  Radio,
  Server,
  Copy,
  Check
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

  return (
    <div className="flex flex-col h-full bg-slate-900/40 border border-slate-800/80 rounded-xl overflow-hidden backdrop-blur-sm">
      {/* Detail Header / Hero */}
      <div className="p-4 border-b border-slate-800/80 bg-slate-950/70">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-mono text-base font-extrabold text-white tracking-wide">
                {cve.cve_id}
              </span>
              <button
                onClick={copyToClipboard}
                title="Copy CVE ID"
                className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>

              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded font-mono ${
                  isCritical
                    ? "bg-red-500/15 text-red-400 border border-red-500/30"
                    : "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                }`}
              >
                {cve.tier} TIER
              </span>

              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                CVSS {cve.cvss_score.toFixed(1)} Base
              </span>
            </div>

            <h3 className="text-sm font-semibold text-slate-100 mt-1.5 leading-snug">
              {cve.name}
            </h3>

            <p className="text-xs text-slate-400 font-mono mt-1">
              Component: <span className="text-slate-300">{cve.component}</span>
            </p>
          </div>

          <div className="text-right shrink-0">
            <span className="text-[10px] text-slate-400 block uppercase tracking-wider font-semibold">
              Action Target
            </span>
            <span className="text-xs font-mono font-bold text-red-400 bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded mt-0.5 inline-block">
              {cve.action_window}
            </span>
          </div>
        </div>

        {/* Executive Summary Quote Callout */}
        <div className="mt-3.5 p-3 rounded-lg bg-slate-900/90 border border-slate-800 text-xs text-slate-300 leading-relaxed flex items-start gap-2.5">
          <Zap className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-white block mb-0.5">Why Prioritized (Executive Rationale):</span>
            <p className="text-slate-300">{cve.why_prioritized}</p>
          </div>
        </div>
      </div>

      {/* Accordion / Explainability Deep-Dive Sections */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {/* Section 1: Semantic Threat Signals */}
        <div className="rounded-lg border border-slate-800 bg-slate-950/40 overflow-hidden">
          <button
            onClick={() => toggleSection("semantic")}
            className="w-full px-3.5 py-2.5 flex items-center justify-between text-left hover:bg-slate-800/30 transition-colors"
          >
            <div className="flex items-center gap-2">
              <div className="p-1 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <FileText className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-200">
                  1. Semantic Threat Signals
                </span>
                <span className="text-[10px] text-slate-500 block">
                  NLP text CWE patterns &amp; trigger semantics • Component A (Dinitha)
                </span>
              </div>
            </div>
            {openSections.semantic ? (
              <ChevronUp className="w-4 h-4 text-slate-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-slate-400" />
            )}
          </button>

          {openSections.semantic && (
            <div className="px-3.5 pb-3.5 pt-1 text-xs border-t border-slate-800/60 space-y-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                <div className="p-2 rounded bg-slate-900/80 border border-slate-800/80">
                  <span className="text-[10px] uppercase font-semibold text-slate-400 block mb-0.5">
                    CWE Classification
                  </span>
                  <span className="text-slate-200 font-mono text-[11px]">
                    {cve.semantic_text.cwe}
                  </span>
                </div>
                <div className="p-2 rounded bg-slate-900/80 border border-slate-800/80">
                  <span className="text-[10px] uppercase font-semibold text-slate-400 block mb-0.5">
                    Semantic Risk Score
                  </span>
                  <span className="text-amber-400 font-mono font-bold text-[11px]">
                    {cve.semantic_text.semantic_risk}
                  </span>
                </div>
              </div>

              <div className="p-2 rounded bg-slate-900/80 border border-slate-800/80">
                <span className="text-[10px] uppercase font-semibold text-slate-400 block mb-0.5">
                  NLP Extracted Signal
                </span>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  "{cve.semantic_text.signal}"
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Section 2: Exploit Timing Forecast */}
        <div className="rounded-lg border border-slate-800 bg-slate-950/40 overflow-hidden">
          <button
            onClick={() => toggleSection("timing")}
            className="w-full px-3.5 py-2.5 flex items-center justify-between text-left hover:bg-slate-800/30 transition-colors"
          >
            <div className="flex items-center gap-2">
              <div className="p-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <Clock className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-200">
                  2. Exploit Timing Forecast
                </span>
                <span className="text-[10px] text-slate-500 block">
                  Survival analysis &amp; velocity forecasting • Component B (Sithmini)
                </span>
              </div>
            </div>
            {openSections.timing ? (
              <ChevronUp className="w-4 h-4 text-slate-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-slate-400" />
            )}
          </button>

          {openSections.timing && (
            <div className="px-3.5 pb-3.5 pt-1 text-xs border-t border-slate-800/60 space-y-2">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                <div className="p-2 rounded bg-slate-900/80 border border-slate-800/80">
                  <span className="text-[10px] uppercase font-semibold text-slate-400 block mb-0.5">
                    Wild Status
                  </span>
                  <span className="text-red-400 font-semibold text-[11px] flex items-center gap-1">
                    <Radio className="w-2.5 h-2.5 animate-pulse" />
                    {cve.timing_forecast.status}
                  </span>
                </div>
                <div className="p-2 rounded bg-slate-900/80 border border-slate-800/80">
                  <span className="text-[10px] uppercase font-semibold text-slate-400 block mb-0.5">
                    Time to Exploit
                  </span>
                  <span className="text-slate-200 font-mono text-[11px]">
                    {cve.timing_forecast.time_to_exploit}
                  </span>
                </div>
                <div className="p-2 rounded bg-slate-900/80 border border-slate-800/80">
                  <span className="text-[10px] uppercase font-semibold text-slate-400 block mb-0.5">
                    Weaponization Velocity
                  </span>
                  <span className="text-amber-300 font-mono text-[11px]">
                    {cve.timing_forecast.velocity}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Section 3: Asset & Ecosystem Reachability */}
        <div className="rounded-lg border border-slate-800 bg-slate-950/40 overflow-hidden">
          <button
            onClick={() => toggleSection("reachability")}
            className="w-full px-3.5 py-2.5 flex items-center justify-between text-left hover:bg-slate-800/30 transition-colors"
          >
            <div className="flex items-center gap-2">
              <div className="p-1 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">
                <Network className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-200">
                  3. Asset &amp; Ecosystem Reachability
                </span>
                <span className="text-[10px] text-slate-500 block">
                  Topology graph, boundary exposure &amp; blast radius • Component C (Thilanka)
                </span>
              </div>
            </div>
            {openSections.reachability ? (
              <ChevronUp className="w-4 h-4 text-slate-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-slate-400" />
            )}
          </button>

          {openSections.reachability && (
            <div className="px-3.5 pb-3.5 pt-1 text-xs border-t border-slate-800/60 space-y-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                <div className="p-2 rounded bg-slate-900/80 border border-slate-800/80">
                  <span className="text-[10px] uppercase font-semibold text-slate-400 block mb-0.5 flex items-center gap-1">
                    <Server className="w-3 h-3 text-slate-400" />
                    Network Exposure
                  </span>
                  <span className="text-slate-200 font-medium text-[11px]">
                    {cve.asset_reachability.exposure}
                  </span>
                </div>
                <div className="p-2 rounded bg-slate-900/80 border border-slate-800/80">
                  <span className="text-[10px] uppercase font-semibold text-slate-400 block mb-0.5">
                    Criticality Zone
                  </span>
                  <span className="text-indigo-400 font-medium text-[11px]">
                    {cve.asset_reachability.criticality}
                  </span>
                </div>
              </div>

              <div className="p-2 rounded bg-slate-900/80 border border-slate-800/80">
                <span className="text-[10px] uppercase font-semibold text-slate-400 block mb-0.5">
                  Topology Blast Radius
                </span>
                <p className="text-slate-300 text-[11px]">
                  {cve.asset_reachability.blast_radius}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Section 4: Resource Allocation Rationale */}
        <div className="rounded-lg border border-slate-800 bg-slate-950/40 overflow-hidden">
          <button
            onClick={() => toggleSection("allocation")}
            className="w-full px-3.5 py-2.5 flex items-center justify-between text-left hover:bg-slate-800/30 transition-colors"
          >
            <div className="flex items-center gap-2">
              <div className="p-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Scale className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-200">
                  4. Resource Allocation Rationale
                </span>
                <span className="text-[10px] text-slate-500 block">
                  Knapsack optimization under sprint constraints • Component D (Bhuvani)
                </span>
              </div>
            </div>
            {openSections.allocation ? (
              <ChevronUp className="w-4 h-4 text-slate-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-slate-400" />
            )}
          </button>

          {openSections.allocation && (
            <div className="px-3.5 pb-3.5 pt-1 text-xs border-t border-slate-800/60 space-y-2">
              <div className="p-2 rounded bg-slate-900/80 border border-slate-800/80 pt-1">
                <span className="text-[10px] uppercase font-semibold text-slate-400 block mb-0.5">
                  Knapsack Decision Result
                </span>
                <span className="text-emerald-400 font-bold font-mono text-xs">
                  {cve.triage_allocation.decision}
                </span>
              </div>

              <div className="p-2 rounded bg-slate-900/80 border border-slate-800/80">
                <span className="text-[10px] uppercase font-semibold text-slate-400 block mb-0.5">
                  Triage Mathematical Rationale
                </span>
                <p className="text-slate-300 text-[11px] leading-relaxed">
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
