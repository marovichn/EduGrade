"use client";

import { FC, useEffect, useState } from "react";
import { GroupDataTable } from "@/app/components/GroupDataTable";
import { columns, GroupColumn } from "./components/ColumnsGroups";
import axios from "axios";
import PageWrapper from "@/app/components/PageWrapper";
import Link from "next/link";
import { Group, Plus } from "lucide-react";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { useRouter } from "next/navigation";

interface pageProps {}

const page: FC<pageProps> =async ({}) => {
   const user = await getCurrentUser();
   const router = useRouter();

   if (user?.role !== "Admin") {
     router.push("/dashboard");
   }
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
      <div className='mb-16 text-4xl font-bold flex items-center justify-between'>
        <h1>
          All Groups on
          EduGrade:
        </h1>
        <Link
          href={`groups/create`}
          className='w-12 h-12 bg-yellow-300 flex items-center justify-center rounded-lg hover:bg-yellow-200 pl-1'
        >
          <Group /> <Plus className="w-3 h-3 mb-3"/>
        </Link>
      </div>
      <GroupDataTable
        columns={columns}
        data={groups}
        searchKey='name'
      ></GroupDataTable>
    </PageWrapper>
  );
};

export default page;
