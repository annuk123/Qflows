// import { NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";
// import { z } from "zod";

// // Enable CORS
// const corsHeaders = {
//   "Access-Control-Allow-Origin": "*",
//   "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
//   "Access-Control-Allow-Headers": "Content-Type",
// };

// // Zod schema to validate testimonial data
// const testimonialSchema = z.object({
//   userName: z.string().min(1, "Username is required"),
//   avatarUrl: z.string().optional(),
//   rating: z.number().min(0).max(5).default(0),
//   review: z.string().min(1, "Review is required"),
//   place: z.string().min(1, "Place is required"),
// });

// // Handle GET requests
// export async function GET() {
//   try {
//     const testimonials = await prisma.testimonial.findMany({
//       orderBy: { createdAt: "desc" },
//     });

//     return NextResponse.json(testimonials, { status: 200, headers: corsHeaders });
//   } catch (error) {
//     console.error("Error fetching testimonials:", error);
//     return NextResponse.json(
//       { error: "Failed to fetch testimonials" },
//       { status: 500, headers: corsHeaders }
//     );
//   }
// }

// // Handle CORS Preflight Requests
// export async function OPTIONS() {
//   return NextResponse.json({}, { status: 200, headers: corsHeaders });
// }

// // Handle POST requests
// export async function POST(req: Request) {
//   try {
//     // Check if the request has a body
//     if (!req.body) {
//       return NextResponse.json(
//         { error: "Request body is missing" },
//         { status: 400, headers: corsHeaders }
//       );
//     }

//     // Parse JSON request body
//     const body = await req.json();
//     console.log("Parsed body:", body);

//     // Validate input data
//     const parsedData = testimonialSchema.parse(body);

//     // Insert data into the database
//     const newTestimonial = await prisma.testimonial.create({
//       data: parsedData,
//     });

//     return NextResponse.json(newTestimonial, { status: 201, headers: corsHeaders });
//   } catch (error) {
//     console.error("Error adding testimonial:", error);

//     // Handle Prisma errors
//     if (error instanceof z.ZodError) {
//       return NextResponse.json(
//         { error: "Validation error", details: error.errors },
//         { status: 400, headers: corsHeaders }
//       );
//     }

//     return NextResponse.json(
//       { error: "Failed to add testimonial" },
//       { status: 500, headers: corsHeaders }
//     );
//   }
// }



import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

// Enable CORS
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

// Zod schema to validate testimonial data
const testimonialSchema = z.object({
  userId: z.union([z.string(), z.number()]), // Ensure userId is a valid UUID
  userName: z.string().min(1, "Username is required"),
  avatarUrl: z.string().optional(),
  rating: z.number().min(0).max(5).default(0),
  review: z.string().min(1, "Review is required"),
  place: z.string().min(1, "Place is required"),
});

// Handle GET requests
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

// Handle CORS Preflight Requests
export async function OPTIONS() {
  return NextResponse.json({}, { status: 200, headers: corsHeaders });
}

export async function POST(req: Request) {
  try {
    // Ensure request has a body
    if (!req.body) {
      return NextResponse.json(
        { error: "Request body is missing" },
        { status: 400, headers: corsHeaders }
      );
    }

    // Parse JSON request body
    const body = await req.json();
    console.log("Parsed body:", body);

    // Validate input data
    //const parsedData = testimonialSchema.parse(body);

    if (!body.userId) {
      return NextResponse.json(
        { error: "userId is required" },
        { status: 400, headers: corsHeaders }
      );
    }
    const parsedData = {
      ...testimonialSchema.parse(body),
      userId: Number(body.userId), // Convert string to number
    };
    // Insert data into the database
    const newTestimonial = await prisma.testimonial.create({
      data: {
        userId: parsedData.userId, // Ensure userId is included
        userName: parsedData.userName,
        avatarUrl: parsedData.avatarUrl,
        place: parsedData.place,
        rating: parsedData.rating,
        review: parsedData.review,
      },
    });

    return NextResponse.json(newTestimonial, { status: 201, headers: corsHeaders });
  } catch (error) {
    console.error("Error adding testimonial:", error);

    // Handle validation errors
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

//Delete testimonial

