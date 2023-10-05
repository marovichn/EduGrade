"use client";

import { Student } from "@prisma/client";
import axios from "axios";
import { FC, useEffect, useState } from "react";
import StudentData from "./components/StudentData";
import { getServerSession } from "next-auth";

interface pageProps {
  params: { studentId: string };
}

const page: FC<pageProps> =({ params }) => {
  const [data, setData] = useState<Student[]>([]);
  useEffect(() => {
    console.log(params);
    const getData = async () => {
      const data = await axios.post("/api/my-students", {
        studentId: params.studentId,
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
        <StudentData data={dataObject} />
      ))}
    </div>
  );
};

export default page;
