import getCurrentUser from "@/app/actions/getCurrentUser";
import CreateForm from "@/app/components/CreateForm";
import { useRouter } from "next/navigation";
import { FC } from "react";

interface pageProps {}

const page: FC<pageProps> =async ({}) => {
const user =await getCurrentUser();


  return (
      <CreateForm variant='REGISTER' userRole={user?.role}></CreateForm>
  );
};

export default page;
