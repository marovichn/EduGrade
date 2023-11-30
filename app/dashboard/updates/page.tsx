import UpdateDisplay from "./components/UpdateDisplay";
import { authOptions } from "@/lib/authOptions";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { getServerSession } from "next-auth";

const page = async ({}) => {
  const session = await getServerSession(authOptions);
  const user = await getCurrentUser(
    session?.user?.email ? session.user.email : ""
  );
  return (
    <div>
      <UpdateDisplay user={user} />
    </div>
  );
};

export default page;
