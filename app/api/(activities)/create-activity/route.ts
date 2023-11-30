import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { value, type, description, groupId } = await request.json();

  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const currentUser = await getCurrentUser(session?.user?.email);
  if (currentUser?.role !== "Teacher") {
    return new NextResponse("Anauthorized", { status: 401 });
  }

  const user = await prisma.activity.create({
    data: {
      t: "Activity",
      type,
      value,
      description,
      groupId,
    },
  });

  return NextResponse.json(user);
}
