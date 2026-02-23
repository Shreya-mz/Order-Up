import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Ab ye line kaam karegi!

export async function GET() {
  try {
    const campuses = await prisma.campus.findMany({
      include: {
        foodCourts: true,
      },
      orderBy: {
        campusNumber: 'asc',
      },
    });
    return NextResponse.json(campuses);
  } catch (error) {
    console.error("Fetch Campuses Error:", error);
    return NextResponse.json({ error: "Failed to fetch campuses" }, { status: 500 });
  }
}