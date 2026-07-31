"use client";

import { useEffect, useState } from "react";

interface BecomeArtisanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: any) => void;
}

const artisanCategories = [
  "Electrician",
  "Plumber",
  "Mechanic",
  "Carpenter",
  "Welder",
  "Bricklayer",
  "Painter",
  "POP Installer",
  "Tiler",
  "AC Technician",
  "Generator Repair",
  "Solar Installer",
  "CCTV Installer",
  "Tailor",
  "Barber",
  "Makeup Artist",
  "Photographer",
  "Phone Repair",
  "Dry Cleaner",
  "Locksmith",
  "Security Guard",
  "Domestic Worker",
  "Hair Stylist",
  "Event Decorator",
  "Interior Designer",
  "Furniture Maker",
  "Web Developer",
];

const BecomeArtisanModal = ({ isOpen, onClose, onSubmit }: BecomeArtisanModalProps) => {
  const [step, setStep] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    profession: "",
    state: "",
    lga: "",
    yearsOfExperience: "",
    bio: "",
    availability: "Weekdays and weekends",
    agreeToTerms: false,
  });

  useEffect(() => {
    if (!isOpen) return;
    const timer = window.setTimeout(() => setIsVisible(true), 20);
    return () => window.clearTimeout(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  const next = () => setStep((s) => Math.min(3, s + 1));
  const back = () => setStep((s) => Math.max(1, s - 1));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.agreeToTerms) return;
    onSubmit?.(form);
    setStep(3);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4">
      <div className={`w-full max-w-3xl overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950 text-slate-100 shadow-2xl transition-all duration-300 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
        <div className="flex items-start justify-between border-b border-slate-800 px-4 py-4 sm:px-6 sm:py-5">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-emerald-300">Join the network</p>
            <h2 className="mt-2 text-xl font-semibold text-white">Become an artisan on GiveMeWork</h2>
            <p className="mt-1 text-sm text-slate-400">Create a verified profile, get jobs, and build trust with customers.</p>
          </div>
          <button onClick={onClose} className="rounded-full bg-slate-900/90 p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white" aria-label="Close artisan signup">
            ✕
          </button>
        </div>

        <div className="border-b border-slate-800 px-4 py-4 sm:px-6">
          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-400">
            {[1, 2, 3].map((value) => (
              <div key={value} className="flex items-center gap-2">
                <div className={`flex h-8 w-8 items-center justify-center rounded-full ${step >= value ? "bg-emerald-500 text-slate-950" : "bg-slate-800 text-slate-300"}`}>
                  {value}
                </div>
                <span className={step >= value ? "text-slate-100" : ""}>
                  {value === 1 ? "Profile" : value === 2 ? "Experience" : "Done"}
                </span>
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 px-4 py-4 sm:px-6 sm:py-6">
          {step === 1 && (
            <div className="grid gap-4 md:grid-cols-2">
              <label className="text-sm font-medium text-slate-300 md:col-span-2">
                Full name
                <input value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-900/90 px-4 py-3 text-slate-100 outline-none transition focus:border-emerald-400" required />
              </label>
              <label className="text-sm font-medium text-slate-300">
                Phone number
                <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-900/90 px-4 py-3 text-slate-100 outline-none transition focus:border-emerald-400" required />
              </label>
              <label className="text-sm font-medium text-slate-300">
                Email address
                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-900/90 px-4 py-3 text-slate-100 outline-none transition focus:border-emerald-400" required />
              </label>
              <label className="text-sm font-medium text-slate-300">
                Trade / profession
                <select value={form.profession} onChange={(e) => setForm({ ...form, profession: e.target.value })} className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-900/90 px-4 py-3 text-slate-100 outline-none transition focus:border-emerald-400" required>
                  <option value="">Select a category</option>
                  {artisanCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </label>
              <label className="text-sm font-medium text-slate-300">
                State
                <input value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-900/90 px-4 py-3 text-slate-100 outline-none transition focus:border-emerald-400" required />
              </label>
              <label className="text-sm font-medium text-slate-300">
                LGA / area
                <input value={form.lga} onChange={(e) => setForm({ ...form, lga: e.target.value })} className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-900/90 px-4 py-3 text-slate-100 outline-none transition focus:border-emerald-400" required />
              </label>
            </div>
          )}

          {step === 2 && (
            <div className="grid gap-4">
              <label className="text-sm font-medium text-slate-300">
                Years of experience
                <input type="number" value={form.yearsOfExperience} onChange={(e) => setForm({ ...form, yearsOfExperience: e.target.value })} className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-900/90 px-4 py-3 text-slate-100 outline-none transition focus:border-emerald-400" required />
              </label>
              <label className="text-sm font-medium text-slate-300">
                Short bio
                <textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} rows={4} className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-900/90 px-4 py-3 text-slate-100 outline-none transition focus:border-emerald-400" placeholder="Tell customers what makes your work reliable and professional." required />
              </label>
              <label className="text-sm font-medium text-slate-300">
                Availability
                <select value={form.availability} onChange={(e) => setForm({ ...form, availability: e.target.value })} className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-900/90 px-4 py-3 text-slate-100 outline-none transition focus:border-emerald-400">
                  <option>Weekdays and weekends</option>
                  <option>Weekdays only</option>
                  <option>Weekends only</option>
                  <option>24/7 emergency service</option>
                </select>
              </label>
              <label className="flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900/90 px-4 py-3 text-sm text-slate-300">
                <input type="checkbox" checked={form.agreeToTerms} onChange={(e) => setForm({ ...form, agreeToTerms: e.target.checked })} className="h-4 w-4 rounded border-slate-700 bg-slate-950" />
                I agree to be contacted by customers and understand the verification process.
              </label>
            </div>
          )}

          {step === 3 && (
            <div className="rounded-[1.75rem] border border-emerald-500/20 bg-emerald-500/10 p-6 text-center">
              <h3 className="text-xl font-semibold text-white">Application received!</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                Thank you, {form.fullName || "artisan"}. We will review your profile and contact you within 24 hours to complete your onboarding.
              </p>
            </div>
          )}

          <div className="flex items-center justify-between gap-3">
            <div>
              {step > 1 && (
                <button type="button" onClick={back} className="rounded-2xl border border-slate-700 bg-slate-900/95 px-4 py-2 text-sm text-slate-200">
                  Back
                </button>
              )}
            </div>
            <div className="ml-auto flex gap-3">
              {step < 3 && (
                <button type="button" onClick={next} className="rounded-2xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950">
                  Next
                </button>
              )}
              {step === 2 && (
                <button type="submit" className="rounded-2xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950">
                  Submit registration
                </button>
              )}
              {step === 3 && (
                <button type="button" onClick={onClose} className="rounded-2xl bg-slate-800 px-4 py-2 text-sm text-slate-200">
                  Close
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BecomeArtisanModal;
