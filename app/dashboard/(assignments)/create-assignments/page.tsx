import AddAssignmentsDisplay from "./components/AddAssignmentDisplay";
import { authOptions } from "@/lib/authOptions";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { getServerSession } from "next-auth";

const page = async ({}) => {
  const session = await getServerSession(authOptions);
  const user = await getCurrentUser(
    session?.user?.email ? session.user.email : ""
  );

  return <AddAssignmentsDisplay user={user} />;
};

export default page;
