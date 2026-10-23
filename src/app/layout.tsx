import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import { Navigation } from "@/components/Navigation";

export const metadata: Metadata = {
  title: "SpendNest Revenue Intelligence Inbox",
  description: "Enterprise conversation intelligence, evidence-backed routing, and manager workspace",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-slate-950 text-slate-100 min-h-screen flex flex-col">
        <Suspense fallback={<div className="h-16 bg-slate-900 border-b border-slate-800" />}>
          <Navigation />
        </Suspense>
        <main className="flex-1 pb-16">{children}</main>
        <footer className="bg-slate-950 border-t border-slate-900 py-6 text-center text-xs text-slate-500">
          <div className="max-w-7xl mx-auto px-4">
            SpendNest Revenue Intelligence Inbox &bull; Data Contract v1.0 Compliant &bull; Strictly Evidence Grounded
          </div>
        </footer>
      </body>
    </html>
  );
}
