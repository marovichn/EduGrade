import { getServerSession } from "next-auth";
import ActivityDisplay from "./components/ActivityDisplay";
import { authOptions } from "@/lib/authOptions";
import getCurrentUser from "@/app/actions/getCurrentUser";

const page = async ({}) => {
  const session = await getServerSession(authOptions);
  const user = await getCurrentUser(
    session?.user?.email ? session.user.email : ""
  );

  return (
    <div>
      <ActivityDisplay user={user} />
    </div>
  );
};

export default page;
