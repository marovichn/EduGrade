import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const groups = await prisma.group.findMany({
    include: {
      student: true,
      subject: true,
      teacher: true,
    },
  });

  if (!groups) {
    throw new NextResponse("Something went wrong", { status: 400 });
  }
  return NextResponse.json(groups);
}
