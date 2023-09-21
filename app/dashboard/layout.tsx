import { Session, getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Navbar from "../components/Navbar";
import getCurrentUser from "../actions/getCurrentUser";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
  session: Session;
}) {
const currentUser =await getCurrentUser();
  return (
    <>
      <Navbar user={currentUser!}/>
      <div className='mt-32'>{children}</div>
    </>
  );
}
