import getSession from "./getSession";
import getUserDataByEmail from "./getUserDataByEmail";

export const dynamic = "force-dynamic";

const getCurrentUser = async () => {
  try {
    const session = await getSession(); // Assuming getSession returns the session

    if (!session?.user?.email) {
      return null;
    }

    const userData = await getUserDataByEmail(session.user.email);
    return userData;
  } catch (error) {
    console.error("Error in getCurrentUser:", error);
    throw error; // Rethrow the error to propagate it further
  }
};

export default getCurrentUser;
