import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
 

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const currentUser = await getCurrentUser(session?.user?.email);;
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
