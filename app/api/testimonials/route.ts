// import { NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";
// import { z } from "zod";
// import { NextRequest } from "next/server";

// // ✅ CORS Headers (Allows any frontend to call this API)
// const corsHeaders = {
//   "Access-Control-Allow-Origin": "*",
//   "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
//   "Access-Control-Allow-Headers": "Content-Type",
// };

// interface MiddlewareRequest extends NextRequest {}
// interface MiddlewareResponse extends NextResponse {}

// export function middleware(req: MiddlewareRequest): MiddlewareResponse {
//   const res = NextResponse.next();
//   res.headers.set("Access-Control-Allow-Origin", "*");
//   res.headers.set("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT, OPTIONS");
//   return res;
// }

// // ✅ Zod schema to validate testimonial data
// const testimonialSchema = z.object({
//   userName: z.string().min(1, "Username is required"),
//   avatarUrl: z.string().optional(),
//   rating: z.number().min(0).max(5),
//   review: z.string().min(1, "Review is required"),
//   place: z.string().min(1, "Place is required"),
// });

// // ✅ Handle GET requests (Fetch all testimonials)
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

// // ✅ Handle CORS Preflight Requests
// export async function OPTIONS() {
//   return NextResponse.json({}, { status: 200, headers: corsHeaders });
// }

// // ✅ Handle POST requests (Add a new testimonial)
// export async function POST(req: Request) {
//   try {
//     // Ensure request has a valid JSON body
//     const body = await req.json();
//     console.log("Parsed body:", body);

//     // Validate input data
//     const parsedData = testimonialSchema.parse(body);

//     // ✅ Insert new testimonial into database
//     const newTestimonial = await prisma.testimonial.create({
//       data: parsedData, // ✅ No need to process userId anymore
//     });
    

//     return NextResponse.json(newTestimonial, { status: 201, headers: corsHeaders });
//   } catch (error) {
//     console.error("Error adding testimonial:", error);

//     // Handle validation errors (Zod validation failed)
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

// ✅ CORS Headers (Handled globally in `middleware.ts`)
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

// ✅ Zod schema for validation
const testimonialSchema = z.object({
  id: z.string().optional(),
  userName: z.string().min(1, "Username is required"),
  avatarUrl: z.string().optional(),
  rating: z.number().min(0).max(5),
  review: z.string().min(1, "Review is required"),
  place: z.string().min(1, "Place is required"),
});

// ✅ Handle GET (Fetch all testimonials)
export async function GET() {
  try {
    const testimonials = await prisma.testimonial.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json(testimonials, { status: 200, headers: corsHeaders });
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return NextResponse.json({ error: "Failed to fetch testimonials" }, { status: 500, headers: corsHeaders });
  }
}

// ✅ Handle CORS Preflight Requests
export async function OPTIONS() {
  return NextResponse.json({}, { status: 200, headers: corsHeaders });
}

// ✅ Handle POST (Add a new testimonial)
export async function POST(req: Request) {
  try {
    const body = JSON.parse(await req.text()); // Ensure correct parsing
    const parsedData = testimonialSchema.parse(body);

    const { id, ...createData } = parsedData;
    const newTestimonial = await prisma.testimonial.create({ data: createData });
    return NextResponse.json(newTestimonial, { status: 201, headers: corsHeaders });
  } catch (error) {
    console.error("Error adding testimonial:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation error", details: error.errors }, { status: 400, headers: corsHeaders });
    }
    return NextResponse.json({ error: "Failed to add testimonial" }, { status: 500, headers: corsHeaders });
  }
}

// ✅ Handle DELETE (Remove a testimonial)
export async function DELETE(req: Request) {
  try {
    const { id } = JSON.parse(await req.text());
    await prisma.testimonial.delete({ where: { id } });

    return NextResponse.json({ message: "Deleted successfully" }, { status: 200, headers: corsHeaders });
  } catch (error) {
    console.error("Error deleting testimonial:", error);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500, headers: corsHeaders });
  }
}

// ✅ Handle PUT (Update a testimonial)
export async function PUT(req: Request) {
  try {
    const body = JSON.parse(await req.text());
    const { id, ...updateData } = testimonialSchema.partial().parse(body);

    const updatedTestimonial = await prisma.testimonial.update({ where: { id: Number(id) }, data: updateData });
    return NextResponse.json(updatedTestimonial, { status: 200, headers: corsHeaders });
  } catch (error) {
    console.error("Error updating testimonial:", error);
    return NextResponse.json({ error: "Failed to update" }, { status: 500, headers: corsHeaders });
  }
}
