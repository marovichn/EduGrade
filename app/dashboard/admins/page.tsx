"use client"

import getCurrentUser from "@/app/actions/getCurrentUser";
import UsersList from "@/app/components/UsersList";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";

interface pageProps {}

const page: FC<pageProps> =async ({}) => {
  const user = await getCurrentUser();
  const router = useRouter();

  if(user?.role !== "Admin"){
    router.push("/dashboard");
    return;
  }
  const [admins, setAdmins] = useState([]);
  useEffect(() => {
    const getAdmins = async () => {
      const res = await axios.get("/api/admins");
      if (res.status !== 200) {
        return;
      }
      setAdmins(res.data);
    };
    getAdmins();
  }, []);

  return (
    <div>
      <UsersList users={admins} roleUrl='admins'></UsersList>
    </div>
  );
};

export default page;
