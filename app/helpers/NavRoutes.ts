import { IconNode, GraduationCap, User2, Group, BookCopy, CalendarCheck, Sticker, ListChecks, ListTodo, Radio, ShieldPlus} from "lucide-react";

type navRoutes = [
  {
    href: string;
    role: "Admin" | "Student" | "Teacher";
    name: string;
    icon: IconNode;
  }
];

export const navRoutes = [
  { href: "/dashboard/students", role: "Admin", name: "Student Profiles", icon: User2 },
  { href: "/dashboard/teachers", role: "Admin", name: "Teacher Profiles", icon: GraduationCap },
  { href: "/dashboard/admins", role: "Admin", name: "Admin Profiles", icon: ShieldPlus },
  { href: "/dashboard/subjects", role: "Admin", name: "Subjects", icon: BookCopy },
  { href: "/dashboard/groups", role: "Admin", name: "Groups", icon: Group },

  { href: "/dashboard/updates", role: "Student", name: "All Grades", icon: Radio },
  {
    href: "/dashboard/results",
    role: "Student",
    name: "Subject Grades",
    icon: ListChecks,
  },
  {
    href: "/dashboard/activity",
    role: "Student",
    name: "Subject Activities",
    icon: Sticker,
  },
  {
    href: "/dashboard/attendance",
    role: "Student",
    name: "Attendance",
    icon: CalendarCheck,
  },
  {
    href: "/dashboard/my-teachers",
    role: "Student",
    name: "My Teachers",
    icon: GraduationCap,
  },
  {
    href: "/dashboard/assignments",
    role: "Student",
    name: " My Assignments",
    icon: ListTodo,
  },

  { href: "/dashboard/my-groups", role: "Teacher", name: "My Groups", icon: User2 },
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
