import { Admin, Student, Teacher } from "@prisma/client";
import PageWrapper from "../components/PageWrapper";
import Actions from "../components/Actions";
import axios from "axios";

interface PageProps {
  user: Admin | Student | Teacher | null;
}

export async function getServerSideProps() {
  try {
    const { data } = await axios.get("/api/current-user");
    const user = data;

    return {
      props: { user },
    };
  } catch (error) {
    console.error("Error fetching current user:", error);

    return {
      props: { user: null },
    };
  }
}

const page = ({ user }: PageProps) => {
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
