import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { Assignment } from "@prisma/client";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
 

export async function POST(req: Request) {
  const { assignments } = await req.json();
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const currentUser = await getCurrentUser(session?.user?.email);;
  if (!currentUser) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  if (!assignments) {
    return new NextResponse("Invalid payload", { status: 400 });
  }
  assignments.forEach(async (assignment: Assignment) => {
    if (!assignment) {
      return new NextResponse("Invalid payload", { status: 400 });
    }
    if (!assignment.dateDue) {
      return NextResponse.json(false);
    }
    const currentDate = new Date();
    const isMissing =
      assignment?.dateDue && currentDate > new Date(assignment.dateDue);

    const updated = await prisma.assignment.update({
      where: {
        id: assignment.id,
      },
      data: {
        isMissing: isMissing,
      },
    });
  });

  return NextResponse.json("Updated successfully", { status: 200 });
}
