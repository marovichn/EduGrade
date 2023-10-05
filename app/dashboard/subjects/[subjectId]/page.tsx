"use client";

import { Subject } from "@prisma/client";
import axios from "axios";
import { FC, useEffect, useState } from "react";
import SubjectData from "./components/SubjectData";

interface pageProps {
  params: { subjectId: string };
}

const page: FC<pageProps> = ({ params }) => {
  const [data, setData] = useState<Subject[]>([]);
  useEffect(() => {
    console.log(params);
    const getData = async () => {
      const data = await axios.post("/api/subject", {
        subjectId: params.subjectId,
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
        <SubjectData data={dataObject} />
      ))}
    </div>
  );
};

export default page;
