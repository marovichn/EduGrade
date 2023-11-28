"use client";

import { Session } from "next-auth";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
  session: Session;
}) {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    axios.get("/api/current-user").then((data) => setCurrentUser(data.data));
  }, []);

  return (
    <>
      <Navbar user={currentUser!} />
      <div className='mt-32'>{children}</div>
    </>
  );
}
