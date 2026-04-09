import Link from "next/link";
import { PriceCards } from "@/components/PriceCards";

export default function PricingPage() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">pricing</p>
        <h1 className="mt-3 text-4xl font-semibold text-slate-900">Choose the export pack you need.</h1>
        <p className="mt-4 text-lg text-slate-600">
          This product is designed for low-friction one-time use. Preview for free, then pay only when you export.
        </p>
      </div>

      <div className="mt-10">
        <PriceCards />
      </div>

      <div className="mt-10 rounded-[28px] border border-slate-200 bg-white p-8 shadow-soft">
        <h2 className="text-2xl font-semibold text-slate-900">FAQ</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div>
            <p className="font-medium text-slate-900">Can I preview for free?</p>
            <p className="mt-2 text-sm text-slate-600">Yes. You can edit and preview without paying.</p>
          </div>
          <div>
            <p className="font-medium text-slate-900">Do I need a subscription?</p>
            <p className="mt-2 text-sm text-slate-600">No. This MVP uses one-time export payment.</p>
          </div>
          <div>
            <p className="font-medium text-slate-900">Can I use my own logo?</p>
            <p className="mt-2 text-sm text-slate-600">Yes. Upload a logo or mark and embed it in the center of the seal.</p>
          </div>
          <div>
            <p className="font-medium text-slate-900">Can I retrieve downloads later?</p>
            <p className="mt-2 text-sm text-slate-600">Yes. Use the same checkout email on the history page.</p>
          </div>
        </div>

        <div className="mt-8">
          <Link
            href="/editor/thank-you-round"
            className="inline-flex rounded-2xl bg-slate-900 px-6 py-3 text-sm font-medium text-white"
          >
            Start designing
          </Link>
        </div>
      </div>
    </section>
  );
}
