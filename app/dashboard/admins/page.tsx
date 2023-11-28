"use client"
import UsersList from "@/app/components/UsersList";
import axios from "axios";
import {  useEffect, useState } from "react";

const AdminsPage = () => {
  const [admins, setAdmins] = useState([]);
  useEffect(() => {
    const getAdmins = async () => {
      const res = await axios.get("/api/admins");
      if (res.status !== 200) {
        return;
      }
      setAdmins(res.data);
    };
    getAdmins();
  }, []);

  return (
    <div>
      <UsersList users={admins} roleUrl='admins'></UsersList>
    </div>
  );
};

export default AdminsPage;
