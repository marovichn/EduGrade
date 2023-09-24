import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const {
      name,
      description,
      ends,
      teacher: teacherId,
      student: studentId,
      subject: subjectId,
    } = await request.json();

    const data = {
        name,
        description,
        ends: new Date(ends),
        teacherId,
        studentId,
        subjectId,
    }

    const group = await prisma.group.create({
      data
    });

    return NextResponse.json(group);
  } catch (err) {
    console.log(err);
  }
}
