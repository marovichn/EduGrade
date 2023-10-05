import bcrypt from "bcrypt";

import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const {
    email,
    name,
    password,
    role,
    lastname,
    code,
    adress,
    biography,
    parentEmail,
    parentName,
    parentPhone,
    degrees,
    experience,
  } = await request.json();
  let user;
  const hashedPassword = await bcrypt.hash(password, 12);

  if (role === "Admin") {
    user = await prisma.admin.create({
      data: {
        email,
        name,
        role,
        hashedPassword,
        lastname,
        code,
      },
    });
  }

  if (role === "Student") {
    user = await prisma.student.create({
      data: {
        email,
        name,
        lastname,
        role,
        code,
        hashedPassword,
        adress,
        biography,
        parentEmail,
        parentName,
        parentPhone,
      },
    });
  }
  if (role === "Teacher") {
    user = await prisma.teacher.create({
      data: {
        email,
        code,
        name,
        lastname,
        role,
        hashedPassword,
        degrees,
        experience,
        biography,
      },
    });
  }

  return NextResponse.json(user);
}
