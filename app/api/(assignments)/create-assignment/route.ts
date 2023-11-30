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
    date: dateDue,
    points,
    done: doneJSON,
  } = await request.json();

  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const currentUser = await getCurrentUser(session?.user?.email);;
  if (currentUser?.role !== "Teacher") {
    return new NextResponse("Anauthorized", { status: 401 });
  }
  let done;

  if (doneJSON === "true") {
    done = true;
  } else if (doneJSON === "false") {
    done = false;
  } else {
    return new NextResponse("Invalid Input", { status: 400 });
  }

  const user = await prisma.assignment.create({
    data: {
      t: "Assignment",
      type,
      description,
      groupId,
      dateDue,
      points,
      done,
    },
  });

  return NextResponse.json(user);
}
