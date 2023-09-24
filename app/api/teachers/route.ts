import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const teachers = await prisma.teacher.findMany();

  if (!teachers) {
    throw new NextResponse("Something went wrong", { status: 400 });
  }
  return NextResponse.json(teachers);
}
