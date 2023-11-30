import getUserDataByEmail from "./getUserDataByEmail";

const getCurrentUser = async (email: string) => {
  try {
    if (!email) {
      return null;
    }

    const userData = await getUserDataByEmail(email);
    return userData;
  } catch (error) {
    console.error("Error in getCurrentUser:", error);
    throw error; // Rethrow the error to propagate it further
  }
};

export default getCurrentUser;
