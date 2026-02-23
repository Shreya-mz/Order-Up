import { PrismaClient } from "@prisma/client"; // Machine ko import kiya
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

// Machine ka ek instance banaya (Isey hi hum 'client' bolte hain)
const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password, phone } = body;

    // Security ke liye password hide karna zaroori hai
    const hashedPassword = await bcrypt.hash(password, 10);

    // Database mein entry karne ki command
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phone,
        role: "student"
      },
    });

    return NextResponse.json({ message: "Success! Account ban gaya." }, { status: 201 });
  } catch (error: any) {
    console.error("Signup error:", error);
    return NextResponse.json({ error: "Email already exists or DB Error" }, { status: 500 });
  }
}