"use client";

import { Admin } from "@prisma/client";
import axios from "axios";
import { FC, useEffect, useState } from "react";
import AdminData from "./components/AdminData";

interface pageProps {
  params: { adminId: string };
}

const page: FC<pageProps> = ({ params }) => {
  const [data, setData] = useState<Admin[]>([]);
  useEffect(() => {
    console.log(params);
    const getData = async () => {
      const data = await axios.post("/api/admin", {
        adminId: params.adminId,
      });
      console.log(data);
      if (!data) {
        return;
      }
      setData(data.data);
    };
    getData();
  }, []);
  console.log();
  return (
    <div>
      {data.map((dataObject) => (
        <AdminData data={dataObject} />
      ))}
    </div>
  );
};

export default page;
