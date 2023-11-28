"use client";

import { GroupDataTable } from "@/app/components/GroupDataTable";
import { FC, useEffect, useState } from "react";
import { GroupColumn } from "./ColumnsGroups";
import axios from "axios";
import { Admin, Student, Teacher } from "@prisma/client";

interface GroupDisplayProps {
  columns: GroupColumn[] | any;
  user: Student | Admin | Teacher | null | undefined;
}

const GroupDisplay: FC<GroupDisplayProps> = ({ columns, user }) => {
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
  }, [user]);

  return (
    <GroupDataTable
      columns={columns}
      data={groups}
      searchKey='name'
    ></GroupDataTable>
  );
};

export default GroupDisplay;
