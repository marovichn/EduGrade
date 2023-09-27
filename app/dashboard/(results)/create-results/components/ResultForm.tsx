"use client";

import { FC } from "react";
import axios from "axios";
import {  useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { toast } from "react-hot-toast";

import PageWrapper from "@/app/components/PageWrapper";
import { Group } from "@prisma/client";
import SelectGroup from "./SelectGroup";
import Select from "@/app/components/inputs/Select";
import { grades } from "@/app/helpers/Grades";

interface ResultsFormProps {
  userRole: string | null | undefined;
  groups: Group[]
}

const ResultsForm: FC<ResultsFormProps> = ({ userRole, groups }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  if (!userRole || userRole !== "Teacher") {
    router.push("/dashboard");
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      group: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post("/api/register", data)
      .then(() => {
        toast.success("Admin Created");
        router.push("/dashboard/admins");
      })
      .catch(() => toast.error("Something went wrong!"))
      .finally(() => setIsLoading(false));
  };

  return (
    <PageWrapper>
      <div className='flex flex-col items-center justify-center -mt-10'>
        <div
          className='
        bg-white
          px-[50px]
          py-16
          pb-20
          sm:rounded-lg
          sm:px-6
          w-full
        '
        >
          <h1 className='text-4xl font-bold mb-10'>Add Grade:</h1>
          <form className='space-y-6 w-full' onSubmit={handleSubmit(onSubmit)}>
            <SelectGroup
              name='group'
              options={groups}
              disabled={isLoading}
              register={register}
              errors={errors}
              required
              id='role'
              label='Select Group (Student)'
            />
            <div>
                <h1 className="mb-5">Select Grade:</h1>
                <div className="w-full bg-gray-100 h-[104px] rounded-lg flex justify-around items-center gap-x-4">{grades.map((grade)=>(<div key={grade.key}  className="w-20 h-20 flex items-center justify-center rounded-md bg-white text-2xl
                border-2 border-transparent hover:border-2 hover:border-yellow-300">{grade.value}</div>))}</div>
            </div>
            <Select
              name='type'
              options={["Exam", "Class Activity", "Group Project", "individual Project", "Other"]}
              disabled={isLoading}
              register={register}
              errors={errors}
              required
              id='type'
              label='Select Type of Grade'
            />
          </form>
        </div>
      </div>
    </PageWrapper>
  );
};

export default ResultsForm;
