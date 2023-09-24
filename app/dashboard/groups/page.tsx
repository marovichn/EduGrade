"use client";

import { FC, useEffect, useState } from "react";
import { GroupDataTable } from "@/app/components/GroupDataTable";
import { columns, GroupColumn } from "./components/ColumnsGroups";
import axios from "axios";
import PageWrapper from "@/app/components/PageWrapper";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  const [groups, setGroups] = useState([]);
  useEffect(() => {
    const getGroups = async () => {
      const res = await axios.get("/api/groups");
      if (res.status !== 200) {
        return;
      }
      setGroups(res.data);
    };
    getGroups();
  }, []);

  return (
    <PageWrapper>
      <GroupDataTable
        columns={columns}
        data={groups}
        searchKey='subject'
      ></GroupDataTable>
    </PageWrapper>
  );
};

export default page;
