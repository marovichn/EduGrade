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
          </form>
        </div>
      </div>
    </PageWrapper>
  );
};

export default ResultsForm;
