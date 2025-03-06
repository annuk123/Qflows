import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

// ✅ CORS Headers Middleware
const corsHeaders = new Headers({
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
});

// ✅ Zod schema for validation
const testimonialSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  userName: z.string().min(1, "Username is required"),
  avatarUrl: z.string().optional(),
  rating: z.number().min(0).max(5),
  review: z.string().min(1, "Review is required"),
  place: z.string().min(1, "Place is required"),
});

const updateTestimonialSchema = testimonialSchema.partial().extend({
  id: z.string().min(1, "ID is required"),
});

// ✅ Handle CORS Preflight Requests
export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders });
}

// ✅ Handle GET (Fetch all testimonials)
export async function GET() {
  try {
    const testimonials = await prisma.testimonial.findMany({
      orderBy: { createdAt: "desc" },
    });

    return new Response(JSON.stringify(testimonials), { status: 200, headers: corsHeaders });
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch testimonials" }), {
      status: 500,
      headers: corsHeaders,
    });
  }
}

// ✅ Handle POST (Add a new testimonial)
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsedData = testimonialSchema.parse(body);

    const newTestimonial = await prisma.testimonial.create({
      data: parsedData, // userId is now always included
    });

    return new Response(JSON.stringify(newTestimonial), { status: 201, headers: corsHeaders });
  } catch (error) {
    console.error("Error adding testimonial:", error);
    return new Response(
      JSON.stringify(
        error instanceof z.ZodError
          ? { error: "Validation error", details: error.errors }
          : { error: "Failed to add testimonial" }
      ),
      { status: error instanceof z.ZodError ? 400 : 500, headers: corsHeaders }
    );
  }
}



// ✅ Handle DELETE (Remove a testimonial)
export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    let id = url.searchParams.get("id");

    // Some clients send DELETE requests with JSON bodies instead of query parameters
    if (!id) {
      const body = await req.json().catch(() => null); // Avoid error if no JSON body
      id = body?.id;
    }

    if (!id) {
      return new Response(JSON.stringify({ error: "Missing testimonial ID" }), {
        status: 400,
        headers: corsHeaders,
      });
    }

    await prisma.testimonial.delete({ where: { id } });

    return new Response(JSON.stringify({ message: "Deleted successfully" }), {
      status: 200,
      headers: corsHeaders,
    });
  } catch (error) {
    console.error("Error deleting testimonial:", error);
    return new Response(JSON.stringify({ error: "Failed to delete" }), {
      status: 500,
      headers: corsHeaders,
    });
  }
}

// ✅ Handle PATCH (Update a testimonial - Partial Update)
export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const parsedData = updateTestimonialSchema.parse(body);
    
    const { id, ...updateData } = parsedData; // No need to check for userId, as it's required in schema

    const updatedTestimonial = await prisma.testimonial.update({
      where: { id },
      data: updateData,
    });

    return new Response(JSON.stringify(updatedTestimonial), { status: 200, headers: corsHeaders });
  } catch (error) {
    console.error("Error updating testimonial:", error);
    return new Response(JSON.stringify({ error: "Failed to update" }), {
      status: 500,
      headers: corsHeaders,
    });
  }
}

