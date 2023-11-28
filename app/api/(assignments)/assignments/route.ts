import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
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

    let assignments = [];

    if (allMyGroups.length > 0) {
      assignments = allMyGroups.map((group) => group.assignments).flat();
    } else {
      const allMyGroupsStudent = await prisma.group.findMany({
        where: {
          studentId: currentUser.id,
        },
        include: {
          assignments: true,
        },
      });

      assignments = allMyGroupsStudent.map((group) => group.assignments).flat();
    }

    return NextResponse.json(assignments);
  } catch (error) {
    console.error("Error during prerendering:", error);
    return NextResponse.error();
  }
}
