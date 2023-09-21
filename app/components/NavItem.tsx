import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

interface NavItemProps {
  route: {
    href: string;
    role: string;
    name: string;
    icon: LucideIcon;
  };
}

const NavItem: FC<NavItemProps> = ({ route }) => {
  return (
    <div className='flex items-center justify-center gap-x-3 font-bold hover:bg-gray-100 w-full h-full transition group cursor-pointer mb-[16px] pt-4'>
      <Link
        href={route.href}
        className='flex items-center justify-center gap-x-3'
      >
        <route.icon className='text-[#2C2E43] group-hover:text-black group-hover:animate-bounce' />
        {route.name}
      </Link>
    </div>
  );
};

export default NavItem;
