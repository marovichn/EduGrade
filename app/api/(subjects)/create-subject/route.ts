
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export async function POST(request: Request) {
  const { name, description, color } = await request.json();
  const currentUser = await getCurrentUser();
  if (currentUser?.role !== "Admin") {
    return new NextResponse("Anauthorized", { status: 401 });
  }

   const user = await prisma.subject.create({
      data: {
        name,
        description,
        color
      },
    });

  return NextResponse.json(user);
}
