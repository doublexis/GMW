import React from "react";

interface ReviewItem {
  name: string;
  rating: number;
  text: string;
  photoUrl?: string;
}

interface ArtisanProfileViewProps {
  name: string;
  profession: string;
  location: string;
  bio: string;
  responseTime: string;
  serviceRadius: string;
  languages: string[];
  gallery: string[];
  reviews: ReviewItem[];
  yearsOfExperience: number;
  servicesOffered: string[];
  workingDaysHours: string;
  emergencyAvailability: boolean;
  phoneNumber: string;
  whatsappContact: string;
  email: string;
  fullAddress: string;
  verificationBadge: string[];
  rating: number;
  completedJobs: number;
  onClose: () => void;
}

const ArtisanProfileView = ({
  name,
  profession,
  location,
  bio,
  responseTime,
  serviceRadius,
  languages,
  gallery,
  reviews,
  yearsOfExperience,
  servicesOffered,
  workingDaysHours,
  emergencyAvailability,
  phoneNumber,
  whatsappContact,
  email,
  fullAddress,
  verificationBadge,
  rating,
  completedJobs,
  onClose,
}: ArtisanProfileViewProps) => {
  return (
    <section className="space-y-8">
      <div className="rounded-[2.5rem] border border-slate-800 bg-slate-950/95 p-5 shadow-2xl shadow-black/20 sm:p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.2em] text-emerald-300">Professional Artisan</p>
            <h1 className="text-3xl font-semibold text-white sm:text-4xl">{name}</h1>
            <p className="text-sm text-slate-400">{profession} • {location}</p>
          </div>
          <div className="grid gap-3 sm:text-right">
            <span className={`rounded-full px-4 py-2 text-sm font-semibold ring-1 ${
              emergencyAvailability ? "bg-emerald-500/10 text-emerald-300 ring-emerald-400/10" : "bg-orange-500/10 text-orange-300 ring-orange-400/10"
            }`}>
              {emergencyAvailability ? "Emergency Available" : "No emergency service"}
            </span>
            <span className="rounded-full bg-slate-900 px-4 py-2 text-sm text-slate-200 ring-1 ring-slate-700/50">Response time: {responseTime}</span>
            <span className="rounded-full bg-slate-900 px-4 py-2 text-sm text-slate-200 ring-1 ring-slate-700/50">Experience: {yearsOfExperience} years</span>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-6 rounded-[2.5rem] border border-slate-800 bg-slate-950/95 p-5 shadow-2xl shadow-black/10">
          <div className="overflow-hidden rounded-[2rem] bg-slate-900">
            <div className="grid gap-3 p-4 sm:grid-cols-2">
              {gallery.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Gallery image ${index + 1}`}
                  className="h-44 w-full rounded-3xl object-cover shadow-inner shadow-black/20"
                />
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-5">
              <h2 className="text-xl font-semibold text-white">About this artisan</h2>
              <p className="mt-3 text-sm leading-7 text-slate-300">{bio}</p>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-5">
              <h2 className="text-xl font-semibold text-white">Core services</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {servicesOffered.map((service) => (
                  <span key={service} className="rounded-full bg-slate-800 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-300 ring-1 ring-slate-700/50">
                    {service}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-4 text-sm text-slate-200">
                <p className="text-slate-400">Service radius</p>
                <p className="mt-2 font-semibold text-white">{serviceRadius}</p>
              </div>
              <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-4 text-sm text-slate-200">
                <p className="text-slate-400">Languages</p>
                <p className="mt-2 font-semibold text-white">{languages.join(", ")}</p>
              </div>
              <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-4 text-sm text-slate-200">
                <p className="text-slate-400">Work days</p>
                <p className="mt-2 font-semibold text-white">{workingDaysHours}</p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-4 text-sm text-slate-200">
                <p className="text-slate-400">Jobs completed</p>
                <p className="mt-2 font-semibold text-white">{completedJobs}</p>
              </div>
              <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-4 text-sm text-slate-200">
                <p className="text-slate-400">Verification</p>
                <p className="mt-2 font-semibold text-white">{verificationBadge.join(" • ")}</p>
              </div>
              <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-4 text-sm text-slate-200">
                <p className="text-slate-400">Rating</p>
                <p className="mt-2 font-semibold text-white">{rating.toFixed(2)} ★</p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-4 text-sm text-slate-200">
                <p className="text-slate-400">Contact</p>
                <p className="mt-2 text-sm text-white">Phone: {phoneNumber}</p>
                <p className="mt-1 text-sm text-white">WhatsApp: {whatsappContact}</p>
                <p className="mt-1 text-sm text-white">Email: {email}</p>
              </div>
              <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-4 text-sm text-slate-200">
                <p className="text-slate-400">Location</p>
                <p className="mt-2 font-semibold text-white">{fullAddress}</p>
              </div>
            </div>
          </div>
        </div>

        <aside className="space-y-6 rounded-[2.5rem] border border-slate-800 bg-slate-950/95 p-5 shadow-2xl shadow-black/10">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-white">Customer Reviews</h2>
                <p className="mt-1 text-sm text-slate-400">Verified feedback from past customers.</p>
              </div>
              <button onClick={onClose} className="rounded-2xl bg-slate-800 px-3 py-2 text-xs font-semibold text-slate-200 transition hover:bg-slate-700">
                Close
              </button>
            </div>
            <div className="mt-4 space-y-4">
              {reviews.map((review, index) => (
                <div key={index} className="rounded-3xl border border-slate-800 bg-slate-950 p-4">
                  <div className="flex items-center gap-3">
                    <div className="h-11 w-11 overflow-hidden rounded-2xl bg-slate-800">
                      {review.photoUrl ? (
                        <img src={review.photoUrl} alt={review.name} className="h-full w-full object-cover" />
                      ) : (
                        <div className="flex h-full items-center justify-center text-slate-600">No Image</div>
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-white">{review.name}</p>
                      <p className="text-sm text-amber-300">{review.rating.toFixed(1)} ★</p>
                    </div>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{review.text}</p>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-800 bg-slate-950/95 px-4 py-4 shadow-2xl shadow-black/30 sm:hidden">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm text-slate-400">Ready to book?</p>
            <p className="text-base font-semibold text-white">Agree price and secure this artisan.</p>
          </div>
          <button className="rounded-3xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-400">
            Agree Price & Book
          </button>
        </div>
      </div>
    </section>
  );
};

export default ArtisanProfileView;
