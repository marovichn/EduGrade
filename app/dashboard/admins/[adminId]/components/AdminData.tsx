import Avatar from "@/app/components/Avatar";
import { Admin } from "@prisma/client";
import { FC } from "react";

interface AdminDataProps {
  data: Admin;
}

const AdminData: FC<AdminDataProps> = ({ data }) => {
  return (
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
          <span className='font-bold'>{data.code ? data.code : "No code"}</span>
          {"  "}]
        </div>
      </div>
      <div className='flex flex-col items-end justify-center '>
        <div className='font-bold mt-4'>{data.role} ID card</div>
        <p>PID: {data.id.slice(0, 12)}</p>
      </div>
    </div>
  );
};

export default AdminData;
