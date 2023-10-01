import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET() {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    throw new NextResponse("Unauthorized", { status: 401 });
  }

  const assignments = await prisma.assignment.findMany({});

  return NextResponse.json(assignments);
}
