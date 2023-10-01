import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const {
    type,
    description,
    groupId,
    date: dateDue,
    points,
    done: doneJSON,
  } = await request.json();

  const currentUser = await getCurrentUser();
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
  console.log({
    type,
    description,
    groupId,
    dateDue,
  });

  const user = await prisma.assignment.create({
    data: {
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
