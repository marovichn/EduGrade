import prisma from "@/app/libs/prismadb";
import getSession from "./getSession";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

const getCurrentUser = async () => {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return null;
    }

    const currentAdmin = await prisma.admin.findUnique({
      where: {
        email: session.user.email as string,
      },
    });

    if (currentAdmin) {
      return currentAdmin;
    }

    const currentStudent = await prisma.student.findUnique({
      where: {
        email: session.user.email as string,
      },
      include: {
        groups: true,
      },
    });

    if (currentStudent) {
      return currentStudent;
    }

    const currentTeacher = await prisma.teacher.findUnique({
      where: {
        email: session.user.email as string,
      },
      include: {
        groups: true,
      },
    });

    if (currentTeacher) {
      return currentTeacher;
    }

    return null;
  } catch (error) {
    console.error("Error in getCurrentUser:", error);
    throw error; // Rethrow the error to propagate it further
  }
};

export default getCurrentUser;
