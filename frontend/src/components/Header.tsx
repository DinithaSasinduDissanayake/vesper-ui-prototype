import React from "react";
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
    <header className="border-b border-zinc-800/80 bg-[#0c0c0e] sticky top-0 z-50">
      <div className="max-w-[1560px] mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        {/* Brand & Identity: Minimalist Geometric Glyph */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-700/60 shadow-xs">
            {/* Crisp, precision geometric glyph for VESPER */}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4 text-zinc-100"
            >
              <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
              <line x1="12" y1="2" x2="12" y2="22" />
            </svg>
          </div>
          <div className="flex items-baseline gap-2.5">
            <span className="font-bold text-base tracking-tight text-zinc-100">
              VESPER
            </span>
            <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700/60">
              v2.4
            </span>
            <span className="text-xs text-zinc-400 hidden md:inline border-l border-zinc-800 pl-2.5 ml-0.5">
              Vulnerability Prioritization & Explainability Platform
            </span>
          </div>
        </div>

        {/* Scope Context & Capacity Controls */}
        <div className="flex items-center gap-3">
          {/* Target Cluster Selector */}
          <div className="relative flex items-center">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 hover:border-zinc-700 transition-colors">
              <span className="text-[11px] text-zinc-400 uppercase tracking-wider font-mono">
                Scope:
              </span>
              <select
                value={cluster}
                onChange={(e) => setCluster(e.target.value)}
                className="bg-transparent text-zinc-200 text-xs focus:outline-none cursor-pointer pr-4 appearance-none font-medium"
              >
                {clusters.map((c) => (
                  <option key={c} value={c} className="bg-zinc-900 text-zinc-200">
                    {c}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-zinc-400 pointer-events-none -ml-3" />
            </div>
          </div>

          {/* Slicing Capacity Controls */}
          <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-md p-0.5">
            <div className="flex items-center gap-1.5 px-2.5 text-xs text-zinc-400 font-medium">
              <SlidersHorizontal className="w-3.5 h-3.5 text-zinc-400" />
              <span className="hidden sm:inline">Triage Cap:</span>
            </div>
            <div className="flex items-center gap-0.5">
              {[10, 25, 50].map((cap) => (
                <button
                  key={cap}
                  onClick={() => setCapacity(cap)}
                  className={`px-2.5 py-1 text-xs font-semibold rounded transition-colors ${
                    capacity === cap
                      ? "bg-zinc-800 text-zinc-100 border border-zinc-700/80 shadow-xs"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  {cap}
                  <span className="text-[10px] font-normal text-zinc-400 ml-0.5">/wk</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
