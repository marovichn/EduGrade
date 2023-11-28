"use client";

import UsersList from "@/app/components/UsersList";
import axios from "axios";
import {  useEffect, useState } from "react";

const TeachersPage = () => {
  const [teachers, setTeachers] = useState([]);
  useEffect(() => {
    const getTeachers = async () => {
      const res = await axios.get("/api/teachers");
      if (res.status !== 200) {
        return;
      }
      setTeachers(res.data);
    };
    getTeachers();
  }, []);

  return (
    <div>
      <UsersList users={teachers} roleUrl='teachers'></UsersList>
    </div>
  );
};

export default TeachersPage;
