import { Admin, Student, Teacher } from "@prisma/client";

import axios from "axios";
import AssignmentsDisplay from "./components/AssignmentsDisplay";


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

const page = ({user}: PageProps) => {
  return <AssignmentsDisplay user={user} />;
};

export default page;
