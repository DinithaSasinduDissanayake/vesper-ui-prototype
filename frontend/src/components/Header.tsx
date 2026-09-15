import React from "react";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, SlidersHorizontal } from "lucide-react";

interface HeaderProps {
  capacity: number;
  setCapacity: (cap: number) => void;
  cluster: string;
  setCluster: (c: string) => void;
  clusters: string[];
}

export const Header: React.FC<HeaderProps> = ({
  capacity,
  setCapacity,
  cluster,
  setCluster,
  clusters,
}) => {
  return (
    <header className="border-b border-zinc-200 bg-white sticky top-0 z-30 shadow-2xs">
      <div className="max-w-[1560px] mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        {/* Brand & Identity: Minimalist Human-Crafted Monogram */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-900 text-white font-mono font-black text-sm tracking-tight shadow-xs">
            V
          </div>
          <div className="flex items-baseline gap-2.5">
            <span className="font-bold text-base tracking-tight text-zinc-950">
              VESPER
            </span>
            <Badge variant="outline" className="font-mono text-[11px] px-1.5 py-0 text-zinc-600 bg-zinc-50 border-zinc-200">
              v2.4
            </Badge>
            <span className="text-xs text-zinc-500 hidden md:inline border-l border-zinc-200 pl-2.5 ml-0.5">
              Vulnerability Prioritization &amp; Explainability Platform
            </span>
          </div>
        </div>

        {/* Scope Context & Capacity Controls */}
        <div className="flex items-center gap-3">
          {/* Target Cluster Selector */}
          <div className="relative flex items-center">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-zinc-50 border border-zinc-200 text-xs text-zinc-700 hover:border-zinc-300 transition-colors">
              <span className="text-[11px] text-zinc-500 uppercase tracking-wider font-mono font-medium">
                Scope:
              </span>
              <select
                value={cluster}
                onChange={(e) => setCluster(e.target.value)}
                className="bg-transparent text-zinc-900 text-xs focus:outline-none cursor-pointer pr-4 appearance-none font-medium"
              >
                {clusters.map((c) => (
                  <option key={c} value={c} className="bg-white text-zinc-900">
                    {c}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-zinc-400 pointer-events-none -ml-3" />
            </div>
          </div>

          {/* Slicing Capacity Controls */}
          <div className="flex items-center bg-zinc-100 border border-zinc-200 rounded-md p-0.5">
            <div className="flex items-center gap-1.5 px-2.5 text-xs text-zinc-600 font-medium">
              <SlidersHorizontal className="w-3.5 h-3.5 text-zinc-500" />
              <span className="hidden sm:inline">Triage Cap:</span>
            </div>
            <div className="flex items-center gap-0.5">
              {[10, 25, 50].map((cap) => (
                <button
                  key={cap}
                  onClick={() => setCapacity(cap)}
                  className={`px-2.5 py-1 text-xs font-semibold rounded transition-colors ${
                    capacity === cap
                      ? "bg-white text-zinc-950 border border-zinc-200 shadow-2xs font-bold"
                      : "text-zinc-600 hover:text-zinc-950"
                  }`}
                >
                  {cap}
                  <span className="text-[10px] font-normal text-zinc-500 ml-0.5">/wk</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
