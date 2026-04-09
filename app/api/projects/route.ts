import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const projectSchema = z.object({
  title: z.string().min(1).max(120),
  email: z.string().email().optional().or(z.literal("")),
  templateId: z.string().min(1),
  config: z.any()
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = projectSchema.parse(body);

    const project = await prisma.project.create({
      data: {
        title: parsed.title,
        email: parsed.email || undefined,
        templateId: parsed.templateId,
        configJson: parsed.config
      }
    });

    return NextResponse.json(project);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Invalid request";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
