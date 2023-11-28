import AddAttendanceDisplay from "./components/AddAttendanceDisplay";
import getCurrentUser from "@/app/actions/getCurrentUser";

const page= async ({}) => {
  const user = await getCurrentUser();
  return <AddAttendanceDisplay user={user} />;
};

export default page;
