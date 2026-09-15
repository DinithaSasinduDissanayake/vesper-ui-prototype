import React from "react";
import { Shield, Server, Sliders, ChevronDown } from "lucide-react";

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
    <header className="border-b border-slate-800/80 bg-slate-950/70 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand & Subtitle */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 shadow-lg shadow-indigo-500/20 ring-1 ring-white/20">
            <Shield className="w-5 h-5 text-white" />
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-slate-950" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                VESPER
              </span>
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-semibold tracking-wider">
                SecOps Engine v2.4
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Multi-Objective Vulnerability Prioritization & Explainable Triage
            </p>
          </div>
        </div>

        {/* Cluster Selector & Capacity Controls */}
        <div className="flex items-center gap-4">
          {/* Environment dropdown */}
          <div className="relative flex items-center">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-medium text-slate-300 hover:border-slate-700 transition-colors">
              <Server className="w-3.5 h-3.5 text-indigo-400" />
              <select
                value={cluster}
                onChange={(e) => setCluster(e.target.value)}
                className="bg-transparent text-slate-200 focus:outline-none cursor-pointer pr-4 appearance-none font-medium"
              >
                {clusters.map((c) => (
                  <option key={c} value={c} className="bg-slate-900 text-slate-200">
                    {c}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3 h-3 text-slate-500 pointer-events-none -ml-3" />
            </div>
          </div>

          {/* Weekly Capacity Toggle */}
          <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-800/80 p-1 rounded-lg">
            <div className="flex items-center gap-1.5 px-2 text-xs text-slate-400 font-medium">
              <Sliders className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden md:inline">Triage Cap:</span>
            </div>
            <div className="flex items-center bg-slate-950 rounded-md p-0.5 border border-slate-800/60">
              {[10, 25, 50].map((cap) => (
                <button
                  key={cap}
                  onClick={() => setCapacity(cap)}
                  className={`px-2.5 py-1 text-xs font-semibold rounded transition-all ${
                    capacity === cap
                      ? "bg-indigo-600 text-white shadow-sm shadow-indigo-600/30 font-bold"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                  }`}
                >
                  {cap}
                  <span className="text-[10px] font-normal opacity-70 ml-0.5 hidden sm:inline">/wk</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
