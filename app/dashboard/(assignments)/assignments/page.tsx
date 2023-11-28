import AssignmentsDisplay from "./components/AssignmentsDisplay";
import getCurrentUser from "@/app/actions/getCurrentUser";

const page = async ({}) => {
  const user = await getCurrentUser();
  return <AssignmentsDisplay user={user} />;
};

export default page;
