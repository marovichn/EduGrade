import getCurrentUser from "@/app/actions/getCurrentUser";
import { FC } from "react";
import ActivityDisplay from "./components/ActivityDisplay";

interface pageProps {}

const page: FC<pageProps> = async ({}) => {
  const user = await getCurrentUser();
  return (
    <div>
      <ActivityDisplay user={user} />
    </div>
  );
};

export default page;
