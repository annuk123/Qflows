import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

// ✅ PATCH: Update a testimonial
export async function PATCH(req: NextRequest) {
  const id = req.nextUrl.pathname.split("/").pop(); // Extracts ID from URL

  if (!id) {
    return NextResponse.json({ message: "Testimonial ID is required" }, { status: 400 });
  }

  try {
    // ✅ Check if testimonial exists
    const existingTestimonial = await prisma.testimonial.findUnique({ where: { id } });

    if (!existingTestimonial) {
      return NextResponse.json({ message: "Testimonial not found" }, { status: 404 });
    }

    // ✅ Validate request body
    const body = await req.json();
    const updateSchema = z.object({
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

    // ✅ Update testimonial
    const updatedTestimonial = await prisma.testimonial.update({
      where: { id },
      data: validatedData.data,
    });

    return NextResponse.json(updatedTestimonial, { status: 200 });
  } catch (error) {
    console.error("Error updating testimonial:", error);
    return NextResponse.json({ message: "Failed to update testimonial" }, { status: 500 });
  }
}

// ✅ DELETE: Remove a testimonial
export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.pathname.split("/").pop(); // Extracts ID from the URL

  if (!id) {
    return NextResponse.json({ error: "Testimonial ID is required" }, { status: 400 });
  }

  try {
    // ✅ Check if testimonial exists
    const existingTestimonial = await prisma.testimonial.findUnique({ where: { id } });
    if (!existingTestimonial) {
      return NextResponse.json({ error: "Testimonial not found" }, { status: 404 });
    }

    // ✅ Delete testimonial
    await prisma.testimonial.delete({ where: { id } });

    return NextResponse.json({ message: "Testimonial deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting testimonial:", error);
    return NextResponse.json({ error: "Failed to delete testimonial" }, { status: 500 });
  }
}
