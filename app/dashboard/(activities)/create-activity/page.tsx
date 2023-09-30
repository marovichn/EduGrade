import { FC } from "react";
import getCurrentUser from "@/app/actions/getCurrentUser";
import CreateActivityDisplay from "./components/CreateActivityDisplay";

interface pageProps {}

const page: FC<pageProps> = async ({}) => {
  const user = await getCurrentUser();

  return <CreateActivityDisplay  user={user} />;
};

export default page;
