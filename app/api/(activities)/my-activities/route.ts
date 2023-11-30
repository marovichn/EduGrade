import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const currentUser = await getCurrentUser(session?.user?.email);
  const { groupId } = await request.json();

  if (!currentUser) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const activities = await prisma.activity.findMany({
    where: { groupId: groupId },
  });

  if (!activities) {
    throw new NextResponse("Something went wrong", { status: 400 });
  }
  return NextResponse.json(activities);
}
