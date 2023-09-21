import prisma from "@/app/libs/prismadb";
import getSession from "./getSession";

const getCurrentUser = async () => {
  try {
    const session = await getSession();

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
    });

    if (currentStudent) {
      return currentStudent;
    }

    const currentTeacher = await prisma.teacher.findUnique({
      where: {
        email: session.user.email as string,
      },
    });

    if (currentTeacher) {
      return currentTeacher;
    }

    return null;
  } catch (error: any) {
    return null;
  }
};

export default getCurrentUser;
