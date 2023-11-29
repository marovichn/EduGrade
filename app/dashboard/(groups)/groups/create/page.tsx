"use client";
import { Admin, Student, Teacher } from "@prisma/client";
import { useEffect, useState } from "react";
import axios from "axios";

import GroupForm from "../components/GroupForm";

interface PageProps {}

const Page =  ({}) => {
const [user, setCurrentUser] = useState<Admin | Student | Teacher | null>(null);

useEffect(() => {
  axios.get("/api/current-user").then((data) => setCurrentUser(data.data));
}, []);

  return <GroupForm userRole={user?.role} variant='REGISTER' />;
};

export default Page;
