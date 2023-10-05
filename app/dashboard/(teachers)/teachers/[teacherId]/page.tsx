"use client";

import { Teacher } from "@prisma/client";
import axios from "axios";
import { FC, useEffect, useState } from "react";
import TeacherData from "./components/TeacherData";

interface pageProps {
  params: { teacherId: string };
}

const page: FC<pageProps> = ({ params }) => {
  const [data, setData] = useState<Teacher[]>([]);
  useEffect(() => {
    console.log(params);
    const getData = async () => {
      const data = await axios.post("/api/my-teachers", {
        teacherId: params.teacherId,
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
        <TeacherData data={dataObject} />
      ))}
    </div>
  );
};

export default page;
