import { FC } from "react";
import ResultsForm from "./components/ResultForm";
import getCurrentUser from "@/app/actions/getCurrentUser";
import CreateResultDisplay from "./components/CreateResultDisplay";

interface pageProps {}

const page: FC<pageProps> = async ({}) => {
  const user = await getCurrentUser();

  return <CreateResultDisplay  user={user} />;
};

export default page;
