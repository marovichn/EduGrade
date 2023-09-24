import { Admin, Student, Teacher } from "@prisma/client";
import { useState, useEffect } from "react";
import {
  ArrowLeft,
  ArrowRight,
  FileEdit,
  GraduationCap,
  ShieldPlus,
  User2,
  UserPlus,
} from "lucide-react";
import Link from "next/link";
import { FC } from "react";
import PageWrapper from "./PageWrapper";

interface UsersListProps {
  users?: Admin[] | Student[] | Teacher[] | null | undefined;
  roleUrl?: string;
}

const UsersList: FC<UsersListProps> = ({ users, roleUrl }) => {
  const [page, setPage] = useState(1);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(5);
  const [indexedUsers, setIndexedUsers] = useState<
    Admin[] | Student[] | Teacher[]
  >();

  useEffect(() => {
    if (users) {
      const newEndIndex = startIndex + 5;
      setEndIndex(newEndIndex);
      setIndexedUsers(users.slice(startIndex, newEndIndex));
    }
  }, [startIndex, users]);

  let Icon: any;

  const next = () => {
    if (page < Math.ceil(users?.length! / 5)) {
      setPage((p) => p + 1);
      setStartIndex((p) => p + 5);
      setEndIndex((p) => p + 5);
    }
  };

  const previous = () => {
    if (page > 1) {
      setPage((p) => p - 1);
      setStartIndex((p) => p - 5);
      setEndIndex((p) => p - 5);
    }
  };

  if (users?.map((u) => u.role === "Admin")[0]) {
    Icon = <ShieldPlus className='text-white' />;
  } else if (users?.map((u) => u.role === "Student")[0]) {
    Icon = <User2 className='text-white' />;
  } else {
    Icon = <GraduationCap className='text-white' />;
  }

  return (
    <PageWrapper>
      <div className=''>
        <div className='mb-16 text-4xl font-bold flex items-center justify-between'>
          <h1>
            All {roleUrl?.charAt(0).toUpperCase() + roleUrl?.slice(1)!} on
            EduGrade:
          </h1>
          <Link
            href={`${roleUrl}/create`}
            className='w-12 h-12 bg-yellow-300 flex items-center justify-center rounded-lg hover:bg-yellow-200 pl-1'
          >
            <UserPlus />
          </Link>
        </div>
        {indexedUsers?.map((user, index) => (
          <Link
            href={`/dashboard/${roleUrl}/${user.id}`}
            className='w-full h-20 flex justify-center items-center my-4 group '
            key={user.name}
          >
            <div className='bg-gray-500 w-8 h-full rounded-lg mr-3 flex items-center justify-center'>
              <h1 className='text-white font-extrabold'>{index + 1}.</h1>
            </div>
            <div className='flex items-center justify-between border-2 border-gray-400 w-full h-full rounded-lg px-4 hover:bg-gray-200 group'>
              <div className='flex items-center justify-around gap-x-3'>
                <div className='flex justify-center items-center w-10 h-10 bg-black/60 rounded-lg'>
                  {Icon}
                </div>
                <div className='flex flex-col items-start justify-start'>
                  <h1 className='text-xl font-bold text-black'>
                    {user.name} {user.lastname && user.lastname}{" "}
                    {user.code && "-" + user.code}
                  </h1>
                  <p>{user.email}</p>
                </div>
              </div>
              <div>
                <FileEdit className='text-bray-700 group-hover:animate-pulse transition group-hover:scale-125 mr-2' />
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className='w-full mt-10 mb-16'>
        <div className='flex items-center justify-center gap-x-10'>
          <div className='flex items-center justify-center gap-x-10 bg-gray-200 p-3 rounded-xl'>
            <div
              className='w-8 h-8 bg-gray-400 flex items-center justify-center rounded-full hover:bg-gray-300'
              onClick={() => previous()}
            >
              <ArrowLeft className='hover:animate-pulse' />
            </div>
            <h1 className='font-bold'>
              {page} / {Math.ceil(users?.length! / 5)}
            </h1>
            <div
              className='w-8 h-8 bg-gray-400 flex items-center justify-center rounded-full hover:bg-gray-300'
              onClick={() => next()}
            >
              <ArrowRight className='hover:animate-pulse' />
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default UsersList;
