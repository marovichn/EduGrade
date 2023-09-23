import { FC } from "react";
import AdminForm from "@/app/components/AdminForm"

interface pageProps {}

const page: FC<pageProps> = async ({}) => {
  return <AdminForm variant='REGISTER' />;
};

export default page;
