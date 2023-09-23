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
import PageWrapper from "./PageWrapper";

interface AuthFormProps {
  variant: Variant;
  userRole: string | null | undefined;
}

const AuthForm: FC<AuthFormProps> = ({ variant, userRole }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  if (!userRole || userRole !== "Admin") {
    router.push("/students");
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      role: "",
      email: "",
      password: "",
      lastname: "",
      adress: "",
      parentName: "",
      parentEmail: "",
      parentPhone: "",
      biography:"",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    if (variant === "REGISTER") {
      axios
        .post("/api/register", data)
        .then(() =>
          signIn("credentials", {
            ...data,
            redirect: false,
          })
        )
        .then((callback) => {
          if (callback?.error) {
            toast.error("Invalid credentials!");
          }

          if (callback?.ok) {
            router.push("/dashboard");
          }
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
      <div className='flex flex-col items-center justify-center'>
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
                  : "Create Student Profile For EduGrade"}
              </h2>
            </div>
            {variant === "REGISTER" && (
              <>
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
                  id='lastname'
                  label='Last Name'
                />
                <Input
                  disabled={isLoading}
                  register={register}
                  errors={errors}
                  required
                  id='adress'
                  label='Adress'
                />
                <Input
                  disabled={isLoading}
                  register={register}
                  errors={errors}
                  required
                  id='parentName'
                  label='Parents Name'
                />
                <Input
                  disabled={isLoading}
                  register={register}
                  errors={errors}
                  required
                  id='parentEmail'
                  label='Parents Email'
                />
                <Input
                  disabled={isLoading}
                  register={register}
                  errors={errors}
                  required
                  id='biography'
                  label='Short Biography'
                />

                <Input
                  disabled={isLoading}
                  register={register}
                  errors={errors}
                  required
                  id='parentPhone'
                  label='Parents Phone Number'
                />
                <Select
                  name='role'
                  options={["Admin", "Student", "Teacher"]}
                  disabled={isLoading}
                  register={register}
                  errors={errors}
                  required
                  id='role'
                  label='Select Users Role'
                />
              </>
            )}
            <Input
              disabled={isLoading}
              register={register}
              errors={errors}
              required
              id='email'
              label='Email address'
              type='email'
            />
            <Input
              disabled={isLoading}
              register={register}
              errors={errors}
              required
              id='password'
              label='Password'
              type='password'
            />
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

export default AuthForm;
