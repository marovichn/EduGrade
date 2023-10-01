import MyStudentsDisplay from "./components/MyStudentsDisplay";
import getCurrentUser from "@/app/actions/getCurrentUser";

const page = async () => {
  const user = await getCurrentUser();
  return (
    <div>
      <MyStudentsDisplay user={user} />
    </div>
  );
};

export default page;
