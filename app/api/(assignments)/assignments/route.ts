import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export async function GET(request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    throw new NextResponse("Unauthorized", { status: 401 });
  }

  const allMyGroups = await prisma.group.findMany({
    where: {
      studentId: currentUser.id,
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

    let assignments = allMyGroupsStudent
      .map((group) => group.assignments)
      .flat();

    return NextResponse.json(assignments);
  }
  const assignments = allMyGroups.map((group) => group.assignments).flat();
  return NextResponse.json(assignments);
}
