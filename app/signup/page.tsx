import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    // 1. Validation
    if (!name || !email || !password) {
      return NextResponse.json({ message: "Fields missing hain!" }, { status: 400 });
    }

    // 2. Duplicate Check
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      console.log("❌ User pehle se exists karta hai:", email);
      return NextResponse.json({ message: "Email pehle se register hai!" }, { status: 400 });
    }

    // 3. Create User (Password ko plain text rakh rahe hain testing ke liye)
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password, 
      },
    });

    console.log("✅ Naya User Created:", user.email);
    return NextResponse.json({ message: "User ban gaya!", userId: user.id }, { status: 201 });

  } catch (error: any) {
    console.error("❌ Signup Error:", error);
    return NextResponse.json({ message: "Server error", error: error.message }, { status: 500 });
  }
}