"use client";

import { FC, useEffect, useState } from "react";
import ResultsForm from "./ResultForm";
import axios from "axios";
import { Admin, Student, Teacher } from "@prisma/client";

interface CreateResultDisplayProps {
  user: {
    id: string;
    name: string | null;
    lastname: string | null;
    email: string | null;
    emailVerified: Date | null;
    image: string | null;
    hashedPassword: string | null;
    createdAt: Date;
    updatedAt: Date;
    role: string | null;
    code: string | null;
  } | null;
}

const CreateResultDisplay: FC<CreateResultDisplayProps> = ({ user }) => {
  const [groups, setGroups] = useState([]);
  useEffect(() => {
    const getGroups = async () => {
      const res = await axios.post("/api/my-groups", { user });
      if (res.status !== 200) {
        return;
      }
      setGroups(res.data);
    };
    getGroups();
  }, []);

  return (
    <>
      <ResultsForm groups={groups} userRole={user?.role} />
    </>
  );
};

export default CreateResultDisplay;
