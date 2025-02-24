import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

// ✅ CORS Headers (Allows any frontend to call this API)
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

// ✅ Zod schema to validate testimonial data
const testimonialSchema = z.object({
  userName: z.string().min(1, "Username is required"),
  avatarUrl: z.string().optional(),
  rating: z.number().min(0).max(5),
  review: z.string().min(1, "Review is required"),
  place: z.string().min(1, "Place is required"),
});

// ✅ Handle GET requests (Fetch all testimonials)
export async function GET() {
  try {
    const testimonials = await prisma.testimonial.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(testimonials, { status: 200, headers: corsHeaders });
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return NextResponse.json(
      { error: "Failed to fetch testimonials" },
      { status: 500, headers: corsHeaders }
    );
  }
}

// ✅ Handle CORS Preflight Requests
export async function OPTIONS() {
  return NextResponse.json({}, { status: 200, headers: corsHeaders });
}

// ✅ Handle POST requests (Add a new testimonial)
export async function POST(req: Request) {
  try {
    // Ensure request has a valid JSON body
    const body = await req.json();
    console.log("Parsed body:", body);

    // Validate input data
    const parsedData = testimonialSchema.parse(body);

    // ✅ Insert new testimonial into database
    const newTestimonial = await prisma.testimonial.create({
      data: parsedData, // ✅ No need to process userId anymore
    });
    

    return NextResponse.json(newTestimonial, { status: 201, headers: corsHeaders });
  } catch (error) {
    console.error("Error adding testimonial:", error);

    // Handle validation errors (Zod validation failed)
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation error", details: error.errors },
        { status: 400, headers: corsHeaders }
      );
    }

    return NextResponse.json(
      { error: "Failed to add testimonial" },
      { status: 500, headers: corsHeaders }
    );
  }
}
