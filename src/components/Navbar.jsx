"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 py-4">
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link href="/Home" className="text-2xl font-bold text-white">
          Home
        </Link>
        <nav className="hidden space-x-6 text-sm font-medium text-white md:flex">
          <Link href="/Youtube" className="hover:text-blue-200">
            Youtube
          </Link>
          <Link href="/Twitter" className="hover:text-blue-200">
            Twitter
          </Link>
          <Link href="/Amazon" className="hover:text-blue-200">
            Amazon
          </Link>
          <Link href="/Whatsapp" className="hover:text-blue-200">
            Whatsapp
          </Link>
        </nav>
      </div>
    </header>
  );
}
