import getCurrentUser from "@/app/actions/getCurrentUser";
import { FC } from "react";
import ResultDisplay from "./components/ResultDisplay";

interface pageProps {}

const page: FC<pageProps> = async ({}) => {
  const user = await getCurrentUser();
  return (
    <div>
      <ResultDisplay user={user} />
    </div>
  );
};

export default page;
