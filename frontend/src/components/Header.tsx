import React from "react";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, SlidersHorizontal, LayoutDashboard, Sparkles } from "lucide-react";

interface HeaderProps {
  viewMode: "landing" | "console";
  setViewMode: (mode: "landing" | "console") => void;
  capacity: number;
  setCapacity: (cap: number) => void;
  cluster: string;
  setCluster: (c: string) => void;
  clusters: string[];
}

export const Header: React.FC<HeaderProps> = ({
  viewMode,
  setViewMode,
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
        <div className="flex items-center gap-4">
          <div 
            onClick={() => setViewMode("landing")}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-900 text-white font-mono font-black text-sm tracking-tight shadow-xs group-hover:bg-zinc-800 transition-colors">
              V
            </div>
            <div className="flex items-baseline gap-2.5">
              <span className="font-bold text-base tracking-tight text-zinc-950">
                VESPER
              </span>
              <Badge variant="outline" className="font-mono text-[11px] px-1.5 py-0 text-zinc-600 bg-zinc-50 border-zinc-200">
                v2.4
              </Badge>
            </div>
          </div>

          {/* Primary View Mode Segmented Switcher */}
          <nav className="flex items-center bg-zinc-100 p-0.5 rounded-lg border border-zinc-200 ml-2">
            <button
              onClick={() => setViewMode("landing")}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === "landing"
                  ? "bg-white text-zinc-950 shadow-2xs font-bold border border-zinc-200"
                  : "text-zinc-600 hover:text-zinc-900"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-zinc-500" />
              <span>Overview &amp; Solution</span>
            </button>
            <button
              onClick={() => setViewMode("console")}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === "console"
                  ? "bg-white text-zinc-950 shadow-2xs font-bold border border-zinc-200"
                  : "text-zinc-600 hover:text-zinc-900"
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-zinc-500" />
              <span>Live SOC Console</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse ml-0.5" />
            </button>
          </nav>
        </div>

        {/* Right Section: Console Context Controls (Shown when in Console or on Desktop) */}
        {viewMode === "console" ? (
          <div className="flex items-center gap-3 animate-in fade-in duration-200">
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
                    className={`px-2.5 py-1 text-xs font-semibold rounded transition-colors cursor-pointer ${
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
        ) : (
          <div className="flex items-center gap-3">
            <button
              onClick={() => setViewMode("console")}
              className="px-3.5 py-1.5 rounded-md bg-zinc-900 text-white text-xs font-semibold hover:bg-zinc-800 transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <span>Interactive Console</span>
              <span className="font-mono text-[10px] bg-zinc-800 text-zinc-300 px-1.5 py-0.2 rounded">
                8 CVEs
              </span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
