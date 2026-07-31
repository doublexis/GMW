import React from "react";

interface ArtisanCardProps {
  name: string;
  profession: string;
  location: string;
  isAvailable: boolean;
  rating: number;
  jobsCompleted: number;
  avatarUrl?: string;
  startingPrice?: number;
  serviceRadius?: string;
  verificationBadge?: string[];
  onBook?: () => void;
  onMessage?: () => void;
  onViewProfile?: () => void;
}

const ArtisanCard = ({
  name,
  profession,
  location,
  isAvailable,
  rating,
  jobsCompleted,
  avatarUrl,
  startingPrice,
  serviceRadius,
  verificationBadge,
  onBook,
  onMessage,
  onViewProfile,
}: ArtisanCardProps) => {
  return (
    <article className="rounded-[2rem] border border-slate-800 bg-slate-950/95 p-5 shadow-2xl shadow-black/20 transition hover:shadow-black/30 sm:p-6">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="h-20 w-20 overflow-hidden rounded-3xl bg-slate-800 ring-1 ring-slate-700">
              <img
                src={avatarUrl ?? "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80"}
                alt={`${name} profile`}
                className="h-full w-full object-cover"
              />
            </div>
            <span
              className={`absolute -right-1 -bottom-1 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full border-2 border-slate-950 text-[0.65rem] font-semibold leading-none ${
                isAvailable ? "bg-emerald-400 text-slate-950" : "bg-orange-400 text-slate-950"
              }`}
            >
              {isAvailable ? "Online" : "Busy"}
            </span>
          </div>

          <div className="space-y-2">
            <div>
              <h3 className="text-xl font-semibold text-white">{name}</h3>
              <p className="text-sm text-slate-400">{profession}</p>
            </div>
            <p className="text-sm text-slate-400">{location}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {(verificationBadge ?? ["NIN Verified", "Guarantor Vouched"]).map((badge) => (
            <span
              key={badge}
              className={`rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] ${
                badge === "NIN Verified"
                  ? "bg-emerald-500/10 text-emerald-300 ring-1 ring-emerald-400/10"
                  : "bg-slate-900 text-slate-100 ring-1 ring-slate-700/50"
              }`}
            >
              {badge}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2 text-sm text-slate-200">
          <div className="rounded-3xl bg-slate-900/90 px-4 py-3 ring-1 ring-white/5">
            <span className="text-amber-300">{rating.toFixed(1)} ★</span>
            <span className="ml-2 text-slate-400">•</span>
            <span className="ml-2">{jobsCompleted} jobs</span>
          </div>
          {startingPrice ? (
            <div className="rounded-3xl bg-slate-900/90 px-4 py-3 ring-1 ring-white/5">
              From ₦{startingPrice.toLocaleString("en-US")}
            </div>
          ) : null}
          {serviceRadius ? (
            <div className="rounded-3xl bg-slate-900/90 px-4 py-3 ring-1 ring-white/5">
              {serviceRadius} radius
            </div>
          ) : null}
        </div>

        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onBook?.();
            }}
            className="flex min-h-[48px] items-center justify-center rounded-2xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
          >
            Book Artisan
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMessage?.();
            }}
            className="flex min-h-[48px] items-center justify-center rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm font-semibold text-slate-100 transition hover:border-slate-500"
          >
            Message
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewProfile?.();
            }}
            className="flex min-h-[48px] items-center justify-center rounded-2xl border border-emerald-500 bg-slate-900 px-4 py-3 text-sm font-semibold text-emerald-300 transition hover:bg-emerald-500/10"
          >
            View Profile
          </button>
        </div>
      </div>
    </article>
  );
};

export default ArtisanCard;
