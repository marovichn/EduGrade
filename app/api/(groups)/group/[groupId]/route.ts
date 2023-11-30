import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
 

export async function GET(request: Request, context: any) {
  try {
    const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const currentUser = await getCurrentUser(session?.user?.email);;

    if (!currentUser) {
      return new NextResponse("Anauthorized", { status: 401 });
    }
    const { groupId } = context.params;

    const groups = await prisma.group.findMany({
      where: { id: groupId },
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
  } catch (err: any) {
    console.log("SPECIFIC_GROUP_ID", err.message);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
