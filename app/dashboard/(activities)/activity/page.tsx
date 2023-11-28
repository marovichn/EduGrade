import getCurrentUser from "@/app/actions/getCurrentUser";
import ActivityDisplay from "./components/ActivityDisplay";

const page = async ({}) => {
  const user = await getCurrentUser();
  return (
    <div>
      <ActivityDisplay user={user} />
    </div>
  );
};

export default page;
