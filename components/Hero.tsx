import Link from "next/link";

export function Hero() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-red-600">
            digital seal generator
          </p>
          <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-slate-900 sm:text-6xl">
            Create a professional seal in 3 minutes.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Generate brand seals, packaging stamps, invoice stamps, and document markers with transparent export.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/editor/thank-you-round"
              className="rounded-2xl bg-slate-900 px-6 py-3 text-sm font-medium text-white hover:bg-slate-800"
            >
              Start free
            </Link>
            <Link
              href="/pricing"
              className="rounded-2xl border border-slate-300 px-6 py-3 text-sm font-medium text-slate-800 hover:bg-slate-50"
            >
              See pricing
            </Link>
          </div>
          <div className="mt-10 grid gap-4 text-sm text-slate-600 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <p className="font-semibold text-slate-900">No design skills needed</p>
              <p className="mt-2">Edit template text, colors, borders, and logo in one place.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <p className="font-semibold text-slate-900">Transparent export</p>
              <p className="mt-2">Buy PNG, SVG, or PDF only when you need the final file.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <p className="font-semibold text-slate-900">Packaging to documents</p>
              <p className="mt-2">Works for stores, creators, invoices, and lightweight office use.</p>
            </div>
          </div>
        </div>
        <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-soft">
          <div className="space-y-5">
            <div className="rounded-2xl bg-slate-50 p-5">
              <p className="text-sm font-medium text-slate-500">Best for sellers</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">Packaging seal</p>
              <p className="mt-2 text-sm text-slate-600">Thank you • packed with care • limited edition</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-5">
              <p className="text-sm font-medium text-slate-500">Best for documents</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">Invoice stamp</p>
              <p className="mt-2 text-sm text-slate-600">Approved • paid • received • draft</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-5">
              <p className="text-sm font-medium text-slate-500">Best for creators</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">Brand badge</p>
              <p className="mt-2 text-sm text-slate-600">Signature collection • creator badge • exclusive mark</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
