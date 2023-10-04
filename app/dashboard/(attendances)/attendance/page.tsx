import getCurrentUser from "@/app/actions/getCurrentUser";
import { FC } from "react";
import AttendanceDisplay from "./components/AttendanceDisplay";

interface pageProps {}

const page: FC<pageProps> = async ({}) => {
  const user = await getCurrentUser();
  return (
    <div>
      <AttendanceDisplay user={user} />
    </div>
  );
};

export default page;
