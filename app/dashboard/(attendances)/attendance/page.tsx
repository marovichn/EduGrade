import getCurrentUser from "@/app/actions/getCurrentUser";
import AttendanceDisplay from "./components/AttendanceDisplay";

const page = async ({}) => {
  const user = await getCurrentUser();
  return (
    <div>
      <AttendanceDisplay user={user} />
    </div>
  );
};

export default page;
