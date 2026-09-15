import React from "react";
import type { CVEItem } from "../types/cve";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
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
  ExternalLink,
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
    <Sheet open={!!cve} onOpenChange={(open: boolean) => !open && onClose()}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-2xl p-0 flex flex-col h-full bg-white border-l border-zinc-200 shadow-xl overflow-hidden"
      >
        {/* Drawer Header */}
        <SheetHeader className="p-6 border-b border-zinc-200 bg-white sticky top-0 z-20 text-left">
          <div className="flex items-center gap-2.5 flex-wrap mb-1.5">
            <span className="font-mono text-base font-bold text-zinc-950 tracking-tight">
              {cve.cve_id}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={copyToClipboard}
              className="h-7 w-7 text-zinc-400 hover:text-zinc-700"
              title="Copy CVE ID"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-zinc-500" />}
            </Button>

            <Badge
              variant={isCritical ? "critical" : "high"}
              className="font-mono text-xs font-bold"
            >
              {cve.tier} TIER
            </Badge>

            <Badge variant="outline" className="font-mono text-xs text-zinc-700">
              CVSS {cve.cvss_score.toFixed(1)} Base
            </Badge>

            <div className="ml-auto pr-6">
              <Badge
                variant={cve.action_window.includes("24") ? "critical" : "high"}
                className="font-mono text-xs px-2.5 py-0.5 font-bold"
              >
                SLA: {cve.action_window}
              </Badge>
            </div>
          </div>

          <SheetTitle className="text-lg font-bold text-zinc-950 leading-snug">
            {cve.name}
          </SheetTitle>

          <div className="flex items-center gap-2 text-sm text-zinc-600 font-mono mt-1">
            <span>Component:</span>
            <span className="text-zinc-900 bg-zinc-100 px-2 py-0.5 rounded border border-zinc-200 font-semibold text-xs">
              {cve.component}
            </span>
          </div>
        </SheetHeader>

        {/* Drawer Scrollable Body */}
        <div className="p-6 space-y-6 flex-1 overflow-y-auto text-sm">
          {/* Executive Urgency Callout Card */}
          <Card className="p-4 bg-zinc-50/80 border-zinc-200 text-zinc-800 leading-relaxed shadow-none">
            <span className="font-semibold text-zinc-900 block mb-1 text-xs uppercase tracking-wider font-mono text-zinc-600">
              Why Prioritized (Executive Triage Decision):
            </span>
            <p className="text-zinc-800 text-sm leading-relaxed">{cve.why_prioritized}</p>
          </Card>

          {/* 4-Metric Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Card className="p-3 bg-zinc-50/50 border-zinc-200 shadow-none">
              <span className="text-[11px] text-zinc-500 uppercase font-mono tracking-wider block font-semibold">
                Base Severity
              </span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-lg font-mono font-bold text-zinc-950">
                  {cve.cvss_score.toFixed(1)}
                </span>
                <span className="text-xs text-zinc-500">/ 10</span>
              </div>
            </Card>

            <Card className="p-3 bg-zinc-50/50 border-zinc-200 shadow-none">
              <span className="text-[11px] text-zinc-500 uppercase font-mono tracking-wider block font-semibold">
                NLP Risk (A)
              </span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-lg font-mono font-bold text-zinc-950">
                  {semanticRiskScore.toFixed(2)}
                </span>
                <span className="text-xs text-zinc-500">score</span>
              </div>
            </Card>

            <Card className="p-3 bg-zinc-50/50 border-zinc-200 shadow-none">
              <span className="text-[11px] text-zinc-500 uppercase font-mono tracking-wider block font-semibold">
                Velocity (B)
              </span>
              <div className="mt-1">
                <span className="text-base font-mono font-bold text-amber-800 truncate block">
                  {cve.timing_forecast.velocity.split(" ")[0]}
                </span>
              </div>
            </Card>

            <Card className="p-3 bg-zinc-50/50 border-zinc-200 shadow-none">
              <span className="text-[11px] text-zinc-500 uppercase font-mono tracking-wider block font-semibold">
                Blast Radius (C)
              </span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-lg font-mono font-bold text-zinc-950">
                  {blastServices}
                </span>
                <span className="text-xs text-zinc-500">services</span>
              </div>
            </Card>
          </div>

          {/* Section 1: Component A (Dinitha) */}
          <Card className="p-4 space-y-3 shadow-2xs">
            <div className="flex items-center gap-2.5 pb-2 border-b border-zinc-100">
              <FileText className="w-4 h-4 text-zinc-500" />
              <div>
                <span className="text-sm font-bold text-zinc-950 block">
                  1. Semantic Threat Indicators &amp; CWE Signals
                </span>
                <span className="text-xs text-zinc-500 font-medium">
                  NLP trigger semantics • Component A (Dinitha)
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-zinc-500 block mb-1">CWE Classification:</span>
                <span className="text-zinc-900 font-mono text-sm font-bold">
                  {cve.semantic_text.cwe}
                </span>
              </div>
              <div>
                <span className="text-zinc-500 block mb-1">Semantic Confidence:</span>
                <span className="text-zinc-900 font-mono text-sm font-bold">
                  {cve.semantic_text.semantic_risk}
                </span>
              </div>
            </div>

            <div>
              <span className="text-xs text-zinc-500 block mb-1 font-medium">Extracted NLP Signal:</span>
              <p className="text-zinc-800 text-xs leading-relaxed bg-zinc-50 p-2.5 rounded border border-zinc-200 font-mono">
                "{cve.semantic_text.signal}"
              </p>
            </div>
          </Card>

          {/* Section 2: Component B (Sithmini) */}
          <Card className="p-4 space-y-3 shadow-2xs">
            <div className="flex items-center gap-2.5 pb-2 border-b border-zinc-100">
              <Clock className="w-4 h-4 text-zinc-500" />
              <div>
                <span className="text-sm font-bold text-zinc-950 block">
                  2. Exploit Timing &amp; Weaponization Forecast
                </span>
                <span className="text-xs text-zinc-500 font-medium">
                  Survival analysis &amp; velocity forecasting • Component B (Sithmini)
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <span className="text-zinc-500 block mb-1">Status:</span>
                <span className="text-rose-800 font-bold text-xs flex items-center gap-1.5 font-mono">
                  <Radio className="w-3 h-3 text-rose-600" />
                  {cve.timing_forecast.status}
                </span>
              </div>
              <div>
                <span className="text-zinc-500 block mb-1">Time to Exploit:</span>
                <span className="text-zinc-900 font-mono text-xs font-bold">
                  {cve.timing_forecast.time_to_exploit}
                </span>
              </div>
              <div>
                <span className="text-zinc-500 block mb-1">Velocity Tier:</span>
                <span className="text-amber-800 font-mono text-xs font-bold">
                  {cve.timing_forecast.velocity}
                </span>
              </div>
            </div>
          </Card>

          {/* Section 3: Component C (Thilanka) */}
          <Card className="p-4 space-y-3 shadow-2xs">
            <div className="flex items-center gap-2.5 pb-2 border-b border-zinc-100">
              <Network className="w-4 h-4 text-zinc-500" />
              <div>
                <span className="text-sm font-bold text-zinc-950 block">
                  3. Asset Reachability &amp; Topology Exposure
                </span>
                <span className="text-xs text-zinc-500 font-medium">
                  Network exposure &amp; blast radius • Component C (Thilanka)
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-zinc-500 block mb-1 flex items-center gap-1.5">
                  <Server className="w-3.5 h-3.5 text-zinc-500" />
                  Network Exposure:
                </span>
                <span className="text-zinc-900 text-sm font-bold">
                  {cve.asset_reachability.exposure}
                </span>
              </div>
              <div>
                <span className="text-zinc-500 block mb-1 flex items-center gap-1.5">
                  <AlertOctagon className="w-3.5 h-3.5 text-zinc-500" />
                  Criticality Zone:
                </span>
                <span className="text-zinc-900 text-sm font-bold">
                  {cve.asset_reachability.criticality}
                </span>
              </div>
            </div>

            <div>
              <span className="text-xs text-zinc-500 block mb-1 flex items-center gap-1.5 font-medium">
                <Share2 className="w-3.5 h-3.5 text-zinc-500" />
                Downstream Blast Radius:
              </span>
              <p className="text-zinc-800 text-xs leading-relaxed bg-zinc-50 p-2.5 rounded border border-zinc-200">
                {cve.asset_reachability.blast_radius}
              </p>
            </div>
          </Card>

          {/* Section 4: Component D (Bhuvani) */}
          <Card className="p-4 space-y-3 shadow-2xs">
            <div className="flex items-center gap-2.5 pb-2 border-b border-zinc-100">
              <Scale className="w-4 h-4 text-zinc-500" />
              <div>
                <span className="text-sm font-bold text-zinc-950 block">
                  4. Knapsack Resource Allocation Rationale
                </span>
                <span className="text-xs text-zinc-500 font-medium">
                  Capacity constraint optimization • Component D (Bhuvani)
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <div>
                <span className="text-zinc-500 block mb-1">Knapsack Decision State:</span>
                <span className="text-emerald-800 font-mono font-bold text-sm flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  {cve.triage_allocation.decision}
                </span>
              </div>
              <Badge variant="routine" className="font-mono text-xs">
                ROI Maxima
              </Badge>
            </div>

            <div>
              <span className="text-xs text-zinc-500 block mb-1 font-medium">Optimization Math:</span>
              <p className="text-zinc-800 text-xs leading-relaxed bg-zinc-50 p-2.5 rounded border border-zinc-200">
                {cve.triage_allocation.rationale}
              </p>
            </div>
          </Card>
        </div>

        {/* Drawer Sticky Footer Actions */}
        <div className="p-4 border-t border-zinc-200 bg-white flex items-center justify-between gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={copyToClipboard}
            className="text-xs font-semibold"
          >
            <Copy className="w-4 h-4 mr-2" />
            {copied ? "Copied!" : "Copy CVE Details"}
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={() => alert(`Remediation ticket for ${cve.cve_id} dispatched to SecOps tracking queue.`)}
            className="text-xs font-bold shadow-xs"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Create Remediation Ticket
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
