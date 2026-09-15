import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  ArrowRight, 
  ShieldAlert, 
  FileText, 
  Clock, 
  Network, 
  Scale, 
  CheckCircle2, 
  Sparkles, 
  TrendingDown, 
  Sliders,
  Layers,
  ChevronRight
} from "lucide-react";

interface LandingPageProps {
  onLaunchConsole: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onLaunchConsole }) => {
  // ROI Calculator Interactive State
  const [cveVolume, setCveVolume] = useState<number>(2500);

  // Math Spec from Chapter 6:
  // 91% deferred, 9% actionable
  const noiseDeferred = Math.round(cveVolume * 0.91);
  const actionableCount = Math.round(cveVolume * 0.09);
  // Manual triage takes 15 min (0.25h) per unprioritized CVE:
  const hoursSavedPerMonth = Math.round(noiseDeferred * 0.25);
  // $85/hr blended senior SecOps / AppSec engineering rate:
  const annualSavingsDollars = Math.round(hoursSavedPerMonth * 85 * 12);

  const scrollToCalculator = () => {
    const el = document.getElementById("roi-calculator");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-[#fafafa] text-zinc-950">
      {/* 1. HERO SECTION */}
      <section className="relative pt-14 pb-20 px-4 sm:px-6 max-w-[1400px] mx-auto w-full text-center border-b border-zinc-200">
        <div className="flex justify-center mb-5">
          <Badge 
            variant="outline" 
            className="px-3 py-1 text-xs font-mono font-medium tracking-tight bg-white border-zinc-300 text-zinc-800 shadow-2xs inline-flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-zinc-600" />
            Research-Backed Enterprise Vulnerability Prioritization
          </Badge>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-950 max-w-4xl mx-auto leading-[1.12]">
          Stop Drowning in CVSS 9.8 Alerts.{" "}
          <span className="text-zinc-500 font-bold block sm:inline">Prioritize the 2% That Actually Matter.</span>
        </h1>

        <p className="mt-5 text-base sm:text-lg text-zinc-600 max-w-2xl mx-auto leading-relaxed font-normal">
          Enterprise-grade multi-modal vulnerability prioritization combining Day-0 threat text semantics, empirical survival forecasting, runtime reachability, and capacity-constrained dispatch.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
          <Button 
            onClick={onLaunchConsole}
            className="h-11 px-6 bg-zinc-900 hover:bg-zinc-800 text-white font-semibold text-sm shadow-xs inline-flex items-center gap-2 cursor-pointer"
          >
            Launch Interactive Triage Demo
            <ArrowRight className="w-4 h-4" />
          </Button>

          <Button 
            variant="outline"
            onClick={scrollToCalculator}
            className="h-11 px-6 bg-white hover:bg-zinc-50 border-zinc-300 text-zinc-800 font-semibold text-sm shadow-2xs inline-flex items-center gap-2 cursor-pointer"
          >
            <Sliders className="w-4 h-4 text-zinc-500" />
            Calculate Your SOC ROI
          </Button>
        </div>

        {/* Live System Teaser Banner */}
        <div className="mt-12 max-w-4xl mx-auto bg-white rounded-xl border border-zinc-200 p-4 shadow-2xs flex flex-wrap items-center justify-between gap-4 text-left">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
            <div>
              <div className="text-xs font-bold text-zinc-900">Empirical Production Benchmark</div>
              <div className="text-[11px] text-zinc-500 font-mono">Simulated Cluster: 1,240 Total CVEs • 8 Actionable Candidates</div>
            </div>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="px-2.5 py-1 bg-rose-50 border border-rose-200 text-rose-800 rounded font-bold">
              4 Immediate (Sprint Cap)
            </span>
            <span className="px-2.5 py-1 bg-amber-50 border border-amber-200 text-amber-800 rounded font-bold">
              6 Scheduled Queue
            </span>
            <span className="px-2.5 py-1 bg-zinc-100 border border-zinc-200 text-zinc-600 rounded font-semibold hidden sm:inline">
              1,230 Safely Deferred
            </span>
          </div>
        </div>
      </section>

      {/* 2. THE SECOPS TRIAGE CRISIS (PROBLEM STATEMENT) */}
      <section className="py-16 px-4 sm:px-6 max-w-[1400px] mx-auto w-full border-b border-zinc-200">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="outline" className="text-xs font-mono font-bold text-zinc-600 mb-2">
            The Industry Bottleneck
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950">
            The SecOps Triage Crisis
          </h2>
          <p className="text-zinc-600 text-sm mt-2">
            Traditional vulnerability management relies on isolated CVSS scores that ignore runtime reachability, weaponization timelines, and engineering labor constraints.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 bg-white border-zinc-200 shadow-2xs space-y-3">
            <div className="w-10 h-10 rounded-lg bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-700 font-bold">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div className="text-3xl font-extrabold font-mono text-zinc-950 tracking-tight">
              56% <span className="text-xs font-normal text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200">&lt;3% Real Exploit</span>
            </div>
            <h3 className="font-bold text-base text-zinc-900">CVSS Score Inflation</h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Over half of all published CVEs are rated High or Critical by default, yet empirical evidence confirms less than 3% ever see weaponized exploitation in the wild.
            </p>
          </Card>

          <Card className="p-6 bg-white border-zinc-200 shadow-2xs space-y-3">
            <div className="w-10 h-10 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 font-bold">
              <TrendingDown className="w-5 h-5" />
            </div>
            <div className="text-3xl font-extrabold font-mono text-zinc-950 tracking-tight">
              70% <span className="text-xs font-normal text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">Alert Fatigue</span>
            </div>
            <h3 className="font-bold text-base text-zinc-900">The "Jira Ticket Graveyard"</h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Security teams blast development sprints with hundreds of unvetted tickets. Engineers disengage, SLAs fail, and critical zero-day threats get lost in noise.
            </p>
          </Card>

          <Card className="p-6 bg-white border-zinc-200 shadow-2xs space-y-3">
            <div className="w-10 h-10 rounded-lg bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-700 font-bold">
              <Layers className="w-5 h-5" />
            </div>
            <div className="text-3xl font-extrabold font-mono text-zinc-950 tracking-tight">
              0 Context <span className="text-xs font-normal text-zinc-700 bg-zinc-100 px-1.5 py-0.5 rounded border border-zinc-200">Isolated Scanners</span>
            </div>
            <h3 className="font-bold text-base text-zinc-900">Capacity-Blind Prioritization</h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Standard scanners treat remediation capacity as infinite. They demand 120 fixes per week from teams that can safely patch and regression-test only 10.
            </p>
          </Card>
        </div>
      </section>

      {/* 3. THE 4 VESPER ENGINE PILLARS */}
      <section className="py-16 px-4 sm:px-6 max-w-[1400px] mx-auto w-full border-b border-zinc-200">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="outline" className="text-xs font-mono font-bold text-zinc-600 mb-2">
            The Research Architecture
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950">
            The 4-Pillar VESPER Multi-Modal Engine
          </h2>
          <p className="text-zinc-600 text-sm mt-2">
            Each vulnerability is holistically evaluated through four specialized research components before a single sprint ticket is issued.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Pillar 1 */}
          <Card className="p-5 bg-white border-zinc-200 shadow-2xs space-y-3 hover:border-zinc-400 transition-colors">
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-md bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-800">
                <FileText className="w-4 h-4" />
              </div>
              <Badge variant="outline" className="font-mono text-[10px]">Component A</Badge>
            </div>
            <h3 className="text-base font-bold text-zinc-950">Day-0 NLP Threat Semantics</h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Extracts high-risk zero-day indicators, CWE taxonomy patterns, and semantic trigger weights from unstructured advisory text before weaponized PoCs surface.
            </p>
            <div className="pt-2 border-t border-zinc-100 text-[11px] font-mono text-zinc-500">
              • Attention Token Heatmaps<br />
              • Multi-label CWE Extraction
            </div>
          </Card>

          {/* Pillar 2 */}
          <Card className="p-5 bg-white border-zinc-200 shadow-2xs space-y-3 hover:border-zinc-400 transition-colors">
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-md bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-800">
                <Clock className="w-4 h-4" />
              </div>
              <Badge variant="outline" className="font-mono text-[10px]">Component B</Badge>
            </div>
            <h3 className="text-base font-bold text-zinc-950">Empirical Survival Timing</h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Non-parametric survival analysis and hazard curves forecasting weaponization velocity windows: Day 0–3 hazard spike vs. slow-burn dormant threats.
            </p>
            <div className="pt-2 border-t border-zinc-100 text-[11px] font-mono text-zinc-500">
              • Survival Probability S(t)<br />
              • Instantaneous Hazard Rate h(t)
            </div>
          </Card>

          {/* Pillar 3 */}
          <Card className="p-5 bg-white border-zinc-200 shadow-2xs space-y-3 hover:border-zinc-400 transition-colors">
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-md bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-800">
                <Network className="w-4 h-4" />
              </div>
              <Badge variant="outline" className="font-mono text-[10px]">Component C</Badge>
            </div>
            <h3 className="text-base font-bold text-zinc-950">Runtime Asset Blast Radius</h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Perimeter-to-core network topology graph analysis proving whether a vulnerable microservice has direct internet ingress or is isolated within internal subnets.
            </p>
            <div className="pt-2 border-t border-zinc-100 text-[11px] font-mono text-zinc-500">
              • Ingress Boundary Reachability<br />
              • PII / Core DB Downstream Paths
            </div>
          </Card>

          {/* Pillar 4 */}
          <Card className="p-5 bg-white border-zinc-200 shadow-2xs space-y-3 hover:border-zinc-400 transition-colors">
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-md bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-800">
                <Scale className="w-4 h-4" />
              </div>
              <Badge variant="outline" className="font-mono text-[10px]">Component D</Badge>
            </div>
            <h3 className="text-base font-bold text-zinc-950">Knapsack Resource Optimizer</h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Integer linear programming that solves the 0/1 knapsack problem, maximizing aggregate risk reduction strictly within the engineering team's finite weekly capacity.
            </p>
            <div className="pt-2 border-t border-zinc-100 text-[11px] font-mono text-zinc-500">
              • Pareto-Optimal Risk Frontier<br />
              • Zero Backlog Overflow
            </div>
          </Card>
        </div>
      </section>

      {/* 4. INTERACTIVE ROI & CAPACITY SAVINGS CALCULATOR */}
      <section id="roi-calculator" className="py-16 px-4 sm:px-6 max-w-[1400px] mx-auto w-full border-b border-zinc-200">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <Badge variant="outline" className="text-xs font-mono font-bold text-zinc-600 mb-2">
            Chapter 6 Economic Model
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950">
            Interactive SecOps ROI Calculator
          </h2>
          <p className="text-zinc-600 text-sm mt-2">
            Estimate labor reclamation and noise reduction based on your organization's monthly vulnerability discovery rate.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-xl border border-zinc-200 p-6 sm:p-8 shadow-2xs space-y-8">
          {/* Slider Input */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-zinc-900 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-zinc-500" />
                Monthly CVE Influx Discovered:
              </label>
              <div className="font-mono text-lg font-extrabold text-zinc-950 bg-zinc-100 px-3 py-1 rounded border border-zinc-200">
                {cveVolume.toLocaleString()} CVEs / month
              </div>
            </div>

            <input 
              type="range"
              min={500}
              max={10000}
              step={100}
              value={cveVolume}
              onChange={(e) => setCveVolume(Number(e.target.value))}
              className="w-full accent-zinc-900 cursor-pointer h-2 bg-zinc-200 rounded-lg"
            />
            <div className="flex justify-between text-[11px] font-mono text-zinc-400">
              <span>500 (Mid-market)</span>
              <span>2,500 (Enterprise baseline)</span>
              <span>10,000 (Global multi-cluster)</span>
            </div>
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-zinc-100">
            {/* Metric 1 */}
            <div className="p-4 bg-zinc-50 rounded-lg border border-zinc-200">
              <span className="text-[11px] font-mono text-zinc-500 block uppercase font-medium">
                Noise Deferral
              </span>
              <div className="text-2xl font-black font-mono text-zinc-950 mt-1">
                {noiseDeferred.toLocaleString()}
              </div>
              <span className="text-[11px] text-zinc-500 block mt-0.5">
                91% safely deferred
              </span>
            </div>

            {/* Metric 2 */}
            <div className="p-4 bg-rose-50/70 rounded-lg border border-rose-200">
              <span className="text-[11px] font-mono text-rose-700 block uppercase font-medium">
                Actionable Queue
              </span>
              <div className="text-2xl font-black font-mono text-rose-950 mt-1">
                {actionableCount.toLocaleString()}
              </div>
              <span className="text-[11px] text-rose-700 block mt-0.5">
                Top 9% genuine threat
              </span>
            </div>

            {/* Metric 3 */}
            <div className="p-4 bg-zinc-50 rounded-lg border border-zinc-200">
              <span className="text-[11px] font-mono text-zinc-500 block uppercase font-medium">
                Labor Saved
              </span>
              <div className="text-2xl font-black font-mono text-zinc-950 mt-1">
                {hoursSavedPerMonth.toLocaleString()} <span className="text-xs font-normal text-zinc-600">hrs/mo</span>
              </div>
              <span className="text-[11px] text-zinc-500 block mt-0.5">
                ~{(hoursSavedPerMonth / 160).toFixed(1)} FTE SecOps analysts
              </span>
            </div>

            {/* Metric 4 */}
            <div className="p-4 bg-emerald-50/70 rounded-lg border border-emerald-200">
              <span className="text-[11px] font-mono text-emerald-800 block uppercase font-medium">
                Annual Reclaimed Value
              </span>
              <div className="text-2xl font-black font-mono text-emerald-950 mt-1">
                ${(annualSavingsDollars / 1000).toFixed(0)}k <span className="text-xs font-normal text-emerald-800">/year</span>
              </div>
              <span className="text-[11px] text-emerald-700 block mt-0.5">
                At $85/hr blended rate
              </span>
            </div>
          </div>

          <div className="text-xs text-zinc-500 font-mono bg-zinc-50 p-3 rounded border border-zinc-200 flex items-start gap-2">
            <span className="font-bold text-zinc-700 uppercase">Formula Grounding:</span>
            <span>
              Baseline assuming 15 min manual triage overhead per raw scanner finding. VESPER 4-pillar dispatch defers 91% of non-weaponized, air-gapped findings to scheduled maintenance windows.
            </span>
          </div>
        </div>
      </section>

      {/* 5. MARKET SIZING (TAM / SAM / SOM) */}
      <section className="py-14 px-4 sm:px-6 max-w-[1400px] mx-auto w-full border-b border-zinc-200">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <Badge variant="outline" className="text-xs font-mono font-bold text-zinc-600 mb-2">
            Commercial Opportunity
          </Badge>
          <h2 className="text-2xl font-bold tracking-tight text-zinc-950">
            Market Sizing &amp; Expansion Horizon
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="p-5 bg-white rounded-lg border border-zinc-200 text-center shadow-2xs">
            <span className="text-xs font-mono text-zinc-500 block uppercase font-medium">Total Addressable Market</span>
            <div className="text-3xl font-black font-mono text-zinc-950 mt-1">$24.5B</div>
            <p className="text-xs text-zinc-500 mt-2">
              Global Vulnerability &amp; Security Risk Management by 2028.
            </p>
          </div>

          <div className="p-5 bg-white rounded-lg border border-zinc-200 text-center shadow-2xs">
            <span className="text-xs font-mono text-zinc-500 block uppercase font-medium">Serviceable Addressable Market</span>
            <div className="text-3xl font-black font-mono text-zinc-950 mt-1">$3.8B</div>
            <p className="text-xs text-zinc-500 mt-2">
              Cloud-Native AppSec &amp; Automated Remediation Prioritization.
            </p>
          </div>

          <div className="p-5 bg-white rounded-lg border border-zinc-200 text-center shadow-2xs border-l-4 border-l-zinc-900">
            <span className="text-xs font-mono text-zinc-500 block uppercase font-medium">Serviceable Obtainable Market</span>
            <div className="text-3xl font-black font-mono text-zinc-950 mt-1">$45M</div>
            <p className="text-xs text-zinc-500 mt-2">
              High-compliance FinTech, Healthcare, and SaaS organizations.
            </p>
          </div>
        </div>
      </section>

      {/* 6. B2B SAAS PRICING TIERS */}
      <section className="py-16 px-4 sm:px-6 max-w-[1400px] mx-auto w-full border-b border-zinc-200">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="outline" className="text-xs font-mono font-bold text-zinc-600 mb-2">
            Subscription Licensing
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950">
            Enterprise Pricing Architecture
          </h2>
          <p className="text-zinc-600 text-sm mt-2">
            Predictable B2B SaaS pricing aligned with organizational cluster size and automation maturity.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Community Tier */}
          <Card className="p-6 bg-white border-zinc-200 shadow-2xs flex flex-col justify-between">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-bold text-zinc-950">Community / Academic</h3>
                <p className="text-xs text-zinc-500 mt-1">For researchers and single dev clusters</p>
              </div>
              <div className="pt-2">
                <span className="text-3xl font-black font-mono text-zinc-950">$0</span>
                <span className="text-xs text-zinc-500 font-mono"> / month</span>
              </div>
              <ul className="space-y-2.5 text-xs text-zinc-600 pt-3 border-t border-zinc-100">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-zinc-700 shrink-0" />
                  1 Developer / Cluster Environment
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-zinc-700 shrink-0" />
                  Local Day-0 NLP Parser (Component A)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-zinc-700 shrink-0" />
                  CLI-only JSON/CSV Export
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-zinc-700 shrink-0" />
                  Community Discord &amp; GitHub Discussions
                </li>
              </ul>
            </div>
            <Button 
              variant="outline"
              onClick={onLaunchConsole}
              className="w-full mt-6 text-xs font-semibold cursor-pointer"
            >
              Explore Open Source Demo
            </Button>
          </Card>

          {/* Growth / Mid-Market Tier */}
          <Card className="p-6 bg-white border-zinc-900 border-2 shadow-xs flex flex-col justify-between relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-zinc-900 text-white font-mono text-[10px] uppercase font-bold px-3 py-0.5 rounded-full">
              Most Popular
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-bold text-zinc-950">Growth / Mid-Market</h3>
                <p className="text-xs text-zinc-500 mt-1">For growing cloud-native product teams</p>
              </div>
              <div className="pt-2">
                <span className="text-3xl font-black font-mono text-zinc-950">$2,400</span>
                <span className="text-xs text-zinc-500 font-mono"> / month (billed annually)</span>
                <div className="text-[11px] text-zinc-400 font-mono">$2,500 / mo monthly billing</div>
              </div>
              <ul className="space-y-2.5 text-xs text-zinc-700 pt-3 border-t border-zinc-100">
                <li className="flex items-center gap-2 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-zinc-900 shrink-0" />
                  Up to 10 Clusters / 50 SOC Seats
                </li>
                <li className="flex items-center gap-2 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-zinc-900 shrink-0" />
                  Empirical Survival Forecasting (Component B)
                </li>
                <li className="flex items-center gap-2 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-zinc-900 shrink-0" />
                  Perimeter Reachability Analysis (Component C)
                </li>
                <li className="flex items-center gap-2 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-zinc-900 shrink-0" />
                  Automated Slack &amp; MS Teams Dispatch
                </li>
              </ul>
            </div>
            <Button 
              onClick={onLaunchConsole}
              className="w-full mt-6 text-xs font-semibold bg-zinc-900 text-white hover:bg-zinc-800 cursor-pointer"
            >
              Start 14-Day SOC Trial
            </Button>
          </Card>

          {/* Enterprise SecOps Tier */}
          <Card className="p-6 bg-white border-zinc-200 shadow-2xs flex flex-col justify-between">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-bold text-zinc-950">Enterprise SecOps</h3>
                <p className="text-xs text-zinc-500 mt-1">For mission-critical regulated organizations</p>
              </div>
              <div className="pt-2">
                <span className="text-3xl font-black font-mono text-zinc-950">$6,500+</span>
                <span className="text-xs text-zinc-500 font-mono"> / mo custom</span>
              </div>
              <ul className="space-y-2.5 text-xs text-zinc-600 pt-3 border-t border-zinc-100">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-zinc-700 shrink-0" />
                  Unlimited Clusters &amp; Microservices
                </li>
                <li className="flex items-center gap-2 font-medium text-zinc-900">
                  <CheckCircle2 className="w-3.5 h-3.5 text-zinc-900 shrink-0" />
                  0/1 Knapsack Capacity Scheduler (Component D)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-zinc-700 shrink-0" />
                  Bi-directional Jira &amp; ServiceNow Sync
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-zinc-700 shrink-0" />
                  Dedicated VPC / On-Premise Air-Gapped Deploy
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-zinc-700 shrink-0" />
                  Custom SLA Penalty Protection &amp; SOC 2 Logs
                </li>
              </ul>
            </div>
            <Button 
              variant="outline"
              onClick={onLaunchConsole}
              className="w-full mt-6 text-xs font-semibold cursor-pointer"
            >
              Request Enterprise Architecture Pilot
            </Button>
          </Card>
        </div>
      </section>

      {/* 7. FINAL CTA CALLOUT & ACADEMIC CREDIBILITY */}
      <section className="py-16 px-4 sm:px-6 max-w-[1400px] mx-auto w-full text-center">
        <div className="max-w-2xl mx-auto space-y-5">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950">
            Ready to Experience Capacity-Constrained Prioritization?
          </h2>
          <p className="text-sm text-zinc-600">
            Interact with our live prototype loaded with verified real-world CVE disclosures and inspect the four multi-modal explainability layers.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <Button 
              onClick={onLaunchConsole}
              className="h-11 px-6 bg-zinc-900 hover:bg-zinc-800 text-white font-semibold text-sm shadow-xs inline-flex items-center gap-2 cursor-pointer"
            >
              Launch Live SOC Console
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          <div className="pt-8 border-t border-zinc-200 mt-8 text-xs font-mono text-zinc-400">
            SLIIT Faculty of Computing • Academic Research Initiative • Group J26-DS-344 (VESPER)
          </div>
        </div>
      </section>
    </div>
  );
};
