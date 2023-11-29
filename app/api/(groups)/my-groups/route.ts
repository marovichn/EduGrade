import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  const { user } = await request.json();

  if (!currentUser) {
    return new NextResponse("Anauthorized", { status: 401 });
  }
  if (currentUser?.role === "Teacher") {
    const groups = await prisma.group.findMany({
      where: { teacherId: user?.id },
      include: {
        student: true,
        subject: true,
        teacher: true,
        assignments: true,
        activityGrades: true,
        attendances: true,
        results: true,
      },
    });

    if (!groups) {
      throw new NextResponse("Something went wrong", { status: 400 });
    }
    return NextResponse.json(groups);
  } else if (currentUser?.role === "Student") {
    const groups = await prisma.group.findMany({
      where: { studentId: user?.id },
      include: {
        student: true,
        subject: true,
        teacher: true,
        assignments: true,
        activityGrades: true,
        attendances: true,
        results: true,
      },
    });

    if (!groups) {
      throw new NextResponse("Something went wrong", { status: 400 });
    }
    return NextResponse.json(groups);
  } else {
    return new NextResponse("Unauthorized", { status: 401 });
  }
}
