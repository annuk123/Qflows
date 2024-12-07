import { prisma } from "@/lib/prisma"; // Adjust the path to your Prisma client
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validate required fields
    if (!body.email || !body.password || !body.username) {
      return NextResponse.json(
        { error: "Missing required fields (email, password, username)" },
        { status: 400 }
      );
    }

    const { email, password, username } = body;

    // Check if the email already exists
    const existingEmail = await prisma.user.findUnique({
      where: { email },
    });

    if (existingEmail) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 400 }
      );
    }

    // Check if the username already exists
    const existingUsername = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUsername) {
      return NextResponse.json(
        { error: "Username already exists" },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await hash(password, 10);

    // Create the new user in the database
    const newUser = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
      },
    });

    return NextResponse.json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Error during signup:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

