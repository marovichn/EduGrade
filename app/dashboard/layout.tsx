import Image from "next/image";
import Link from "next/link";
import { MdCastForEducation } from "react-icons/md";
import Avatar from "../components/Avatar";
import { useSession } from "next-auth/react";
import Navbar from "../components/Navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  

  return (
    <>
      <Navbar/>
      <div className='fixed top-16 z-15 bg-yellow-300 text-black w-full h-16 rounded-b-xl'></div>

      <div className='mt-32'>{children}</div>
    </>
  );
}
