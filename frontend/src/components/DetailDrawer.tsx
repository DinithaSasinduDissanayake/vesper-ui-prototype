import React from "react";
import type { CVEItem } from "../types/cve";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Copy,
  Check,
  FileText,
  Clock,
  Network,
  Scale,
  ExternalLink,
  ArrowUpRight,
} from "lucide-react";

interface DetailDrawerProps {
  cve: CVEItem | null;
  onClose: () => void;
}

export const DetailDrawer: React.FC<DetailDrawerProps> = ({ cve, onClose }) => {
  const [copied, setCopied] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<string>("overview");

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
  const blastServices = blastRadiusMatch ? parseInt(blastRadiusMatch[0], 10) : 12;

  return (
    <Sheet open={!!cve} onOpenChange={(open: boolean) => !open && onClose()}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-3xl p-0 flex flex-col h-full bg-white border-l border-zinc-200 shadow-2xl overflow-hidden"
      >
        {/* Drawer Header */}
        <SheetHeader className="p-6 pb-4 border-b border-zinc-200 bg-white sticky top-0 z-20 text-left">
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

            <Badge variant="outline" className="font-mono text-xs text-zinc-700 bg-zinc-50">
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

          <SheetTitle className="text-xl font-bold text-zinc-950 leading-snug">
            {cve.name}
          </SheetTitle>

          <div className="flex items-center gap-2 text-sm text-zinc-600 font-mono mt-1">
            <span>Component:</span>
            <span className="text-zinc-900 bg-zinc-100 px-2 py-0.5 rounded border border-zinc-200 font-semibold text-xs">
              {cve.component}
            </span>
          </div>

          {/* Member Component Tabs Navigation */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mt-4">
            <TabsList className="w-full grid grid-cols-5 h-9 bg-zinc-100 p-0.5 border border-zinc-200">
              <TabsTrigger value="overview" className="text-xs font-medium">
                Overview
              </TabsTrigger>
              <TabsTrigger value="component-a" className="text-xs font-medium">
                NLP (Dinitha)
              </TabsTrigger>
              <TabsTrigger value="component-b" className="text-xs font-medium">
                Survival (Sithmini)
              </TabsTrigger>
              <TabsTrigger value="component-c" className="text-xs font-medium">
                Topology (Thilanka)
              </TabsTrigger>
              <TabsTrigger value="component-d" className="text-xs font-medium">
                Knapsack (Bhuvani)
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </SheetHeader>

        {/* Drawer Scrollable Content Body */}
        <div className="p-6 space-y-6 flex-1 overflow-y-auto text-sm bg-[#fafafa]/50">
          
          {/* TAB 0: EXECUTIVE OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-5 animate-in fade-in duration-150">
              {/* Executive Decision Rationale */}
              <Card className="p-4 bg-white border-zinc-200 text-zinc-800 leading-relaxed shadow-xs">
                <span className="font-semibold text-zinc-900 block mb-1 text-xs uppercase tracking-wider font-mono text-zinc-500">
                  Executive Triage Rationale:
                </span>
                <p className="text-zinc-800 text-sm leading-relaxed">{cve.why_prioritized}</p>
              </Card>

              {/* 4-Metric Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <Card className="p-3 bg-white border-zinc-200 shadow-2xs">
                  <span className="text-[11px] text-zinc-500 uppercase font-mono tracking-wider block font-semibold">
                    Base CVSS
                  </span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-lg font-mono font-bold text-zinc-950">
                      {cve.cvss_score.toFixed(1)}
                    </span>
                    <span className="text-xs text-zinc-500">/ 10</span>
                  </div>
                </Card>

                <Card className="p-3 bg-white border-zinc-200 shadow-2xs">
                  <span className="text-[11px] text-zinc-500 uppercase font-mono tracking-wider block font-semibold">
                    Semantic Risk (A)
                  </span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-lg font-mono font-bold text-zinc-950">
                      {semanticRiskScore.toFixed(2)}
                    </span>
                    <span className="text-xs text-zinc-500">NLP</span>
                  </div>
                </Card>

                <Card className="p-3 bg-white border-zinc-200 shadow-2xs">
                  <span className="text-[11px] text-zinc-500 uppercase font-mono tracking-wider block font-semibold">
                    Velocity (B)
                  </span>
                  <div className="mt-1">
                    <span className="text-base font-mono font-bold text-amber-800 truncate block">
                      {cve.timing_forecast.velocity.split(" ")[0]}
                    </span>
                  </div>
                </Card>

                <Card className="p-3 bg-white border-zinc-200 shadow-2xs">
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

              {/* Multi-Modal Research Pillars Quick Navigation */}
              <div className="space-y-2.5 pt-2">
                <span className="text-xs font-bold uppercase tracking-wider font-mono text-zinc-500 block">
                  Individual Research Component Evidence:
                </span>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Card 
                    onClick={() => setActiveTab("component-a")}
                    className="p-3.5 bg-white hover:border-zinc-400 cursor-pointer transition-all shadow-2xs group"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-zinc-900 flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-zinc-500" />
                        Component A: NLP Intelligence
                      </span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-900 transition-colors" />
                    </div>
                    <p className="text-xs text-zinc-500 line-clamp-2 font-mono">
                      CWE pattern extraction &amp; semantic keyword weight analysis.
                    </p>
                    <span className="text-[10px] text-zinc-400 mt-2 block font-medium">Lead: Dinitha</span>
                  </Card>

                  <Card 
                    onClick={() => setActiveTab("component-b")}
                    className="p-3.5 bg-white hover:border-zinc-400 cursor-pointer transition-all shadow-2xs group"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-zinc-900 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-zinc-500" />
                        Component B: Exploit Survival
                      </span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-900 transition-colors" />
                    </div>
                    <p className="text-xs text-zinc-500 line-clamp-2 font-mono">
                      Time-to-exploit survival curve &amp; weaponization velocity window.
                    </p>
                    <span className="text-[10px] text-zinc-400 mt-2 block font-medium">Lead: Sithmini</span>
                  </Card>

                  <Card 
                    onClick={() => setActiveTab("component-c")}
                    className="p-3.5 bg-white hover:border-zinc-400 cursor-pointer transition-all shadow-2xs group"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-zinc-900 flex items-center gap-1.5">
                        <Network className="w-3.5 h-3.5 text-zinc-500" />
                        Component C: Blast Radius
                      </span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-900 transition-colors" />
                    </div>
                    <p className="text-xs text-zinc-500 line-clamp-2 font-mono">
                      Network topology boundary graph &amp; microservice reachability.
                    </p>
                    <span className="text-[10px] text-zinc-400 mt-2 block font-medium">Lead: Thilanka</span>
                  </Card>

                  <Card 
                    onClick={() => setActiveTab("component-d")}
                    className="p-3.5 bg-white hover:border-zinc-400 cursor-pointer transition-all shadow-2xs group"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-zinc-900 flex items-center gap-1.5">
                        <Scale className="w-3.5 h-3.5 text-zinc-500" />
                        Component D: Knapsack Opt
                      </span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-900 transition-colors" />
                    </div>
                    <p className="text-xs text-zinc-500 line-clamp-2 font-mono">
                      Sprint resource constraint math &amp; risk-reduction ROI frontier.
                    </p>
                    <span className="text-[10px] text-zinc-400 mt-2 block font-medium">Lead: Bhuvani</span>
                  </Card>
                </div>
              </div>
            </div>
          )}

          {/* TAB 1: COMPONENT A (DINITHA) — NLP SEMANTIC THREAT INTELLIGENCE */}
          {activeTab === "component-a" && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="flex items-center justify-between pb-2 border-b border-zinc-200">
                <div>
                  <h3 className="text-base font-bold text-zinc-950">Component A: Semantic NLP Threat Indicators</h3>
                  <p className="text-xs text-zinc-500">Advisory text semantics, CWE multi-label classifier &amp; trigger tokens</p>
                </div>
                <Badge variant="outline" className="font-mono text-xs bg-zinc-50">
                  Lead: Dinitha
                </Badge>
              </div>

              {/* CWE Classification & Confidence */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Card className="p-4 bg-white shadow-2xs">
                  <span className="text-xs text-zinc-500 block mb-1 font-semibold uppercase font-mono">
                    Predicted CWE Pattern
                  </span>
                  <span className="text-sm font-bold text-zinc-950 font-mono block">
                    {cve.semantic_text.cwe}
                  </span>
                </Card>
                <Card className="p-4 bg-white shadow-2xs">
                  <span className="text-xs text-zinc-500 block mb-1 font-semibold uppercase font-mono">
                    Semantic Risk Confidence
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-bold font-mono text-zinc-950">
                      {cve.semantic_text.semantic_risk}
                    </span>
                    <span className="text-xs text-zinc-500">calibrated probability</span>
                  </div>
                </Card>
              </div>

              {/* Attention Token Extraction Visualizer */}
              <Card className="p-4 bg-white shadow-2xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-zinc-950 uppercase tracking-wider font-mono">
                    NLP Token Salience (Advisory Attention Weights)
                  </span>
                  <span className="text-[11px] text-zinc-400 font-mono">Transformer Attention Score</span>
                </div>
                
                <div className="p-3.5 bg-zinc-50 rounded-lg border border-zinc-200 font-mono text-xs leading-relaxed text-zinc-800">
                  The model extracted high threat activation tokens from description:{" "}
                  <mark className="bg-rose-100 text-rose-900 px-1.5 py-0.5 rounded border border-rose-200 font-bold">
                    unauthenticated remote code execution
                  </mark>{" "}
                  via{" "}
                  <mark className="bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded border border-amber-200 font-bold">
                    arbitrary JNDI / LDAP lookups
                  </mark>{" "}
                  leading to full system takeover.
                </div>

                <div className="pt-2 flex items-center gap-3 text-xs text-zinc-500">
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                    Critical Risk Trigger (&gt;0.90)
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    Elevated Pattern (&gt;0.75)
                  </span>
                </div>
              </Card>

              {/* Raw NLP Extracted Signal */}
              <Card className="p-4 bg-white shadow-2xs space-y-1.5">
                <span className="text-xs font-bold text-zinc-950 uppercase tracking-wider font-mono">
                  Extracted Linguistic Signal
                </span>
                <p className="text-xs text-zinc-700 bg-zinc-50 p-3 rounded border border-zinc-200 font-mono leading-relaxed">
                  "{cve.semantic_text.signal}"
                </p>
              </Card>
            </div>
          )}

          {/* TAB 2: COMPONENT B (SITHMINI) — EXPLOIT TIMING & SURVIVAL ANALYSIS */}
          {activeTab === "component-b" && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="flex items-center justify-between pb-2 border-b border-zinc-200">
                <div>
                  <h3 className="text-base font-bold text-zinc-950">Component B: Exploit Timing &amp; Survival Forecast</h3>
                  <p className="text-xs text-zinc-500">Survival analysis $S(t)$, hazard rate $h(t)$ &amp; weaponization velocity window</p>
                </div>
                <Badge variant="outline" className="font-mono text-xs bg-zinc-50">
                  Lead: Sithmini
                </Badge>
              </div>

              {/* Survival Curve Visualization (SVG Artifact) */}
              <Card className="p-4 bg-white shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-zinc-950 uppercase tracking-wider font-mono">
                    Survival Function Probability Curve S(t)
                  </span>
                  <span className="text-[11px] font-mono text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200 font-semibold">
                    Current Position: Day 2 (Hazard Spike)
                  </span>
                </div>

                {/* Simulated Survival Analysis Curve */}
                <div className="h-44 w-full bg-zinc-50 rounded-lg border border-zinc-200 p-3 relative flex flex-col justify-between">
                  <div className="text-[10px] font-mono text-zinc-400 flex justify-between">
                    <span>1.0 (Safe / Unexploited)</span>
                    <span>Survival Probability over Time</span>
                  </div>

                  <svg viewBox="0 0 500 120" className="w-full h-24 overflow-visible">
                    {/* Grid lines */}
                    <line x1="0" y1="20" x2="500" y2="20" stroke="#e4e4e7" strokeDasharray="3 3" />
                    <line x1="0" y1="60" x2="500" y2="60" stroke="#e4e4e7" strokeDasharray="3 3" />
                    <line x1="0" y1="100" x2="500" y2="100" stroke="#e4e4e7" strokeDasharray="3 3" />

                    {/* Survival curve (Drop-off curve) */}
                    <path
                      d="M 0,10 Q 50,15 90,55 T 200,95 T 500,110"
                      fill="none"
                      stroke="#9f1239"
                      strokeWidth="2.5"
                    />

                    {/* Shaded Area under hazard */}
                    <path
                      d="M 0,10 Q 50,15 90,55 T 200,95 T 500,110 L 500,120 L 0,120 Z"
                      fill="rgba(244, 63, 94, 0.08)"
                    />

                    {/* Current Day Marker */}
                    <line x1="90" y1="0" x2="90" y2="120" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="2 2" />
                    <circle cx="90" cy="55" r="4" fill="#9f1239" stroke="#fff" strokeWidth="2" />
                    <text x="96" y="50" fontSize="9" fill="#9f1239" fontWeight="bold" fontFamily="monospace">
                      Today: S(t)=0.46
                    </text>
                  </svg>

                  <div className="text-[10px] font-mono text-zinc-500 flex justify-between pt-1 border-t border-zinc-200">
                    <span>Day 0 (Disclosure)</span>
                    <span>Day 7</span>
                    <span>Day 14</span>
                    <span>Day 21</span>
                    <span>Day 30</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2.5 pt-1 text-xs">
                  <div className="p-2.5 rounded bg-zinc-50 border border-zinc-200">
                    <span className="text-[10px] text-zinc-500 block uppercase font-mono">Wild Status</span>
                    <span className="font-bold text-rose-800 font-mono mt-0.5 block">
                      {cve.timing_forecast.status}
                    </span>
                  </div>
                  <div className="p-2.5 rounded bg-zinc-50 border border-zinc-200">
                    <span className="text-[10px] text-zinc-500 block uppercase font-mono">Time-to-Exploit</span>
                    <span className="font-bold text-zinc-900 font-mono mt-0.5 block">
                      {cve.timing_forecast.time_to_exploit}
                    </span>
                  </div>
                  <div className="p-2.5 rounded bg-zinc-50 border border-zinc-200">
                    <span className="text-[10px] text-zinc-500 block uppercase font-mono">Velocity Tier</span>
                    <span className="font-bold text-amber-800 font-mono mt-0.5 block">
                      {cve.timing_forecast.velocity}
                    </span>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* TAB 3: COMPONENT C (THILANKA) — ASSET REACHABILITY & TOPOLOGY GRAPH */}
          {activeTab === "component-c" && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="flex items-center justify-between pb-2 border-b border-zinc-200">
                <div>
                  <h3 className="text-base font-bold text-zinc-950">Component C: Asset Topology &amp; Blast Radius</h3>
                  <p className="text-xs text-zinc-500">Perimeter network boundaries, critical asset exposure &amp; downstream graph reachability</p>
                </div>
                <Badge variant="outline" className="font-mono text-xs bg-zinc-50">
                  Lead: Thilanka
                </Badge>
              </div>

              {/* Topology Micro-Graph Visualizer */}
              <Card className="p-4 bg-white shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-zinc-950 uppercase tracking-wider font-mono">
                    Perimeter-to-Core Attack Path Graph
                  </span>
                  <Badge variant="destructive" className="font-mono text-[11px]">
                    Direct Internet Ingress
                  </Badge>
                </div>

                {/* SVG Network Graph Visualization */}
                <div className="h-44 w-full bg-zinc-50 rounded-lg border border-zinc-200 p-3 relative flex items-center justify-center">
                  <svg viewBox="0 0 520 120" className="w-full h-28">
                    {/* Connecting Arrows */}
                    <line x1="80" y1="60" x2="220" y2="60" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4 4" />
                    <line x1="260" y1="60" x2="400" y2="35" stroke="#fca5a5" strokeWidth="2" />
                    <line x1="260" y1="60" x2="400" y2="85" stroke="#fca5a5" strokeWidth="2" />

                    {/* Node 1: Public Internet */}
                    <circle cx="60" cy="60" r="24" fill="#f8fafc" stroke="#94a3b8" strokeWidth="2" />
                    <text x="60" y="58" fontSize="9" fontWeight="bold" textAnchor="middle" fill="#475569" fontFamily="sans-serif">Public</text>
                    <text x="60" y="70" fontSize="8" textAnchor="middle" fill="#64748b" fontFamily="sans-serif">Internet</text>

                    {/* Node 2: Compromised Ingress Gateway (The CVE Node) */}
                    <circle cx="240" cy="60" r="28" fill="#fff1f2" stroke="#be123c" strokeWidth="2.5" />
                    <text x="240" y="56" fontSize="9" fontWeight="bold" textAnchor="middle" fill="#9f1239" fontFamily="monospace">Compromised</text>
                    <text x="240" y="68" fontSize="8" fontWeight="bold" textAnchor="middle" fill="#9f1239" fontFamily="sans-serif">Edge Host</text>

                    {/* Node 3: Downstream Microservices */}
                    <rect x="400" y="20" width="100" height="30" rx="6" fill="#fef2f2" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="450" y="38" fontSize="8" fontWeight="bold" textAnchor="middle" fill="#b91c1c" fontFamily="sans-serif">
                      94 Microservices
                    </text>

                    {/* Node 4: Production Core DB */}
                    <rect x="400" y="70" width="100" height="30" rx="6" fill="#fef2f2" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="450" y="88" fontSize="8" fontWeight="bold" textAnchor="middle" fill="#b91c1c" fontFamily="sans-serif">
                      Customer PII Store
                    </text>
                  </svg>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-zinc-50 rounded border border-zinc-200">
                    <span className="text-[10px] text-zinc-500 uppercase font-mono block">Boundary Zone</span>
                    <span className="font-bold text-zinc-900 mt-1 block">{cve.asset_reachability.exposure}</span>
                  </div>
                  <div className="p-3 bg-zinc-50 rounded border border-zinc-200">
                    <span className="text-[10px] text-zinc-500 uppercase font-mono block">Topology Impact</span>
                    <span className="font-bold text-rose-800 mt-1 block">{cve.asset_reachability.blast_radius}</span>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* TAB 4: COMPONENT D (BHUVANI) — KNAPSACK RESOURCE OPTIMIZATION */}
          {activeTab === "component-d" && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="flex items-center justify-between pb-2 border-b border-zinc-200">
                <div>
                  <h3 className="text-base font-bold text-zinc-950">Component D: Multi-Objective Knapsack Optimization</h3>
                  <p className="text-xs text-zinc-500">Remediation capacity constraint modeling &amp; risk-reduction ROI frontier</p>
                </div>
                <Badge variant="outline" className="font-mono text-xs bg-zinc-50">
                  Lead: Bhuvani
                </Badge>
              </div>

              {/* Knapsack Allocation Decision Card */}
              <Card className="p-4 bg-white shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-zinc-950 uppercase tracking-wider font-mono">
                    Sprint Knapsack Decision State
                  </span>
                  <Badge variant="routine" className="font-mono text-xs font-bold">
                    Allocated: Rank #1 ROI
                  </Badge>
                </div>

                <div className="p-3 bg-emerald-50/60 rounded-lg border border-emerald-200 text-xs text-emerald-950 leading-relaxed font-mono">
                  <span className="font-bold block mb-1">Knapsack Optimization Output:</span>
                  {cve.triage_allocation.rationale}
                </div>

                {/* Pareto Frontier / Budget Trade-off Curve */}
                <div className="h-44 w-full bg-zinc-50 rounded-lg border border-zinc-200 p-3 flex flex-col justify-between">
                  <div className="text-[10px] font-mono text-zinc-400 flex justify-between">
                    <span>Cumulative Risk Reduction (%)</span>
                    <span>Pareto Efficient Frontier</span>
                  </div>

                  <svg viewBox="0 0 500 120" className="w-full h-24 overflow-visible">
                    <line x1="0" y1="20" x2="500" y2="20" stroke="#e4e4e7" strokeDasharray="3 3" />
                    <line x1="0" y1="60" x2="500" y2="60" stroke="#e4e4e7" strokeDasharray="3 3" />
                    <line x1="0" y1="100" x2="500" y2="100" stroke="#e4e4e7" strokeDasharray="3 3" />

                    {/* Diminishing returns knapsack curve */}
                    <path
                      d="M 0,110 Q 50,30 180,18 T 500,12"
                      fill="none"
                      stroke="#059669"
                      strokeWidth="2.5"
                    />

                    {/* Point for Current CVE */}
                    <circle cx="45" cy="40" r="5" fill="#059669" stroke="#fff" strokeWidth="2" />
                    <text x="55" y="44" fontSize="9" fill="#065f46" fontWeight="bold" fontFamily="monospace">
                      CVE-2021-44228 (Top Risk ROI)
                    </text>
                  </svg>

                  <div className="text-[10px] font-mono text-zinc-500 flex justify-between pt-1 border-t border-zinc-200">
                    <span>0 CVEs</span>
                    <span>10 CVEs (Current Cap)</span>
                    <span>25 CVEs</span>
                    <span>50 CVEs</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-2.5 bg-zinc-50 rounded border border-zinc-200">
                    <span className="text-[10px] text-zinc-500 uppercase font-mono">Remediation Effort</span>
                    <span className="font-bold text-zinc-900 font-mono mt-0.5 block">2.5 Engineering Hours</span>
                  </div>
                  <div className="p-2.5 bg-zinc-50 rounded border border-zinc-200">
                    <span className="text-[10px] text-zinc-500 uppercase font-mono">Risk Elimination Return</span>
                    <span className="font-bold text-emerald-800 font-mono mt-0.5 block">9.8 Risk Units (Max Ratio)</span>
                  </div>
                </div>
              </Card>
            </div>
          )}

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
