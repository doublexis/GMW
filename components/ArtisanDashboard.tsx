"use client";

import { useState } from "react";

interface JobRequest {
  id: string;
  customer: string;
  location: string;
  jobType: string;
  budget: number;
  urgency: string;
}

const sampleRequests: JobRequest[] = [
  {
    id: "req-1",
    customer: "Adeola",
    location: "Lekki, Lagos",
    jobType: "AC Repair",
    budget: 45000,
    urgency: "Urgent",
  },
  {
    id: "req-2",
    customer: "Tunde",
    location: "Ikeja, Lagos",
    jobType: "Electrical Rewiring",
    budget: 120000,
    urgency: "24 hrs",
  },
  {
    id: "req-3",
    customer: "Chioma",
    location: "Surulere, Lagos",
    jobType: "Interior Painting",
    budget: 65000,
    urgency: "2 days",
  },
];

const ArtisanDashboard = () => {
  const [isAvailable, setIsAvailable] = useState(true);

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 rounded-[2rem] border border-slate-800 bg-slate-950/95 px-5 py-5 shadow-2xl shadow-black/20 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <p className="text-sm uppercase tracking-[0.26em] text-emerald-300">Dashboard</p>
          <h1 className="mt-3 text-3xl font-semibold text-white">Artisan Daily Control Panel</h1>
          <p className="mt-2 text-sm text-slate-400">Review earnings, incoming requests and manage availability in one place.</p>
        </div>
        <div className="flex flex-col items-start gap-4 sm:items-end">
          <div className="flex items-center gap-3 rounded-3xl border border-slate-800 bg-slate-900/95 px-4 py-3">
            <span className={`inline-flex h-3.5 w-3.5 rounded-full ${isAvailable ? "bg-emerald-400" : "bg-slate-500"}`} />
            <span className="text-sm font-semibold text-white">{isAvailable ? "Online" : "Offline"}</span>
          </div>
          <button
            type="button"
            onClick={() => setIsAvailable(!isAvailable)}
            className={`rounded-full px-4 py-3 text-sm font-semibold transition ${isAvailable ? "bg-slate-800 text-slate-100 hover:bg-slate-700" : "bg-emerald-500 text-slate-950 hover:bg-emerald-400"}`}
          >
            Available for New Jobs
          </button>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <div className="rounded-[2rem] border border-slate-800 bg-slate-950/95 p-5 shadow-2xl shadow-black/20">
          <h2 className="text-lg font-semibold text-white">Earnings Overview</h2>
          <p className="mt-2 text-sm text-slate-400">Keep track of current cashflow and escrow positions.</p>
          <div className="mt-6 space-y-4">
            <div className="rounded-3xl bg-slate-900/90 p-4">
              <p className="text-sm text-slate-400">Escrow Held (40% bookings)</p>
              <p className="mt-2 text-2xl font-semibold text-emerald-300">₦76,000</p>
            </div>
            <div className="rounded-3xl bg-slate-900/90 p-4">
              <p className="text-sm text-slate-400">Completed Payouts</p>
              <p className="mt-2 text-2xl font-semibold text-white">₦210,500</p>
            </div>
            <div className="rounded-3xl bg-slate-900/90 p-4">
              <p className="text-sm text-slate-400">Pending Completion (60%)</p>
              <p className="mt-2 text-2xl font-semibold text-slate-100">₦114,000</p>
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-800 bg-slate-950/95 p-5 shadow-2xl shadow-black/20 xl:col-span-2">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white">Incoming Job Requests</h2>
              <p className="mt-2 text-sm text-slate-400">Respond quickly to keep your schedule full.</p>
            </div>
            <span className="rounded-full bg-blue-500/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-blue-300">
              {sampleRequests.length} requests
            </span>
          </div>

          <div className="mt-6 space-y-4">
            {sampleRequests.map((request) => (
              <div key={request.id} className="rounded-[1.75rem] border border-slate-800 bg-slate-900/95 p-4 sm:p-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="space-y-2">
                    <p className="text-sm uppercase tracking-[0.2em] text-slate-500">{request.urgency}</p>
                    <h3 className="text-lg font-semibold text-white">{request.jobType}</h3>
                    <p className="text-sm text-slate-400">{request.customer} • {request.location}</p>
                  </div>
                  <div className="rounded-3xl bg-slate-950/90 px-4 py-3 text-sm font-semibold text-slate-100">
                    ₦{request.budget.toLocaleString("en-US")}
                  </div>
                </div>
                <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
                  <button className="rounded-3xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400">
                    Accept & Send Quote
                  </button>
                  <button className="rounded-3xl border border-slate-700 bg-slate-900/95 px-4 py-3 text-sm font-semibold text-slate-100 transition hover:border-slate-500">
                    Decline
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-[2rem] border border-slate-800 bg-slate-950/95 p-5 shadow-2xl shadow-black/20">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">Trust Score</h2>
            <p className="mt-2 text-sm text-slate-400">Verification levels and response readiness.</p>
          </div>
          <span className="rounded-full bg-emerald-500/10 px-3 py-2 text-sm font-semibold text-emerald-300">4.9 / 5</span>
        </div>
        <div className="mt-6 space-y-4">
          <div className="space-y-2 rounded-3xl bg-slate-900/90 p-4">
            <div className="flex items-center justify-between text-sm text-slate-400">
              <span>NIN Verified</span>
              <span className="text-white">Complete</span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-slate-800">
              <div className="h-full w-full bg-emerald-400" />
            </div>
          </div>
          <div className="space-y-2 rounded-3xl bg-slate-900/90 p-4">
            <div className="flex items-center justify-between text-sm text-slate-400">
              <span>Guarantor Vouched</span>
              <span className="text-white">Verified</span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-slate-800">
              <div className="h-full w-4/5 bg-emerald-400" />
            </div>
          </div>
          <div className="space-y-2 rounded-3xl bg-slate-900/90 p-4">
            <div className="flex items-center justify-between text-sm text-slate-400">
              <span>Response Rate</span>
              <span className="text-white">96%</span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-slate-800">
              <div className="h-full w-[96%] bg-emerald-400" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArtisanDashboard;
