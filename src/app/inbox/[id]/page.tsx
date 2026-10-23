"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  PhoneCall, 
  Video, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  ShieldAlert, 
  HelpCircle, 
  RotateCcw, 
  Save, 
  FileText, 
  User, 
  Calendar, 
  MessageSquare, 
  Layers, 
  Tag, 
  ExternalLink,
  Info
} from "lucide-react";

function RecordDetailContent({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);

  const [record, setRecord] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Manual routing state
  const [selectedRoutes, setSelectedRoutes] = useState<string[]>([]);
  const [overrideNote, setOverrideNote] = useState("");
  const [savingRoute, setSavingRoute] = useState(false);
  const [routeSuccessMessage, setRouteSuccessMessage] = useState<string | null>(null);

  const fetchRecord = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/records/${id}`);
      if (!res.ok) throw new Error("Record not found");
      const data = await res.json();
      setRecord(data);

      const effective = data.routing?.effective_routes || [];
      setSelectedRoutes(effective.map((r: any) => r.category));
      setOverrideNote(data.routing?.manual_override_note || "");
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecord();
  }, [id]);

  const toggleRouteCategory = (cat: string) => {
    if (selectedRoutes.includes(cat)) {
      setSelectedRoutes(selectedRoutes.filter(c => c !== cat));
    } else {
      setSelectedRoutes([...selectedRoutes, cat]);
    }
  };

  const handleSaveManualOverride = async () => {
    if (selectedRoutes.length === 0) {
      alert("Please select at least one route destination.");
      return;
    }
    setSavingRoute(true);
    try {
      const manualRoutesPayload = selectedRoutes.map(cat => ({
        category: cat,
        label: routeCategories[cat]?.label || cat,
        reason: overrideNote.trim() || "Manual route correction applied by manager."
      }));

      const res = await fetch("/api/routing", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source_type: record.source_type,
          source_id: record.source_id,
          action: "override",
          manual_routes: manualRoutesPayload,
          manual_override_note: overrideNote.trim() || "Manager manual route correction applied.",
          review_status: "reviewed"
        })
      });

      if (res.ok) {
        setRouteSuccessMessage("Manual routing override saved and preserved successfully!");
        fetchRecord();
        setTimeout(() => setRouteSuccessMessage(null), 4000);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSavingRoute(false);
    }
  };

  const handleResetToSystem = async () => {
    if (!confirm("Reset to automated system suggestion? This will remove the manager manual override.")) return;
    setSavingRoute(true);
    try {
      const res = await fetch("/api/routing", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source_type: record.source_type,
          source_id: record.source_id,
          action: "reset"
        })
      });
      if (res.ok) {
        setRouteSuccessMessage("Reset to automated system suggested routes.");
        fetchRecord();
        setTimeout(() => setRouteSuccessMessage(null), 4000);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSavingRoute(false);
    }
  };

  const handleMarkReviewed = async () => {
    try {
      const res = await fetch("/api/routing", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source_type: record.source_type,
          source_id: record.source_id,
          action: "mark_reviewed"
        })
      });
      if (res.ok) {
        setRouteSuccessMessage("Marked conversation as Reviewed.");
        fetchRecord();
        setTimeout(() => setRouteSuccessMessage(null), 4000);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const routeCategories: Record<string, { label: string; desc: string; color: string }> = {
    sales_coaching: { label: "Sales Coaching", desc: "Coaching on pitch delivery, permission openers, objection handling, or competitor defense.", color: "border-indigo-500 bg-indigo-950/40 text-indigo-300" },
    deal_next_steps: { label: "Deal Next Steps", desc: "Commercial proposals, demonstrations, custom agreements, or channel partnership agreements.", color: "border-emerald-500 bg-emerald-950/40 text-emerald-300" },
    customer_follow_up: { label: "Customer Follow-up", desc: "Customer check-ins, collateral dispatch, card tracking, or onboarding walkthroughs.", color: "border-blue-500 bg-blue-950/40 text-blue-300" },
    internal_vendor: { label: "Internal / Vendor Note", desc: "Product bugs, engineering tickets, dunning cycle enhancements, or logistics escalations.", color: "border-purple-500 bg-purple-950/40 text-purple-300" },
    review_needed: { label: "Human Review", desc: "Awaiting source evidence transcript or requires human manager intervention.", color: "border-amber-500 bg-amber-950/40 text-amber-300" }
  };

  if (loading) {
    return <div className="max-w-6xl mx-auto py-24 text-center text-slate-400 font-mono">Loading record evidence and analysis...</div>;
  }
  if (error || !record) {
    return (
      <div className="max-w-6xl mx-auto py-24 text-center space-y-4">
        <p className="text-red-400 font-medium">Record not found: {id}</p>
        <Link href="/inbox" className="text-indigo-400 hover:underline text-sm">Return to Inbox</Link>
      </div>
    );
  }

  const analysis = record.analysis?.analysis_json || {};
  const isCall = record.source_type === "call";
  const turns = record.transcript_payload?.turns || [];
  const rawCallTranscript = record.payload?.transcript || "";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Back button & Title Bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-800 pb-6">
        <div className="space-y-1">
          <Link href="/inbox" className="inline-flex items-center text-xs text-indigo-400 hover:text-indigo-300 font-medium transition-colors mb-2">
            <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back to Conversation Inbox
          </Link>
          <div className="flex items-center space-x-3">
            <h1 className="text-3xl font-extrabold text-white font-mono tracking-tight">
              {record.record_ref || record.source_id}
            </h1>
            <span className={`text-xs px-2.5 py-1 rounded-full font-semibold uppercase tracking-wider ${
              record.routing?.priority === "urgent" ? "bg-red-950 text-red-300 border border-red-700" :
              record.routing?.priority === "high" ? "bg-amber-950 text-amber-300 border border-amber-700" :
              "bg-blue-950 text-blue-300 border border-blue-800"
            }`}>
              {record.routing?.priority} Priority
            </span>
            {record.applied_revision > 1 && (
              <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-700 font-semibold font-mono">
                Revision {record.applied_revision} (Updated Batch)
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400 font-mono">
            Identity Key: <code className="text-indigo-300">({record.source_type}, {record.source_id})</code> &bull; Batch: {record.batch_id || "initial"}
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center space-x-3">
          {record.routing?.review_status !== "reviewed" ? (
            <button
              onClick={handleMarkReviewed}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold flex items-center space-x-1.5 shadow transition-colors"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Mark as Reviewed</span>
            </button>
          ) : (
            <span className="px-3 py-1.5 bg-slate-800 text-slate-300 border border-slate-700 rounded-lg text-xs font-medium flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Reviewed by Manager</span>
            </span>
          )}
        </div>
      </div>

      {/* 4-Section Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (2 Cols): Section A (Evidence) & Section B (Analysis) */}
        <div className="lg:col-span-2 space-y-8">
          {/* SECTION B: Differentiated Intelligence Analysis */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-indigo-400" />
                <h2 className="text-lg font-bold text-white">Section B: Intelligence Analysis</h2>
              </div>
              <span className="text-xs font-mono text-slate-400 bg-slate-950 px-2.5 py-1 rounded border border-slate-800">
                Method: {record.analysis?.processing_method || "pre-generated"}
              </span>
            </div>

            {/* Executive Summary */}
            <div className="space-y-1">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Executive Summary</h3>
              <p className="text-sm text-slate-200 leading-relaxed bg-slate-950/70 p-4 rounded-xl border border-slate-800/80">
                {analysis.summary || "No transcript text available for substantive analysis."}
              </p>
            </div>

            {/* What Happened & Why It Matters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">What Happened</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{analysis.what_happened || "No transcript supplied."}</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
                <h4 className="text-xs font-bold text-indigo-300 uppercase tracking-wider">Why It Matters</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{analysis.why_it_matters || "No transcript supplied."}</p>
              </div>
            </div>

            {/* Recommended Next Action */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-950/60 to-slate-950 border border-indigo-900/60 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider">Recommended Action</span>
                <span className="text-xs font-mono text-slate-400">
                  Stated Owner: <strong className="text-white">{analysis.action_owner || "Unspecified in evidence"}</strong>
                </span>
              </div>
              <p className="text-sm text-slate-200 font-medium">
                {analysis.recommended_action || "Pending intake review."}
              </p>
            </div>

            {/* Verbatim Supporting Evidence Passages */}
            <div className="space-y-2">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Verbatim Supporting Evidence Passages</h3>
              {Array.isArray(analysis.evidence_passages) && analysis.evidence_passages.length > 0 ? (
                <div className="space-y-2">
                  {analysis.evidence_passages.map((ev: any, idx: number) => (
                    <div key={idx} className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs space-y-1">
                      <div className="flex items-center justify-between text-slate-400 font-mono">
                        <span>{ev.speaker ? `${ev.speaker}` : "Speaker"} {ev.turn_number ? `(Turn ${ev.turn_number})` : ""}</span>
                        <span className="text-[11px] text-indigo-400 font-sans">{ev.context}</span>
                      </div>
                      <p className="text-slate-200 italic pl-2 border-l-2 border-indigo-500 font-serif text-sm">
                        "{ev.quote}"
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-500 italic p-3 bg-slate-950 rounded-lg">No direct verbatim quotes available in supplied data extract.</p>
              )}
            </div>

            {/* Objections & Customer Signals */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <h4 className="font-bold text-slate-300 uppercase">Customer Signals</h4>
                <ul className="list-disc list-inside space-y-1 text-slate-400">
                  {analysis.customer_signals?.length > 0 ? analysis.customer_signals.map((s: string, i: number) => <li key={i}>{s}</li>) : <li>None noted.</li>}
                </ul>
              </div>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <h4 className="font-bold text-red-300 uppercase">Objections / Blockers</h4>
                <ul className="list-disc list-inside space-y-1 text-slate-400">
                  {analysis.blockers?.length > 0 ? analysis.blockers.map((b: string, i: number) => <li key={i}>{b}</li>) : <li>None detected.</li>}
                </ul>
              </div>
            </div>

            {/* Limitations */}
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/60 text-xs text-slate-500 flex items-start space-x-2">
              <Info className="w-4 h-4 shrink-0 text-slate-400 mt-0.5" />
              <div>
                <strong className="text-slate-400">Analysis Uncertainty & Scope:</strong> {analysis.limitations || "Strictly bound to supplied conversation turns."}
              </div>
            </div>
          </div>

          {/* SECTION A: Source Evidence (Transcript) */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-2">
                <MessageSquare className="w-5 h-5 text-emerald-400" />
                <h2 className="text-lg font-bold text-white">Section A: Source Conversation Evidence</h2>
              </div>
              <span className="text-xs text-slate-400 font-mono">
                {record.has_usable_transcript ? (isCall ? "Call Audio Transcript" : `${turns.length} Meeting Turns`) : "No Usable Text Supplied"}
              </span>
            </div>

            {!record.has_usable_transcript ? (
              <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 text-center space-y-2">
                <HelpCircle className="w-8 h-8 text-slate-600 mx-auto" />
                <p className="text-sm text-slate-300 font-medium">Usable conversation text was intentionally omitted from this extract.</p>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Per DATA_CONTRACT.md, a missing transcript does not imply the meeting or call never happened. Speculative summaries are withheld to maintain strict evidence fidelity.
                </p>
              </div>
            ) : isCall ? (
              /* Call Transcript Display */
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-sans text-sm text-slate-300 leading-relaxed whitespace-pre-wrap max-h-96 overflow-y-auto">
                {rawCallTranscript}
              </div>
            ) : (
              /* Meeting Turns Display */
              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                {turns.map((turn: any, index: number) => (
                  <div key={index} className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
                    <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                      <span className="font-semibold text-indigo-400">
                        Turn {index + 1} &bull; {turn.speaker || `Speaker ${turn.speaker_id || ""}`}
                      </span>
                      <span>{turn.start_time || turn.timestamp || ""}</span>
                    </div>
                    <p className="text-sm text-slate-200">
                      {turn.text || turn.transcript || turn.utterance}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column (1 Col): Section C (Routing Studio) & Section D (Provenance) */}
        <div className="space-y-8">
          {/* SECTION C: Routing Studio */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <Tag className="w-5 h-5 text-indigo-400" />
                <h3 className="font-bold text-white text-base">Section C: Routing Studio</h3>
              </div>
              {record.routing?.is_manually_overridden && (
                <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-yellow-950 text-yellow-300 border border-yellow-700">
                  Override Active
                </span>
              )}
            </div>

            <p className="text-xs text-slate-400">
              Manage functional destinations. A conversation may have one destination, multiple destinations, or be held for review.
            </p>

            {routeSuccessMessage && (
              <div className="p-3 bg-emerald-950/80 border border-emerald-700 text-emerald-200 text-xs rounded-lg font-medium">
                {routeSuccessMessage}
              </div>
            )}

            {/* Interactive Route Selection */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 block">Select Effective Destination(s):</label>
              <div className="space-y-2">
                {Object.entries(routeCategories).map(([key, info]) => {
                  const isChecked = selectedRoutes.includes(key);
                  return (
                    <div
                      key={key}
                      onClick={() => toggleRouteCategory(key)}
                      className={`p-3 rounded-xl border text-xs cursor-pointer transition-all flex items-start space-x-2 ${
                        isChecked 
                          ? `${info.color} border-l-4 shadow-sm` 
                          : "border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}} // handled by div click
                        className="mt-0.5 rounded border-slate-700 text-indigo-600 focus:ring-0"
                      />
                      <div className="space-y-0.5 flex-1">
                        <div className="font-bold text-slate-200">{info.label}</div>
                        <p className="text-[11px] text-slate-400">{info.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Manager Override Note */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 block">
                Manager Review Note / Reason for Correction:
              </label>
              <textarea
                value={overrideNote}
                onChange={(e) => setOverrideNote(e.target.value)}
                placeholder="Explain the operational rationale for this routing decision..."
                rows={3}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Save & Reset Buttons */}
            <div className="space-y-2 pt-2">
              <button
                onClick={handleSaveManualOverride}
                disabled={savingRoute}
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold flex items-center justify-center space-x-2 transition-colors shadow"
              >
                <Save className="w-4 h-4" />
                <span>{savingRoute ? "Saving..." : "Save Manual Route Override"}</span>
              </button>

              {record.routing?.is_manually_overridden && (
                <button
                  onClick={handleResetToSystem}
                  disabled={savingRoute}
                  className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-medium flex items-center justify-center space-x-1.5 border border-slate-700 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset to Automated System Suggestion</span>
                </button>
              )}
            </div>

            {/* Data Contract Preservation Rule Callout */}
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 text-[11px] text-slate-500 space-y-1">
              <strong className="text-slate-400 block font-semibold">Data Contract Rule 4 Compliance:</strong>
              Manual route overrides survive repeat imports, scrambled replays, and batch updates. Only an explicit user reset removes the manual route.
            </div>
          </div>

          {/* SECTION D: Provenance & Freshness */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md space-y-4">
            <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
              <ShieldAlert className="w-5 h-5 text-emerald-400" />
              <h3 className="font-bold text-white text-base">Section D: Provenance & Integrity</h3>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between py-1 border-b border-slate-800/50">
                <span className="text-slate-400">Applied Source Revision:</span>
                <span className="font-mono font-bold text-white">Revision {record.applied_revision}</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-slate-800/50">
                <span className="text-slate-400">Analysis Revision:</span>
                <span className="font-mono font-bold text-white">Revision {record.analysis?.analysis_revision || 1}</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-slate-800/50">
                <span className="text-slate-400">Freshness Status:</span>
                <span className={`font-semibold px-2 py-0.5 rounded text-[11px] ${
                  record.analysis?.is_stale 
                    ? "bg-amber-950 text-amber-300 border border-amber-800" 
                    : "bg-emerald-950 text-emerald-300 border border-emerald-800"
                }`}>
                  {record.analysis?.is_stale ? "Stale / Pending Review" : "Current & Fresh"}
                </span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-slate-800/50">
                <span className="text-slate-400">Review Status:</span>
                <span className="font-medium text-slate-200 capitalize">{record.routing?.review_status}</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-slate-400">Activity Recorded:</span>
                <span className="font-mono text-slate-300">{record.activity_at?.slice(0, 19).replace("T", " ")}</span>
              </div>
            </div>

            {/* Stored Payload Inspector */}
            <details className="mt-4 pt-3 border-t border-slate-800 text-xs">
              <summary className="cursor-pointer text-indigo-400 hover:underline font-mono">
                Inspect Raw Source Payload JSON
              </summary>
              <pre className="mt-2 p-3 bg-slate-950 rounded-lg text-[11px] font-mono text-slate-400 overflow-x-auto max-h-60 border border-slate-800">
                {JSON.stringify(record.payload, null, 2)}
              </pre>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
}


import { Suspense } from "react";

export default function RecordDetailPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={<div className="max-w-6xl mx-auto py-24 text-center text-slate-400 font-mono">Loading record details...</div>}>
      <RecordDetailContent params={params} />
    </Suspense>
  );
}
