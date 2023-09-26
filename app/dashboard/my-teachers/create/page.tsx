import { FC } from "react";
import TeachersForm from "@/app/components/TeacherForm";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface pageProps {}

const page: FC<pageProps> = async ({}) => {
  const user = await getCurrentUser();

  return <TeachersForm userRole={user?.role} variant='REGISTER' />;
};

export default page;
