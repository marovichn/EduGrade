"use client";

import Link from "next/link";
import { FC } from "react";
import { MdCastForEducation } from "react-icons/md";
import Avatar from "./Avatar";
import { signOut, useSession } from "next-auth/react";
import { LogOut } from "lucide-react";
import { navRoutes } from "../helpers/NavRoutes";
import { Admin, Student, Teacher } from "@prisma/client";

interface NavbarProps {
  user?: Admin | Student | Teacher;
}

const Navbar: FC<NavbarProps> = ({user}) => {
  const studentRoutes = navRoutes.filter((r) => r.role === "Student");
  const adminRoutes = navRoutes.filter((r) => r.role === "Admin");
  const teacherRoutes = navRoutes.filter((r) => r.role === "Teacher");
  const session = useSession();
  console.log(user);
  return (
    <>
      <nav className='bg-gray-700 fixed w-full z-20 top-0 left-0 border-0 rounded-b-xl'>
        <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 z-10'>
          <Link href='/dashboard' className='flex items-center'>
            <MdCastForEducation className='w-12 h-12 text-yellow-300 mr-4' />
            <span className='self-center text-3xl font-semibold whitespace-nowrap text-white'>
              EduGrade
            </span>
          </Link>
          <div className='flex justify-center items-center gap-x-4'>
            <Link href={`/account/${session.data?.user?.email}`}>
              <Avatar user={session.data?.user}></Avatar>
            </Link>
            <div
              className='w-full h-full hover:bg-white/20 group p-2 rounded-xl mb-1'
              onClick={() => signOut()}
            >
              <LogOut className='group-hover:text-black text-white '></LogOut>
            </div>
          </div>
        </div>
      </nav>
      <div className='fixed top-16 z-15 bg-gray-300 text-black w-full h-16'>
        <div className='flex items-center justify-around gap-x-4 mt-[26px] w-full'>
          {user?.role === "Admin"
            ? adminRoutes.map((route, index) => <div>{route.name}</div>)
            : ""}
          {user?.role === "Student"
            ? studentRoutes.map((route, index) => <div>{route.name}</div>)
            : ""}
          {user?.role === "Teacher"
            ? teacherRoutes.map((route, index) => <div>{route.name}</div>)
            : ""}
        </div>
      </div>
    </>
  );
};

export default Navbar;
