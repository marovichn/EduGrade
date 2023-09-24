import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const subjects = await prisma.subject.findMany();

  if (!subjects) {
    throw new NextResponse("Something went wrong", { status: 400 });
  }
  return NextResponse.json(subjects);
}
