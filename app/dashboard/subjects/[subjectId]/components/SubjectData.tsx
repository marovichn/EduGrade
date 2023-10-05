import Avatar from "@/app/components/Avatar";
import { Subject } from "@prisma/client";
import { FC } from "react";

interface SubjectDataProps {
  data: Subject;
}

const SubjectData: FC<SubjectDataProps> = ({ data }) => {
  return (
    <div
      className='p-5 w-full bg-gray-100 border-b-2 bg-opacity-50'
      style={{ backgroundColor: data.color ? data.color : "" }}
    >
      <div className='flex flex-col items-start justify-center w-full bg-white p-5 rounded-lg border-2'>
        <div className='font-bold text-3xl'>{data.name} ID card</div>
        <p>PID: {data.id.slice(0, 12)}</p>
      </div>
    </div>
  );
};

export default SubjectData;
