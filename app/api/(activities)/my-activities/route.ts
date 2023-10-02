import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  const { groupId } = await request.json();

  if (!currentUser) {
    return new NextResponse("Anauthorized", { status: 401 });
  }

  const activities = await prisma.activity.findMany({
    where: { groupId: groupId },
  });

  if (!activities) {
    throw new NextResponse("Something went wrong", { status: 400 });
  }
  return NextResponse.json(activities);
}
