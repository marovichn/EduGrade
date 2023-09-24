import { Admin, Group, Student, Subject, Teacher } from "@prisma/client";
import {
  FileEdit,
  GraduationCap,
  LucideIcon,
  ShieldPlus,
  User2,
} from "lucide-react";
import Link from "next/link";
import { FC } from "react";

interface UsersListProps {
  users?: Admin[] | Student[] | Teacher[] | null | undefined;
}

const UsersList: FC<UsersListProps> = ({ users }) => {
  let Icon: any;
  let roleUrl: any;

  if (users?.map((u) => u.role === "Admin")[0]) {
    roleUrl = "admins";
    Icon = <ShieldPlus className='text-white' />;
  } else if (users?.map((u) => u.role === "Student")[0]) {
    roleUrl = "students";
    Icon = <User2 className='text-white' />;
  }else{
    roleUrl = "teachers"
    Icon = <GraduationCap className='text-white' />
  }

  


  return (
    <div>
      {users?.map((user) => (
        <Link
          href={`/dashboard/${roleUrl}/${user.id}`}
          className='w-full h-20 flex justify-center items-center my-4 group '
          key={user.name}
        >
          <div className='flex items-center justify-between bg-gray-500 w-full h-full rounded-lg px-4 hover:bg-gray-400'>
            <div className='flex items-center justify-around gap-x-3'>
              <div className='flex justify-center items-center w-10 h-10 bg-gray-300/60 rounded-lg'>
                {Icon}
              </div>
              <h1 className='text-xl font-bold text-white'>
                {user.name} {}
              </h1>
            </div>
            <div>
              <FileEdit className='text-white group-hover:animate-pulse transition group-hover:scale-125 mr-2' />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default UsersList;
