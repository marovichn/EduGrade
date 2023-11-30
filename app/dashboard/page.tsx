import PageWrapper from "../components/PageWrapper";
import Actions from "../components/Actions";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import getCurrentUser from "../actions/getCurrentUser";

const page = async ({}) => {
  const session = await getServerSession(authOptions);
  const user = await getCurrentUser(
    session?.user?.email ? session.user.email : ""
  );

  return (
    <PageWrapper>
      <h1 className='text-4xl font-extrabold text-gray-700'>
        Welcome back, {user?.name}!
      </h1>
      <p className='font-light'>{user?.role}</p>

      <Actions userRole={user?.role}></Actions>
    </PageWrapper>
  );
};

export default page;
