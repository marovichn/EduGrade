import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const currentUser =await getCurrentUser();
  if(currentUser?.role !== "Admin"){
    return new NextResponse("Anauthorized", { status: 401 });
  }
  
  const admins = await prisma.admin.findMany();

  if (!admins) {
    return new NextResponse("Something went wrong", { status: 400 });
  }
  return NextResponse.json(admins);
}
