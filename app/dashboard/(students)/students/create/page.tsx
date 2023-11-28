import getCurrentUser from "@/app/actions/getCurrentUser";
import StudentForm from "@/app/components/StudentForm";

const page =async ({}) => {
const user =await getCurrentUser();

  return (
      <StudentForm variant='REGISTER' userRole={user?.role}></StudentForm>
  );
};

export default page;
