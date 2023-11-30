import CreateActivityDisplay from "./components/CreateActivityDisplay";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

const page = async ({}) => {
  const session = await getServerSession(authOptions);
  const user = await getCurrentUser(
    session?.user?.email ? session.user.email : ""
  );

  return <CreateActivityDisplay user={user} />;
};

export default page;
