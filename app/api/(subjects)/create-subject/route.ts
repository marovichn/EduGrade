
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
 import { authOptions } from "@/lib/authOptions";
 import { getServerSession } from "next-auth";
export async function POST(request: Request) {
  const { name, description, color } = await request.json();
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const currentUser = await getCurrentUser(session?.user?.email);;
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
