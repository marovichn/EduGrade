import Image from "next/image";
import { MdCastForEducation } from "react-icons/md";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <nav className='bg-white dark:bg-black fixed w-full z-20 top-0 left-0 border-b border-0 dark:border-0 rounded-b-xl'>
        <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 z-10'>
          <a href='/dashboard' className='flex items-center'>
            <MdCastForEducation className='w-12 h-12 text-yellow-300 mr-4' />
            <span className='self-center text-3xl font-semibold whitespace-nowrap dark:text-white'>
              EduGrade
            </span>
          </a>
        </div>
      </nav>
      <div className='fixed top-16 z-15 bg-yellow-300 text-black w-full h-16 rounded-b-xl'></div>

      <div className='mt-32'>{children}</div>
    </>
  );
}
