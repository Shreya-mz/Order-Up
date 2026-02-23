"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, Loader2, UtensilsCrossed } from "lucide-react";

export default function Home() {
  const [campuses, setCampuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetch("/api/campuses")
      .then((res) => res.json())
      .then((data) => {
        setCampuses(data);
        setLoading(false);
      });
  }, []);

  // Search Logic: Campus number ya FoodCourt ke naam se search karega
  const filteredCampuses = campuses.filter((campus) => {
    const searchLower = searchQuery.toLowerCase();
    const campusMatch = campus.campusNumber.toString().includes(searchLower);
    const fcMatch = campus.foodCourts.some((fc) =>
      fc.name.toLowerCase().includes(searchLower)
    );
    return campusMatch || fcMatch;
  });

  if (loading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-white">
        <Loader2 className="animate-spin text-orange-500 mb-2" size={40} />
        <p className="font-black text-gray-400 uppercase tracking-widest text-xs">Loading Campuses...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header Section */}
      <div className="bg-white p-8 pt-16 rounded-b-[40px] shadow-sm">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-4xl font-black text-gray-900 leading-none">
              Hungry,<br />
              <span className="text-orange-500 text-5xl">KIITian?</span>
            </h1>
          </div>
          <div className="bg-orange-100 p-3 rounded-2xl text-orange-600">
            <UtensilsCrossed size={28} />
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative group">
          <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors">
            <Search size={20} />
          </div>
          <input
            type="text"
            placeholder="Search Campus 1 to 15..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-100 p-5 pl-14 rounded-[25px] font-bold outline-none border-2 border-transparent focus:border-orange-500 focus:bg-white transition-all shadow-inner"
          />
        </div>
      </div>

      {/* Campus Grid */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-6 px-2">
          <h2 className="text-sm font-black text-gray-400 uppercase tracking-[0.2em]">Available Campuses</h2>
          <span className="text-xs font-black bg-gray-200 px-2 py-1 rounded-md">{filteredCampuses.length} Found</span>
        </div>

        {filteredCampuses.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 font-bold">Aisa koi campus nahi mila bhai! 😅</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {filteredCampuses.map((campus) => (
              <button
                key={campus.id}
                onClick={() => router.push(`/campus/${campus.id}`)}
                className="bg-white p-6 rounded-[35px] shadow-sm border border-gray-100 hover:border-orange-500 hover:shadow-xl hover:shadow-orange-500/10 transition-all active:scale-95 group text-left"
              >
                <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-500 mb-4 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                  <MapPin size={24} />
                </div>
                <p className="text-xs font-black text-gray-400 uppercase mb-1">KIIT</p>
                <p className="text-xl font-black text-gray-900 tracking-tight">Campus {campus.campusNumber}</p>
                <div className="mt-4 flex items-center gap-1 text-[10px] font-black text-green-600 uppercase">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                  Open Now
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}