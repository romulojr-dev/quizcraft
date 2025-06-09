"use client";

import { Navbar } from "@/components/navbar";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full">
      <Navbar />
      <main className="w-full pt-16">
        <div className="mx-auto max-w-7xl p-6">
          {children}
        </div>
      </main>
    </div>
  );
}