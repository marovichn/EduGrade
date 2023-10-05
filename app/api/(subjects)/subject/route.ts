import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  const { subjectId } = await request.json();

  if (!currentUser) {
    return new NextResponse("Anauthorized", { status: 401 });
  }

  const subject = await prisma.subject.findMany({
    where: { id: subjectId },
  });

  if (!subject) {
    throw new NextResponse("Something went wrong", { status: 400 });
  }
  return NextResponse.json(subject);
}
