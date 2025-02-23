import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { getServerSession } from "next-auth";


// export async function PATCH(req: Request) {
//   try {
//     // Extract ID from the request URL
//     const url = new URL(req.url);
//     const id = url.pathname.split("/").pop(); // Extract ID from "/api/testimonials/{id}"

//     if (!id) {
//       return NextResponse.json({ error: "Testimonial ID is required" }, { status: 400 });
//     }

//     const numericId = parseInt(id, 10); // Convert to number

//     // Validate ID
//     if (isNaN(numericId)) {
//       return NextResponse.json({ error: "Invalid testimonial ID" }, { status: 400 });
//     }

//     const body = await req.json();

//     // Define validation schema
//     const updateSchema = z.object({
//       userName: z.string().optional(),
//       avatarUrl: z.string().optional(),
//       rating: z.number().min(0).max(5).optional(),
//       review: z.string().optional(),
//       place: z.string().optional(),
//     });

//     // Validate request body
//     const validatedData = updateSchema.safeParse(body);

//     if (!validatedData.success) {
//       return NextResponse.json(
//         { error: "Validation error", details: validatedData.error.errors },
//         { status: 400 }
//       );
//     }

//     // Update the testimonial
//     const updatedTestimonial = await prisma.testimonial.update({
//       where: { id: numericId },
//       data: validatedData.data,
//     });

//     return NextResponse.json(updatedTestimonial, { status: 200 });
//   } catch (error) {
//     console.error("Error updating testimonial:", error);
//     return NextResponse.json({ error: "Failed to update testimonial" }, { status: 500 });
//   }
// }




// Handle DELETE request


export async function PATCH(req: Request) {
  try {
    // Extract user session (Replace with your authentication method)
    const session = await getServerSession();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = parseInt(session.user.id, 10); // Logged-in user's ID

    // Extract ID from request URL
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop();

    if (!id) {
      return NextResponse.json({ error: "Testimonial ID is required" }, { status: 400 });
    }

    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      return NextResponse.json({ error: "Invalid testimonial ID" }, { status: 400 });
    }

    // Find the testimonial
    const existingTestimonial = await prisma.testimonial.findUnique({
      where: { id: numericId },
      select: { id: true,  userId: true, userName: true, place: true, rating: true, review: true, avatarUrl: true, createdAt: true },
    });

    if (!existingTestimonial) {
      return NextResponse.json({ error: "Testimonial not found" }, { status: 404 });
    }

    // Restrict update to the testimonial's owner
    if (existingTestimonial.userId !== userId) {
      return NextResponse.json({ error: "Forbidden: You can't edit this testimonial" }, { status: 403 });
    }

    // Validate request body
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
        { error: "Validation error", details: validatedData.error.errors },
        { status: 400 }
      );
    }

    // Update testimonial
    const updatedTestimonial = await prisma.testimonial.update({
      where: { id: numericId },
      data: validatedData.data,
    });

    return NextResponse.json(updatedTestimonial, { status: 200 });
  } catch (error) {
    console.error("Error updating testimonial:", error);
    return NextResponse.json({ error: "Failed to update testimonial" }, { status: 500 });
  }
}



export async function DELETE(req: Request) {
  try {
    // Extract ID from the request URL
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop(); // Extracts ID from "/api/testimonials/{id}"

    if (!id) {
      return NextResponse.json({ error: "Testimonial ID is required" }, { status: 400 });
    }

    const numericId = parseInt(id, 10); // Convert to number

    // Validate ID
    if (isNaN(numericId)) {
      return NextResponse.json({ error: "Invalid testimonial ID" }, { status: 400 });
    }

    // Check if the testimonial exists
    const existingTestimonial = await prisma.testimonial.findUnique({ where: { id: numericId } });
    if (!existingTestimonial) {
      return NextResponse.json({ error: "Testimonial not found" }, { status: 404 });
    }

    // Delete testimonial
    await prisma.testimonial.delete({ where: { id: numericId } });

    return NextResponse.json({ message: "Testimonial deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting testimonial:", error);
    return NextResponse.json({ error: "Failed to delete testimonial" }, { status: 500 });
  }
}


