import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { value, type, description, groupId } = await request.json();
  console.log({ value, type, description, groupId });

  const currentUser = await getCurrentUser();
  if (currentUser?.role !== "Teacher") {
    return new NextResponse("Anauthorized", { status: 401 });
  }

  const user = await prisma.result.create({
    data: {
      t: "Result",
      type,
      value,
      description,
      groupId,
    },
  });

  return NextResponse.json(user);
}
