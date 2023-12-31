import bcrypt from "bcrypt";

import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function DELETE(request: Request) {
  const { role, id } = await request.json();
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const user = await getCurrentUser(session?.user?.email);

  if (user?.role !== "Admin") {
    return new NextResponse("Unauthorized", { status: 200 });
  }

  if (role === "Admin") {
    const admins = await prisma.admin.findMany();
    if (admins.length <= 1) {
      return new NextResponse("Can't delete last admin!", { status: 403 });
    }
    await prisma.admin.delete({ where: { id: id } });
  }

  if (role === "Student") {
    await prisma.student.delete({ where: { id: id } });
  }
  if (role === "Teacher") {
    await prisma.teacher.delete({ where: { id: id } });
  }
  if (role === "Subject") {
    await prisma.subject.delete({ where: { id: id } });
  }
  if (role === "Group") {
    await prisma.group.delete({ where: { id: id } });
  }

  return NextResponse.json("Success", { status: 200 });
}
