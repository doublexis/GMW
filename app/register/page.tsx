"use client";

import React, { useState } from "react";
import { useCustomer } from "../../components/CustomerContext";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const { register } = useCustomer();
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const user = await register({ fullName, email, phone, password });
    setLoading(false);
    if (user) router.push("/");
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4 rounded-2xl border border-slate-800 bg-slate-900/95 p-6">
        <h1 className="text-2xl font-semibold">Create an account</h1>
        <label className="block text-sm">Full name<input value={fullName} onChange={(e) => setFullName(e.target.value)} className="mt-1 w-full rounded-md p-3 bg-slate-800" required /></label>
        <label className="block text-sm">Email<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full rounded-md p-3 bg-slate-800" required /></label>
        <label className="block text-sm">Phone<input value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1 w-full rounded-md p-3 bg-slate-800" /></label>
        <label className="block text-sm">Password<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 w-full rounded-md p-3 bg-slate-800" required /></label>
        <div className="flex justify-end">
          <button type="submit" disabled={loading} className="rounded-2xl bg-emerald-500 px-4 py-2 font-semibold text-slate-950">{loading ? "Creating..." : "Create account"}</button>
        </div>
      </form>
    </main>
  );
}
