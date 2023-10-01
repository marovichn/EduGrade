import { FC } from "react";
import AddAssignmentsDisplay from "./components/AddAssignmentDisplay";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface pageProps {}

const page: FC<pageProps> = async ({}) => {
  const user = await getCurrentUser();
  return <AddAssignmentsDisplay user={user} />;
};

export default page;
