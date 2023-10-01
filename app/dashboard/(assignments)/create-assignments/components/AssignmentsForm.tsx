"use client";

import { FC } from "react";
import axios from "axios";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { toast } from "react-hot-toast";

import { Group, Student, Subject } from "@prisma/client";
import SelectGroup from "./SelectGroup";
import Select from "@/app/components/inputs/Select";
import Button from "@/app/components/Button";
import Input from "@/app/components/inputs/Input";

interface AssignmentsFormProps {
  userRole: string | null | undefined;
  groups: Group[];
  students: Student[];
  subjects: Subject[];
  date: Date | undefined;
}

const AssignmentsForm: FC<AssignmentsFormProps> = ({
  date,
  userRole,
  students,
  groups,
  subjects,
}) => {
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
      studentId: "",
      subjectId: "",
      description: "",
      type: "",
      groupId: "",
      points: "",
      done:"",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (dataForm) => {
    setIsLoading(true);
    const data = { ...dataForm, date };
    axios
      .post("/api/create-assignment", data)
      .then(() => {
        toast.success("Assignment Added");
        router.push("/dashboard/my-students");
      })
      .catch(() => toast.error("Something went wrong!"))
      .finally(() => setIsLoading(false));
  };

  return (
    <div className='flex flex-col items-center justify-center -mt-16 lg:px-10 w-full'>
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
            name='groupId'
            options={groups}
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            id='groupId'
            label='Select Group'
          />
          <SelectGroup
            name='studentId'
            options={students}
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            id='studentId'
            label='Select Student'
          />
          <SelectGroup
            name='subjectId'
            options={subjects}
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            id='subjectId'
            label='Select Subject'
          />
          <Input
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            type='number'
            id='points'
            min={1}
            label='Number of Points'
          />
          <Input
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            id='type'
            label='What is the Type of Assignment?'
          />
          <Input
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            id='description'
            label='Description of assignment:'
          />
          <Select
            name='done'
            options={["true", "false"]}
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            id='done'
            label='Finished?'
          />
          <div>
            <Button disabled={isLoading} fullWidth type='submit'>
              Add
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssignmentsForm;
