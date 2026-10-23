"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  FileText, 
  Calendar, 
  Clock, 
  AlertTriangle, 
  Sparkles, 
  Copy, 
  CheckCircle2, 
  ArrowUpRight, 
  ShieldAlert,
  HelpCircle,
  TrendingUp,
  Award
} from "lucide-react";

export default function BriefPage() {
  const [brief, setBrief] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch("/api/brief")
      .then(r => r.json())
      .then(d => setBrief(d));
  }, []);

  if (!brief) {
    return <div className="max-w-6xl mx-auto py-20 text-center text-slate-400 font-mono">Loading Manager Brief...</div>;
  }

  const handleCopyMarkdown = () => {
    let md = `# SpendNest Revenue Intelligence — Manager Brief\nDate: ${brief.brief_date} (${brief.timezone})\n\n`;
    md += `## Executive Summary\n${brief.executive_summary}\n\n`;
    for (const sec of brief.sections) {
      md += `## ${sec.title}\n\n`;
      for (const item of sec.items) {
        md += `### [${item.conversation_ref}] ${item.title}\n`;
        md += `- **Evidence:** ${item.evidence_passage}\n`;
        md += `- **Analysis:** ${item.description}\n`;
        md += `- **Action:** ${item.actionable_takeaway}\n\n`;
      }
    }
    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-800 font-mono font-semibold">
              Daily Intelligence Dossier
            </span>
            <span className="text-xs text-slate-400 font-mono">&bull; {brief.timezone}</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white mt-2 tracking-tight">
            Manager Brief &bull; 21 August 2026
          </h1>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Generated at {brief.generated_at} &bull; Grounded in 18 analyzed conversations post-update batch
          </p>
        </div>

        <button
          onClick={handleCopyMarkdown}
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold flex items-center space-x-2 border border-slate-700 transition-colors shadow-sm self-start sm:self-auto"
        >
          {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
          <span>{copied ? "Copied Markdown!" : "Copy Full Brief (Markdown)"}</span>
        </button>
      </div>

      {/* Scope Disclaimer Box */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-start space-x-3 text-xs text-slate-400">
        <HelpCircle className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong className="text-slate-200">Scope Caveat & Denominator Fidelity:</strong>
          <p>{brief.scope_description}</p>
        </div>
      </div>

      {/* Key Numbers Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <span className="text-xs text-slate-400">Conversations Synthesized</span>
          <p className="text-2xl font-bold text-white mt-1">{brief.key_metrics.total_conversations_reviewed}</p>
          <span className="text-[11px] text-emerald-400">10 Calls &bull; 8 Meetings</span>
        </div>
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <span className="text-xs text-slate-400">Critical Product Blockers</span>
          <p className="text-2xl font-bold text-red-400 mt-1">{brief.key_metrics.urgent_blockers}</p>
          <span className="text-[11px] text-red-300">P1 Bugs & Billing Loop</span>
        </div>
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <span className="text-xs text-slate-400">Coaching Opportunities</span>
          <p className="text-2xl font-bold text-indigo-400 mt-1">{brief.key_metrics.coaching_opportunities}</p>
          <span className="text-[11px] text-indigo-300">Openers & Pricing Defense</span>
        </div>
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <span className="text-xs text-slate-400">High-Priority Deals</span>
          <p className="text-2xl font-bold text-emerald-400 mt-1">{brief.key_metrics.high_priority_deals}</p>
          <span className="text-[11px] text-emerald-300">Advisory & AP Automation</span>
        </div>
      </div>

      {/* Executive Summary */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md space-y-3">
        <h2 className="text-sm font-bold text-indigo-300 uppercase tracking-wider flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <span>Executive Summary</span>
        </h2>
        <p className="text-slate-200 text-sm leading-relaxed">
          {brief.executive_summary}
        </p>
      </div>

      {/* Ranked Brief Sections */}
      <div className="space-y-6">
        {brief.sections.map((section: any, sIdx: number) => (
          <div key={sIdx} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-lg font-bold text-white tracking-tight">
                {section.title}
              </h2>
              {section.badge && (
                <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                  section.badge === "Urgent Attention" ? "bg-red-950 text-red-300 border border-red-800" :
                  section.badge === "Revenue Growth" ? "bg-emerald-950 text-emerald-300 border border-emerald-800" :
                  "bg-indigo-950 text-indigo-300 border border-indigo-800"
                }`}>
                  {section.badge}
                </span>
              )}
            </div>

            <div className="space-y-4">
              {section.items.map((item: any, iIdx: number) => (
                <div 
                  key={iIdx}
                  className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-200 font-mono font-bold text-xs">
                        {item.conversation_ref}
                      </span>
                      <h3 className="font-bold text-white text-sm">
                        {item.title}
                      </h3>
                    </div>
                    <Link
                      href={`/inbox/${item.source_id}`}
                      className="inline-flex items-center space-x-1 text-xs text-indigo-400 hover:text-indigo-300 font-medium"
                    >
                      <span>Inspect Conversation</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Verbatim Quote */}
                  <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800/80 text-xs">
                    <span className="text-[11px] font-mono text-slate-500 block mb-1">Verbatim Source Evidence:</span>
                    <p className="italic text-slate-200 font-serif border-l-2 border-indigo-500 pl-2">
                      {item.evidence_passage}
                    </p>
                  </div>

                  {/* Actionable Takeaway */}
                  <div className="p-2.5 rounded-lg bg-indigo-950/40 border border-indigo-900/60 text-xs flex items-start space-x-2">
                    <Award className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-indigo-300">Manager Takeaway: </strong>
                      <span className="text-slate-300">{item.actionable_takeaway}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
