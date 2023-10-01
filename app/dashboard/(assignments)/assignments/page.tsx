import { FC } from "react";
import AssignmentsDisplay from "./components/AssignmentsDisplay";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface pageProps {}

const page: FC<pageProps> = async ({}) => {
  const user = await getCurrentUser();
  return <AssignmentsDisplay user={user} />;
};

export default page;
