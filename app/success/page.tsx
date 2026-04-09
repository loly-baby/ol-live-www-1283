import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function SuccessPage({
  searchParams
}: {
  searchParams: Promise<{ orderId?: string }>;
}) {
  const { orderId } = await searchParams;
  const order = orderId
    ? await prisma.order.findUnique({
        where: { id: orderId },
        include: { project: true }
      })
    : null;

  return (
    <section className="mx-auto max-w-4xl px-6 py-20">
      <div className="rounded-[32px] border border-slate-200 bg-white p-10 shadow-soft">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">payment result</p>
        <h1 className="mt-3 text-4xl font-semibold text-slate-900">Your export is ready.</h1>
        <p className="mt-4 text-lg text-slate-600">
          {order
            ? `Order ${order.id} is currently ${order.status}. Use the download buttons below when paid.`
            : "If payment completed, your export should be available below."}
        </p>

        {order ? (
          <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <p className="font-semibold text-slate-900">{order.project.title || order.project.templateId}</p>
            <p className="mt-2 text-sm text-slate-500">
              Product: {order.productType} · Price: ${(order.amount / 100).toFixed(2)} · Status: {order.status}
            </p>
          </div>
        ) : null}

        <div className="mt-8 flex flex-wrap gap-3">
          {orderId ? (
            <>
              <a
                href={`/api/download?orderId=${orderId}&format=png`}
                className="rounded-2xl border border-slate-300 px-5 py-3 text-sm font-medium text-slate-800"
              >
                Download PNG
              </a>
              <a
                href={`/api/download?orderId=${orderId}&format=svg`}
                className="rounded-2xl border border-slate-300 px-5 py-3 text-sm font-medium text-slate-800"
              >
                Download SVG
              </a>
              <a
                href={`/api/download?orderId=${orderId}&format=pdf`}
                className="rounded-2xl border border-slate-300 px-5 py-3 text-sm font-medium text-slate-800"
              >
                Download PDF
              </a>
            </>
          ) : null}
          <Link href="/" className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white">
            Make another seal
          </Link>
        </div>
      </div>
    </section>
  );
}
