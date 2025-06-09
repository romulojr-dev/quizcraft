'use client';

import Link from 'next/link';

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 h-16 border-b bg-background z-50">
      <div className="container mx-auto flex h-full items-center justify-center px-4">
        {/* Logo */}
        <Link href="/dashboard" className="text-xl font-bold">
          QuizCraft
        </Link>
      </div>
    </nav>
  );
}