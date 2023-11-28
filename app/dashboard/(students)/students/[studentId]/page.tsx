"use client";

import { Student } from "@prisma/client";
import axios from "axios";
import { FC, useEffect, useState } from "react";
import StudentData from "./components/StudentData";

interface PageProps {
  params: { studentId: string };
}

const Page: FC<PageProps> =({ params }) => {
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
  }, [params]);
  console.log();
  return (
    <div>
      {data.map((dataObject) => (
        <StudentData key={dataObject.id} data={dataObject} />
      ))}
    </div>
  );
};

export default Page;
