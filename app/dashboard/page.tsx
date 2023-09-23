import { FC } from "react";
import getCurrentUser from "../actions/getCurrentUser";
import PageWrapper from "../components/PageWrapper";
import Actions from "../components/Actions";

interface pageProps {}

const page: FC<pageProps> = async ({}) => {
  const user = await getCurrentUser();
  return (
    <PageWrapper>
      <h1 className='text-4xl font-extrabold text-gray-700'>
        Welcome back, {user?.name}!
      </h1>
      <p className='font-light'>{user?.role}</p>

      <Actions userRole={user?.role}></Actions>
    </PageWrapper>
  );
};

export default page;
