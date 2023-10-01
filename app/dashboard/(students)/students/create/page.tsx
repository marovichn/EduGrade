import getCurrentUser from "@/app/actions/getCurrentUser";
import StudentForm from "@/app/components/StudentForm";
import { FC } from "react";

interface pageProps {}

const page: FC<pageProps> =async ({}) => {
const user =await getCurrentUser();

  return (
      <StudentForm variant='REGISTER' userRole={user?.role}></StudentForm>
  );
};

export default page;
