"use client";

import { FC, useEffect, useState } from "react";
import GroupForm from "../components/GroupForm";
import axios from "axios";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  useEffect(() => {
    const getTeachers = async () => {
      const res = await axios.get("/api/teachers");
      if (res.status !== 200) {
        return;
      }
      setTeachers(res.data);
    };

    const getStudents = async () => {
      const res = await axios.get("/api/students");
      if (res.status !== 200) {
        return;
      }
      setStudents(res.data);
    };

    const getSubjects = async () => {
      const res = await axios.get("/api/subjects");
      if (res.status !== 200) {
        return;
      }
      setSubjects(res.data);
    };
    getTeachers();
    getStudents();
    getSubjects();
  }, []);

  return (
    <GroupForm
      teachers={teachers}
      students={students}
      subjects={subjects}
      variant='REGISTER'
    />
  );
};

export default page;
