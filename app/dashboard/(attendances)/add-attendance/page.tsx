import { FC } from "react";
import AddAttendanceDisplay from "./components/AddAttendanceDisplay";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface pageProps {}

const page: FC<pageProps> = async ({}) => {
  const user = await getCurrentUser();
  return <AddAttendanceDisplay user={user} />;
};

export default page;
