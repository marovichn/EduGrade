import getCurrentUser from "@/app/actions/getCurrentUser";
import SubjectForm from "@/app/components/SubjectForm";


const page= async ({}) => {
  const user = await getCurrentUser();

  return <SubjectForm variant='REGISTER' userRole={user?.role}></SubjectForm>;
};

export default page;
