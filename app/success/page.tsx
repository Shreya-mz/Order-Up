"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, ShoppingBag } from "lucide-react";

export default function SuccessPage() {
  const router = useRouter();

  useEffect(() => {
    // 3 second baad Home page par bhej do
    const timer = setTimeout(() => {
      router.push("/");
    }, 3000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="h-screen flex flex-col items-center justify-center p-6 text-center bg-white">
      <div className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-6 animate-bounce">
        <CheckCircle2 size={60} />
      </div>
      <h1 className="text-3xl font-black text-gray-900 mb-2">Order Placed!</h1>
      <p className="text-gray-500 font-bold mb-8">
        Bhai, kitchen mein kaam shuru ho gaya hai. <br /> Garma-garam milega!
      </p>
      
      <div className="bg-gray-50 w-full p-6 rounded-[32px] border border-dashed border-gray-200">
        <div className="flex items-center justify-center gap-3 text-orange-500 font-black">
          <ShoppingBag size={20} />
          <span>Redirecting to Home...</span>
        </div>
      </div>
    </div>
  );
}