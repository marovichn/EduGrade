import { FC } from "react";
import { navRoutes } from "../helpers/NavRoutes";
import { ArrowRightFromLine } from "lucide-react";
import Link from "next/link";

interface ActionsProps {
  userRole: string | null | undefined;
}

const Actions: FC<ActionsProps> = ({ userRole }) => {
  const actions = navRoutes.filter((a) => a.role === userRole);
  console.log(actions);
  return (
    <div className='mt-16'>
      {actions.map((a) => (
        <div className='w-full h-20 flex justify-center items-center my-4 group'>
          <div className='flex items-center justify-between bg-gray-500 w-full h-full rounded-lg px-4'>
            <div className='flex items-center justify-around gap-x-3'>
              <div className='flex justify-center items-center w-10 h-10 bg-gray-400 rounded-lg'>
                <a.icon className='text-white' />
              </div>
              <h1 className='text-xl font-bold text-white'>{userRole === "Admin" && "Create "}{a.name}</h1>
            </div>
            <Link href={userRole === "Admin" ? `${a.href}/create` : a.href}>
              <ArrowRightFromLine className='text-white group-hover:animate-pulse transition group-hover:scale-125 mr-2' />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Actions;
