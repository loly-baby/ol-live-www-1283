import Link from "next/link";
import { SealTemplate } from "@/lib/types";
import { renderSealSvg } from "@/lib/renderSeal";

export function TemplateCard({ template }: { template: SealTemplate }) {
  const svg = renderSealSvg({ ...template.config, watermark: true });

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft">
      <div
        className="flex min-h-[260px] items-center justify-center bg-slate-50 p-6"
        dangerouslySetInnerHTML={{ __html: svg }}
      />
      <div className="space-y-3 p-6">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">{template.category}</p>
          <h3 className="mt-1 text-lg font-semibold text-slate-900">{template.name}</h3>
          <p className="mt-2 text-sm text-slate-600">{template.description}</p>
        </div>
        <Link
          href={`/editor/${template.id}`}
          className="inline-flex rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
        >
          Use template
        </Link>
      </div>
    </div>
  );
}
