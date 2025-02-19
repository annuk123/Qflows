// import { NextApiRequest, NextApiResponse } from "next";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method === "POST") {
//     const { userName, avatarUrl, rating, review } = req.body;

//     // Runtime validation for the rating field
//     if (typeof rating !== "number" || rating < 1 || rating > 5) {
//       return res.status(400).json({ error: "Rating must be between 1 and 5" });
//     }

//     if (!userName || !review) {
//       return res.status(400).json({ error: "Missing required fields" });
//     }

//     try {
//       const newTestimonial = await prisma.testimonial.create({
//         data: {
//           userName,
//           avatarUrl: avatarUrl || "https://via.placeholder.com/150",
//           rating,
//           review,
//         },
//       });

//       res.status(201).json(newTestimonial);
//     } catch (error) {
//       console.error("Error adding testimonial:", error);
//       res.status(500).json({ error: "Failed to add testimonial" });
//     }
//   } else {
//     res.setHeader("Allow", ["POST"]);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }




// import { NextApiRequest, NextApiResponse } from "next";
// import { PrismaClient } from "@prisma/client";
// import { z } from "zod";

// const prisma = (global as typeof global & { prisma?: PrismaClient }).prisma || new PrismaClient();
// if (process.env.NODE_ENV !== "production") (global as typeof global & { prisma?: PrismaClient }).prisma = prisma;

// const TestimonialSchema = z.object({
//   userName: z.string().min(1, "User name is required"),
//   avatarUrl: z.string().url().optional(),
//   rating: z.number().min(1).max(5),
//   review: z.string().min(1, "Review is required"),
// });

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method === "POST") {
//     const parsedBody = TestimonialSchema.safeParse(req.body);

//     if (!parsedBody.success) {
//       return res.status(400).json({ error: parsedBody.error.errors });
//     }

//     const { userName, avatarUrl, rating, review } = parsedBody.data;

//     try {
//       const newTestimonial = await prisma.testimonial.create({
//         data: {
//           userName,
//           avatarUrl: avatarUrl || "https://via.placeholder.com/150",
//           rating,
//           review,
//         },
//       });

//       res.status(201).json(newTestimonial);
//     } catch (error: any) {
//       if (error.code === "P2002") {
//         return res.status(409).json({ error: "Duplicate entry" });
//       }
//       console.error("Error adding testimonial:", error);
//       res.status(500).json({ error: "An unexpected error occurred" });
//     }
//   } else {
//     res.setHeader("Allow", ["POST"]);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }
