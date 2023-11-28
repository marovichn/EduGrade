
import getCurrentUser from "@/app/actions/getCurrentUser";
import ResultDisplay from "./components/ResultDisplay";



const page = async ({}) => {
  const user = await getCurrentUser();
  return (
    <div>
      <ResultDisplay user={user} />
    </div>
  );
};

export default page;
