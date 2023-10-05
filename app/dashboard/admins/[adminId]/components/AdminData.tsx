import Avatar from "@/app/components/Avatar";
import { Admin } from "@prisma/client";
import axios from "axios";
import { ShieldAlert, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC } from "react";
import toast from "react-hot-toast";

interface AdminDataProps {
  data: Admin;
}

const AdminData: FC<AdminDataProps> = ({ data }) => {
  const router = useRouter();
  const handleDelete = async () => {
    try {
      const info = {
        id: data.id,
        role: data.role,
      };
      if (!info) {
        return;
      }
      const res = await axios.delete("/api/delete", { data: info });
      if (res.status !== 200) {
        toast.error("Something went wrong");
      }
      toast.success("Successfully deleted!");
      router.push("/dashboard/admins");
    } catch (err: any) {
      if (err?.response.status === 401) {
        toast.error("You are not allowed to do that!");
      }
      if (err?.response.status === 403) {
        toast.error(
          "You can't delete last admin! There must be at least one admin!"
        );
      }
      toast.error("Something went wrong");
    }
  };

  return (
    <div>
      <div className='p-5 w-full bg-gray-100 border-b-2'>
        <div className='flex items-center justify-between'>
          <div>
            <div className='flex flex-col items-center justify-center'></div>
            <h1 className='text-2xl font-bold'>
              {data.name} {data.lastname && data.lastname}
            </h1>
            <p>{data.email}</p>
            <p>Role: {data.role}</p>
          </div>
          <div className='m-5'>
            <Avatar />
          </div>
        </div>
        <div className='flex flex-col items-start justify-center w-full bg-white p-5 rounded-lg border-2 mt-5'>
          <div>
            On EduGrade from: {"  "}
            <span className='font-bold'>
              {new Date(data.createdAt).toDateString()}
            </span>
          </div>
          <div>
            Degrees: {"  "}
            <span className='font-bold'>{"No degrees"}</span>
          </div>
          <div>
            Experience: {"  "}
            <span className='font-bold'>{"No experience"}</span>
          </div>
          <div>
            Unique code: {"  "}[{"  "}
            <span className='font-bold'>
              {data.code ? data.code : "No code"}
            </span>
            {"  "}]
          </div>
        </div>
        <div className='flex flex-col items-end justify-center '>
          <div className='font-bold mt-4'>{data.role} ID card</div>
          <p>PID: {data.id.slice(0, 12)}</p>
        </div>
      </div>
      <button
        onClick={handleDelete}
        className='flex items-center justify-center gap-x-4 text-white font-bold bg-red-500 p-5 rounded-br-lg'
      >
        <Trash />
        Delete {data.role}
        <ShieldAlert size={20} />
      </button>
    </div>
  );
};

export default AdminData;
