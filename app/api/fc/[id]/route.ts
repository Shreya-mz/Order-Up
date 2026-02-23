import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> } // Type ko Promise banao
) {
  try {
    const { id } = await params; // Yahan await lagana zaroori hai

    const fc = await prisma.foodCourt.findUnique({
      where: { id: id },
      include: {
        menuItems: true,
        campus: true,
      },
    });

    if (!fc) return NextResponse.json({ error: "FC not found" }, { status: 404 });

    return NextResponse.json(fc);
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}