import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, useEffect, useState } from "react";

interface NavItemProps {
  route: {
    key: string;
    href: string;
    role: string;
    name: string;
    icon: LucideIcon;
  };
}

const NavItem: FC<NavItemProps> = ({ route }) => {
  const pathname = usePathname();
  const [selected, setSlected] = useState(false);
  useEffect(() => {
    setSlected(route.href === pathname);
  }, [pathname, route.href]);

  return (
    <Link
      key={route?.key}
      href={route.href}
      className={
        selected
          ? "flex items-center justify-center gap-x-0 font-bold bg-gray-100 w-full h-full transition group cursor-pointer mb-[16px] pt-4"
          : "flex items-center justify-center gap-x-3 font-bold hover:bg-gray-100 w-full h-full transition group cursor-pointer mb-[16px] pt-4"
      }
    >
      <div className='flex items-center justify-center gap-x-3'>
        <route.icon className='text-[#2C2E43] group-hover:text-black group-hover:animate-bounce' />
      </div>
    </Link>
  );
};

export default NavItem;
