import React from "react";
import type { CVEItem } from "../types/cve";
import {
  X,
  Copy,
  Check,
  Radio,
  FileText,
  Clock,
  Network,
  Scale,
  ShieldCheck,
  Server,
  AlertOctagon,
  Share2,
  ExternalLink
} from "lucide-react";

interface DetailDrawerProps {
  cve: CVEItem | null;
  onClose: () => void;
}

export const DetailDrawer: React.FC<DetailDrawerProps> = ({ cve, onClose }) => {
  const [copied, setCopied] = React.useState(false);

  if (!cve) return null;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`${cve.cve_id} (${cve.name})`);
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
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Dimmed backdrop - click outside to close */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Slide-over sheet panel */}
      <aside className="relative w-full max-w-2xl bg-[#111114] border-l border-zinc-800 h-full shadow-2xl overflow-y-auto flex flex-col z-10 animate-in slide-in-from-right duration-250">
        {/* Drawer Header */}
        <div className="p-6 border-b border-zinc-800 sticky top-0 bg-[#111114]/95 backdrop-blur z-20 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5 flex-wrap mb-1.5">
              <span className="font-mono text-base font-bold text-zinc-100 tracking-tight">
                {cve.cve_id}
              </span>
              <button
                onClick={copyToClipboard}
                title="Copy CVE ID"
                className="p-1 rounded text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>

              <span
                className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded ${
                  isCritical
                    ? "bg-rose-950/60 text-rose-300 border border-rose-900/60"
                    : "bg-amber-950/60 text-amber-300 border border-amber-900/60"
                }`}
              >
                {cve.tier} TIER
              </span>

              <span className="text-xs font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">
                CVSS {cve.cvss_score.toFixed(1)} Base
              </span>
            </div>

            <h2 className="text-lg font-bold text-zinc-100 leading-snug">
              {cve.name}
            </h2>

            <div className="flex items-center gap-2 text-sm text-zinc-400 font-mono mt-2">
              <span>Component:</span>
              <span className="text-zinc-200 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800 font-semibold">
                {cve.component}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="text-right hidden sm:block">
              <span className="text-[11px] text-zinc-400 block uppercase tracking-wider font-mono">
                SLA Target
              </span>
              <span
                className={`text-xs font-mono font-bold px-2 py-0.5 rounded mt-0.5 inline-block ${
                  cve.action_window.includes("24")
                    ? "text-rose-300 bg-rose-950/50 border border-rose-900/60"
                    : "text-amber-300 bg-amber-950/50 border border-amber-900/60"
                }`}
              >
                {cve.action_window}
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Drawer Content Body */}
        <div className="p-6 space-y-6 flex-1 text-sm">
          {/* Executive Urgency Banner */}
          <div className="p-4 rounded-lg bg-zinc-900/90 border border-zinc-800 text-zinc-200 leading-relaxed">
            <span className="font-semibold text-zinc-100 block mb-1 text-xs uppercase tracking-wider font-mono text-zinc-400">
              Why Prioritized (Executive Triage Decision):
            </span>
            <p className="text-zinc-200 text-sm leading-relaxed">{cve.why_prioritized}</p>
          </div>

          {/* 4-Metric Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-zinc-900/80 border border-zinc-800 p-3 rounded-lg">
              <span className="text-[11px] text-zinc-400 uppercase font-mono tracking-wider block">
                Base Severity
              </span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-lg font-mono font-bold text-zinc-100">
                  {cve.cvss_score.toFixed(1)}
                </span>
                <span className="text-xs text-zinc-400">/ 10</span>
              </div>
            </div>

            <div className="bg-zinc-900/80 border border-zinc-800 p-3 rounded-lg">
              <span className="text-[11px] text-zinc-400 uppercase font-mono tracking-wider block">
                NLP Risk (A)
              </span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-lg font-mono font-bold text-zinc-100">
                  {semanticRiskScore.toFixed(2)}
                </span>
                <span className="text-xs text-zinc-400">score</span>
              </div>
            </div>

            <div className="bg-zinc-900/80 border border-zinc-800 p-3 rounded-lg">
              <span className="text-[11px] text-zinc-400 uppercase font-mono tracking-wider block">
                Velocity (B)
              </span>
              <div className="mt-1">
                <span className="text-base font-mono font-bold text-amber-300 truncate block">
                  {cve.timing_forecast.velocity.split(" ")[0]}
                </span>
              </div>
            </div>

            <div className="bg-zinc-900/80 border border-zinc-800 p-3 rounded-lg">
              <span className="text-[11px] text-zinc-400 uppercase font-mono tracking-wider block">
                Blast Radius (C)
              </span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-lg font-mono font-bold text-zinc-100">
                  {blastServices}
                </span>
                <span className="text-xs text-zinc-400">services</span>
              </div>
            </div>
          </div>

          {/* Section 1: Component A (Dinitha) */}
          <div className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-4 space-y-3">
            <div className="flex items-center gap-2.5 pb-2 border-b border-zinc-800">
              <FileText className="w-4 h-4 text-zinc-400" />
              <div>
                <span className="text-sm font-bold text-zinc-100 block">
                  1. Semantic Threat Indicators &amp; CWE Signals
                </span>
                <span className="text-xs text-zinc-400">
                  NLP trigger semantics • Component A (Dinitha)
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-zinc-400 block mb-1">CWE Classification:</span>
                <span className="text-zinc-200 font-mono text-sm font-semibold">
                  {cve.semantic_text.cwe}
                </span>
              </div>
              <div>
                <span className="text-zinc-400 block mb-1">Semantic Confidence:</span>
                <span className="text-zinc-200 font-mono text-sm font-semibold">
                  {cve.semantic_text.semantic_risk}
                </span>
              </div>
            </div>

            <div>
              <span className="text-xs text-zinc-400 block mb-1">Extracted NLP Signal:</span>
              <p className="text-zinc-200 text-xs leading-relaxed bg-zinc-900 p-2.5 rounded border border-zinc-800 font-mono">
                "{cve.semantic_text.signal}"
              </p>
            </div>
          </div>

          {/* Section 2: Component B (Sithmini) */}
          <div className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-4 space-y-3">
            <div className="flex items-center gap-2.5 pb-2 border-b border-zinc-800">
              <Clock className="w-4 h-4 text-zinc-400" />
              <div>
                <span className="text-sm font-bold text-zinc-100 block">
                  2. Exploit Timing &amp; Weaponization Forecast
                </span>
                <span className="text-xs text-zinc-400">
                  Survival analysis &amp; velocity forecasting • Component B (Sithmini)
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <span className="text-zinc-400 block mb-1">Status:</span>
                <span className="text-rose-300 font-semibold text-xs flex items-center gap-1.5 font-mono">
                  <Radio className="w-3 h-3 text-rose-400" />
                  {cve.timing_forecast.status}
                </span>
              </div>
              <div>
                <span className="text-zinc-400 block mb-1">Time to Exploit:</span>
                <span className="text-zinc-200 font-mono text-xs font-semibold">
                  {cve.timing_forecast.time_to_exploit}
                </span>
              </div>
              <div>
                <span className="text-zinc-400 block mb-1">Velocity Tier:</span>
                <span className="text-amber-300 font-mono text-xs font-semibold">
                  {cve.timing_forecast.velocity}
                </span>
              </div>
            </div>
          </div>

          {/* Section 3: Component C (Thilanka) */}
          <div className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-4 space-y-3">
            <div className="flex items-center gap-2.5 pb-2 border-b border-zinc-800">
              <Network className="w-4 h-4 text-zinc-400" />
              <div>
                <span className="text-sm font-bold text-zinc-100 block">
                  3. Asset Reachability &amp; Topology Exposure
                </span>
                <span className="text-xs text-zinc-400">
                  Network exposure &amp; blast radius • Component C (Thilanka)
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-zinc-400 block mb-1 flex items-center gap-1.5">
                  <Server className="w-3.5 h-3.5 text-zinc-400" />
                  Network Exposure:
                </span>
                <span className="text-zinc-200 text-sm font-semibold">
                  {cve.asset_reachability.exposure}
                </span>
              </div>
              <div>
                <span className="text-zinc-400 block mb-1 flex items-center gap-1.5">
                  <AlertOctagon className="w-3.5 h-3.5 text-zinc-400" />
                  Criticality Zone:
                </span>
                <span className="text-zinc-200 text-sm font-semibold">
                  {cve.asset_reachability.criticality}
                </span>
              </div>
            </div>

            <div>
              <span className="text-xs text-zinc-400 block mb-1 flex items-center gap-1.5">
                <Share2 className="w-3.5 h-3.5 text-zinc-400" />
                Downstream Blast Radius:
              </span>
              <p className="text-zinc-200 text-xs leading-relaxed bg-zinc-900 p-2.5 rounded border border-zinc-800">
                {cve.asset_reachability.blast_radius}
              </p>
            </div>
          </div>

          {/* Section 4: Component D (Bhuvani) */}
          <div className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-4 space-y-3">
            <div className="flex items-center gap-2.5 pb-2 border-b border-zinc-800">
              <Scale className="w-4 h-4 text-zinc-400" />
              <div>
                <span className="text-sm font-bold text-zinc-100 block">
                  4. Knapsack Resource Allocation Rationale
                </span>
                <span className="text-xs text-zinc-400">
                  Capacity constraint optimization • Component D (Bhuvani)
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <div>
                <span className="text-zinc-400 block mb-1">Knapsack Decision State:</span>
                <span className="text-emerald-400 font-mono font-bold text-sm flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  {cve.triage_allocation.decision}
                </span>
              </div>
              <span className="font-mono text-xs px-2.5 py-1 rounded bg-emerald-950/50 text-emerald-400 border border-emerald-900/50">
                ROI Maxima
              </span>
            </div>

            <div>
              <span className="text-xs text-zinc-400 block mb-1">Optimization Math:</span>
              <p className="text-zinc-200 text-xs leading-relaxed bg-zinc-900 p-2.5 rounded border border-zinc-800">
                {cve.triage_allocation.rationale}
              </p>
            </div>
          </div>
        </div>

        {/* Drawer Sticky Footer Actions */}
        <div className="p-4 border-t border-zinc-800 bg-[#0c0c0e] flex items-center justify-between gap-3">
          <button
            onClick={copyToClipboard}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-zinc-700 bg-zinc-800 hover:bg-zinc-750 text-xs font-semibold text-zinc-200 transition-colors"
          >
            <Copy className="w-4 h-4" />
            {copied ? "Copied!" : "Copy CVE Details"}
          </button>
          <button
            onClick={() => alert(`Remediation ticket for ${cve.cve_id} dispatched to SecOps tracking queue.`)}
            className="flex items-center gap-2 px-5 py-2 rounded-lg bg-zinc-100 hover:bg-white text-zinc-950 text-xs font-bold transition-colors shadow-xs"
          >
            <ExternalLink className="w-4 h-4" />
            Create Remediation Ticket
          </button>
        </div>
      </aside>
    </div>
  );
};
