import { FC } from "react";
import AdminForm from "@/app/components/AdminForm"
import getCurrentUser from "@/app/actions/getCurrentUser";

interface pageProps {}

const page: FC<pageProps> = async ({}) => {
  const user = await getCurrentUser();

  return <AdminForm userRole={user?.role} variant='REGISTER' />;
};

export default page;
