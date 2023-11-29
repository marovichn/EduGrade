import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const currentUser = await getCurrentUser();
  if (currentUser?.role !== "Admin") {
    return new NextResponse("Anauthorized", { status: 401 });
  }

  const groups = await prisma.group.findMany({
    include: {
      student: true,
      subject: true,
      teacher: true,
      attendances: true,
      results: true,
      activityGrades: true,
    },
  });

  if (!groups) {
    throw new NextResponse("Something went wrong", { status: 400 });
  }
  return NextResponse.json(groups);
}
