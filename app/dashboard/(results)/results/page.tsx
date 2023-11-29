"use client";
import { Admin, Student, Teacher } from "@prisma/client";
import { useEffect, useState } from "react";
import axios from "axios";
import ResultDisplay from "./components/ResultDisplay";

const Page = ({}) => {
  const [user, setCurrentUser] = useState<Admin | Student | Teacher | null>(
    null
  );

  useEffect(() => {
    axios.get("/api/current-user").then((data) => setCurrentUser(data.data));
  }, []);
  return (
    <div>
      <ResultDisplay user={user} />
    </div>
  );
};

export default Page;
