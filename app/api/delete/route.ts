import bcrypt from "bcrypt";

import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function DELETE(request: Request) {
  const { role, id } = await request.json();
  const user = await getCurrentUser();

  if (user?.role !== "Admin") {
    return new NextResponse("Unauthorized", { status: 200 });
  }

  if (role === "Admin") {
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
