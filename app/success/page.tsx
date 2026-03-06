"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, ShoppingBag, ArrowRight } from "lucide-react";

export default function SuccessPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/");
    }, 4000); // 4 second dete hain user ko khush hone ke liye
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6 overflow-hidden">
      {/* Background Decor */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-green-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-64 h-64 bg-orange-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="w-full max-w-sm relative z-10">
        {/* Animated Icon Area */}
        <div className="flex flex-col items-center mb-10">
          <div className="relative">
            {/* Pulsing rings */}
            <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-20" />
            <div className="absolute inset-[-15px] border border-green-500/20 rounded-full animate-pulse" />
            
            <div className="relative bg-gradient-to-br from-green-400 to-green-600 p-6 rounded-[35px] shadow-2xl shadow-green-500/40">
              <CheckCircle2 size={64} className="text-white" />
            </div>
          </div>

          <h1 className="mt-10 text-4xl font-black text-white italic tracking-tighter uppercase">
            Order <span className="text-green-500">Confirmed!</span>
          </h1>
          <p className="mt-3 text-gray-500 font-medium text-center">
            Bhai, kitchen mein kaam shuru ho gaya hai. <br /> 
            <span className="text-gray-400">Garma-garam milega!</span>
          </p>
        </div>

        {/* Status Card */}
        <div className="bg-white/[0.03] backdrop-blur-md border border-white/10 p-8 rounded-[40px] text-center space-y-6">
          <div className="flex items-center justify-center gap-3 text-orange-500 font-black text-sm uppercase tracking-widest">
            <ShoppingBag size={18} className="animate-bounce" />
            <span>Prepping your meal</span>
          </div>
          
          <div className="h-[2px] w-full bg-white/5 overflow-hidden rounded-full">
            <div className="h-full bg-orange-500 animate-[loading_4s_linear]" style={{ width: '100%' }} />
          </div>

          <button 
            onClick={() => router.push("/")}
            className="w-full py-4 bg-white text-black rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-orange-500 hover:text-white transition-all active:scale-95"
          >
            Go to Home <ArrowRight size={18} />
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes loading {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
}