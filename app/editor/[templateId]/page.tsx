import { getTemplateById, SEAL_TEMPLATES } from "@/lib/templates";
import { EditorClient } from "./EditorClient";

export default async function EditorPage({
  params
}: {
  params: Promise<{ templateId: string }>;
}) {
  const { templateId } = await params;
  const template = getTemplateById(templateId);

  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-8 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">editor</p>
        <h1 className="mt-3 text-4xl font-semibold text-slate-900">{template.name}</h1>
        <p className="mt-3 text-slate-600">{template.description}</p>
      </div>

      <EditorClient initialConfig={template.config} templates={SEAL_TEMPLATES} />
    </section>
  );
}
