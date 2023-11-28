import AdminForm from "@/app/components/AdminForm"
import getCurrentUser from "@/app/actions/getCurrentUser";

const page= async ({}) => {
  const user = await getCurrentUser();

  return <AdminForm userRole={user?.role} variant='REGISTER' />;
};

export default page;
