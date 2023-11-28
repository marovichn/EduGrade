import getCurrentUser from "@/app/actions/getCurrentUser";
import CreateResultDisplay from "./components/CreateResultDisplay";


const page = async ({}) => {
  const user = await getCurrentUser();

  return <CreateResultDisplay  user={user} />;
};

export default page;
