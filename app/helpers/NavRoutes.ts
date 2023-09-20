import { IconNode, GraduationCap, User2, Group, BookCopy, CalendarCheck, Sticker, ListChecks, ListTodo} from "lucide-react";

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

  { href: "/updates", role: "Student", name: "All Grades", icon: User2 },
  {
    href: "/results",
    role: "Student",
    name: "Subjects Grades",
    icon: ListChecks,
  },
  {
    href: "/activity",
    role: "Student",
    name: "Subjects Activities",
    icon: Sticker,
  },
  {
    href: "/attendance",
    role: "Student",
    name: "Attendance",
    icon: CalendarCheck,
  },
  {
    href: "/teachers",
    role: "Student",
    name: "My Teachers",
    icon: GraduationCap,
  },
  {
    href: "/assignments",
    role: "Student",
    name: "Assignments",
    icon: ListTodo,
  },

  { href: "/groups", role: "Teacher", name: "All Groups", icon: User2 },
  {
    href: "/results",
    role: "Teacher",
    name: "Subjects Grades",
    icon: ListChecks,
  },
  {
    href: "/activity",
    role: "Teacher",
    name: "Subjects Activities",
    icon: Sticker,
  },
  {
    href: "/attendance",
    role: "Teacher",
    name: "Attendance",
    icon: CalendarCheck,
  },
  {
    href: "/students",
    role: "Teacher",
    name: "My Students",
    icon: GraduationCap,
  },
  {
    href: "/assignments",
    role: "Teacher",
    name: "Assignments",
    icon: ListTodo,
  },
];
