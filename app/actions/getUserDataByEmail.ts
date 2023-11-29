import prisma from "@/app/libs/prismadb";

const getUserDataByEmail = async (email: string) => {
  try {
    const currentAdmin = await prisma.admin.findUnique({
      where: {
        email: email,
      },
    });

    if (currentAdmin) {
      return currentAdmin;
    }

    const currentStudent = await prisma.student.findUnique({
      where: {
        email: email,
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
        email: email,
      },
      include: {
        groups: true,
      },
    });

    if (currentTeacher) {
      return currentTeacher;
    }

    return null; // If the email doesn't match any user in your system
  } catch (error) {
    console.error("Error in getUserDataByEmail:", error);
    throw error; // Rethrow the error to propagate it further
  }
};

export default getUserDataByEmail;
