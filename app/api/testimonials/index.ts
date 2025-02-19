// // File: /pages/api/testimonials.ts

// import { NextApiRequest, NextApiResponse } from "next";
// //import { prisma } from "../../lib/prisma"; // Ensure you have Prisma setup with a `lib/prisma.ts` file import { Prisma } from "@prisma/client";

// import { prisma } from '@/lib/prisma';

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method === "GET") {
//     try {
//       const testimonials = await prisma.testimonial.findMany({
//         orderBy: { createdAt: "desc" }, // Sort by newest first
//       });
//       res.status(200).json(testimonials);
//     } catch (error) {
//       console.error("Error fetching testimonials:", error);
//       res.status(500).json({ error: "Failed to fetch testimonials" });
//     }
//   } else {
//     res.setHeader("Allow", ["GET"]);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }


// File: /pages/api/testimonials.ts

// import { NextApiRequest, NextApiResponse } from "next";
// import { prisma } from "@/lib/prisma";
// import { Testimonial } from "@prisma/client";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<Testimonial[] | { error: string }>
// ) {
//   if (req.method === "GET") {
//     try {
//       const testimonials = await prisma.testimonial.findMany({
//         orderBy: { createdAt: "desc" }, // Sort by newest first
//       });
//       res.status(200).json(testimonials);
//     } catch (error: any) {
//       console.error("Error fetching testimonials:", error);
//       res
//         .status(500)
//         .json({ error: "An unexpected error occurred while fetching testimonials." });
//     }
//   } else {
//     res.setHeader("Allow", ["GET"]);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }


// import { NextApiRequest, NextApiResponse } from "next";
// import { prisma } from "@/lib/prisma";

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === "GET") {
//     console.log("GET request received");
//     try {
//       const testimonials = await prisma.testimonial.findMany({
//         orderBy: { createdAt: "desc" },
       
//       });

//       res.status(200).json(testimonials);
//     } catch (error) {
//       console.error("Error fetching testimonials:", error);
//       res.status(500).json({ error: "Failed to fetch testimonials" });
//     }
    
//   } else {
//     res.setHeader("Allow", ["GET"]);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }
