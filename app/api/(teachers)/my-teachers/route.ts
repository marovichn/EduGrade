import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return new NextResponse("Anauthorized", { status: 401 });
  }

  const { teacherId } = await request.json();

  const teacher = await prisma.teacher.findMany({ where: { id: teacherId } });

  return NextResponse.json(teacher);
}
