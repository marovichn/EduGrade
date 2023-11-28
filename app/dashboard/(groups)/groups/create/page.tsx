import { FC } from "react";
import GroupForm from "../components/GroupForm";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface pageProps {}

const page: FC<pageProps> = async ({}) => {
  const user = await getCurrentUser();

  return <GroupForm userRole={user?.role} variant='REGISTER' />;
};

export default page;
