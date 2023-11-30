import TeachersForm from "@/app/components/TeacherForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import getCurrentUser from "@/app/actions/getCurrentUser";

const page = async ({}) => {
  const session = await getServerSession(authOptions);
  const user = await getCurrentUser(
    session?.user?.email ? session.user.email : ""
  );
  return <TeachersForm userRole={user?.role} variant='REGISTER' />;
};

export default page;
