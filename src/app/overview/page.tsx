"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  PhoneCall, 
  Video, 
  FileCheck2, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  Filter, 
  Layers, 
  Edit3, 
  Sparkles, 
  ArrowUpRight, 
  HelpCircle,
  TrendingUp,
  UserCheck,
  RefreshCcw,
  ShieldCheck
} from "lucide-react";

export default function OverviewPage() {
  const [metrics, setMetrics] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [personFilter, setPersonFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [showTooltip, setShowTooltip] = useState<string | null>(null);

  const fetchMetrics = async () => {
    try {
      const res = await fetch("/api/metrics");
      if (res.ok) {
        const data = await res.json();
        setMetrics(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 flex flex-col items-center justify-center space-y-4">
        <RefreshCcw className="w-8 h-8 text-indigo-400 animate-spin" />
        <p className="text-slate-400 font-mono text-sm">Computing dynamic metrics from SQLite database...</p>
      </div>
    );
  }

  const routeBadges: Record<string, { label: string; color: string; desc: string }> = {
    sales_coaching: { label: "Sales Coaching", color: "bg-indigo-950/80 text-indigo-300 border-indigo-700/60", desc: "Calls needing pitch refinement, objection training, or permission opener coaching." },
    deal_next_steps: { label: "Deal Next Steps", color: "bg-emerald-950/80 text-emerald-300 border-emerald-700/60", desc: "Active commercial pipelines, partner proposals, and scheduled demonstrations." },
    customer_follow_up: { label: "Customer Follow-up", color: "bg-blue-950/80 text-blue-300 border-blue-700/60", desc: "Customer onboarding check-ins, collateral dispatch, and migration tracking." },
    internal_vendor: { label: "Internal / Vendor Note", color: "bg-purple-950/80 text-purple-300 border-purple-700/60", desc: "Product bug tickets, billing engine dunning loops, and courier logistics escalations." },
    review_needed: { label: "Human Review", color: "bg-amber-950/80 text-amber-300 border-amber-700/60", desc: "Unanalysed intake records lacking transcripts, or ambiguous lead sources." }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner / Welcome */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950/40 p-6 rounded-2xl border border-slate-800 shadow-xl">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold tracking-tight text-white">Revenue Intelligence Dashboard</h1>
            <span className="text-xs bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-2 py-0.5 rounded-full font-mono">
              Asia/Kolkata (21 Aug 2026)
            </span>
          </div>
          <p className="text-slate-400 text-sm mt-1 max-w-3xl">
            Live synthesis across 44 logical source interactions. Distinguishes call representatives from meeting organisers, enforces strict evidence traceability, and provides verified denominators.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Link
            href="/inbox"
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium transition-colors shadow-md flex items-center space-x-2"
          >
            <span>Open Inbox</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
          <Link
            href="/imports"
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-sm font-medium border border-slate-700 transition-colors"
          >
            Replay & Test Suite
          </Link>
        </div>
      </div>

      {/* Database Empty Warning */}
      {metrics?.total_records === 0 && (
        <div className="p-4 bg-amber-950/50 border border-amber-700/60 rounded-xl text-amber-200 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
            <p className="text-sm">Database is empty. Import the initial batch (01_initial.json) to populate records and view live intelligence metrics.</p>
          </div>
          <Link href="/imports" className="px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white rounded text-xs font-semibold">
            Go to Imports
          </Link>
        </div>
      )}

      {/* Headline Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Card 1: Total Records */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm relative group">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>Total Unique Records</span>
            <HelpCircle 
              className="w-4 h-4 text-slate-500 cursor-pointer hover:text-slate-300" 
              onClick={() => setShowTooltip(showTooltip === "total" ? null : "total")}
            />
          </div>
          <div className="mt-2 flex items-baseline space-x-2">
            <span className="text-3xl font-bold text-white tracking-tight">{metrics?.total_records}</span>
            <span className="text-xs text-slate-400 font-mono">records</span>
          </div>
          <div className="mt-2 text-xs text-slate-400 flex items-center space-x-2">
            <span className="flex items-center text-indigo-400"><PhoneCall className="w-3 h-3 mr-1" /> {metrics?.total_calls} Calls</span>
            <span>&bull;</span>
            <span className="flex items-center text-emerald-400"><Video className="w-3 h-3 mr-1" /> {metrics?.total_meetings} Meetings</span>
          </div>
          {showTooltip === "total" && (
            <div className="absolute top-12 left-2 right-2 bg-slate-800 border border-slate-700 p-3 rounded-lg text-xs text-slate-300 shadow-xl z-20">
              <strong>Denominator:</strong> All logical source records in database keyed by unique pair <code>(source_type, source_id)</code>. Never inflated by duplicate batch imports.
            </div>
          )}
        </div>

        {/* Card 2: Transcript Coverage */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm relative group">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>Usable Transcript Coverage</span>
            <HelpCircle 
              className="w-4 h-4 text-slate-500 cursor-pointer hover:text-slate-300"
              onClick={() => setShowTooltip(showTooltip === "coverage" ? null : "coverage")}
            />
          </div>
          <div className="mt-2 flex items-baseline space-x-2">
            <span className="text-3xl font-bold text-emerald-400 tracking-tight">{metrics?.usable_transcripts_percentage}%</span>
            <span className="text-xs text-slate-400 font-mono">({metrics?.usable_transcripts_count}/{metrics?.total_records})</span>
          </div>
          <div className="mt-2 text-xs text-slate-400">
            {metrics?.total_records - metrics?.usable_transcripts_count} records intentionally lack supplied text.
          </div>
          {showTooltip === "coverage" && (
            <div className="absolute top-12 left-2 right-2 bg-slate-800 border border-slate-700 p-3 rounded-lg text-xs text-slate-300 shadow-xl z-20">
              <strong>Definition:</strong> Count of records having genuine non-empty conversation turns or audio transcript text, divided by total unique records ({metrics?.total_records}). 17 available in initial delivery; 18th arrives with M07 update batch.
            </div>
          )}
        </div>

        {/* Card 3: Needing Review */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>Records Needing Review</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <div className="mt-2 flex items-baseline space-x-2">
            <span className="text-3xl font-bold text-amber-400 tracking-tight">{metrics?.records_needing_review}</span>
            <span className="text-xs text-slate-400 font-mono">pending</span>
          </div>
          <div className="mt-2 text-xs text-slate-400">
            Includes unanalysed intake records and unreviewed AI routes.
          </div>
        </div>

        {/* Card 4: Governance & Integrity */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>Governance & Overrides</span>
            <ShieldCheck className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="mt-2 flex items-baseline space-x-2">
            <span className="text-3xl font-bold text-indigo-400 tracking-tight">{metrics?.manually_corrected_count}</span>
            <span className="text-xs text-slate-400 font-mono">manual overrides</span>
          </div>
          <div className="mt-2 text-xs text-slate-400 flex items-center space-x-2">
            <span>{metrics?.multi_route_records_count} Multi-route</span>
            <span>&bull;</span>
            <span>{metrics?.updated_source_records_count} Rev 2 Updates</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Attention Queue & Activity Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (2 Cols): Attention Queue & Routing Distribution */}
        <div className="lg:col-span-2 space-y-8">
          {/* Attention Queue */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-amber-400" />
                <h2 className="text-lg font-bold text-white">Attention Queue</h2>
                <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-950 text-amber-300 border border-amber-800">
                  {metrics?.attention_queue?.length || 0} Exceptions
                </span>
              </div>
              <span className="text-xs text-slate-500">Actionable manager review items</span>
            </div>

            {(!metrics?.attention_queue || metrics.attention_queue.length === 0) ? (
              <div className="py-8 text-center text-slate-500 text-sm">
                No active exceptions in attention queue. All records processed or reviewed.
              </div>
            ) : (
              <div className="space-y-3">
                {metrics.attention_queue.map((item: any) => (
                  <div 
                    key={item.id}
                    className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 hover:border-slate-700 transition-all flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className={`text-xs px-2 py-0.5 rounded font-semibold uppercase tracking-wider ${
                          item.severity === "urgent" 
                            ? "bg-red-950 text-red-300 border border-red-800" 
                            : item.severity === "warning"
                            ? "bg-amber-950 text-amber-300 border border-amber-800"
                            : "bg-indigo-950 text-indigo-300 border border-indigo-800"
                        }`}>
                          {item.badge}
                        </span>
                        <span className="font-semibold text-sm text-slate-200">
                          {item.title}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 line-clamp-2">
                        {item.reason}
                      </p>
                    </div>

                    <Link
                      href={`/inbox/${item.source_id}`}
                      className="shrink-0 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg border border-slate-700 flex items-center justify-center space-x-1 transition-colors"
                    >
                      <span>Review Details</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Routing Destination Distribution */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md">
            <h2 className="text-lg font-bold text-white mb-2">Routing Destination Breakdown</h2>
            <p className="text-xs text-slate-400 mb-6">
              Shows distribution of effective destinations. A multi-routed conversation contributes to multiple functional queues without duplicating the logical record count.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.entries(routeBadges).map(([catKey, info]) => {
                const count = metrics?.route_counts?.[catKey] || 0;
                return (
                  <Link
                    key={catKey}
                    href={`/inbox?route=${catKey}`}
                    className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-indigo-500/50 transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${info.color}`}>
                          {info.label}
                        </span>
                        <span className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">
                          {count}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-2 line-clamp-2">
                        {info.desc}
                      </p>
                    </div>
                    <div className="mt-3 text-xs text-indigo-400 font-medium flex items-center space-x-1">
                      <span>Filter Inbox</span>
                      <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column (1 Col): Activity by Person (Reps vs Organizers) */}
        <div className="space-y-8">
          {/* Call Reps Breakdown */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <PhoneCall className="w-5 h-5 text-indigo-400" />
                <h3 className="font-bold text-white text-base">Call Activity by Representative</h3>
              </div>
              <span className="text-xs font-mono text-slate-500">Reps only</span>
            </div>
            <p className="text-xs text-slate-400 mb-4">
              Direct telephone outreach logged for sales reps on 21 Aug 2026.
            </p>

            <div className="space-y-3">
              {metrics?.activity_by_person?.call_reps?.map((rep: any) => (
                <Link
                  key={rep.email}
                  href={`/inbox?person=${encodeURIComponent(rep.email)}`}
                  className="flex items-center justify-between p-3 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all"
                >
                  <div className="space-y-0.5">
                    <p className="text-sm font-medium text-slate-200">{rep.name || rep.email}</p>
                    <p className="text-xs font-mono text-slate-500">{rep.email}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold text-white">{rep.count} calls</span>
                    <p className="text-xs text-emerald-400 font-mono">{rep.with_transcript} with text</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Meeting Organizers Breakdown */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Video className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-white text-base">Meetings by Organiser</h3>
              </div>
              <span className="text-xs font-mono text-slate-500">Organisers</span>
            </div>
            <p className="text-xs text-slate-400 mb-4">
              Per Data Contract: an organiser is an administrative calendar host, not automatically the salesperson or sole attendee.
            </p>

            <div className="space-y-3">
              {metrics?.activity_by_person?.meeting_organizers?.map((org: any) => (
                <Link
                  key={org.email}
                  href={`/inbox?person=${encodeURIComponent(org.email)}`}
                  className="flex items-center justify-between p-3 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all"
                >
                  <div className="space-y-0.5">
                    <p className="text-sm font-medium text-slate-200">{org.name || org.email}</p>
                    <p className="text-xs font-mono text-slate-500">{org.email}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold text-white">{org.count} mtgs</span>
                    <p className="text-xs text-emerald-400 font-mono">{org.with_transcript} with text</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
