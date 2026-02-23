"use client"; // Ye zaroori hai events handle karne ke liye

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, User, Mail, Lock, Phone, Loader2 } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Account created! Now login.");
        router.push("/login");
      } else {
        const data = await res.json();
        alert(data.error || "Something went wrong");
      }
    } catch (err) {
      alert("Error connecting to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col px-6 py-12">
      <div className="flex flex-col items-center mb-8 text-center">
        <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center shadow-lg mb-4 text-white text-3xl font-black italic">O!</div>
        <h1 className="text-2xl font-black text-gray-900">Create Account</h1>
        <p className="text-gray-500 text-sm">Welcome to Order Up KIIT</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 text-gray-800">
        <div className="relative">
          <User className="absolute left-4 top-4 text-gray-400" size={20} />
          <input required type="text" placeholder="Full Name" className="w-full bg-gray-50 border p-4 pl-12 rounded-2xl outline-none focus:border-orange-500" 
            onChange={(e) => setFormData({...formData, name: e.target.value})} />
        </div>
        <div className="relative">
          <Mail className="absolute left-4 top-4 text-gray-400" size={20} />
          <input required type="email" placeholder="College Email" className="w-full bg-gray-50 border p-4 pl-12 rounded-2xl outline-none focus:border-orange-500" 
            onChange={(e) => setFormData({...formData, email: e.target.value})} />
        </div>
        <div className="relative">
          <Phone className="absolute left-4 top-4 text-gray-400" size={20} />
          <input required type="text" placeholder="Phone Number" className="w-full bg-gray-50 border p-4 pl-12 rounded-2xl outline-none focus:border-orange-500" 
            onChange={(e) => setFormData({...formData, phone: e.target.value})} />
        </div>
        <div className="relative">
          <Lock className="absolute left-4 top-4 text-gray-400" size={20} />
          <input required type="password" placeholder="Password" className="w-full bg-gray-50 border p-4 pl-12 rounded-2xl outline-none focus:border-orange-500" 
            onChange={(e) => setFormData({...formData, password: e.target.value})} />
        </div>

        <button disabled={loading} type="submit" className="w-full bg-orange-500 text-white p-4 rounded-2xl font-bold mt-4 flex items-center justify-center gap-2 hover:bg-orange-600 shadow-lg disabled:bg-gray-400">
          {loading ? <Loader2 className="animate-spin" /> : <>Create Account <ArrowRight size={20} /></>}
        </button>
      </form>

      <p className="text-center mt-8 text-sm text-gray-500">
        Already have an account? <Link href="/login" className="text-orange-600 font-bold">Sign In</Link>
      </p>
    </div>
  );
}