import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const orderId = body.orderId as string | undefined;

  if (!orderId) {
    return NextResponse.json({ error: "Missing orderId" }, { status: 400 });
  }

  const order = await prisma.order.update({
    where: { id: orderId },
    data: { status: "PAID" }
  });

  return NextResponse.json({ ok: true, orderId: order.id });
}
