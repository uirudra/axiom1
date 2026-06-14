"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Home, BarChart2, FlaskConical, BookOpen, Bot } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { name: "Home", href: "/", icon: Home },
  { name: "Markets", href: "/markets", icon: BarChart2 },
  { name: "Data Lab", href: "/data-lab", icon: FlaskConical },
  { name: "Insights", href: "/insights", icon: BookOpen },
  { name: "Agent", href: "/agent", icon: Bot },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-5 pointer-events-none">
      <div className="flex items-center gap-1 bg-hull/80 border border-rim backdrop-blur-xl py-1.5 px-2 rounded-full shadow-2xl pointer-events-auto"
           style={{ boxShadow: "0 0 40px rgba(0,0,0,0.6), 0 0 1px rgba(0,245,212,0.1) inset" }}>
        {NAV.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-body font-medium transition-colors duration-200",
                active ? "text-plasma" : "text-dim hover:text-fore"
              )}
            >
              {active && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full bg-plasma/10 border border-plasma/20"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                >
                  <div className="absolute -top-px left-1/2 -translate-x-1/2 w-10 h-0.5 bg-plasma rounded-b-full opacity-80" />
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-16 h-4 bg-plasma/20 blur-md rounded-full" />
                </motion.div>
              )}
              <Icon size={14} strokeWidth={2} className="relative z-10" />
              <span className="relative z-10 hidden sm:inline">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
