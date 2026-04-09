import { ProductType } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getStripe } from "@/lib/stripe";
import { PRODUCT_PRICING } from "@/lib/pricing";

const checkoutSchema = z.object({
  projectId: z.string().min(1),
  email: z.string().email(),
  productType: z.nativeEnum(ProductType)
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = checkoutSchema.parse(body);

    const project = await prisma.project.findUnique({
      where: { id: parsed.projectId }
    });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    const pricing = PRODUCT_PRICING[parsed.productType];

    const order = await prisma.order.create({
      data: {
        projectId: parsed.projectId,
        email: parsed.email,
        productType: parsed.productType,
        amount: pricing.amount,
        currency: "USD",
        status: "PENDING"
      }
    });

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const stripe = getStripe();

    if (!stripe) {
      return NextResponse.json({
        checkoutUrl: `${appUrl}/checkout/mock?orderId=${order.id}`
      });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: parsed.email,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            product_data: {
              name: pricing.label,
              description: `Export package for seal project ${project.title || project.templateId}`
            },
            unit_amount: pricing.amount
          }
        }
      ],
      success_url: `${appUrl}/success?orderId=${order.id}`,
      cancel_url: `${appUrl}/editor/${project.templateId}`,
      metadata: {
        orderId: order.id,
        projectId: parsed.projectId,
        productType: parsed.productType
      }
    });

    await prisma.order.update({
      where: { id: order.id },
      data: {
        stripeSessionId: session.id
      }
    });

    return NextResponse.json({
      checkoutUrl: session.url
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Checkout error";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
