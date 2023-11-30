import StudentForm from "@/app/components/StudentForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import getCurrentUser from "@/app/actions/getCurrentUser";

const page = async ({}) => {
  const session = await getServerSession(authOptions);
  const user = await getCurrentUser(
    session?.user?.email ? session.user.email : ""
  );

  return <StudentForm variant='REGISTER' userRole={user?.role}></StudentForm>;
};

export default page;
