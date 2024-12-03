import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Adjust based on your Prisma client location

// Handling different methods (GET, POST, PUT, DELETE) for users.
export async function GET(req: Request) {
  try {
    // Fetching all users (this can be adjusted to meet your needs)
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: 'Unable to fetch users' }, { status: 500 });
  }
}

// For handling updating user data (e.g., username, email, etc.)
export async function PUT(req: Request) {
  try {
    const { id, email, username } = await req.json();

    // Updating a user with the provided id
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { email, username },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json({ error: 'Unable to update user' }, { status: 500 });
  }
}

// For handling user deletion
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    // Deleting a user with the provided id
    await prisma.user.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Unable to delete user' }, { status: 500 });
  }
}
