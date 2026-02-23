"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Mail, Lock, Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // Asli wala entry!
        alert("Welcome back!");
        router.push("/"); 
      } else {
        alert(data.error || "Login failed");
      }
    } catch (err) {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col px-6 py-12">
      <div className="flex flex-col items-center mb-12">
        <div className="w-20 h-20 bg-orange-500 rounded-3xl flex items-center justify-center shadow-lg mb-4">
          <span className="text-white text-4xl font-black italic">O!</span>
        </div>
        <h1 className="text-3xl font-black text-gray-900">Order Up</h1>
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
        <div className="relative">
          <Mail className="absolute left-4 top-4 text-gray-400" size={20} />
          <input 
            required
            type="email" 
            placeholder="College Email ID" 
            className="w-full bg-gray-50 border p-4 pl-12 rounded-2xl outline-none focus:border-orange-500 text-gray-800"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="relative">
          <Lock className="absolute left-4 top-4 text-gray-400" size={20} />
          <input 
            required
            type="password" 
            placeholder="Password" 
            className="w-full bg-gray-50 border p-4 pl-12 rounded-2xl outline-none focus:border-orange-500 text-gray-800"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button 
          disabled={loading}
          type="submit" 
          className="w-full bg-gray-900 text-white p-4 rounded-2xl font-bold mt-8 flex items-center justify-center gap-2 hover:bg-black transition-all"
        >
          {loading ? <Loader2 className="animate-spin" /> : <>Sign In <ArrowRight size={20} /></>}
        </button>
      </form>

      <p className="text-center mt-auto text-sm text-gray-500">
        New to Campus? <Link href="/signup" className="text-orange-600 font-bold">Create Account</Link>
      </p>
    </div>
  );
}