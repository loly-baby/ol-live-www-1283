import { HistorySearch } from "@/components/HistorySearch";

export default function HistoryPage() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">history</p>
        <h1 className="mt-3 text-4xl font-semibold text-slate-900">Find past orders by email</h1>
        <p className="mt-4 text-lg text-slate-600">
          Enter the email you used at checkout to retrieve paid orders and download files again.
        </p>
      </div>

      <div className="mt-10">
        <HistorySearch />
      </div>
    </section>
  );
}
