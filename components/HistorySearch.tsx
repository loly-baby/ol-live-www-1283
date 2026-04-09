"use client";

import { FormEvent, useState } from "react";

type HistoryOrder = {
  id: string;
  productType: string;
  amount: number;
  status: string;
  createdAt: string;
  project: {
    id: string;
    title: string | null;
    templateId: string;
  };
};

export function HistorySearch() {
  const [email, setEmail] = useState("");
  const [orders, setOrders] = useState<HistoryOrder[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setSearched(true);

    try {
      const response = await fetch(`/api/history?email=${encodeURIComponent(email)}`);
      const data = await response.json();
      setOrders(data.orders ?? []);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-soft">
      <form onSubmit={onSubmit} className="flex flex-col gap-4 md:flex-row">
        <input
          type="email"
          required
          placeholder="Enter the email used at checkout"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="flex-1 rounded-2xl border border-slate-300 px-4 py-3 outline-none ring-0"
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-50"
        >
          {loading ? "Searching..." : "Find my orders"}
        </button>
      </form>

      {searched && !loading && orders.length === 0 ? (
        <p className="mt-6 text-sm text-slate-500">No orders found for this email yet.</p>
      ) : null}

      {orders.length > 0 ? (
        <div className="mt-8 space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="rounded-2xl border border-slate-200 p-5">
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="font-semibold text-slate-900">{order.project.title || order.project.templateId}</p>
                  <p className="mt-1 text-sm text-slate-500">
                    {new Date(order.createdAt).toLocaleString()} · {order.productType} · ${(order.amount / 100).toFixed(2)}
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  {order.status === "PAID" ? (
                    <>
                      <a
                        href={`/api/download?orderId=${order.id}&format=png`}
                        className="rounded-xl border border-slate-300 px-4 py-2 text-sm text-slate-700"
                      >
                        PNG
                      </a>
                      <a
                        href={`/api/download?orderId=${order.id}&format=svg`}
                        className="rounded-xl border border-slate-300 px-4 py-2 text-sm text-slate-700"
                      >
                        SVG
                      </a>
                      <a
                        href={`/api/download?orderId=${order.id}&format=pdf`}
                        className="rounded-xl border border-slate-300 px-4 py-2 text-sm text-slate-700"
                      >
                        PDF
                      </a>
                    </>
                  ) : (
                    <span className="rounded-xl bg-slate-100 px-4 py-2 text-sm text-slate-600">{order.status}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
