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
    <div className="bg-white border border-zinc-200 rounded-lg px-4 py-2.5 mb-4 shadow-2xs">
      <div className="flex flex-wrap items-center justify-between gap-y-3 gap-x-6 text-xs">
        {/* Left: Cluster Inventory Overview */}
        <div className="flex items-center gap-2.5 text-zinc-700">
          <Layers className="w-4 h-4 text-zinc-500" />
          <span className="text-zinc-500 font-medium">Total Ingestion Scope:</span>
          <span className="font-mono font-bold text-zinc-950 text-sm">
            {totalCount.toLocaleString()}
          </span>
          <span className="text-zinc-500 text-[11px]">Raw Scanner Findings</span>
        </div>

        {/* Right: Operational Triage Distribution Ribbon */}
        <div className="flex items-center gap-3 sm:gap-5 flex-wrap">
          {/* Immediate < 24h Tier */}
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-rose-600" />
            <span className="text-zinc-600 font-medium">Critical SLA (&lt;24h):</span>
            <span className="font-mono font-bold text-rose-800 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded text-xs">
              {immediateCount}
            </span>
          </div>

          <span className="text-zinc-200 hidden sm:inline">|</span>

          {/* Scheduled < 7d Tier */}
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-amber-600" />
            <span className="text-zinc-600 font-medium">Scheduled Sprint (&lt;7d):</span>
            <span className="font-mono font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded text-xs">
              {scheduledCount}
            </span>
          </div>

          <span className="text-zinc-200 hidden sm:inline">|</span>

          {/* Safely Deferred */}
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-600" />
            <span className="text-zinc-600 font-medium">Safely Deferred:</span>
            <span className="font-mono font-bold text-zinc-900">
              {deferredCount.toLocaleString()}
            </span>
            <span className="text-[11px] font-mono text-emerald-800 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded font-medium">
              -{reductionPercentage}% fatigue
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
