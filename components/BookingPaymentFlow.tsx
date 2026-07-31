"use client";

import { useEffect, useMemo, useState } from "react";
import { useCustomer } from "./CustomerContext";

interface BookingPaymentFlowProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: (amount: number, bookingDetails: any) => void;
  initialAmount?: number;
  artisanName?: string;
  artisanProfession?: string;
  artisanLocation?: string;
}

const BookingPaymentFlow = ({
  isOpen,
  onClose,
  onConfirm,
  initialAmount = 25000,
  artisanName,
  artisanProfession,
  artisanLocation,
}: BookingPaymentFlowProps) => {
  const [amount, setAmount] = useState(initialAmount);
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const { customer } = useCustomer();

  useEffect(() => {
    if (!isOpen) {
      setIsVisible(false);
      setIsSubmitting(false);
      setIsConfirmed(false);
      return;
    }

    const timer = window.setTimeout(() => setIsVisible(true), 20);
    return () => window.clearTimeout(timer);
  }, [isOpen]);

  useEffect(() => {
    if (customer?.phone) setContactPhone(customer.phone);
  }, [customer]);

  const bookingCommitment = useMemo(() => Math.round(amount * 0.4), [amount]);
  const remainingBalance = useMemo(() => Math.round(amount * 0.6), [amount]);

  const handleAmountChange = (value: string) => {
    const cleaned = value.replace(/[^0-9]/g, "");
    const number = Number(cleaned);
    setAmount(cleaned ? (number > 0 ? number : 0) : 0);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    window.setTimeout(() => {
      onConfirm?.(bookingCommitment, {
        jobTitle: jobTitle.trim() || "Home service request",
        jobDescription: jobDescription.trim() || "Customer requested a booking through GiveMeWork.",
        preferredDate: preferredDate || "As soon as possible",
        contactPhone: contactPhone.trim() || "To be shared in chat",
        customerId: customer?.id,
        customerName: customer?.fullName,
      });
      setIsSubmitting(false);
      setIsConfirmed(true);
    }, 900);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 px-3 py-4 transition-opacity duration-300 sm:px-6 sm:py-8">
      <div className={`mx-auto flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950 text-slate-100 shadow-2xl transition-all duration-300 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
        <div className="flex items-start justify-between border-b border-slate-800 px-4 py-4 sm:px-6 sm:py-5">
          <div className="pr-4">
            <p className="text-sm uppercase tracking-[0.24em] text-emerald-300">Secure booking</p>
            <h2 className="mt-2 text-xl font-semibold text-white sm:text-2xl">Book {artisanName ?? "this artisan"}</h2>
            <p className="mt-1 text-sm text-slate-400">
              {artisanProfession ?? "Verified professional"}
              {artisanLocation ? ` • ${artisanLocation}` : ""}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-slate-900/90 p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
            aria-label="Close checkout modal"
          >
            ✕
          </button>
        </div>

        {isConfirmed ? (
          <div className="flex-1 space-y-5 px-4 py-6 sm:px-6">
            <div className="rounded-[1.75rem] border border-emerald-500/20 bg-emerald-500/10 p-6 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20 text-3xl text-emerald-300">✓</div>
              <h3 className="mt-4 text-2xl font-semibold text-white">Booking reserved successfully</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                Your escrow commitment is now protected. The artisan will receive your request and respond shortly.
              </p>
            </div>

            <div className="rounded-[1.75rem] border border-slate-800 bg-slate-900/95 p-5 text-sm text-slate-300">
              <p className="font-semibold text-white">What happens next?</p>
              <ul className="mt-3 space-y-2 text-slate-400">
                <li>• The artisan will review your request and confirm availability.</li>
                <li>• You can continue the conversation in chat while the booking is pending.</li>
                <li>• GiveMeWork keeps your 40% commitment safe until the work is complete.</li>
              </ul>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="inline-flex w-full items-center justify-center rounded-3xl bg-emerald-500 px-6 py-4 text-base font-semibold text-slate-950 transition hover:bg-emerald-400"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex-1 space-y-4 overflow-y-auto px-4 py-4 sm:px-6 sm:py-6">
            <div className="rounded-[1.75rem] border border-slate-800 bg-slate-900/95 p-5 sm:p-6">
              <h3 className="text-lg font-semibold text-white">Tell us what you need</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Share the job scope and your preferred timing so the artisan can respond with the right plan.
              </p>

              <div className="mt-5 grid gap-4">
                <label className="text-sm font-medium text-slate-300">
                  Job title
                  <input
                    value={jobTitle}
                    onChange={(event) => setJobTitle(event.target.value)}
                    placeholder="e.g. Kitchen sink repair"
                    className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none transition focus:border-emerald-400"
                    required
                  />
                </label>

                <label className="text-sm font-medium text-slate-300">
                  Job details
                  <textarea
                    value={jobDescription}
                    onChange={(event) => setJobDescription(event.target.value)}
                    placeholder="Describe the issue, materials needed, and anything important for the artisan."
                    rows={4}
                    className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none transition focus:border-emerald-400"
                    required
                  />
                </label>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="text-sm font-medium text-slate-300">
                    Preferred date
                    <input
                      type="date"
                      value={preferredDate}
                      onChange={(event) => setPreferredDate(event.target.value)}
                      className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none transition focus:border-emerald-400"
                    />
                  </label>

                  <label className="text-sm font-medium text-slate-300">
                    Contact phone
                    <input
                      value={contactPhone}
                      onChange={(event) => setContactPhone(event.target.value)}
                      placeholder="0803 000 0000"
                      className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none transition focus:border-emerald-400"
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-slate-800 bg-slate-900/95 p-5 sm:p-6">
              <h3 className="text-lg font-semibold text-white">Secure your booking</h3>
              <label className="mt-5 block text-sm font-medium text-slate-300">
                Agreed job amount (₦)
                <div className="mt-3 flex rounded-3xl border border-slate-700 bg-slate-950/90 px-4 py-3">
                  <span className="mr-3 self-center text-slate-400">₦</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={amount === 0 ? "" : amount.toLocaleString("en-US")}
                    onChange={(event) => handleAmountChange(event.target.value)}
                    className="w-full bg-transparent text-lg font-semibold text-white outline-none placeholder:text-slate-500"
                    placeholder="0"
                    required
                  />
                </div>
              </label>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-3xl bg-slate-900/90 p-4">
                  <p className="text-sm text-slate-400">Booking commitment</p>
                  <p className="mt-2 text-2xl font-semibold text-emerald-300">₦{bookingCommitment.toLocaleString("en-US")}</p>
                </div>
                <div className="rounded-3xl bg-slate-900/90 p-4">
                  <p className="text-sm text-slate-400">Completion balance</p>
                  <p className="mt-2 text-2xl font-semibold text-slate-100">₦{remainingBalance.toLocaleString("en-US")}</p>
                </div>
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-emerald-500/20 bg-emerald-500/10 p-5 sm:p-6">
              <div className="flex items-center justify-between text-sm text-slate-200">
                <span>Escrow protection</span>
                <span className="font-semibold text-white">40% now • 60% on completion</span>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                Your 40% commitment is safely held by GiveMeWork until the artisan finishes the job. The balance is released after your confirmation.
              </p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex w-full items-center justify-center rounded-3xl bg-emerald-500 px-6 py-4 text-base font-semibold text-slate-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? "Reserving booking..." : "Reserve with escrow"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default BookingPaymentFlow;
