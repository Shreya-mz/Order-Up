"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ShoppingBag, User } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  // Agar login ya signup page pe ho toh navbar mat dikhao
  if (pathname === "/login" || pathname === "/signup") return null;

  const navItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Orders", path: "/orders", icon: ShoppingBag },
    { name: "Profile", path: "/profile", icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 px-8 pb-8 z-50 rounded-t-[35px] shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
      <div className="flex justify-between items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path;
          return (
            <Link key={item.path} href={item.path} className="flex flex-col items-center gap-1 group">
              <div className={`p-2 rounded-2xl transition-all ${isActive ? "bg-orange-500 text-white shadow-lg shadow-orange-200" : "text-gray-400 group-hover:bg-gray-50"}`}>
                <Icon size={24} />
              </div>
              <span className={`text-[10px] font-black uppercase tracking-widest ${isActive ? "text-orange-500" : "text-gray-300"}`}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}