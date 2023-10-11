import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { eduConnectionAccessToken } = await request.json();
  if (!eduConnectionAccessToken) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  const accessTokenValidator = process.env.EDU_CONNECTION_ACCESS_KEY;
  if (eduConnectionAccessToken !== accessTokenValidator) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const teachersData = await prisma.teacher.findMany({});
  const studentsData = await prisma.student.findMany({});
  const adminsData = await prisma.admin.findMany({});

  const registryData = {
    teachersData: teachersData,
    studentsData: studentsData,
    adminsData: adminsData,
  };
  return NextResponse.json(registryData);
}
