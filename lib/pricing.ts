import { ProductType } from "@prisma/client";

export const PRODUCT_PRICING: Record<ProductType, { amount: number; label: string; formats: string[] }> = {
  PNG: {
    amount: 290,
    label: "HD PNG",
    formats: ["png"]
  },
  BUNDLE: {
    amount: 590,
    label: "SVG + PDF Bundle",
    formats: ["svg", "pdf"]
  },
  ALL: {
    amount: 990,
    label: "All Formats",
    formats: ["png", "svg", "pdf"]
  }
};
