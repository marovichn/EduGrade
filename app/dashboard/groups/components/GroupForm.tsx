"use client";

import Variant from "@/types";
import { FC } from "react";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { MdCastForEducation } from "react-icons/md";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import Input from "@/app/components/inputs/Input";
import Button from "@/app/components/Button";
import { toast } from "react-hot-toast";
import Select from "@/app/components/inputs/Select";
import PageWrapper from "@/app/components/PageWrapper";
import SelectSpecific from "./SelectSpecific";
import { Student, Subject, Teacher } from "@prisma/client";
import SelectSpecificSubject from "./SelectSpecificSubject";

interface GroupFormProps {
  variant: Variant;
  teachers: Teacher[]
  students: Student[]
  subjects: Subject[]
}

const GroupForm: FC<GroupFormProps> = ({ variant, teachers, students, subjects }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      description: "",
      ends: "",
      teacher:"",
      subject:"",
      student:"",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    console.log(data)

    if (variant === "REGISTER") {
      axios
        .post("/api/create-group", data)
        .then(() => {
          toast.success("Group Created");
          router.push("/dashboard/groups");
        })
        .catch(() => toast.error("Something went wrong!"))
        .finally(() => setIsLoading(false));
    }

    if (variant === "LOGIN") {
      signIn("credentials", {
        ...data,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.error) {
            toast.error("Invalid credentials!");
          }

          if (callback?.ok) {
            router.push("/dashboard");
          }
        })
        .finally(() => setIsLoading(false));
    }
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
        '
        >
          <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
            <div className='flex items-center justify-center gap-x-5 mb-10'>
              <h2
                className=' 
            text-center 
            text-3xl 
            font-extrabold 
            tracking-tight 
            text-gray-900
          '
              >
                {variant === "LOGIN"
                  ? "Sign in to your account"
                  : "Create Group For EduGrade"}
              </h2>
            </div>
            {variant === "REGISTER" && (
              <>
                {/*        <Input
                  disabled={isLoading}
                  register={register}
                  errors={errors}
                  required
                  id='name'
                  label='Image'
                  placeholder='! Feature in construction, to be implemented !'
                /> */}
                <Input
                  disabled={isLoading}
                  register={register}
                  errors={errors}
                  required
                  id='name'
                  label='Name'
                />
                <Input
                  disabled={isLoading}
                  register={register}
                  errors={errors}
                  required
                  id='description'
                  label='Short Description'
                />
                <Input
                  disabled={isLoading}
                  register={register}
                  errors={errors}
                  required
                  id='ends'
                  label='When due?'
                  type="date"
                />
                <SelectSpecific
                  name='teacher'
                  options={teachers}
                  disabled={isLoading}
                  register={register}
                  errors={errors}
                  required
                  id='teacher'
                  label='Select Teacher'
                />
                <SelectSpecific
                  name='student'
                  options={students}
                  disabled={isLoading}
                  register={register}
                  errors={errors}
                  required
                  id='student'
                  label='Select Student'
                />
                <SelectSpecificSubject
                  name='subject'
                  options={subjects}
                  disabled={isLoading}
                  register={register}
                  errors={errors}
                  required
                  id='subject'
                  label='Select Subject'
                />
              </>
            )}
            <div>
              <Button disabled={isLoading} fullWidth type='submit'>
                {variant === "LOGIN" ? "Sign in" : "Create"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </PageWrapper>
  );
};

export default GroupForm;
