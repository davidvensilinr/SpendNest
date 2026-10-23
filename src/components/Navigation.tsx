"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { 
  LayoutDashboard, 
  Inbox, 
  FileText, 
  UploadCloud, 
  Download, 
  RefreshCw,
  Sparkles,
  AlertTriangle
} from "lucide-react";

export function Navigation() {
  const pathname = usePathname();
  const [metrics, setMetrics] = useState<any>(null);

  const fetchMetrics = async () => {
    try {
      const res = await fetch("/api/metrics");
      if (res.ok) {
        const data = await res.json();
        setMetrics(data);
      }
    } catch (e) {}
  };

  useEffect(() => {
    fetchMetrics();
    const interval = setInterval(fetchMetrics, 10000);
    return () => clearInterval(interval);
  }, [pathname]);

  const navItems = [
    { label: "Dashboard", href: "/overview", icon: LayoutDashboard },
    { label: "Conversation Inbox", href: "/inbox", icon: Inbox, badge: metrics?.total_records },
    { label: "Manager Brief", href: "/brief", icon: FileText, sub: "21 Aug" },
    { label: "Imports & Quality", href: "/imports", icon: UploadCloud, highlight: metrics?.total_records === 0 },
    { label: "Exports", href: "/exports", icon: Download }
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-900 border-b border-slate-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Link href="/overview" className="flex items-center space-x-2">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-indigo-500 to-emerald-400 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                  SpendNest
                </span>
                <span className="ml-1.5 text-xs uppercase tracking-wider font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-1.5 py-0.5 rounded">
                  Revenue Intelligence
                </span>
              </div>
            </Link>
          </div>

          {/* Nav Links */}
          <nav className="hidden md:flex space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href === "/overview" && pathname === "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-2 px-3.5 py-2 rounded-md text-sm font-medium transition-all ${
                    isActive
                      ? "bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 shadow-sm"
                      : "text-slate-300 hover:text-white hover:bg-slate-800"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="ml-1 px-1.5 py-0.5 text-xs font-semibold rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                      {item.badge}
                    </span>
                  )}
                  {item.sub && (
                    <span className="text-xs text-indigo-400 font-mono">({item.sub})</span>
                  )}
                  {item.highlight && (
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Quick Status Pill */}
          <div className="flex items-center space-x-3">
            {metrics?.attention_queue?.length > 0 && (
              <Link
                href="/inbox?review_status=pending"
                className="flex items-center space-x-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-950/70 text-amber-300 border border-amber-700/60 hover:bg-amber-900 transition-colors"
                title="Actionable exceptions awaiting manager review"
              >
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                <span>{metrics.attention_queue.length} Needing Attention</span>
              </Link>
            )}

            <span className="text-xs font-mono text-slate-400 bg-slate-800/80 px-2.5 py-1 rounded border border-slate-700/60">
              {metrics ? `${metrics.usable_transcripts_count}/${metrics.total_records} Transcripts (${metrics.usable_transcripts_percentage}%)` : "Connecting..."}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
