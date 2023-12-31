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

interface AttendanceFormProps {
  userRole: string | null | undefined;
  groups: Group[];
  students: Student[];
  subjects: Subject[];
  date: Date | undefined;
}

const AttendanceForm: FC<AttendanceFormProps> = ({
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
      numberOfClasses: 0,
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (dataForm) => {
    setIsLoading(true);
    const data = { ...dataForm, date };
    axios
      .post("/api/add-attendance", data)
      .then(() => {
        toast.success("Attendance Added");
        router.push("/dashboard/my-students");
      })
      .catch(() =>
        toast.error(
          "Something went wrong! Make sure you selected all the necessary fields."
        )
      )
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
            id='numberOfClasses'
            min={1}
            label='Number of Classes'
          />
          <Select
            name='type'
            options={["Regulated", "Unregulated", "Unjustified"]}
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            id='type'
            label='Select Type of Attendance'
          />
          <Input
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            id='description'
            label='Short Description'
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

export default AttendanceForm;
