import TeachersForm from "@/app/components/TeacherForm";
import getCurrentUser from "@/app/actions/getCurrentUser";

const page = async ({}) => {
  const user = await getCurrentUser();

  return <TeachersForm userRole={user?.role} variant='REGISTER' />;
};

export default page;
