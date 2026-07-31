"use client";

import { useState } from "react";

interface DisputeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (reason: string, evidence?: File) => void;
}

const DisputeModal = ({ isOpen, onClose, onSubmit }: DisputeModalProps) => {
  const [reason, setReason] = useState("");
  const [evidenceFile, setEvidenceFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  if (!isOpen) return null;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setEvidenceFile(file);
    if (!file) {
      setPreviewUrl("");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setPreviewUrl(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(reason, evidenceFile ?? undefined);
    setReason("");
    setEvidenceFile(null);
    setPreviewUrl("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4">
      <div className="w-full max-w-2xl rounded-[2rem] border border-slate-800 bg-slate-950 shadow-2xl ring-1 ring-white/10">
        <div className="flex items-start justify-between gap-4 border-b border-slate-800 px-6 py-5">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-emerald-300">Dispute Support</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Submit evidence for review</h2>
          </div>
          <button
            type="button"
            className="text-slate-400 transition hover:text-white"
            onClick={onClose}
            aria-label="Close dispute modal"
          >
            ✕
          </button>
        </div>

        <div className="space-y-6 px-6 py-6 sm:px-8">
          <div className="rounded-[1.75rem] border border-emerald-500/20 bg-emerald-500/10 p-5 text-slate-100">
            <p className="text-sm font-semibold text-white">GiveMeWork Admin will review chat logs, agreed price, and photo evidence to resolve escrow funds safely.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-slate-200">Reason for dispute</label>
              <textarea
                value={reason}
                onChange={(event) => setReason(event.target.value)}
                rows={5}
                placeholder="Explain what went wrong and why you need support..."
                className="w-full rounded-3xl border border-slate-800 bg-slate-900/95 px-4 py-4 text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/20"
                required
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between gap-3">
                <label className="text-sm font-semibold text-slate-200">Photo evidence</label>
                <span className="text-xs text-slate-400">Optional</span>
              </div>
              <label className="flex cursor-pointer items-center justify-center rounded-3xl border border-dashed border-slate-700 bg-slate-900/90 px-4 py-5 text-sm text-slate-400 transition hover:border-emerald-400 hover:text-white">
                <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                <span>Attach photo evidence</span>
              </label>
              {previewUrl ? (
                <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 p-3">
                  <img src={previewUrl} alt="Dispute evidence preview" className="h-48 w-full rounded-3xl object-cover" />
                </div>
              ) : null}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                className="rounded-3xl border border-slate-700 bg-slate-900/95 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-slate-500"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-3xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
              >
                Submit Dispute
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DisputeModal;
