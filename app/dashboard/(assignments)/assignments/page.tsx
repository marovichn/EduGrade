"use client";

import { Admin, Student, Teacher } from "@prisma/client";
import { useEffect, useState } from "react";
import axios from "axios";
import AssignmentsDisplay from "./components/AssignmentsDisplay";

const Page = async ({}) => {
  const [user, setCurrentUser] = useState<Admin | Student | Teacher | null>(
    null
  );

  useEffect(() => {
    axios.get("/api/current-user").then((data) => setCurrentUser(data.data));
  }, []);
  return <AssignmentsDisplay user={user} />;
};

export default Page;
