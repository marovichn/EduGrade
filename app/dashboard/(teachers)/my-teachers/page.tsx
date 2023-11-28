"use client";
import { Admin, Student, Teacher } from "@prisma/client";
import { useEffect, useState } from "react";
import axios from "axios";
import MyTeachersDisplay from "./components/MyTeachersDisplay";

const Page = () => {
  const [user, setCurrentUser] = useState<Admin | Student | Teacher | null>(
    null
  );

  useEffect(() => {
    axios.get("/api/current-user").then((data) => setCurrentUser(data.data));
  }, []);
  return (
    <div>
      <MyTeachersDisplay user={user} />
    </div>
  );
};

export default Page;
