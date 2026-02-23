import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // 1. Database mein user ko dhoondo
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      return NextResponse.json({ error: "User nahi mila!" }, { status: 404 });
    }

    // 2. Password check karo (Database wala hashed password vs User wala plane password)
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json({ error: "Galat password!" }, { status: 401 });
    }

    // 3. Sab sahi hai
    return NextResponse.json({ message: "Login Successful" }, { status: 200 });

  } catch (error: any) {
    console.error("Login Error:", error);
    return NextResponse.json({ error: "Server mein kuch gadbad hai" }, { status: 500 });
  }
}