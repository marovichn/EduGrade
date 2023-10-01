import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET() {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    throw new NextResponse("Unauthorized", { status: 401 });
  }

  const allMyGroups = await prisma.group.findMany({
    where: {
      teacherId: currentUser.id,
    },
    include: { assignments: true },
  });
  if (allMyGroups.length === 0 || !allMyGroups) {
    const allMyGroupsStudent = await prisma.group.findMany({
      where: {
        studentId: currentUser.id,
      },
      include: {
        assignments: true,
      },
    });

    return NextResponse.json(
      allMyGroupsStudent.map((group) =>
        group.assignments.map((assignment) => assignment)
      )
    );
  }
  return NextResponse.json( allMyGroups.map((group) =>
      group.assignments.map((assignment) => assignment)
    ));
}
