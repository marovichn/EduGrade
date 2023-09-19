"use client";

import { Admin, Student, Teacher } from "@prisma/client";

import Image from "next/image";

interface AvatarProps {
  user?: {
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
  };
}

const Avatar: React.FC<AvatarProps> = ({ user }) => {
  return (
    <div className='relative'>
      <div
        className={
          user?.image
            ? "relative inline-block rounded-full overflow-hidden h-9 w-9 md:h-11 md:w-11"
            : "relative inline-block rounded-full overflow-hidden h-9 w-9 md:h-11 md:w-11 bg-white ring-yellow-300 ring-2"
        }
      >
        <Image
          className={user?.image ? "" : "scale-75"}
          fill
          src={user?.image || "/images/placeholder.jpg"}
          alt='Avatar'
        />
      </div>
    </div>
  );
};

export default Avatar;
