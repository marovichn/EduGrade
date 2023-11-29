import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";


export const dynamic = "force-dynamic";
export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  const { adminId } = await request.json();

  if (!currentUser) {
    return new NextResponse("Anauthorized", { status: 401 });
  }

  const admin = await prisma.admin.findMany({
    where: { id: adminId },
  });

  if (!admin) {
    throw new NextResponse("Something went wrong", { status: 400 });
  }
  return NextResponse.json(admin);
}
