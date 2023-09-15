import bcrypt from "bcrypt";

import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email, name, password, role } = await request.json();
  let user;
  const hashedPassword = await bcrypt.hash(password, 12);

  if (role === "Admin") {
    user = await prisma.admin.create({
      data: {
        email,
        name,
        role,
        hashedPassword,
      },
    });
  }

  if (role === "Student") {
    user = await prisma.student.create({
      data: {
        email,
        name,
        role,
        hashedPassword,
      },
    });
  }
  if (role === "Teacher") {
    user = await prisma.teacher.create({
      data: {
        email,
        name,
        role,
        hashedPassword,
      },
    });
  }

  return NextResponse.json(user);
}
