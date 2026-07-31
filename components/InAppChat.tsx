"use client";

import { useMemo, useRef, useState } from "react";
import DisputeModal from "./DisputeModal";
import { useCustomer } from "./CustomerContext";

interface ChatMessage {
  id: string;
  text: string;
  sender: "customer" | "artisan" | "system";
  senderName?: string;
  timestamp: string;
  imageUrl?: string;
  priceProposal?: {
    amount: number;
    note: string;
  };
}

interface InAppChatProps {
  artisanName: string;
  artisanPhoto: string;
  jobStatus: "Booking Confirmed" | "Work in Progress" | "Pending Completion Confirm";
}

const InAppChat = ({ artisanName, artisanPhoto, jobStatus }: InAppChatProps) => {
  const { customer } = useCustomer();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      sender: "artisan",
      text: "Hi! I’ve reviewed the job details and I’m ready to start once you confirm the scope.",
      timestamp: "Now",
    },
    {
      id: "2",
      sender: "customer",
      text: "Thanks, please confirm if the scope covers the electrical rewiring and new lighting fixtures.",
      timestamp: "1 min ago",
    },
    {
      id: "3",
      sender: "artisan",
      text: "Yes, including fixtures and final testing. I’ll share the estimate below.",
      timestamp: "Just now",
      priceProposal: {
        amount: 185000,
        note: "All labor, materials and testing included",
      },
    },
  ]);
  const [draft, setDraft] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [attachedPhoto, setAttachedPhoto] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const statusColor = useMemo(() => {
    switch (jobStatus) {
      case "Booking Confirmed":
        return "bg-emerald-500 text-slate-950";
      case "Work in Progress":
        return "bg-amber-400 text-slate-950";
      default:
        return "bg-slate-700 text-slate-100";
    }
  }, [jobStatus]);

  const handleSend = () => {
    if (!draft.trim()) return;
    const newMessage: ChatMessage = {
      id: `${Date.now()}`,
      sender: "customer",
      text: draft.trim(),
      senderName: customer?.fullName,
      timestamp: "Now",
    };
    setMessages([...messages, newMessage]);
    setDraft("");
    setAttachedPhoto("");
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setAttachedPhoto(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDisputeSubmit = (reason: string, evidence?: File) => {
    console.log("Dispute submitted", { reason, evidence });
    setIsModalOpen(false);
  };

  return (
    <div className="flex max-h-[80vh] flex-col gap-4 rounded-[2rem] border border-slate-800 bg-slate-950/95 p-3 shadow-2xl shadow-black/20 sm:gap-6 sm:p-6">
      <div className="flex flex-col gap-4 rounded-[2rem] border border-slate-800 bg-slate-900/95 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 overflow-hidden rounded-3xl bg-slate-800 ring-1 ring-slate-700">
            <img src={artisanPhoto} alt={artisanName} className="h-full w-full object-cover" />
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Artisan</p>
            <h2 className="text-xl font-semibold text-white">{artisanName}</h2>
            <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusColor}`}>{jobStatus}</span>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="rounded-3xl bg-rose-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-rose-400"
        >
          Raise Dispute / Need Help?
        </button>
      </div>

      <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
        <div className="flex min-h-0 flex-col gap-4 rounded-[2rem] border border-slate-800 bg-slate-900/95 p-4 sm:p-6">
          <div className="flex-1 space-y-4 overflow-y-auto pb-2">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex flex-col gap-2 ${
                  message.sender === "customer" ? "items-end text-right" : "items-start"
                }`}
              >
                <div className={`inline-block max-w-[90%] rounded-[1.5rem] border px-4 py-3 text-sm shadow-sm ${
                  message.sender === "customer"
                    ? "border-emerald-500/20 bg-emerald-500/10 text-slate-100"
                    : "border-slate-800 bg-slate-950 text-slate-200"
                }`}>
                  <p>{message.text}</p>
                  {message.imageUrl ? (
                    <img src={message.imageUrl} alt="Attachment" className="mt-3 h-48 w-full rounded-3xl object-cover" />
                  ) : null}
                  {message.priceProposal ? (
                    <div className="mt-4 rounded-3xl border border-slate-700 bg-slate-800 p-4 text-left text-sm">
                      <div className="flex items-center justify-between gap-3">
                        <p className="font-semibold text-white">Price proposal</p>
                        <span className="rounded-full bg-slate-700 px-3 py-1 text-xs text-slate-300">Suggested</span>
                      </div>
                      <p className="mt-3 text-lg font-semibold text-emerald-300">₦{message.priceProposal.amount.toLocaleString("en-US")}</p>
                      <p className="mt-2 text-slate-400">{message.priceProposal.note}</p>
                    </div>
                  ) : null}
                </div>
                <span className="text-[0.70rem] text-slate-500">{message.timestamp}</span>
              </div>
            ))}
          </div>

          <div className="rounded-[1.75rem] border border-slate-800 bg-slate-950/90 p-4">
            {attachedPhoto ? (
              <div className="mb-4 overflow-hidden rounded-3xl border border-slate-700 bg-slate-900 p-3">
                <p className="mb-2 text-xs uppercase tracking-[0.24em] text-slate-500">Attached photo</p>
                <img src={attachedPhoto} alt="Attachment preview" className="h-40 w-full rounded-3xl object-cover" />
              </div>
            ) : null}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-1 items-center gap-3 rounded-3xl border border-slate-800 bg-slate-900 px-4 py-3">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="rounded-2xl bg-slate-800 px-3 py-2 text-sm text-slate-200 transition hover:bg-slate-700"
                >
                  Attach Photo
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileSelect}
                />
                <textarea
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  placeholder="Write a message..."
                  className="min-h-[3rem] flex-1 resize-none bg-transparent text-sm text-slate-100 outline-none placeholder:text-slate-500"
                />
              </div>
              <button
                type="button"
                onClick={handleSend}
                className="rounded-3xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
              >
                Send
              </button>
            </div>
          </div>
        </div>

        <aside className="space-y-4 rounded-[2rem] border border-slate-800 bg-slate-900/95 p-4 sm:p-6">
          <div className="rounded-[1.75rem] border border-slate-800 bg-slate-950/70 p-4">
            <h3 className="text-base font-semibold text-white">Price proposal</h3>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              The artisan can send a proposal card directly in chat to clarify the final budget and scope.
            </p>
          </div>
          <div className="space-y-3">
            <div className="rounded-[1.75rem] border border-slate-800 bg-slate-950/80 p-4">
              <p className="text-sm text-slate-400">Proposal sent</p>
              <p className="mt-2 text-xl font-semibold text-white">₦185,000</p>
              <p className="mt-2 text-sm text-slate-400">Includes labor, materials, and final testing.</p>
            </div>
            <button
              type="button"
              className="w-full rounded-3xl bg-blue-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-blue-400"
              onClick={() => setDraft("I accept this proposal and would like to proceed.")}
            >
              Accept proposal
            </button>
          </div>
        </aside>
      </div>

      <DisputeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleDisputeSubmit} />
    </div>
  );
};

export default InAppChat;
