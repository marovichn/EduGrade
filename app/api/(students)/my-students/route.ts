import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { Student } from "@prisma/client";
import { NextResponse } from "next/server";
 import { authOptions } from "@/lib/authOptions";
 import { getServerSession } from "next-auth";
export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const currentUser = await getCurrentUser(session?.user?.email);;
  const { studentId } = await request.json();

  if (!currentUser) {
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
