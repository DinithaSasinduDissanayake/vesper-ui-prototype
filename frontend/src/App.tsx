import { useState } from "react";
import rawData from "./data/mock_scans.json";
import type { CVEItem } from "./types/cve";
import { Header } from "./components/Header";
import { MetricsOverview } from "./components/MetricsOverview";
import { VulnerabilityTable } from "./components/VulnerabilityTable";
import { ExplainabilityPanel } from "./components/ExplainabilityPanel";

const mockCves = rawData as CVEItem[];

export default function App() {
  const [cves] = useState<CVEItem[]>(mockCves);
  const [selectedCve, setSelectedCve] = useState<CVEItem>(mockCves[0]);
  const [capacity, setCapacity] = useState<number>(10);
  const [cluster, setCluster] = useState<string>("Acme Corp Production Cluster (1,240 CVEs)");

  const clusters = [
    "Acme Corp Production Cluster (1,240 CVEs)",
    "Payment Gateway PCI-DSS Pods (410 CVEs)",
    "Dev Sandbox & CI/CD Runners (3,120 CVEs)",
  ];

  // Dynamic counts based on total 1,240 dataset context
  const immediateCount = 4;
  const scheduledCount = 6;
  const totalClusterCves = 1240;
  const deferredCount = totalClusterCves - (immediateCount + scheduledCount);

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col antialiased selection:bg-indigo-500 selection:text-white">
      {/* Top Navbar */}
      <Header
        capacity={capacity}
        setCapacity={setCapacity}
        cluster={cluster}
        setCluster={setCluster}
        clusters={clusters}
      />

      {/* Main Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col">
        {/* Metric Cards Top Row */}
        <MetricsOverview
          immediateCount={immediateCount}
          scheduledCount={scheduledCount}
          deferredCount={deferredCount}
          totalCount={totalClusterCves}
        />

        {/* Split View: Left Queue + Right Explainability Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 flex-1 min-h-[620px] items-stretch">
          {/* Left Column: Triage Action Queue */}
          <div className="lg:col-span-7 flex flex-col h-full">
            <VulnerabilityTable
              cves={cves}
              selectedCve={selectedCve}
              onSelectCve={setSelectedCve}
              capacity={capacity}
            />
          </div>

          {/* Right Column: Deep Explainability & Risk Evidence Panel */}
          <div className="lg:col-span-5 flex flex-col h-full">
            <ExplainabilityPanel cve={selectedCve} />
          </div>
        </div>
      </main>

      {/* Sleek Minimal Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-3 text-center text-xs text-slate-500 font-mono">
        VESPER Research Architecture • J26-DS-344 (Dinitha • Sithmini • Thilanka • Bhuvani) • Vite + React + Tailwind
      </footer>
    </div>
  );
}
