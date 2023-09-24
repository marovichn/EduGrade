import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const admins = await prisma.admin.findMany();

  if (!admins) {
    throw new NextResponse("Something went wrong", { status: 400 });
  }
  return NextResponse.json(admins);
}
