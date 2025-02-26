import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

// ✅ PATCH: Update a testimonial (Anyone can update)
export async function PATCH(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const params = await context.params;
  console.log("Received params:", params); // Debugging log

  if (!params?.id) {
    return NextResponse.json({ message: "Testimonial ID is required" }, { status: 400 });
  }

  const testimonialId = parseInt(params.id, 10);
  if (isNaN(testimonialId)) {
    return NextResponse.json({ message: "Invalid testimonial ID" }, { status: 400 });
  }

  try {
    // Find the testimonial
    const existingTestimonial = await prisma.testimonial.findUnique({
      where: { id: testimonialId },
    });

    if (!existingTestimonial) {
      return NextResponse.json({ message: "Testimonial not found" }, { status: 404 });
    }

    // ✅ Validate request body (Ensures only valid fields are updated)
    const body = await req.json();
    const updateSchema = z.object({
      name: z.string().optional(),
      userName: z.string().optional(),
      avatarUrl: z.string().optional(),
      rating: z.number().min(0).max(5).optional(),
      review: z.string().optional(),
      place: z.string().optional(),
    });

    const validatedData = updateSchema.safeParse(body);
    if (!validatedData.success) {
      return NextResponse.json(
        { message: "Validation error", details: validatedData.error.errors },
        { status: 400 }
      );
    }

    // ✅ Update testimonial (Anyone can update)
    const updatedTestimonial = await prisma.testimonial.update({
      where: { id: testimonialId },
      data: validatedData.data,
    });

    return NextResponse.json(updatedTestimonial, { status: 200 });
  } catch (error) {
    console.error("Error updating testimonial:", error);
    return NextResponse.json({ message: "Failed to update testimonial" }, { status: 500 });
  }
}


export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.pathname.split("/").filter(Boolean).pop(); // Ensures non-empty value

    if (!id) {
      return NextResponse.json({ error: "Testimonial ID is required" }, { status: 400 });
    }

    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      return NextResponse.json({ error: "Invalid testimonial ID" }, { status: 400 });
    }

    // ✅ Check if testimonial exists
    const existingTestimonial = await prisma.testimonial.findUnique({ where: { id: numericId } });
    if (!existingTestimonial) {
      return NextResponse.json({ error: "Testimonial not found" }, { status: 404 });
    }

    // ✅ Delete testimonial (Anyone can delete)
    await prisma.testimonial.delete({ where: { id: numericId } });

    return NextResponse.json({ message: "Testimonial deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting testimonial:", error);
    return NextResponse.json({ error: "Failed to delete testimonial" }, { status: 500 });
  }
}



