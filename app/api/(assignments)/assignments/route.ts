import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
 
export async function GET(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const currentUser = await getCurrentUser(session?.user?.email);;
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
