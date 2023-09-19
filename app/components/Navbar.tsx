"use client";

import Link from "next/link";
import { FC } from "react";
import { MdCastForEducation } from "react-icons/md";
import Avatar from "./Avatar";
import { useSession } from "next-auth/react";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = ({}) => {
  const session = useSession();
  return (
    <nav className='bg-white dark:bg-black fixed w-full z-20 top-0 left-0 border-b border-0 dark:border-0 rounded-b-xl'>
      <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 z-10'>
        <Link href='/dashboard' className='flex items-center'>
          <MdCastForEducation className='w-12 h-12 text-yellow-300 mr-4' />
          <span className='self-center text-3xl font-semibold whitespace-nowrap dark:text-white'>
            EduGrade
          </span>
        </Link>
        <Link href={`/account/${session.data?.user?.email}`}>
          <Avatar user={session.data?.user}></Avatar>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
