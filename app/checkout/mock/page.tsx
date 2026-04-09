"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function MockCheckoutPage() {
  const params = useSearchParams();
  const router = useRouter();
  const orderId = params.get("orderId") || "";
  const [loading, setLoading] = useState(false);

  async function completePayment() {
    setLoading(true);
    const response = await fetch("/api/mock-pay", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ orderId })
    });

    const data = await response.json();
    router.push(`/success?orderId=${data.orderId}`);
  }

  return (
    <section className="mx-auto max-w-3xl px-6 py-20">
      <div className="rounded-[32px] border border-slate-200 bg-white p-10 shadow-soft">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-600">mock checkout</p>
        <h1 className="mt-3 text-4xl font-semibold text-slate-900">Development payment simulator</h1>
        <p className="mt-4 text-slate-600">
          Stripe is not configured. Use this page to simulate a successful payment during local development.
        </p>
        <button
          onClick={completePayment}
          disabled={loading || !orderId}
          className="mt-8 rounded-2xl bg-slate-900 px-6 py-3 text-sm font-medium text-white disabled:opacity-50"
        >
          {loading ? "Processing..." : "Mark order as paid"}
        </button>
      </div>
    </section>
  );
}
