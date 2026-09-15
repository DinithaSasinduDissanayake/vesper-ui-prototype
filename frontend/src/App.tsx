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
    <div className="min-h-screen bg-[#09090b] text-zinc-100 flex flex-col antialiased selection:bg-zinc-700 selection:text-white">
      {/* Top Navbar */}
      <Header
        capacity={capacity}
        setCapacity={setCapacity}
        cluster={cluster}
        setCluster={setCluster}
        clusters={clusters}
      />

      {/* Main Body: Expanded to 1560px for comfortable desktop breathing room */}
      <main className="flex-1 max-w-[1560px] w-full mx-auto px-4 sm:px-6 py-4 flex flex-col">
        {/* Sleek Triage Header Bar (Replaces Chunky 3 Cards) */}
        <MetricsOverview
          immediateCount={immediateCount}
          scheduledCount={scheduledCount}
          deferredCount={deferredCount}
          totalCount={totalClusterCves}
        />

        {/* Split View: Left Queue + Right Inspector Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1 min-h-[640px] items-stretch">
          {/* Left Column: Triage Action Queue */}
          <div className="lg:col-span-7 flex flex-col h-full">
            <VulnerabilityTable
              cves={cves}
              selectedCve={selectedCve}
              onSelectCve={setSelectedCve}
              capacity={capacity}
            />
          </div>

          {/* Right Column: Multi-Modal Explainability Inspector */}
          <div className="lg:col-span-5 flex flex-col h-full">
            <ExplainabilityPanel cve={selectedCve} />
          </div>
        </div>
      </main>

      {/* Sleek Minimal Footer */}
      <footer className="border-t border-zinc-800 bg-[#0c0c0e] py-2.5 text-center text-xs text-zinc-400 font-mono">
        VESPER Research Architecture • Group J26-DS-344 (Dinitha • Sithmini • Thilanka • Bhuvani) • Production Prototype
      </footer>
    </div>
  );
}
