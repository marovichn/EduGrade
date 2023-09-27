import { columns } from "./components/ColumnsGroups";

import PageWrapper from "@/app/components/PageWrapper";
import getCurrentUser from "@/app/actions/getCurrentUser";
import GroupDisplay from "./components/GroupDisplay";

const page = async () => {
  const user = await getCurrentUser();

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
