"use client";

import * as React from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navItems = [
  { href: "/Youtube", label: "Youtube" },
  { href: "/Twitter", label: "Twitter" },
  { href: "/Amazon", label: "Amazon" },
  { href: "/Whatsapp", label: "Whatsapp" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 py-4">
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link href="/Home" className="text-2xl font-bold text-white">
          Home
        </Link>
        <nav className="hidden space-x-6 text-sm font-medium text-white md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-blue-200"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="px-0 text-white hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-[300px] bg-gradient-to-r from-purple-500 via-pink-500 to-red-500"
          >
            <nav className="flex flex-col space-y-4 text-white">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-lg font-medium hover:text-blue-200"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
