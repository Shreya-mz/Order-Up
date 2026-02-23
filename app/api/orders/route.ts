import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Ab ye sahi link ho jayega

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    const order = await prisma.order.create({
      data: {
        userId: body.userId,
        fcId: body.fcId,
        totalAmount: body.totalAmount,
        status: "PREPARING",
        items: body.items, 
      },
    });

    return NextResponse.json(order);
  } catch (error) {
    console.error("Order API Error:", error);
    return NextResponse.json({ error: "Order failed" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "User ID missing" }, { status: 400 });
  }

  try {
    const orders = await prisma.order.findMany({
      where: { userId: userId },
      include: { foodCourt: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ error: "History fetch failed" }, { status: 500 });
  }
}