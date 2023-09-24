"use client";

import getCurrentUser from "@/app/actions/getCurrentUser";
import UsersList from "@/app/components/UsersList";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";

interface pageProps {}

const page: FC<pageProps> = async ({}) => {
  const user = await getCurrentUser();
  const router = useRouter();

  if (user?.role !== "Admin") {
    router.push("/dashboard");
  }
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
