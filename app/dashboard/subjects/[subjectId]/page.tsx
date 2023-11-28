"use client";

import { Subject } from "@prisma/client";
import axios from "axios";
import { FC, useEffect, useState } from "react";
import SubjectData from "./components/SubjectData";

interface SubjectIdPageProps {
  params: { subjectId: string };
}

const SubjectIdPage: FC<SubjectIdPageProps> = ({ params }) => {
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
  }, [params]);
  console.log();
  return (
    <div>
      {data.map((dataObject) => (
        <SubjectData key={dataObject.id} data={dataObject} />
      ))}
    </div>
  );
};

export default SubjectIdPage;
