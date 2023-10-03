"use client";

import { FC, useEffect, useState } from "react";
import UpdatesList from "../../../components/UpdatesList";
import axios from "axios";

interface UpdateDisplayProps {
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

const UpdateDisplay: FC<UpdateDisplayProps> = ({ user }) => {
  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    const storeData = async () => {
      const getData = async () => {
        const assignmentRes = await axios.get("/api/assignments");
        //@ts-ignore
        user?.groups.forEach(async (group) => {
          const groupRes = await axios.get(`/api/group/${group.id}`);
          const resultRes = await axios.post("/api/my-results", {
            groupId: group.id,
          });
          const attendanceRes = await axios.post("/api/my-attendances", {
            groupId: group.id,
          });
          const activitiesRes = await axios.post("/api/my-activities", {
            groupId: group.id,
          });
          const dataRes = [].concat(resultRes.data);
          const dataResultWithGroup: any = dataRes.map((data) => ({
            group: groupRes.data[0],
            data
          }));
          const data = [].concat(
            activitiesRes.data,
            attendanceRes.data,
            dataResultWithGroup
          );
          console.log(data);
          setData((p) => [...p, ...data]);
        });
        if (assignmentRes.status !== 200) {
          return;
        }
        const assignments = [].concat(...assignmentRes.data);
        setData((p) => [...p, ...assignments]);
      };
      await getData();
    };
    storeData();
  }, []);
  const dataSorted = data.sort((a: any, b: any) => {
    if (!a.date) {
      return Number(new Date(b.date)) - Number(new Date(a.dateStart));
    } else if (!b.date) {
      return Number(new Date(b.dateStart)) - Number(new Date(a.date));
    } else if (!a.date && !b.date) {
      return Number(new Date(b.dateStart)) - Number(new Date(a.dateStart));
    }
    return Number(new Date(b.date)) - Number(new Date(a.date));
  });
  return (
    <div>
      <div className='w-full fixed bg-white border-b-2 h-14 p-4 flex items-center justify-start font-bold z-10'>
        <h1>
          {user?.name} {user?.lastname} {"  "} ({user?.role})
        </h1>
      </div>
      <div className='pt-[56px] '>
        <UpdatesList data={dataSorted} />
      </div>
    </div>
  );
};

export default UpdateDisplay;
