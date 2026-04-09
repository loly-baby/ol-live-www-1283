"use client";

import Link from "next/link";
import { ChangeEvent, useMemo, useState } from "react";
import { SealPreview } from "@/components/SealPreview";
import { SealConfig, SealTemplate } from "@/lib/types";

type CheckoutResponse = {
  checkoutUrl: string;
};

export function EditorClient({
  initialConfig,
  templates
}: {
  initialConfig: SealConfig;
  templates: SealTemplate[];
}) {
  const [config, setConfig] = useState<SealConfig>(initialConfig);
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState(initialConfig.title || initialConfig.primaryText);
  const [loading, setLoading] = useState(false);
  const [productType, setProductType] = useState<"PNG" | "BUNDLE" | "ALL">("PNG");
  const [message, setMessage] = useState("");

  const grouped = useMemo(() => {
    return {
      Packaging: templates.filter((item) => item.category === "Packaging"),
      Documents: templates.filter((item) => item.category === "Documents"),
      Branding: templates.filter((item) => item.category === "Branding")
    };
  }, [templates]);

  function updateField<K extends keyof SealConfig>(key: K, value: SealConfig[K]) {
    setConfig((prev) => ({ ...prev, [key]: value }));
  }

  async function handleLogoUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      updateField("logoDataUrl", String(reader.result || ""));
    };
    reader.readAsDataURL(file);
  }

  async function beginCheckout() {
    setLoading(true);
    setMessage("");

    try {
      const projectResponse = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title,
          email,
          templateId: config.templateId,
          config
        })
      });

      if (!projectResponse.ok) {
        const error = await projectResponse.json();
        throw new Error(error.error || "Failed to save project");
      }

      const project = await projectResponse.json();

      const checkoutResponse = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          projectId: project.id,
          email,
          productType
        })
      });

      if (!checkoutResponse.ok) {
        const error = await checkoutResponse.json();
        throw new Error(error.error || "Failed to create checkout");
      }

      const data: CheckoutResponse = await checkoutResponse.json();
      window.location.href = data.checkoutUrl;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Something went wrong";
      setMessage(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[420px_1fr]">
      <div className="space-y-6">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-soft">
          <h2 className="text-lg font-semibold text-slate-900">Template library</h2>
          <div className="mt-5 space-y-5">
            {Object.entries(grouped).map(([group, items]) => (
              <div key={group}>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{group}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {items.map((item) => (
                    <Link
                      key={item.id}
                      href={`/editor/${item.id}`}
                      className={`rounded-full border px-3 py-2 text-xs ${
                        item.id === config.templateId
                          ? "border-slate-900 bg-slate-900 text-white"
                          : "border-slate-300 text-slate-700"
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-soft">
          <h2 className="text-lg font-semibold text-slate-900">Edit seal</h2>
          <div className="mt-5 space-y-4">
            <label className="block">
              <span className="mb-2 block text-sm text-slate-600">Project title</span>
              <input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                className="w-full rounded-2xl border border-slate-300 px-4 py-3"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm text-slate-600">Primary text</span>
              <input
                value={config.primaryText}
                onChange={(event) => updateField("primaryText", event.target.value)}
                className="w-full rounded-2xl border border-slate-300 px-4 py-3"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm text-slate-600">Secondary text</span>
              <input
                value={config.secondaryText}
                onChange={(event) => updateField("secondaryText", event.target.value)}
                className="w-full rounded-2xl border border-slate-300 px-4 py-3"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm text-slate-600">Center text</span>
              <textarea
                value={config.centerText}
                onChange={(event) => updateField("centerText", event.target.value)}
                className="min-h-[96px] w-full rounded-2xl border border-slate-300 px-4 py-3"
              />
            </label>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm text-slate-600">Date</span>
                <input
                  value={config.dateText}
                  onChange={(event) => updateField("dateText", event.target.value)}
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm text-slate-600">Serial</span>
                <input
                  value={config.serialText}
                  onChange={(event) => updateField("serialText", event.target.value)}
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3"
                />
              </label>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm text-slate-600">Color</span>
                <input
                  type="color"
                  value={config.color}
                  onChange={(event) => updateField("color", event.target.value)}
                  className="h-12 w-full rounded-2xl border border-slate-300 p-2"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm text-slate-600">Border width</span>
                <input
                  type="range"
                  min={6}
                  max={28}
                  step={1}
                  value={config.borderWidth}
                  onChange={(event) => updateField("borderWidth", Number(event.target.value))}
                  className="mt-4 w-full"
                />
                <p className="text-xs text-slate-500">{config.borderWidth}px</p>
              </label>
            </div>

            <label className="block">
              <span className="mb-2 block text-sm text-slate-600">Font family</span>
              <select
                value={config.fontFamily}
                onChange={(event) => updateField("fontFamily", event.target.value)}
                className="w-full rounded-2xl border border-slate-300 px-4 py-3"
              >
                <option value="Georgia, serif">Georgia</option>
                <option value="'Times New Roman', serif">Times New Roman</option>
                <option value="Arial, sans-serif">Arial</option>
                <option value="'Trebuchet MS', sans-serif">Trebuchet</option>
              </select>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm text-slate-600">Logo upload</span>
              <input type="file" accept="image/*" onChange={handleLogoUpload} className="w-full rounded-2xl border border-slate-300 p-3" />
              {config.logoDataUrl ? (
                <button
                  type="button"
                  onClick={() => updateField("logoDataUrl", "")}
                  className="mt-2 text-sm text-red-600"
                >
                  Remove logo
                </button>
              ) : null}
            </label>
          </div>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-soft">
          <h2 className="text-lg font-semibold text-slate-900">Export</h2>
          <div className="mt-5 space-y-4">
            <label className="block">
              <span className="mb-2 block text-sm text-slate-600">Checkout email</span>
              <input
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-2xl border border-slate-300 px-4 py-3"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm text-slate-600">Export pack</span>
              <select
                value={productType}
                onChange={(event) => setProductType(event.target.value as "PNG" | "BUNDLE" | "ALL")}
                className="w-full rounded-2xl border border-slate-300 px-4 py-3"
              >
                <option value="PNG">HD PNG · $2.9</option>
                <option value="BUNDLE">SVG + PDF · $5.9</option>
                <option value="ALL">All Formats · $9.9</option>
              </select>
            </label>

            <button
              disabled={loading || !email}
              onClick={beginCheckout}
              className="w-full rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white disabled:opacity-50"
            >
              {loading ? "Preparing checkout..." : "Continue to payment"}
            </button>

            <p className="text-sm text-slate-500">
              Free preview is already enabled. Payment is only required when exporting files.
            </p>
            {message ? <p className="text-sm text-red-600">{message}</p> : null}
          </div>
        </div>
      </div>

      <div className="space-y-5">
        <SealPreview config={config} watermark />
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-soft">
          <p className="text-sm font-medium text-slate-600">Preview tips</p>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li>• Curved templates work best with shorter top and bottom text.</li>
            <li>• Use line breaks in the center text for stacked layouts.</li>
            <li>• Upload simple transparent logos for the cleanest export result.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
