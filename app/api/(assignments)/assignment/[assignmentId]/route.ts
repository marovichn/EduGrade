import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: Request, context: any) {
  const assignmentId = context.params.assignmentId;
  const { done } = await req.json();
  const currentUser = await getCurrentUser();
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
  const currentUser = await getCurrentUser();
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
