import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { Student } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  const { studentId } = await request.json();

  if (currentUser?.role !== "Teacher") {
    return new NextResponse("Anauthorized", { status: 401 });
  }

  const student = await prisma.student.findMany({
    where: { id: studentId },
  });

  if (!student) {
    throw new NextResponse("Something went wrong", { status: 400 });
  }
  return NextResponse.json(student);
}
