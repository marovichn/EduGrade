import { LucideIcon } from "lucide-react";
import { FC } from "react";

interface NavItemProps {
  route: {
    href: string;
    role: string;
    name: string;
    icon: LucideIcon;
  };
}

const NavItem: FC<NavItemProps> = ({route}) => {
  return <div>{route.name}</div>;
};

export default NavItem;
