"use client";

import { FC, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuItem,
} from "@/app/components/ui/dropdown-menu";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { GroupColumn } from "./ColumnsGroups";
import AlertModal from "@/app/components/modals/AlertModal";
import { Button } from "@/app/components/ui/button";

interface CellActionProps {
  data: GroupColumn;
}

const CellAction: FC<CellActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const params = useParams();

  const deleteHandler = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/groups/${data.id}`);

      router.refresh();
      toast.success("Product deleted successfully");
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        loading={loading}
        onConfirm={deleteHandler}
        isOpen={open}
        onClose={() => setOpen(false)}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='h-8 w-8 p-0'>
            <span className='sr-only'>Open Menu</span>
            <MoreHorizontal className='h-4 w-4 ' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => router.push(`/dashboaard/groups/${params.groupId}`)}
          >
            <Edit className='mr-2 h-4 w-4' />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className='mr-2 -ml-1 h-6 w-6 bg-red-700/50 text-red-700 text-bold p-1 rounded-md' />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default CellAction;
