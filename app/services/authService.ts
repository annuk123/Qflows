import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs"; // Optional: Use bcrypt to hash and compare passwords

const prisma = new PrismaClient();

export const verifyCredentials = async (email: string, password: string) => {
  try {
    // Find the user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error("User not found");
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (isPasswordValid) {
      return { id: user.id.toString(), email: user.email }; // Return user data on successful login
    } else {
      throw new Error("Invalid password");
    }
  } catch (error) {
    console.error(error);
    return null; // Return null if login fails
  } finally {
    await prisma.$disconnect();
  }
};
