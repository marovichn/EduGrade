import getCurrentUser from "@/app/actions/getCurrentUser";
import SubjectForm from "@/app/components/SubjectForm";
import { FC } from "react";

interface pageProps {}

const page: FC<pageProps> = async ({}) => {
  const user = await getCurrentUser();

  return <SubjectForm variant='REGISTER' userRole={user?.role}></SubjectForm>;
};

export default page;
