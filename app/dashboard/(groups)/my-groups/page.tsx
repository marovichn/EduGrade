import { columns } from "./components/ColumnsGroups";
import PageWrapper from "@/app/components/PageWrapper";
import GroupDisplay from "./components/GroupDisplay";
import { authOptions } from "@/lib/authOptions";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { getServerSession } from "next-auth";

const page = async ({}) => {
  const session = await getServerSession(authOptions);
  const user = await getCurrentUser(
    session?.user?.email ? session.user.email : ""
  );
  return (
    <PageWrapper>
      <div className='mb-16 text-4xl font-bold flex items-center justify-between'>
        <h1>My Groups on EduGrade:</h1>
      </div>
      <GroupDisplay user={user} columns={columns} />
    </PageWrapper>
  );
};

export default page;
