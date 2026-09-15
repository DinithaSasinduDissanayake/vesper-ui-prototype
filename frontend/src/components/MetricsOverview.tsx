import React from "react";
import { AlertTriangle, Clock, ShieldCheck, TrendingDown } from "lucide-react";

interface MetricsOverviewProps {
  immediateCount: number;
  scheduledCount: number;
  deferredCount: number;
  totalCount: number;
}

export const MetricsOverview: React.FC<MetricsOverviewProps> = ({
  immediateCount,
  scheduledCount,
  deferredCount,
  totalCount,
}) => {
  const reductionPercentage = ((deferredCount / totalCount) * 100).toFixed(0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {/* Immediate Attention Card */}
      <div className="relative overflow-hidden rounded-xl border border-red-500/20 bg-gradient-to-b from-red-950/20 to-slate-900/50 p-4.5 transition-all hover:border-red-500/40 group">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-red-500 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-red-400">
              Immediate Attention
            </span>
          </div>
          <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20">
            &lt; 24h Window
          </span>
        </div>

        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-3xl font-extrabold tracking-tight text-white font-mono">
            {immediateCount}
          </span>
          <span className="text-xs text-slate-400 font-medium">Critical CVEs</span>
        </div>

        <p className="mt-1.5 text-xs text-slate-400 leading-relaxed">
          High weaponization velocity &amp; public exploit observed. Requires hotfix or perimeter mitigation.
        </p>

        <div className="mt-3 flex items-center gap-1.5 text-[11px] text-red-400/90 font-medium">
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>Breach Probability &gt; 92%</span>
        </div>
      </div>

      {/* Scheduled Triage Card */}
      <div className="relative overflow-hidden rounded-xl border border-amber-500/20 bg-gradient-to-b from-amber-950/20 to-slate-900/50 p-4.5 transition-all hover:border-amber-500/40 group">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-amber-500" />
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Scheduled Triage
            </span>
          </div>
          <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
            &lt; 7d Sprint
          </span>
        </div>

        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-3xl font-extrabold tracking-tight text-white font-mono">
            {scheduledCount}
          </span>
          <span className="text-xs text-slate-400 font-medium">Elevated CVEs</span>
        </div>

        <p className="mt-1.5 text-xs text-slate-400 leading-relaxed">
          PoC weaponization forecast within next 7–14 days. Patch scheduled in standard sprint release.
        </p>

        <div className="mt-3 flex items-center gap-1.5 text-[11px] text-amber-400/90 font-medium">
          <Clock className="w-3.5 h-3.5" />
          <span>Survival window: ~5.8 days</span>
        </div>
      </div>

      {/* Safely Deferred Backlog Card */}
      <div className="relative overflow-hidden rounded-xl border border-emerald-500/20 bg-gradient-to-b from-emerald-950/20 to-slate-900/50 p-4.5 transition-all hover:border-emerald-500/40 group">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Safely Deferred
            </span>
          </div>
          <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
            <TrendingDown className="w-3 h-3" />
            -{reductionPercentage}% Alert Fatigue
          </span>
        </div>

        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-3xl font-extrabold tracking-tight text-white font-mono">
            {deferredCount.toLocaleString()}
          </span>
          <span className="text-xs text-slate-400 font-medium">Suppressed Noise</span>
        </div>

        <p className="mt-1.5 text-xs text-slate-400 leading-relaxed">
          Unreachable code paths, isolated dev sandboxes, or zero exploit weaponization indicators.
        </p>

        <div className="mt-3 flex items-center gap-1.5 text-[11px] text-emerald-400/90 font-medium">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Zero incident risk for 30+ days</span>
        </div>
      </div>
    </div>
  );
};
