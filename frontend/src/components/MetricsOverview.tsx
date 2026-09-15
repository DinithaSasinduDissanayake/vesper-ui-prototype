import React from "react";
import { Layers } from "lucide-react";

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
    <div className="bg-[#121215] border border-zinc-800/80 rounded-lg px-4 py-2.5 mb-4 shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-y-3 gap-x-6 text-xs">
        {/* Left: Cluster Inventory Overview */}
        <div className="flex items-center gap-2.5 text-zinc-300">
          <Layers className="w-4 h-4 text-zinc-400" />
          <span className="text-zinc-400">Total Ingestion Scope:</span>
          <span className="font-mono font-bold text-zinc-100 text-sm">
            {totalCount.toLocaleString()}
          </span>
          <span className="text-zinc-400 text-[11px]">Raw Scanner CVEs</span>
        </div>

        {/* Right: Operational Triage Distribution Ribbon */}
        <div className="flex items-center gap-3 sm:gap-5 flex-wrap">
          {/* Immediate < 24h Tier */}
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-rose-500" />
            <span className="text-zinc-400">Critical Action (&lt;24h):</span>
            <span className="font-mono font-bold text-rose-400 bg-rose-950/40 border border-rose-900/50 px-2 py-0.5 rounded text-xs">
              {immediateCount}
            </span>
          </div>

          <span className="text-zinc-800 hidden sm:inline">|</span>

          {/* Scheduled < 7d Tier */}
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-amber-500" />
            <span className="text-zinc-400">Scheduled Sprint (&lt;7d):</span>
            <span className="font-mono font-bold text-amber-400 bg-amber-950/40 border border-amber-900/50 px-2 py-0.5 rounded text-xs">
              {scheduledCount}
            </span>
          </div>

          <span className="text-zinc-800 hidden sm:inline">|</span>

          {/* Safely Deferred */}
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
            <span className="text-zinc-400">Safely Deferred:</span>
            <span className="font-mono font-bold text-zinc-200">
              {deferredCount.toLocaleString()}
            </span>
            <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-900/40 px-1.5 py-0.5 rounded">
              -{reductionPercentage}% fatigue
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
