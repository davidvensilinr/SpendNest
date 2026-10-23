"use client";

import { useEffect, useState, useTransition, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { 
  PhoneCall, 
  Video, 
  Search, 
  Filter, 
  RefreshCcw, 
  ArrowUpRight, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Sparkles,
  ShieldCheck,
  RotateCcw
} from "lucide-react";

function InboxContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [records, setRecords] = useState<any[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  // Filters state initialized from URL
  const [typeFilter, setTypeFilter] = useState(searchParams.get("type") || "all");
  const [personFilter, setPersonFilter] = useState(searchParams.get("person") || "all");
  const [routeFilter, setRouteFilter] = useState(searchParams.get("route") || "all");
  const [reviewStatusFilter, setReviewStatusFilter] = useState(searchParams.get("review_status") || "all");
  const [transcriptFilter, setTranscriptFilter] = useState(searchParams.get("has_transcript") || "all");
  const [overrideFilter, setOverrideFilter] = useState(searchParams.get("is_overridden") || "all");
  const [updatedFilter, setUpdatedFilter] = useState(searchParams.get("is_updated") || "all");
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");

  const fetchRecords = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (typeFilter !== "all") params.set("type", typeFilter);
      if (personFilter !== "all") params.set("person", personFilter);
      if (routeFilter !== "all") params.set("route", routeFilter);
      if (reviewStatusFilter !== "all") params.set("review_status", reviewStatusFilter);
      if (transcriptFilter !== "all") params.set("has_transcript", transcriptFilter);
      if (overrideFilter !== "all") params.set("is_overridden", overrideFilter);
      if (updatedFilter !== "all") params.set("is_updated", updatedFilter);
      if (searchQuery.trim()) params.set("search", searchQuery.trim());

      const res = await fetch(`/api/records?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setRecords(data.records);
        setTotalCount(data.filtered_count);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, [typeFilter, personFilter, routeFilter, reviewStatusFilter, transcriptFilter, overrideFilter, updatedFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchRecords();
  };

  const resetAllFilters = () => {
    setTypeFilter("all");
    setPersonFilter("all");
    setRouteFilter("all");
    setReviewStatusFilter("all");
    setTranscriptFilter("all");
    setOverrideFilter("all");
    setUpdatedFilter("all");
    setSearchQuery("");
  };

  const routeBadges: Record<string, { label: string; color: string }> = {
    sales_coaching: { label: "Sales Coaching", color: "bg-indigo-950 text-indigo-300 border-indigo-700/60" },
    deal_next_steps: { label: "Deal Next Steps", color: "bg-emerald-950 text-emerald-300 border-emerald-700/60" },
    customer_follow_up: { label: "Customer Follow-up", color: "bg-blue-950 text-blue-300 border-blue-700/60" },
    internal_vendor: { label: "Internal / Vendor Note", color: "bg-purple-950 text-purple-300 border-purple-700/60" },
    review_needed: { label: "Human Review", color: "bg-amber-950 text-amber-300 border-amber-700/60" }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Conversation Intelligence Inbox</h1>
          <p className="text-slate-400 text-sm mt-0.5">
            Searchable repository of all 44 interactions with evidence trace, effective routes, and manager review state.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={resetAllFilters}
            className="flex items-center space-x-1 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Filters</span>
          </button>
          <span className="text-xs font-mono text-slate-400 bg-slate-900 px-3 py-2 rounded-lg border border-slate-800">
            Showing <strong className="text-white">{records.length}</strong> of {totalCount} records
          </span>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-md space-y-4">
        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search reference (C01, M07), participant email, keyword, or summary..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-10 pr-4 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium transition-colors"
          >
            Search
          </button>
        </form>

        {/* Filter Selectors Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
          {/* 1. Source Type */}
          <div>
            <label className="text-slate-400 block mb-1 font-medium">Source Type</label>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-md p-2 text-slate-200 focus:border-indigo-500"
            >
              <option value="all">All Types</option>
              <option value="call">Calls Only (30)</option>
              <option value="meeting">Meetings Only (14)</option>
            </select>
          </div>

          {/* 2. Destination Route */}
          <div>
            <label className="text-slate-400 block mb-1 font-medium">Effective Route</label>
            <select
              value={routeFilter}
              onChange={(e) => setRouteFilter(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-md p-2 text-slate-200 focus:border-indigo-500"
            >
              <option value="all">All Routes</option>
              <option value="sales_coaching">Sales Coaching</option>
              <option value="deal_next_steps">Deal Next Steps</option>
              <option value="customer_follow_up">Customer Follow-up</option>
              <option value="internal_vendor">Internal / Vendor Note</option>
              <option value="review_needed">Human Review</option>
            </select>
          </div>

          {/* 3. Review Status */}
          <div>
            <label className="text-slate-400 block mb-1 font-medium">Review Status</label>
            <select
              value={reviewStatusFilter}
              onChange={(e) => setReviewStatusFilter(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-md p-2 text-slate-200 focus:border-indigo-500"
            >
              <option value="all">All Review States</option>
              <option value="pending">Pending Review</option>
              <option value="reviewed">Reviewed</option>
            </select>
          </div>

          {/* 4. Transcript Presence */}
          <div>
            <label className="text-slate-400 block mb-1 font-medium">Transcript Present</label>
            <select
              value={transcriptFilter}
              onChange={(e) => setTranscriptFilter(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-md p-2 text-slate-200 focus:border-indigo-500"
            >
              <option value="all">All Coverage</option>
              <option value="yes">With Transcript (17-18)</option>
              <option value="no">Without Text (26)</option>
            </select>
          </div>

          {/* 5. Manual Override */}
          <div>
            <label className="text-slate-400 block mb-1 font-medium">Manual Overrides</label>
            <select
              value={overrideFilter}
              onChange={(e) => setOverrideFilter(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-md p-2 text-slate-200 focus:border-indigo-500"
            >
              <option value="all">All Records</option>
              <option value="yes">Overridden by Manager</option>
              <option value="no">System Suggestion Only</option>
            </select>
          </div>

          {/* 6. Revision / Updates */}
          <div>
            <label className="text-slate-400 block mb-1 font-medium">Source Revision</label>
            <select
              value={updatedFilter}
              onChange={(e) => setUpdatedFilter(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-md p-2 text-slate-200 focus:border-indigo-500"
            >
              <option value="all">All Revisions</option>
              <option value="yes">Updated (Rev 2)</option>
              <option value="no">Initial (Rev 1)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Records Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center space-y-3">
            <RefreshCcw className="w-6 h-6 text-indigo-400 animate-spin" />
            <p className="text-slate-400 text-sm">Loading records...</p>
          </div>
        ) : records.length === 0 ? (
          <div className="py-20 text-center space-y-3">
            <p className="text-slate-400 text-sm">No records match the active filters.</p>
            <button
              onClick={resetAllFilters}
              className="px-3 py-1.5 bg-slate-800 text-indigo-400 hover:text-white rounded text-xs font-medium"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-400 text-xs font-semibold uppercase tracking-wider">
                  <th className="py-3.5 px-4">Priority / Ref</th>
                  <th className="py-3.5 px-4">Type</th>
                  <th className="py-3.5 px-4">Participant / Rep</th>
                  <th className="py-3.5 px-4">Effective Route(s)</th>
                  <th className="py-3.5 px-4">Transcript</th>
                  <th className="py-3.5 px-4">Revision</th>
                  <th className="py-3.5 px-4">Review State</th>
                  <th className="py-3.5 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-sm">
                {records.map((rec) => {
                  const isCall = rec.source_type === "call";
                  return (
                    <tr 
                      key={`${rec.source_type}-${rec.source_id}`}
                      className="hover:bg-slate-800/40 transition-colors group"
                    >
                      {/* Priority / Ref */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <span className={`w-2 h-2 rounded-full ${
                            rec.priority === "urgent" ? "bg-red-400 animate-pulse" :
                            rec.priority === "high" ? "bg-amber-400" :
                            rec.priority === "normal" ? "bg-blue-400" : "bg-slate-600"
                          }`} />
                          <span className="font-bold text-white font-mono">
                            {rec.record_ref || "UNREF"}
                          </span>
                          <span className="text-xs text-slate-500 font-mono hidden md:inline">
                            ({rec.source_id.slice(0, 8)}...)
                          </span>
                        </div>
                      </td>

                      {/* Type */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="flex items-center space-x-1.5 text-xs">
                          {isCall ? (
                            <span className="flex items-center text-indigo-400 font-medium">
                              <PhoneCall className="w-3.5 h-3.5 mr-1" /> Call
                            </span>
                          ) : (
                            <span className="flex items-center text-emerald-400 font-medium">
                              <Video className="w-3.5 h-3.5 mr-1" /> Meeting
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Participant */}
                      <td className="py-3.5 px-4">
                        <div className="space-y-0.5">
                          <p className="text-xs font-medium text-slate-200 truncate max-w-[200px]">
                            {isCall ? (rec.rep_name || rec.rep_email || "Unassigned") : (rec.organizer_email || "Unknown Organizer")}
                          </p>
                          <p className="text-[11px] text-slate-500 font-mono">
                            {isCall ? "Rep" : "Organizer"}
                          </p>
                        </div>
                      </td>

                      {/* Effective Routes */}
                      <td className="py-3.5 px-4">
                        <div className="flex flex-wrap gap-1.5">
                          {rec.effective_routes.map((rt: any, i: number) => {
                            const badge = routeBadges[rt.category] || { label: rt.label, color: "bg-slate-800 text-slate-300 border-slate-700" };
                            return (
                              <span 
                                key={i}
                                className={`text-[11px] font-medium px-2 py-0.5 rounded-full border ${badge.color}`}
                              >
                                {badge.label}
                              </span>
                            );
                          })}
                          {rec.is_manually_overridden && (
                            <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-yellow-950 text-yellow-300 border border-yellow-700/60 flex items-center">
                              Override
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Transcript */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        {rec.has_usable_transcript ? (
                          <span className="flex items-center text-emerald-400 text-xs font-medium">
                            <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-400" />
                            Usable Text
                          </span>
                        ) : (
                          <span className="flex items-center text-slate-500 text-xs" title="Missing transcript in source extract">
                            <XCircle className="w-3.5 h-3.5 mr-1 text-slate-600" />
                            No Text
                          </span>
                        )}
                      </td>

                      {/* Revision */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        {rec.applied_revision > 1 ? (
                          <span className="text-xs px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-700 font-mono font-semibold">
                            v{rec.applied_revision} (Updated)
                          </span>
                        ) : (
                          <span className="text-xs px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700 font-mono">
                            v1
                          </span>
                        )}
                      </td>

                      {/* Review State */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className={`text-xs px-2 py-0.5 rounded font-medium ${
                          rec.review_status === "reviewed" 
                            ? "bg-slate-800 text-slate-300 border border-slate-700" 
                            : "bg-amber-950/60 text-amber-300 border border-amber-800"
                        }`}>
                          {rec.review_status === "reviewed" ? "Reviewed" : "Pending"}
                        </span>
                      </td>

                      {/* Action */}
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <Link
                          href={`/inbox/${rec.source_id}`}
                          className="inline-flex items-center space-x-1 px-3 py-1.5 bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white rounded-lg text-xs font-medium transition-all group-hover:border-indigo-500 border border-slate-700"
                        >
                          <span>Inspect</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default function InboxPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-400">Loading inbox...</div>}>
      <InboxContent />
    </Suspense>
  );
}
