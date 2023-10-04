import getCurrentUser from "@/app/actions/getCurrentUser";
import MyTeachersDisplay from "./components/MyTeachersDisplay";

const page = async () => {
  const user = await getCurrentUser();
  return (
    <div>
      <MyTeachersDisplay user={user} />
    </div>
  );
};

export default page;
