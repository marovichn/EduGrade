import { IconNode, GraduationCap, User2, Group, BookCopy } from "lucide-react";

type navRoutes = [
  {
    href: string;
    role: "Admin" | "Student" | "Teacher";
    name: string;
    icon: IconNode;
  }
];

export const navRoutes = [
  { href: "/students", role: "Admin", name: "Students", icon: User2 },
  { href: "/teachers", role: "Admin", name: "Teachers", icon: GraduationCap },
  { href: "/subjects", role: "Admin", name: "Subjects", icon: BookCopy },
  { href: "/groups", role: "Admin", name: "Groups", icon: Group },
];
