"use client";

import { useEffect, useRef, useState } from "react";
import ArtisanCard from "../components/ArtisanCard";
import ArtisanProfileView from "../components/ArtisanProfileView";
import { mockArtisans } from "../data/mockArtisans";
import BecomeArtisanModal from "../components/BecomeArtisanModal";
import BookingPaymentFlow from "../components/BookingPaymentFlow";
import InAppChat from "../components/InAppChat";
import { useCustomer } from "../components/CustomerContext";
import Link from "next/link";

const professionalCategories = [
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
  "Satellite Installer",
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

export default function HomePage() {
  const { customer, logout } = useCustomer();
  const [professionQuery, setProfessionQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [filtered, setFiltered] = useState(mockArtisans);
  const [isBecomeOpen, setIsBecomeOpen] = useState(false);
  const [bookingArtisan, setBookingArtisan] = useState<any | null>(null);
  const [chatArtisan, setChatArtisan] = useState<any | null>(null);
  const [profileArtisan, setProfileArtisan] = useState<any | null>(null);
  const [bookingNotice, setBookingNotice] = useState<string | null>(null);
  const [applicationNotice, setApplicationNotice] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const showcaseRef = useRef<HTMLElement | null>(null);

  const handleSearch = (triggerScroll = true) => {
    setIsSearching(true);
    const prof = professionQuery.trim().toLowerCase();
    const loc = locationQuery.trim().toLowerCase();

    window.setTimeout(() => {
      const results = mockArtisans.filter((a) => {
        const matchProf = prof ? a.profession.toLowerCase().includes(prof) : true;
        const matchLoc = loc ? (a.lga.toLowerCase().includes(loc) || a.city.toLowerCase().includes(loc) || a.state.toLowerCase().includes(loc)) : true;
        return matchProf && matchLoc;
      });
      setFiltered(results);
      setIsSearching(false);
      if (triggerScroll && showcaseRef.current) {
        showcaseRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 650);
  };

  useEffect(() => {
    setFiltered(mockArtisans);
  }, []);

  const openBooking = (artisan: any) => {
    setBookingArtisan(artisan);
  };

  const openChat = (artisan: any) => {
    setChatArtisan(artisan);
  };

  const openProfile = (artisan: any) => {
    setProfileArtisan(artisan);
  };

  const closeBooking = () => setBookingArtisan(null);
  const closeChat = () => setChatArtisan(null);
  const closeProfile = () => setProfileArtisan(null);

  const handleBookConfirm = (amount: number, bookingDetails?: any) => {
    const summary = bookingDetails ? `${bookingDetails.jobTitle} • ${bookingDetails.preferredDate || "ASAP"}` : "secure escrow booking";
    setBookingNotice(`Booking request sent to ${bookingArtisan?.name ?? "this artisan"}. ${summary}`);
  };

  const handleArtisanSubmit = (data: any) => {
    setApplicationNotice(`Thanks ${data.fullName || "there"}! Your artisan application is now under review.`);
    setIsBecomeOpen(false);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-5 border-b border-white/10 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-emerald-500/10 px-4 py-3 text-emerald-300 ring-1 ring-emerald-500/20">
              GiveMeWork
            </div>
            <div className="hidden sm:block text-sm text-slate-400">Trusted artisan bookings across Nigeria</div>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <label className="flex w-full min-w-[220px] flex-col gap-2 text-sm text-slate-300 sm:w-auto">
              Location
              <input
                value={locationQuery}
                onChange={(e) => setLocationQuery(e.target.value)}
                placeholder="Ikeja, Lekki, Surulere"
                className="block w-full rounded-2xl border border-slate-800 bg-slate-900/90 px-4 py-3 text-slate-100 shadow-sm outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/20"
              />
            </label>

            <div className="flex flex-wrap gap-3">
              <button onClick={() => handleSearch(true)} className="rounded-2xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400">
                Find Artisan
              </button>
              <button onClick={() => setIsBecomeOpen(true)} className="rounded-2xl border border-slate-700 bg-slate-900/80 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:bg-slate-800">
                Become an Artisan
              </button>
              {customer ? (
                <div className="flex items-center gap-3">
                  <div className="text-sm text-slate-200">Hello, {customer.fullName}</div>
                  <button onClick={() => logout()} className="rounded-2xl bg-slate-800 px-4 py-2 text-sm text-slate-200">Logout</button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Link href="/login" className="rounded-2xl border border-slate-700 bg-slate-900/80 px-4 py-2 text-sm text-slate-100">Sign in</Link>
                  <Link href="/register" className="rounded-2xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950">Register</Link>
                </div>
              )}
            </div>
          </div>
        </header>

        {bookingNotice ? (
          <div className="mb-6 rounded-[1.5rem] border border-emerald-500/20 bg-emerald-500/10 px-5 py-4 text-sm text-emerald-200">
            {bookingNotice}
          </div>
        ) : null}

        {applicationNotice ? (
          <div className="mb-6 rounded-[1.5rem] border border-sky-500/20 bg-sky-500/10 px-5 py-4 text-sm text-sky-200">
            {applicationNotice}
          </div>
        ) : null}

        <section className="grid gap-10 py-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div className="space-y-8">
            <div className="max-w-xl space-y-5">
              <p className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.18em] text-emerald-300">
                Verified artisans • Protected payments
              </p>
              <h1 className="text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
                Book Verified Artisans with Protected Payments
              </h1>
              <p className="max-w-xl text-lg leading-8 text-slate-300">
                Find the right professional for every job, from electrical work to painting, with instant search and escrow-backed payment protection.
              </p>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-black/20">
              <div className="grid gap-4 sm:grid-cols-[1.5fr_1fr]">
                <label className="flex flex-col gap-2 text-sm text-slate-300">
                  What do you need?
                  <input
                    list="professional-categories"
                    value={professionQuery}
                    onChange={(e) => setProfessionQuery(e.target.value)}
                    placeholder="Electrician, Plumber, AC Technician, Painter"
                    className="w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-4 text-base text-slate-100 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/20"
                  />
                  <datalist id="professional-categories">
                    {professionalCategories.map((category) => (
                      <option key={category} value={category} />
                    ))}
                  </datalist>
                </label>

                <label className="flex flex-col gap-2 text-sm text-slate-300">
                  Location / LGA
                  <input
                    list="location-options"
                    value={locationQuery}
                    onChange={(e) => setLocationQuery(e.target.value)}
                    placeholder="Ikeja, Lekki, Surulere"
                    className="w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-4 text-base text-slate-100 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/20"
                  />
                  <datalist id="location-options">
                    <option value="Lagos" />
                    <option value="Abuja" />
                    <option value="Port Harcourt" />
                    <option value="Ikeja" />
                    <option value="Lekki" />
                    <option value="Surulere" />
                    <option value="Yaba" />
                    <option value="Maitama" />
                  </datalist>
                </label>
              </div>

              <button onClick={() => handleSearch(true)} className="mt-4 flex w-full items-center justify-center rounded-2xl bg-emerald-500 px-6 py-4 text-base font-semibold text-slate-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-70 sm:mt-6" disabled={isSearching}>
                {isSearching ? "Searching..." : "Search Artisans"}
              </button>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="flex items-center gap-3 rounded-2xl bg-slate-900/90 px-4 py-4 text-sm text-slate-200 ring-1 ring-white/10">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-300">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M12 1.75L4 5.5v4.5c0 5.25 3.75 9.5 8 10.75 4.25-1.25 8-5.5 8-10.75V5.5L12 1.75z"/></svg>
                </span>
                <span>40% Upfront Escrow Protection</span>
              </div>
              <div className="flex items-center gap-3 rounded-2xl bg-slate-900/90 px-4 py-4 text-sm text-slate-200 ring-1 ring-white/10">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-300">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M9.75 15.5l-3.5-3.5 1.06-1.06 2.44 2.44 5.94-5.94 1.06 1.06-7 7z"/></svg></span>
                <span>NIN Identity Verified</span>
              </div>
              <div className="flex items-center gap-3 rounded-2xl bg-slate-900/90 px-4 py-4 text-sm text-slate-200 ring-1 ring-white/10">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-300">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg></span>
                <span>Transparent Customer Reviews</span>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[2.5rem] bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.15),_transparent_40%),linear-gradient(180deg,_rgba(15,23,42,0.88),_rgba(15,23,42,0.96))] p-8 text-slate-100 shadow-2xl shadow-black/30 sm:p-10">
            <div className="absolute inset-0 opacity-40" />
            <div className="relative space-y-6">
              <div className="rounded-3xl border border-white/10 bg-slate-950/90 p-5">
                <p className="text-sm uppercase tracking-[0.18em] text-emerald-300">Best in class service</p>
                <h2 className="mt-4 text-2xl font-semibold text-white">Fast bookings, verified artisans, and secure checkout</h2>
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  Start with a trusted professional today, get verified endorsements, and pay only when the job is confirmed.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-slate-800/80 bg-slate-900/90 p-5">
                  <p className="text-sm text-slate-400">Popular category</p>
                  <p className="mt-3 text-xl font-semibold text-white">Plumbing & Repairs</p>
                </div>
                <div className="rounded-3xl border border-slate-800/80 bg-slate-900/90 p-5">
                  <p className="text-sm text-slate-400">Trusted by</p>
                  <p className="mt-3 text-xl font-semibold text-white">Thousands of households</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-4 rounded-[2rem] border border-white/10 bg-slate-900/70 p-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-emerald-300">Why GiveMeWork works</p>
            <h3 className="mt-3 text-2xl font-semibold text-white">A smoother way to hire trusted hands for the job</h3>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400">
              From escrow protection to direct chat and verified reviews, every part of the experience is designed to help customers feel confident before they commit.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-[1.5rem] border border-slate-800 bg-slate-950/90 p-4">
              <p className="font-semibold text-white">Verified profiles</p>
              <p className="mt-2 text-sm text-slate-400">Every artisan is built with trust signals, location details, and review history.</p>
            </div>
            <div className="rounded-[1.5rem] border border-slate-800 bg-slate-950/90 p-4">
              <p className="font-semibold text-white">Secure payments</p>
              <p className="mt-2 text-sm text-slate-400">Pay a protected commitment upfront and release the rest when the work is complete.</p>
            </div>
          </div>
        </section>

        <section ref={(el) => {
          showcaseRef.current = el;
        }} className="mt-12">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-white">Artisan Showcase</h2>
              <p className="mt-1 text-sm text-slate-400">Handpicked artisans near you</p>
            </div>
          </div>

          {isSearching ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="animate-pulse rounded-[2rem] border border-slate-800 bg-slate-900/90 p-5">
                  <div className="flex items-center gap-4">
                    <div className="h-20 w-20 rounded-3xl bg-slate-800" />
                    <div className="flex-1 space-y-3">
                      <div className="h-4 w-24 rounded bg-slate-800" />
                      <div className="h-3 w-32 rounded bg-slate-800" />
                      <div className="h-3 w-20 rounded bg-slate-800" />
                    </div>
                  </div>
                  <div className="mt-5 h-10 rounded-2xl bg-slate-800" />
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="rounded-[2rem] border border-slate-800 bg-slate-900/90 p-10 text-center text-slate-400 shadow-lg shadow-black/20">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-800 text-2xl text-emerald-300">
                🔎
              </div>
              <h3 className="text-lg font-semibold text-white">No artisans matched that search yet</h3>
              <p className="mt-2 text-sm leading-6">Try a broader category or a nearby location like Ikeja, Lekki, or Yaba.</p>
              <button onClick={() => { setProfessionQuery(""); setLocationQuery(""); setFiltered(mockArtisans); }} className="mt-5 rounded-2xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950">
                View all artisans
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((artisan) => (
                <ArtisanCard
                  key={artisan.id}
                  name={artisan.name}
                  profession={artisan.profession}
                  location={`${artisan.city} • ${artisan.lga}`}
                  isAvailable={artisan.availabilityStatus === "Available Now"}
                  rating={artisan.rating}
                  jobsCompleted={artisan.completedJobs}
                  avatarUrl={artisan.avatarUrl}
                  startingPrice={artisan.startingPrice ?? artisan.hourlyRate}
                  serviceRadius={artisan.serviceRadius}
                  verificationBadge={artisan.verificationBadge}
                  onBook={() => openBooking(artisan)}
                  onMessage={() => openChat(artisan)}
                  onViewProfile={() => openProfile(artisan)}
                />
              ))}
            </div>
          )}
        </section>

        <BecomeArtisanModal isOpen={isBecomeOpen} onClose={() => setIsBecomeOpen(false)} onSubmit={handleArtisanSubmit} />

        {bookingArtisan ? (
          <BookingPaymentFlow
            isOpen={!!bookingArtisan}
            onClose={closeBooking}
            onConfirm={handleBookConfirm}
            initialAmount={15000}
            artisanName={bookingArtisan.name}
            artisanProfession={bookingArtisan.profession}
            artisanLocation={`${bookingArtisan.city} • ${bookingArtisan.lga}`}
          />
        ) : null}

        {profileArtisan ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/90 px-4 py-5 sm:px-6 sm:py-8">
            <div className="absolute inset-0" onClick={closeProfile} />
            <div className="relative mx-auto w-full max-w-[min(100vw-2rem,80rem)] overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/95 shadow-2xl shadow-black/40">
              <div className="absolute right-4 top-4 z-20">
                <button
                  onClick={closeProfile}
                  className="rounded-full bg-slate-900/90 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:bg-slate-800"
                >
                  Close
                </button>
              </div>
              <div className="max-h-[calc(100vh-5rem)] overflow-y-auto p-4 sm:p-6 lg:p-8">
                <ArtisanProfileView
                  name={profileArtisan.name}
                  profession={profileArtisan.profession}
                  location={`${profileArtisan.city}, ${profileArtisan.state}`}
                  bio={profileArtisan.bio}
                  responseTime={profileArtisan.averageResponseTime}
                  serviceRadius={profileArtisan.serviceRadius}
                  languages={profileArtisan.languagesSpoken}
                  gallery={profileArtisan.portfolioImages}
                  reviews={profileArtisan.customerReviews.map((review: any) => ({
                    name: review.reviewerName,
                    rating: review.rating,
                    text: review.comment,
                  }))}
                  yearsOfExperience={profileArtisan.yearsOfExperience}
                  servicesOffered={profileArtisan.servicesOffered}
                  workingDaysHours={profileArtisan.workingDaysHours}
                  emergencyAvailability={profileArtisan.emergencyAvailability}
                  phoneNumber={profileArtisan.phoneNumber}
                  whatsappContact={profileArtisan.whatsappContact}
                  email={profileArtisan.email}
                  fullAddress={profileArtisan.fullAddress}
                  verificationBadge={profileArtisan.verificationBadge}
                  rating={profileArtisan.rating}
                  completedJobs={profileArtisan.completedJobs}
                  onClose={closeProfile}
                />
              </div>
            </div>
          </div>
        ) : null}

        {chatArtisan ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 px-3 py-4 sm:px-6 sm:py-8">
            <div className="absolute inset-0" onClick={closeChat} />
            <div className="relative mx-auto w-full max-w-5xl">
              <div className="rounded-[1.5rem] border border-slate-800 bg-slate-950/95 p-2 sm:p-4">
                <div className="mb-3 flex justify-end">
                  <button onClick={closeChat} className="rounded-2xl bg-slate-800 px-4 py-2 text-sm text-slate-200">Close Chat</button>
                </div>
                <InAppChat artisanName={chatArtisan.name} artisanPhoto={chatArtisan.avatarUrl} jobStatus={"Booking Confirmed"} />
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </main>
  );
}
