import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const students = await prisma.student.findMany();

  if (!students) {
    throw new NextResponse("Something went wrong", { status: 400 });
  }
  return NextResponse.json(students);
}
