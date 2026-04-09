import { SealConfig } from "@/lib/types";
import { renderSealSvg } from "@/lib/renderSeal";

export function SealPreview({ config, watermark = true }: { config: SealConfig; watermark?: boolean }) {
  const svg = renderSealSvg({ ...config, watermark });

  return (
    <div
      className="flex min-h-[540px] items-center justify-center rounded-[28px] border border-slate-200 bg-white p-6 shadow-soft"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
