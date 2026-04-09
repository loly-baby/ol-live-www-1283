import { ProductType } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { PDFDocument } from "pdf-lib";
import sharp from "sharp";
import { prisma } from "@/lib/prisma";
import { renderSealSvg } from "@/lib/renderSeal";
import { getFormatsForProduct } from "@/lib/download";

export async function GET(request: NextRequest) {
  const orderId = request.nextUrl.searchParams.get("orderId");
  const format = request.nextUrl.searchParams.get("format") as "png" | "svg" | "pdf" | null;

  if (!orderId || !format) {
    return NextResponse.json({ error: "Missing orderId or format" }, { status: 400 });
  }

  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { project: true }
  });

  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  if (order.status !== "PAID") {
    return NextResponse.json({ error: "Order is not paid yet" }, { status: 403 });
  }

  const allowedFormats = getFormatsForProduct(order.productType as ProductType);
  if (!allowedFormats.includes(format)) {
    return NextResponse.json(
      { error: `Format ${format} is not included in ${order.productType}` },
      { status: 403 }
    );
  }

  const config = order.project.configJson as any;
  const svg = renderSealSvg({ ...config, watermark: false });

  if (format === "svg") {
    const fileName = `${order.project.templateId}-${order.id}.svg`;

    return new NextResponse(svg, {
      headers: {
        "Content-Type": "image/svg+xml; charset=utf-8",
        "Content-Disposition": `attachment; filename="${fileName}"`
      }
    });
  }

  if (format === "png") {
    const pngBuffer = await sharp(Buffer.from(svg)).png({ quality: 100 }).toBuffer();
    const fileName = `${order.project.templateId}-${order.id}.png`;

    return new NextResponse(pngBuffer, {
      headers: {
        "Content-Type": "image/png",
        "Content-Disposition": `attachment; filename="${fileName}"`
      }
    });
  }

  const pngBuffer = await sharp(Buffer.from(svg)).png({ quality: 100 }).toBuffer();
  const pdfDoc = await PDFDocument.create();
  const image = await pdfDoc.embedPng(pngBuffer);
  const page = pdfDoc.addPage([image.width, image.height]);
  page.drawImage(image, {
    x: 0,
    y: 0,
    width: image.width,
    height: image.height
  });
  const pdfBytes = await pdfDoc.save();
  const fileName = `${order.project.templateId}-${order.id}.pdf`;

  return new NextResponse(Buffer.from(pdfBytes), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${fileName}"`
    }
  });
}
