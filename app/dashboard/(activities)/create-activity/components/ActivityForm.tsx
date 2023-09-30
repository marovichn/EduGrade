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
import { activities } from "@/app/helpers/Grades";
import Button from "@/app/components/Button";
import Input from "@/app/components/inputs/Input";
import { LucideIcon, Smile } from "lucide-react";

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
  const [selectedActivity, setSelectedActivity] = useState({
    key: "Green",
    value: ">80%",
    Icon: Smile,
    color: "#79AC78",
  });

  const handleSelect = ({
    key,
    value,
    Icon,
    color,
  }: {
    key: string;
    value: string;
    Icon: LucideIcon;
    color: string;
  }) => {
    if (selectedActivity.key === key) {
      return;
    } else {
      setSelectedActivity({ key, value, Icon, color });
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
    const data = { ...dataForm, value: selectedActivity.value };
    axios
      .post("/api/create-activity", data)
      .then(() => {
        toast.success("Activity Added");
        router.push("/dashboard/students");
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
        <h1 className='text-4xl font-bold mb-10'>Add Activity:</h1>
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
            <h1 className='mb-5'>Select Activity:</h1>
            <div className='w-full bg-gray-100 h-[104px] rounded-lg flex  lg:justify-around justify-center items-center gap-x-6 lg:gap-x-4'>
              {activities.map((activity) => (
                <div
                  onClick={() =>
                    handleSelect({
                      key: activity.key,
                      value: activity.value,
                      Icon: activity.Icon,
                      color: activity.color,
                    })
                  }
                  key={activity.key}
                  className={
                    selectedActivity.key === activity.key
                      ? `w-20 h-20 flex items-center justify-center rounded-md  text-2xl bg-gray-50 border-2 border-yellow-300 cursor-pointer`
                      : "w-20 h-20 flex items-center justify-center rounded-md bg-white text-2xl border-2 border-transparent hover:border-2 hover:border-yellow-300  cursor-pointer"
                  }
                  style={{
                    borderColor: activity.color && activity.color,
                  }}
                >
                  <activity.Icon style={{ color: activity.color }} size={35} />
                </div>
              ))}
            </div>
          </div>
          <Select
            name='type'
            options={[
              "Class Activity",
              "Group Project Activity",
              "individual Project Activity",
              "Other Activity",
            ]}
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            id='type'
            label='Select Type of Activity'
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
