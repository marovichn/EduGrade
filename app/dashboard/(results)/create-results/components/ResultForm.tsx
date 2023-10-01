"use client";

import { FC } from "react";
import axios from "axios";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { toast } from "react-hot-toast";

import PageWrapper from "@/app/components/PageWrapper";
import { Group, Student, Subject } from "@prisma/client";
import SelectGroup from "./SelectGroup";
import Select from "@/app/components/inputs/Select";
import { grades } from "@/app/helpers/Grades";
import Button from "@/app/components/Button";
import Input from "@/app/components/inputs/Input";

interface ResultsFormProps {
  userRole: string | null | undefined;
  groups: Group[];
  students: Student[];
  subjects: Subject[];
}

const ResultsForm: FC<ResultsFormProps> = ({
  userRole,
  students,
  groups,
  subjects,
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState({ key: "A", value: "A" });

  const handleSelect = ({ key, value }: { key: string; value: string }) => {
    if (selectedGrade.key === key) {
      return;
    } else {
      setSelectedGrade({ key, value });
    }
  };

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
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (dataForm) => {
    setIsLoading(true);
    const data = { ...dataForm, value: selectedGrade.value };
    axios
      .post("/api/create-result", data)
      .then(() => {
        toast.success("Grade Added");
        router.push("/dashboard/my-students");
      })
      .catch(() => toast.error("Something went wrong!"))
      .finally(() => setIsLoading(false));
  };

  return (
    <div className='flex flex-col items-center justify-center -mt-10 lg:px-10 '>
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
          <div>
            <h1 className='mb-5'>Select Grade:</h1>
            <div className='w-full bg-gray-100 h-[104px] rounded-lg flex  lg:justify-around justify-center items-center gap-x-6 lg:gap-x-4'>
              {grades.map((grade) => (
                <div
                  onClick={() =>
                    handleSelect({ key: grade.key, value: grade.value })
                  }
                  key={grade.key}
                  className={
                    selectedGrade.key === grade.key
                      ? "w-20 h-20 flex items-center justify-center rounded-md  text-2xl bg-yellow-100 border-2 border-yellow-300 cursor-pointer"
                      : "w-20 h-20 flex items-center justify-center rounded-md bg-white text-2xl border-2 border-transparent hover:border-2 hover:border-yellow-300  cursor-pointer"
                  }
                >
                  {grade.value}
                </div>
              ))}
            </div>
          </div>
          <Select
            name='type'
            options={[
              "Exam",
              "Class Activity",
              "Group Project",
              "individual Project",
              "Other",
            ]}
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            id='type'
            label='Select Type of Grade'
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

export default ResultsForm;
