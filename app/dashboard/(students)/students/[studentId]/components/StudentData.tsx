import Avatar from "@/app/components/Avatar";
import { Student } from "@prisma/client";
import axios from "axios";
import { ShieldAlert, Trash } from "lucide-react";
import { getServerSession } from "next-auth";
import { useRouter } from "next/navigation";
import { FC } from "react";
import toast from "react-hot-toast";

interface StudentDataProps {
  data: Student;
}

const StudentData: FC<StudentDataProps> = ({ data }) => {
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
      router.push("/dashboard/students");
    } catch (err:any) {
      if(err?.response.status === 401){
        toast.error("You are not allowed to do that!");
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
            Short Biography: {"  "}
            <span className='font-bold'>
              {data.biography ? data.biography : "No biography"}
            </span>
          </div>
          <div>
            Adress: {"  "}
            <span className='font-bold'>
              {data.adress ? data.adress : "No adress data"}
            </span>
          </div>
          <div>
            Parent Name: {"  "}
            <span className='font-bold'>
              {data.parentName
                ? data.parentName
                : "No Parent Name Data Available"}
            </span>
          </div>
          <div>
            Parent Email: {"  "}
            <span className='font-bold'>
              {data.parentEmail
                ? data.parentEmail
                : "No Parent Email Data Available"}
            </span>
          </div>
          <div>
            Parent Phone Number: {"  "}
            <span className='font-bold'>
              {data.parentPhone
                ? data.parentPhone
                : "No Parent Phone Number Data Available"}
            </span>
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
        <ShieldAlert size={20}/>
      </button>
    </div>
  );
};

export default StudentData;
