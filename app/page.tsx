import { Hero } from "@/components/Hero";
import { TemplateCard } from "@/components/TemplateCard";
import { PriceCards } from "@/components/PriceCards";
import { SEAL_TEMPLATES } from "@/lib/templates";

export default function HomePage() {
  return (
    <>
      <Hero />

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-8 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">templates</p>
          <h2 className="mt-3 text-3xl font-semibold text-slate-900">Start from a proven stamp layout</h2>
          <p className="mt-3 text-slate-600">
            Pick a template, customize the text and style, then export only when your design is ready.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {SEAL_TEMPLATES.map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-8 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">pricing</p>
          <h2 className="mt-3 text-3xl font-semibold text-slate-900">Free preview, pay only when you export</h2>
        </div>
        <PriceCards />
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-6 lg:grid-cols-3">
          {[
            {
              title: "For sellers",
              text: "Thank-you seals, packed-with-care marks, and packaging badges for fast order fulfillment."
            },
            {
              title: "For documents",
              text: "Approved, paid, copy, draft, and received stamps for lightweight internal workflows."
            },
            {
              title: "For creators",
              text: "Premium brand seals, creator badges, and collection marks for digital and physical products."
            }
          ].map((item) => (
            <div key={item.title} className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-soft">
              <h3 className="text-xl font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-3 text-slate-600">{item.text}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
