"use client";
import { User, LogOut, Settings, HelpCircle } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6 pt-16">
      <div className="flex flex-col items-center mb-10">
        <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center text-orange-500 mb-4">
          <User size={48} />
        </div>
        <h1 className="text-2xl font-black">KIITian Student</h1>
        <p className="text-gray-400 font-bold">2105123@kiit.ac.in</p>
      </div>

      <div className="space-y-3">
        {[
          { name: "Account Settings", icon: <Settings size={20} /> },
          { name: "Help & Support", icon: <HelpCircle size={20} /> },
          { name: "Logout", icon: <LogOut size={20} />, color: "text-red-500" },
        ].map((item) => (
          <button key={item.name} className="w-full bg-white p-5 rounded-[25px] flex items-center gap-4 shadow-sm border border-gray-100">
            <div className={item.color || "text-gray-400"}>{item.icon}</div>
            <span className={`font-bold ${item.color || "text-gray-700"}`}>{item.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}