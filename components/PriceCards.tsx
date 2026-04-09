const ITEMS = [
  {
    name: "HD PNG",
    price: "$2.9",
    desc: "Best for packaging and quick use.",
    features: ["Transparent PNG", "High resolution", "Instant download"]
  },
  {
    name: "SVG + PDF Bundle",
    price: "$5.9",
    desc: "For editing and document workflows.",
    features: ["Vector SVG", "PDF export", "Best for print-ready use"]
  },
  {
    name: "All Formats",
    price: "$9.9",
    desc: "Full format pack for teams and creators.",
    features: ["PNG + SVG + PDF", "One payment", "Best overall value"]
  }
];

export function PriceCards() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {ITEMS.map((item) => (
        <div key={item.name} className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-soft">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">{item.name}</p>
          <div className="mt-4 text-4xl font-semibold text-slate-900">{item.price}</div>
          <p className="mt-3 text-sm text-slate-600">{item.desc}</p>
          <ul className="mt-6 space-y-3 text-sm text-slate-700">
            {item.features.map((feature) => (
              <li key={feature}>• {feature}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
