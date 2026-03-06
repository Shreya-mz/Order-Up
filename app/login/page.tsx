"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, Mail, Loader2, ChefHat, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Email ya Password galat hai, bhai!");
      setLoading(false);
    } else {
      router.push("/");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
      {/* Background Glows */}
      <div className="fixed top-0 -left-20 w-80 h-80 bg-orange-500/20 rounded-full blur-[120px]"></div>
      <div className="fixed bottom-0 -right-20 w-80 h-80 bg-orange-500/10 rounded-full blur-[120px]"></div>

      <div className="w-full max-w-md bg-white/[0.03] backdrop-blur-xl border border-white/10 p-10 rounded-[45px] shadow-2xl relative z-10">
        <div className="flex flex-col items-center mb-10">
          <div className="bg-gradient-to-br from-orange-400 to-orange-600 p-4 rounded-3xl mb-4 shadow-lg shadow-orange-500/30">
            <ChefHat size={35} className="text-white" />
          </div>
          <h1 className="text-4xl font-black text-white italic tracking-tighter">ORDER <span className="text-orange-500">UP!</span></h1>
          <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.3em] mt-2">Campus Food Experience</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input
                type="email"
                placeholder="Roll Number / Email"
                className="w-full pl-12 p-4 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:border-orange-500/50 focus:bg-white/10 transition-all placeholder:text-gray-600"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input
                type="password"
                placeholder="Password"
                className="w-full pl-12 p-4 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:border-orange-500/50 focus:bg-white/10 transition-all placeholder:text-gray-600"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 p-3 rounded-xl text-red-400 text-xs font-bold animate-pulse">
              <AlertCircle size={14} /> {error}
            </div>
          )}

          <button 
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-orange-500/20 transition-all active:scale-[0.98] flex justify-center items-center gap-3 disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" /> : "SIGN IN"}
          </button>
        </form>

        <p className="mt-10 text-center text-gray-500 font-bold text-sm">
          Account nahi hai? <Link href="/signup" className="text-orange-500 hover:text-orange-400 transition-colors">Join the Club</Link>
        </p>
      </div>
    </div>
  );
}