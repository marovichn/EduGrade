import PageWrapper from "@/app/components/PageWrapper";
import { FC } from "react";
import UpdatesList from "./UpdatesList";

interface UpdateDisplayProps {
  user: {
    id: string;
    name: string | null;
    lastname: string | null;
    email: string | null;
    emailVerified: Date | null;
    image: string | null;
    hashedPassword: string | null;
    createdAt: Date;
    updatedAt: Date;
    role: string | null;
    code: string | null;
  } | null;
}

const UpdateDisplay: FC<UpdateDisplayProps> = ({ user }) => {
  return (
    <div className=''>
      <div className='w-full fixed bg-white border-b-2 h-14 p-4 flex items-center justify-start font-bold z-10'>
        <h1>
          {user?.name} {user?.lastname} {"  "} ({user?.role})
        </h1>
      </div>
      <div className='bg-auth-banner w-full h-screen bg-fixed opacity-20 absolute'></div>
      <div className='pt-[80px]'>
        <UpdatesList/>
      </div>
    </div>
  );
};

export default UpdateDisplay;
