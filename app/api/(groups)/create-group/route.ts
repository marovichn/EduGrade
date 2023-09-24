import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    if (currentUser?.role !== "Admin") {
      return new NextResponse("Anauthorized", { status: 401 });
    }
    const {
      name,
      description,
      time,
      date,
      teacher: teacherId,
      student: studentId,
      subject: subjectId,
    } = await request.json();

    const data = {
      name,
      description,
      ends: new Date(date + " " + time),
      teacherId,
      studentId,
      subjectId,
    };

    const group = await prisma.group.create({
      data,
    });

    return NextResponse.json(group);
  } catch (err) {
    console.log(err);
  }
}
