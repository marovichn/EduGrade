import { getServerSession } from "next-auth";
import Navbar from "../components/Navbar";
import { authOptions } from "@/lib/authOptions";
import getCurrentUser from "../actions/getCurrentUser";
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  const currentUser = await getCurrentUser(
    session?.user?.email ? session.user.email : ""
  );

  return (
    <>
      <Navbar user={currentUser!} />
      <div className='mt-32'>{children}</div>
    </>
  );
}
