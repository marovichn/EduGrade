import SubjectForm from "@/app/components/SubjectForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import getCurrentUser from "@/app/actions/getCurrentUser";

const page = async ({}) => {
  const session = await getServerSession(authOptions);
  const user = await getCurrentUser(
    session?.user?.email ? session.user.email : ""
  );
  return <SubjectForm variant='REGISTER' userRole={user?.role}></SubjectForm>;
};

export default page;
