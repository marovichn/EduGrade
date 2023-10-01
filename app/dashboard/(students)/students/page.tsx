"use client";

import UsersList from "@/app/components/UsersList";
import axios from "axios";
import {  useEffect, useState } from "react";


const page =() => {
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

  return (
    <div>
      <UsersList users={students} roleUrl='students'></UsersList>
    </div>
  );
};

export default page;
