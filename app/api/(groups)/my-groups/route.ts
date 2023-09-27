import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  const { user } = await request.json();

  if (currentUser?.role !== "Teacher") {
    return new NextResponse("Anauthorized", { status: 401 });
  }

  const groups = await prisma.group.findMany({
    where: { teacherId: user?.id },
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
