import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
 import { authOptions } from "@/lib/authOptions";
 import { getServerSession } from "next-auth";

export async function POST(request: Request) {
  const {
    type,
    description,
    groupId,
    date,
    numberOfClasses: numberOfClassesString,
    subjectId,
  } = await request.json();

  const numberOfClasses = Number(numberOfClassesString);

  const createClasses = () => {
    let classes: string[] = Array(numberOfClasses).fill(subjectId);
    return classes;
  };

  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const currentUser = await getCurrentUser(session?.user?.email);;
  if (currentUser?.role !== "Teacher") {
    return new NextResponse("Anauthorized", { status: 401 });
  }

  const user = await prisma.attendance.create({
    data: {
      t: "Attendance",
      classes: createClasses(),
      type,
      description,
      groupId,
      date,
      numberOfClasses,
    },
  });

  return NextResponse.json(user);
}
