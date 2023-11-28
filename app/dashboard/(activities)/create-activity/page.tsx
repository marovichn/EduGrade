import getCurrentUser from "@/app/actions/getCurrentUser";
import CreateActivityDisplay from "./components/CreateActivityDisplay";

const page = async ({}) => {
  const user = await getCurrentUser();

  return <CreateActivityDisplay user={user} />;
};

export default page;
