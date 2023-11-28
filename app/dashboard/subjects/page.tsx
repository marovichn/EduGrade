"use client";

import SubjectsList from "@/app/components/SubjectsList";
import axios from "axios";
import { FC, useEffect, useState } from "react";

interface SubjectsPageProps {}

const SubjectsPage: FC<SubjectsPageProps> = ({}) => {
  const [subjects, setSubjects] = useState([]);
  useEffect(() => {
    const getSubjects = async () => {
      const res = await axios.get("/api/subjects");
      if (res.status !== 200) {
        return;
      }
      setSubjects(res.data);
    };
    getSubjects();
  }, []);

  return (
    <div>
      <SubjectsList subjects={subjects}></SubjectsList>
    </div>
  );
};

export default SubjectsPage;
