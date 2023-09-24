"use client";

import UsersList from "@/app/components/UsersList";
import axios from "axios";
import { FC, useEffect, useState } from "react";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  const [students, setStudents] = useState([]);
  useEffect(() => {
    const getStudents = async () => {
      const res = await axios.get("/api/students");
      if (res.status !== 200) {
        return;
      }
      setStudents(res.data);
    };
    getStudents();
  }, []);

  return (
    <div>
      <UsersList users={students}></UsersList>
    </div>
  );
};

export default page;
