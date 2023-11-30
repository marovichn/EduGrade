import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request, context: any) {
  const assignmentId = context.params.assignmentId;
  const { done } = await req.json();
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const currentUser = await getCurrentUser(session?.user?.email);
  if (!currentUser) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  if (!assignmentId) {
    return new NextResponse("Invalid route, no id", { status: 400 });
  }

  await prisma.assignment.update({
    where: {
      id: assignmentId,
    },
    data: {
      done,
    },
  });

  return NextResponse.json("Updated successfully", { status: 200 });
}
export async function DELETE(req: Request, context: any) {
  const assignmentId = context.params.assignmentId;
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const currentUser = await getCurrentUser(session?.user?.email);
  if (!currentUser) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  if (!assignmentId) {
    return new NextResponse("Invalid route, no id", { status: 400 });
  }

  await prisma.assignment.delete({
    where: {
      id: assignmentId,
    },
  });

  return NextResponse.json("Deleted successfully", { status: 200 });
}
