/* import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return new NextResponse("Anauthorized", { status: 401 });
  }

  const { user } = await request.json();
  const groups = await prisma.group.findMany({
    where: { studentId: user.id },
    include: { teacher: true, subject: true },
  });
  const teacherIds = groups.map((group) => group.teacherId);

  const teachersSet = new Set<string | null>(teacherIds);
  //@ts-ignore
  const teachersIdsSetted = [...teachersSet];

  const teachers = teachersIdsSetted.map((teacherId) => {
    const get = async () => {
      return await prisma.teacher.findMany({ where: { id: teacherId } });
    };
    get();
  });
  console.log("teachers", teachers);

  if (!teachers) {
    throw new NextResponse("Something went wrong", { status: 400 });
  }
  return NextResponse.json(teachers);
}
 */