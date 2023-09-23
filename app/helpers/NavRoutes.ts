import { IconNode, GraduationCap, User2, Group, BookCopy, CalendarCheck, Sticker, ListChecks, ListTodo, Radio} from "lucide-react";

type navRoutes = [
  {
    href: string;
    role: "Admin" | "Student" | "Teacher";
    name: string;
    icon: IconNode;
  }
];

export const navRoutes = [
  { href: "/dashboard/students", role: "Admin", name: "Students", icon: User2 },
  { href: "/dashboard/teachers", role: "Admin", name: "Teachers", icon: GraduationCap },
  { href: "/dashboard/subjects", role: "Admin", name: "Subjects", icon: BookCopy },
  { href: "/dashboard/groups", role: "Admin", name: "Groups", icon: Group },

  { href: "/dashboard/updates", role: "Student", name: "All Grades", icon: Radio },
  {
    href: "/dashboard/results",
    role: "Student",
    name: "Subjects Grades",
    icon: ListChecks,
  },
  {
    href: "/dashboard/activity",
    role: "Student",
    name: "Subjects Activities",
    icon: Sticker,
  },
  {
    href: "/dashboard/attendance",
    role: "Student",
    name: "Attendance",
    icon: CalendarCheck,
  },
  {
    href: "/dashboard/teachers",
    role: "Student",
    name: "My Teachers",
    icon: GraduationCap,
  },
  {
    href: "/dashboard/assignments",
    role: "Student",
    name: "Assignments",
    icon: ListTodo,
  },

  { href: "/dashboard/groups", role: "Teacher", name: "All Groups", icon: User2 },
  {
    href: "/dashboard/results",
    role: "Teacher",
    name: "Subjects Grades",
    icon: ListChecks,
  },
  {
    href: "/dashboard/activity",
    role: "Teacher",
    name: "Subjects Activities",
    icon: Sticker,
  },
  {
    href: "/dashboard/attendance",
    role: "Teacher",
    name: "Attendance",
    icon: CalendarCheck,
  },
  {
    href: "/dashboard/students",
    role: "Teacher",
    name: "My Students",
    icon: GraduationCap,
  },
  {
    href: "/dashboard/assignments",
    role: "Teacher",
    name: "Assignments",
    icon: ListTodo,
  },
];
