import Avatar from "@/app/components/Avatar";
import { Subject } from "@prisma/client";
import axios from "axios";
import { ShieldAlert, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC } from "react";
import toast from "react-hot-toast";

interface SubjectDataProps {
  data: Subject;
}

const SubjectData: FC<SubjectDataProps> = ({ data }) => {
  const router = useRouter();
  const handleDelete = async () => {
    try {
      const info = {
        id: data.id,
        role: "Subject",
      };
      if (!info) {
        return;
      }
      const res = await axios.delete("/api/delete", { data: info });
      if (res.status !== 200) {
        toast.error("Something went wrong");
      }
      toast.success("Successfully deleted!");
      router.push("/dashboard/subjects");
      
    } catch (err: any) {
      if (err?.status === 401) {
        toast.error("You are not allowed to do that!");
      }
      toast.error("Something went wrong");
    }
  };

  return (
    <div>
      <div
        className='p-5 w-full bg-gray-100 border-b-2 bg-opacity-50'
        style={{ backgroundColor: data.color ? data.color : "" }}
      >
        <div className='flex flex-col items-start justify-center w-full bg-white p-5 rounded-lg border-2'>
          <div className='font-bold text-3xl'>{data.name} ID card</div>
          <p>PID: {data.id.slice(0, 12)}</p>
        </div>
      </div>
      <button
        onClick={handleDelete}
        className='flex items-center justify-center gap-x-4 text-white font-bold bg-red-500 p-5 rounded-br-lg'
      >
        <Trash />
        Delete Subject ({data.name})
        <ShieldAlert size={20} />
      </button>
    </div>
  );
};

export default SubjectData;
