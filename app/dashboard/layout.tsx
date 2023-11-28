import { Session } from "next-auth";
import Navbar from "../components/Navbar";
import { Admin, Student, Teacher } from "@prisma/client";
import axios from "axios";

export async function getServerSideProps() {
  try {
    const { data } = await axios.get("/api/current-user");
    const currentUser = data;

    return {
      props: { currentUser },
    };
  } catch (error) {
    console.error("Error fetching current currentUser:", error);

    return {
      props: { currentUser: null },
    };
  }
}

export default async function DashboardLayout({
  children,
  currentUser,
}: {
  children: React.ReactNode;
  session: Session;
  currentUser: Admin | Student | Teacher | null;
}) {
  return (
    <>
      <Navbar user={currentUser!} />
      <div className='mt-32'>{children}</div>
    </>
  );
}
