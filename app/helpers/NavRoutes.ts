import {
  IconNode,
  GraduationCap,
  User2,
  Group,
  BookCopy,
  CalendarCheck,
  Sticker,
  ListChecks,
  ListTodo,
  Radio,
  ShieldPlus,
} from "lucide-react";

type navRoutes = [
  {
    key: string;
    href: string;
    role: "Admin" | "Student" | "Teacher";
    name: string;
    icon: IconNode;
  }
];

export const navRoutes = [
  {
    key: "A1",
    href: "/dashboard/students",
    role: "Admin",
    name: "Student Profiles",
    icon: User2,
  },
  {
    key: "A2",
    href: "/dashboard/teachers",
    role: "Admin",
    name: "Teacher Profiles",
    icon: GraduationCap,
  },
  {
    key: "A3",
    href: "/dashboard/admins",
    role: "Admin",
    name: "Admin Profiles",
    icon: ShieldPlus,
  },
  {
    key: "A4",
    href: "/dashboard/subjects",
    role: "Admin",
    name: "Subjects",
    icon: BookCopy,
  },
  {
    key: "A5",
    href: "/dashboard/groups",
    role: "Admin",
    name: "Groups",
    icon: Group,
  },

  {
    key: "S1",
    href: "/dashboard/updates",
    role: "Student",
    name: "All Grades",
    icon: Radio,
  },
  {
    key: "S2",
    href: "/dashboard/results",
    role: "Student",
    name: "Subject Grades",
    icon: ListChecks,
  },
  {
    key: "S3",
    href: "/dashboard/activity",
    role: "Student",
    name: "Subject Activities",
    icon: Sticker,
  },
  {
    key: "S4",
    href: "/dashboard/attendance",
    role: "Student",
    name: "Attendance",
    icon: CalendarCheck,
  },
  {
    key: "S5",
    href: "/dashboard/my-teachers",
    role: "Student",
    name: "My Teachers",
    icon: GraduationCap,
  },
  {
    key: "S6",
    href: "/dashboard/assignments",
    role: "Student",
    name: " My Assignments",
    icon: ListTodo,
  },

  {
    key: "T1",
    href: "/dashboard/my-groups",
    role: "Teacher",
    name: "My Groups",
    icon: User2,
  },
  {
    key: "T2",
    href: "/dashboard/create-results",
    role: "Teacher",
    name: "Subjects Grades",
    icon: ListChecks,
  },
  {
    key: "T3",
    href: "/dashboard/create-activity",
    role: "Teacher",
    name: "Subjects Activities",
    icon: Sticker,
  },
  {
    key: "T4",
    href: "/dashboard/add-attendance",
    role: "Teacher",
    name: "Attendance",
    icon: CalendarCheck,
  },
  {
    key: "T5",
    href: "/dashboard/my-students",
    role: "Teacher",
    name: "My Students",
    icon: GraduationCap,
  },
  {
    key: "T6",
    href: "/dashboard/assignments",
    role: "Teacher",
    name: "Assignments",
    icon: ListTodo,
  },
];
