"use client";

import UsersList from "@/app/components/UsersList";
import axios from "axios";
import { FC, useEffect, useState } from "react";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  const [teachers, setTeachers] = useState([]);
  useEffect(() => {
    const getTeachers = async () => {
      const res = await axios.get("/api/teachers");
      if (res.status !== 200) {
        return;
      }
      setTeachers(res.data);
    };
    getTeachers();
  }, []);

  return (
    <div>
      <UsersList users={teachers} roleUrl='teachers'></UsersList>
    </div>
  );
};

export default page;
