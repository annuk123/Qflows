import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/config/authOptions";// Adjust path as needed


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


// export async function PATCH(req: Request) {

//   const session = await getServerSession(authOptions);
//   if (!session || !session.user) {
//     return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
//   }

//   const userToken = session.user.token; // Ensure it's available
//   console.log("Backend Session:", session);

//   try {
//     // Extract user session (Replace with your authentication method)
//     const session = await getServerSession();
//     if (!session?.user?.id) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }
//     const userId = parseInt(session.user.id, 10); // Logged-in user's ID

//     // Extract ID from request URL
//     const url = new URL(req.url);
//     const id = url.pathname.split("/").pop();

//     if (!id) {
//       return NextResponse.json({ error: "Testimonial ID is required" }, { status: 400 });
//     }

//     const numericId = parseInt(id, 10);
//     if (isNaN(numericId)) {
//       return NextResponse.json({ error: "Invalid testimonial ID" }, { status: 400 });
//     }

//     // Find the testimonial
//     const existingTestimonial = await prisma.testimonial.findUnique({
//       where: { id: numericId },
//       select: { id: true,  userId: true, userName: true, place: true, rating: true, review: true, avatarUrl: true, createdAt: true },
//     });

//     if (!existingTestimonial) {
//       return NextResponse.json({ error: "Testimonial not found" }, { status: 404 });
//     }

//     // Restrict update to the testimonial's owner
//     if (existingTestimonial.userId !== userId) {
//       return NextResponse.json({ error: "Forbidden: You can't edit this testimonial" }, { status: 403 });
//     }

//     // Validate request body
//     const body = await req.json();
//     const updateSchema = z.object({
//       userName: z.string().optional(),
//       avatarUrl: z.string().optional(),
//       rating: z.number().min(0).max(5).optional(),
//       review: z.string().optional(),
//       place: z.string().optional(),
//     });

//     const validatedData = updateSchema.safeParse(body);
//     if (!validatedData.success) {
//       return NextResponse.json(
//         { error: "Validation error", details: validatedData.error.errors },
//         { status: 400 }
//       );
//     }

//     // Update testimonial
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



//export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  export async function PATCH(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const params = await context.params;
  console.log("Received params:", params); // Debugging log to check if params exist

  // Ensure `params.id` exists before using it
  if (!params?.id) {
    return NextResponse.json({ message: "Testimonial ID is required" }, { status: 400 });
  }

  const testimonialId = parseInt(params.id, 10);
  if (isNaN(testimonialId)) {
    return NextResponse.json({ message: "Invalid testimonial ID" }, { status: 400 });
  }

  // Get session data
  const session = await getServerSession(authOptions);
  console.log("Session Data:", session); // Debugging log to check session data

  if (!session || !session.user || !session.user.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const userId = Number(session.user.id);
  if (isNaN(userId)) {
    return NextResponse.json({ message: "Invalid user ID" }, { status: 400 });
  }

  try {
    // Find the testimonial
    const existingTestimonial = await prisma.testimonial.findUnique({
      where: { id: testimonialId },
      select: {
        id: true,
        userId: true,
      },
    });

    if (!existingTestimonial) {
      return NextResponse.json({ message: "Testimonial not found" }, { status: 404 });
    }

    // Restrict update to the testimonial's owner
    if (existingTestimonial.userId !== userId) {
      return NextResponse.json({ message: "Forbidden: You can't edit this testimonial" }, { status: 403 });
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
        { message: "Validation error", details: validatedData.error.errors },
        { status: 400 }
      );
    }

    // Update testimonial
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


// export async function DELETE(req: Request) {
//   try {
//     // Extract ID from the request URL
//     const url = new URL(req.url);
//     const id = url.pathname.split("/").pop(); // Extracts ID from "/api/testimonials/{id}"

//     if (!id) {
//       return NextResponse.json({ error: "Testimonial ID is required" }, { status: 400 });
//     }

//     const numericId = parseInt(id, 10); // Convert to number

//     // Validate ID
//     if (isNaN(numericId)) {
//       return NextResponse.json({ error: "Invalid testimonial ID" }, { status: 400 });
//     }

//     // Check if the testimonial exists
//     const existingTestimonial = await prisma.testimonial.findUnique({ where: { id: numericId } });
//     if (!existingTestimonial) {
//       return NextResponse.json({ error: "Testimonial not found" }, { status: 404 });
//     }

//     // Delete testimonial
//     await prisma.testimonial.delete({ where: { id: numericId } });

//     return NextResponse.json({ message: "Testimonial deleted successfully" }, { status: 200 });
//   } catch (error) {
//     console.error("Error deleting testimonial:", error);
//     return NextResponse.json({ error: "Failed to delete testimonial" }, { status: 500 });
//   }
// }

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    // Extract testimonial ID from params
    const numericId = parseInt(params.id, 10);

    if (isNaN(numericId)) {
      return NextResponse.json({ error: "Invalid testimonial ID" }, { status: 400 });
    }

    // Authenticate user
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if the testimonial exists
    const existingTestimonial = await prisma.testimonial.findUnique({
      where: { id: numericId },
    });

    if (!existingTestimonial) {
      return NextResponse.json({ error: "Testimonial not found" }, { status: 404 });
    }

    // Check if the logged-in user is the owner of the testimonial
    if (existingTestimonial.userId !== parseInt(session.user.id, 10)) {
      return NextResponse.json({ error: "Forbidden: You can only delete your own testimonials" }, { status: 403 });
    }

    // Delete the testimonial
    await prisma.testimonial.delete({ where: { id: numericId } });

    return NextResponse.json({ message: "Testimonial deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting testimonial:", error);
    return NextResponse.json({ error: "Failed to delete testimonial" }, { status: 500 });
  }
}
