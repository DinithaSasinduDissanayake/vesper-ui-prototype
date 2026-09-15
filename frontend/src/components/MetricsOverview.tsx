import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
    <Card className="px-4 py-2.5 mb-4 shadow-2xs">
      <div className="flex flex-wrap items-center justify-between gap-y-3 gap-x-6 text-xs">
        {/* Left: Cluster Ingestion Scope */}
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
            <Badge variant="critical" className="font-mono text-xs px-2 py-0.5">
              {immediateCount}
            </Badge>
          </div>

          <span className="text-zinc-200 hidden sm:inline">|</span>

          {/* Scheduled < 7d Tier */}
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-amber-600" />
            <span className="text-zinc-600 font-medium">Scheduled Sprint (&lt;7d):</span>
            <Badge variant="high" className="font-mono text-xs px-2 py-0.5">
              {scheduledCount}
            </Badge>
          </div>

          <span className="text-zinc-200 hidden sm:inline">|</span>

          {/* Safely Deferred */}
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-600" />
            <span className="text-zinc-600 font-medium">Safely Deferred:</span>
            <span className="font-mono font-bold text-zinc-900">
              {deferredCount.toLocaleString()}
            </span>
            <Badge variant="routine" className="font-mono text-[11px] px-1.5 py-0.5">
              -{reductionPercentage}% fatigue
            </Badge>
          </div>
        </div>
      </div>
    </Card>
  );
};
