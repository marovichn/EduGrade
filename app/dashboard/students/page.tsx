"use client";

import getCurrentUser from "@/app/actions/getCurrentUser";
import UsersList from "@/app/components/UsersList";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";

interface pageProps {}

const page: FC<pageProps> =async ({}) => {
   const user = await getCurrentUser();
   const router = useRouter();

   if (user?.role !== "Admin") {
     router.push("/dashboard");
     return;
   }

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
      <UsersList users={students} roleUrl='students'></UsersList>
    </div>
  );
};

export default page;
