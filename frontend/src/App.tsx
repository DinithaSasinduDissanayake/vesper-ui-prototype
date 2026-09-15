import { useState } from "react";
import rawData from "./data/mock_scans.json";
import type { CVEItem } from "./types/cve";
import { Header } from "./components/Header";
import { MetricsOverview } from "./components/MetricsOverview";
import { VulnerabilityTable } from "./components/VulnerabilityTable";
import { DetailDrawer } from "./components/DetailDrawer";

const mockCves = rawData as CVEItem[];

export default function App() {
  const [cves] = useState<CVEItem[]>(mockCves);
  const [selectedCve, setSelectedCve] = useState<CVEItem | null>(null);
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

      {/* Main Full-Width Content Container */}
      <main className="flex-1 max-w-[1560px] w-full mx-auto px-4 sm:px-6 py-5 flex flex-col">
        {/* Triage Overview Status Ribbon */}
        <MetricsOverview
          immediateCount={immediateCount}
          scheduledCount={scheduledCount}
          deferredCount={deferredCount}
          totalCount={totalClusterCves}
        />

        {/* Full-Width Remediation Data Table (100% Horizontal Viewport) */}
        <div className="flex-1 w-full mt-2">
          <VulnerabilityTable
            cves={cves}
            selectedCve={selectedCve}
            onSelectCve={(cve) => setSelectedCve(cve)}
            capacity={capacity}
          />
        </div>
      </main>

      {/* Contextual Slide-Over Drawer for Deep Multi-Modal Explainability */}
      <DetailDrawer
        cve={selectedCve}
        onClose={() => setSelectedCve(null)}
      />

      {/* Sleek Minimal Footer */}
      <footer className="border-t border-zinc-800 bg-[#0c0c0e] py-3 text-center text-xs text-zinc-400 font-mono">
        VESPER Research Architecture • Group J26-DS-344 (Dinitha • Sithmini • Thilanka • Bhuvani) • Enterprise Prototype
      </footer>
    </div>
  );
}
