import { FC } from "react";
import UsersList from "@/app/components/UsersList";
import axios from "axios";
import { useEffect, useState } from "react";

interface MyTeachersDisplayProps {
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

const MyTeachersDisplay: FC<MyTeachersDisplayProps> = ({ user }) => {
  const [teachers, setTeachers] = useState([]);
  useEffect(() => {
    const getTeachers = async () => {
      const res = await axios.post("/api/my-teachers", { user });
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

export default MyTeachersDisplay;
