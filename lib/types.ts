export type SealShape = "circle" | "oval" | "square" | "horizontal" | "badge";

export type SealConfig = {
  templateId: string;
  title: string;
  shape: SealShape;
  primaryText: string;
  secondaryText: string;
  centerText: string;
  footerText: string;
  dateText: string;
  serialText: string;
  color: string;
  borderWidth: number;
  fontFamily: string;
  logoDataUrl?: string;
  watermark?: boolean;
};

export type SealTemplate = {
  id: string;
  name: string;
  category: "Packaging" | "Documents" | "Branding";
  description: string;
  config: SealConfig;
};
