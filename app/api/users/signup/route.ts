
// import { NextApiRequest, NextApiResponse } from 'next';
// import { hash } from 'bcryptjs';
// import { prisma } from '@/lib/prisma'; // Adjust the import based on your file structure

// export default async function signup(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ error: 'Method not allowed' });
//   }

//   const { email, password, username } = req.body;

//   // Input validation
//   if (!email || !password || !username) {
//     return res.status(400).json({ error: 'All fields are required' });
//   }

//   if (password.length < 8) {
//     return res
//       .status(400)
//       .json({ error: 'Password must be at least 8 characters long' });
//   }

//   try {
//     // Check if user already exists
//     const existingUser = await prisma.user.findUnique({
//       where: { email },
//     });

//     if (existingUser) {
//       return res.status(400).json({ error: 'User already exists' });
//     }

//     // Hash the password
//     const hashedPassword = await hash(password, 10);

//     // Create the user
//     const user = await prisma.user.create({
//       data: {
//         email,
//         password: hashedPassword,
//         username,
//       },
//     });

//     // Send success response (omit sensitive data like password)
//     res.status(201).json({ message: 'User created successfully', user: { id: user.id, email: user.email, username: user.username } });
//   } catch (error) {
//     console.error('Signup error:', error);
//     res.status(500).json({ error: 'An internal server error occurred' });
//   }
// }



// // File: /app/api/auth/signup.ts
// import { NextApiRequest, NextApiResponse } from "next";
// import { hash } from "bcryptjs";
// import { prisma } from "@/lib/prisma";

// export default async function signup(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ error: "Method not allowed" });
//   }

//   const { email, password, username } = req.body;

//   try {
//     const existingUser = await prisma.user.findUnique({ where: { email } });
//     if (existingUser) {
//       return res.status(400).json({ error: "User already exists" });
//     }

//     const hashedPassword = await hash(password, 10);

//     const user = await prisma.user.create({
//       data: { email, password: hashedPassword, username },
//     });

//     res.status(201).json({ message: "User created successfully", user });
//   } catch (error) {
//     res.status(500).json({ error: "Internal server error" });
//   }
// }


import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { prisma } from "@/lib/prisma"; // Adjust based on your Prisma client location

export async function POST(req: Request) {
  try {
    const { email, password, username } = await req.json();

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }
    console.log("API route loaded!");

    // Hash the password
    const hashedPassword = await hash(password, 10);

    // Create a new user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        username,
      },
    });

    return NextResponse.json(
      { message: "User created successfully", user },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
