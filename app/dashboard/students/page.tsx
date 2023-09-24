"use client";

import axios from "axios";
import { FC, useEffect, useState } from "react";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
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
  console.log(students)

  return <div></div>;
};

export default page;
