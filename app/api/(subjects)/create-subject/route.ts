
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { name, description, color } = await request.json();

   const user = await prisma.subject.create({
      data: {
        name,
        description,
        color
      },
    });

  return NextResponse.json(user);
}
