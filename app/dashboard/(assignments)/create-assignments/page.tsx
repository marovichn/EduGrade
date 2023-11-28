import AddAssignmentsDisplay from "./components/AddAssignmentDisplay";
import getCurrentUser from "@/app/actions/getCurrentUser";

const page= async ({}) => {
  const user = await getCurrentUser();
  return <AddAssignmentsDisplay user={user} />;
};

export default page;
