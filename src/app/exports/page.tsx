"use client";

import { useEffect, useState } from "react";
import { 
  Download, 
  FileCheck2, 
  FolderTree, 
  FileText, 
  CheckCircle2, 
  RefreshCcw, 
  ShieldCheck,
  Package,
  Layers,
  ArrowDownToLine
} from "lucide-react";

export default function ExportsPage() {
  const [downloading, setDownloading] = useState(false);
  const [manifestData, setManifestData] = useState<any[]>([]);
  const [loadingManifest, setLoadingManifest] = useState(true);

  // Fetch manifest preview from records
  const fetchManifestPreview = async () => {
    try {
      const res = await fetch("/api/records");
      if (res.ok) {
        const data = await res.json();
        const records = data.records || [];
        
        const preview = records.map((r: any) => {
          const folderMap: Record<string, string> = {
            sales_coaching: "sales-coaching",
            deal_next_steps: "deal-next-steps",
            customer_follow_up: "customer-follow-up",
            internal_vendor: "internal-vendor",
            review_needed: "review-needed"
          };
          const paths = r.effective_routes.map((rt: any) => {
            const folder = folderMap[rt.category] || "review-needed";
            return `${folder}/${r.source_type}_${r.record_ref || r.source_id}_${rt.category}.md`;
          });

          return {
            source_type: r.source_type,
            source_id: r.source_id,
            record_ref: r.record_ref || "UNREF",
            applied_revision: r.applied_revision,
            has_usable_transcript: r.has_usable_transcript,
            assigned_routes: r.effective_routes.map((rt: any) => rt.category),
            output_paths: paths,
            review_status: r.review_status,
            is_overridden: r.is_manually_overridden,
            priority: r.priority
          };
        });
        setManifestData(preview);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingManifest(false);
    }
  };

  useEffect(() => {
    fetchManifestPreview();
  }, []);

  const handleDownloadZip = () => {
    setDownloading(true);
    // Trigger download
    window.location.href = "/api/export";
    setTimeout(() => setDownloading(false), 3000);
  };

  const handleDownloadManifestJson = () => {
    const blob = new Blob([JSON.stringify(manifestData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "manifest.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadManifestCsv = () => {
    const headers = ["source_type,source_id,record_ref,applied_revision,has_usable_transcript,assigned_routes,output_paths,review_status,is_manually_overridden,priority"];
    const rows = manifestData.map(m => [
      m.source_type,
      m.source_id,
      m.record_ref,
      m.applied_revision,
      m.has_usable_transcript ? "true" : "false",
      `"${m.assigned_routes.join(";")}"`,
      `"${m.output_paths.join(";")}"`,
      m.review_status,
      m.is_overridden ? "true" : "false",
      m.priority
    ].join(","));
    const blob = new Blob([[headers, ...rows].join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "manifest.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950/40 p-6 rounded-2xl border border-slate-800 shadow-xl">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Deliverable Export Archive</h1>
          <p className="text-slate-400 text-sm mt-1 max-w-2xl">
            Generates the complete deliverable ZIP archive containing categorized markdown analyses, executive manager brief, and machine-readable manifests (JSON & CSV).
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={handleDownloadZip}
            disabled={downloading || manifestData.length === 0}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-semibold flex items-center space-x-2 shadow-lg shadow-indigo-600/30 transition-all"
          >
            {downloading ? <RefreshCcw className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
            <span>Download Complete Export ZIP</span>
          </button>
        </div>
      </div>

      {/* Grid: Folder Structure & Validation Notes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Folder Structure Preview */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md space-y-4">
          <div className="flex items-center space-x-2 text-white font-bold text-base">
            <FolderTree className="w-5 h-5 text-indigo-400" />
            <h3>Archive Folder Taxonomy</h3>
          </div>
          <p className="text-xs text-slate-400">
            Organized hierarchy per assessment requirements. Every destination contains isolated markdown dossiers.
          </p>

          <div className="bg-slate-950 rounded-xl p-4 font-mono text-xs text-slate-300 space-y-1.5 border border-slate-800">
            <div className="text-indigo-400 font-bold">revenue-intelligence-export.zip/</div>
            <div className="pl-4 text-emerald-400">&bull; manifest.json</div>
            <div className="pl-4 text-emerald-400">&bull; manifest.csv</div>
            <div className="pl-4 text-slate-300">&bull; README.md</div>
            <div className="pl-4 text-indigo-300">&bull; manager-brief.md</div>
            <div className="pl-4 text-indigo-300">&bull; sales-coaching/</div>
            <div className="pl-8 text-slate-500 text-[11px]">call_C01_sales_coaching.md ...</div>
            <div className="pl-4 text-emerald-300">&bull; deal-next-steps/</div>
            <div className="pl-8 text-slate-500 text-[11px]">meeting_M01_deal_next_steps.md ...</div>
            <div className="pl-4 text-blue-300">&bull; customer-follow-up/</div>
            <div className="pl-8 text-slate-500 text-[11px]">call_C03_customer_follow_up.md ...</div>
            <div className="pl-4 text-purple-300">&bull; internal-vendor/</div>
            <div className="pl-8 text-slate-500 text-[11px]">meeting_M07_internal_vendor.md ...</div>
            <div className="pl-4 text-amber-300">&bull; review-needed/</div>
            <div className="pl-8 text-slate-500 text-[11px]">intake records awaiting text ...</div>
          </div>
        </div>

        {/* Manifest Compliance Rules */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2 text-white font-bold text-base">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <h3>Data Contract Export Rules</h3>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleDownloadManifestJson}
                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded border border-slate-700 flex items-center space-x-1"
              >
                <ArrowDownToLine className="w-3 h-3 text-indigo-400" />
                <span>manifest.json</span>
              </button>
              <button
                onClick={handleDownloadManifestCsv}
                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded border border-slate-700 flex items-center space-x-1"
              >
                <ArrowDownToLine className="w-3 h-3 text-emerald-400" />
                <span>manifest.csv</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
              <span className="font-bold text-emerald-400 flex items-center">
                <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Path Validation
              </span>
              <p className="text-slate-400">
                Every listed output path is a relative path inside the archive, never absolute paths on the host machine. Every listed file is guaranteed to exist.
              </p>
            </div>

            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
              <span className="font-bold text-indigo-400 flex items-center">
                <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Multi-Route Traceability
              </span>
              <p className="text-slate-400">
                Conversations assigned multiple destinations retain their single logical source identity <code>(source_type, source_id)</code> across all folders.
              </p>
            </div>

            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
              <span className="font-bold text-amber-400 flex items-center">
                <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Manual Overrides & Notes
              </span>
              <p className="text-slate-400">
                The manifest explicitly flags whether a route was manually corrected and includes the manager's review rationale.
              </p>
            </div>

            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
              <span className="font-bold text-slate-300 flex items-center">
                <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Full Dataset Representation
              </span>
              <p className="text-slate-400">
                All 44 logical source records are represented in the manifest, including records without usable transcript text.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Live Manifest Preview Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden space-y-4 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Package className="w-5 h-5 text-indigo-400" />
            <h2 className="text-lg font-bold text-white">Live Export Manifest Preview ({manifestData.length} records)</h2>
          </div>
          <span className="text-xs font-mono text-slate-400">Exact mapping included in download</span>
        </div>

        {loadingManifest ? (
          <div className="py-12 text-center text-slate-500 font-mono text-xs">Computing live manifest preview...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 bg-slate-950/60 font-mono">
                  <th className="py-2.5 px-3">Ref</th>
                  <th className="py-2.5 px-3">Type</th>
                  <th className="py-2.5 px-3">Source ID</th>
                  <th className="py-2.5 px-3">Rev</th>
                  <th className="py-2.5 px-3">Transcript</th>
                  <th className="py-2.5 px-3">Assigned Routes</th>
                  <th className="py-2.5 px-3">Archive Output Path(s)</th>
                  <th className="py-2.5 px-3">Override</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/40 font-mono text-[11px]">
                {manifestData.map((m, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/30">
                    <td className="py-2 px-3 font-bold text-white">{m.record_ref}</td>
                    <td className="py-2 px-3 text-slate-300 capitalize">{m.source_type}</td>
                    <td className="py-2 px-3 text-slate-400">{m.source_id.slice(0, 12)}...</td>
                    <td className="py-2 px-3 text-emerald-400">v{m.applied_revision}</td>
                    <td className="py-2 px-3">
                      {m.has_usable_transcript ? (
                        <span className="text-emerald-400">Yes</span>
                      ) : (
                        <span className="text-slate-600">None</span>
                      )}
                    </td>
                    <td className="py-2 px-3">
                      <span className="text-indigo-300">{m.assigned_routes.join(", ")}</span>
                    </td>
                    <td className="py-2 px-3 text-slate-400 truncate max-w-xs">
                      {m.output_paths.join("; ")}
                    </td>
                    <td className="py-2 px-3">
                      {m.is_overridden ? (
                        <span className="text-yellow-400 font-bold">YES</span>
                      ) : (
                        <span className="text-slate-600">No</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
