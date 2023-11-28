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

interface AuthFormProps {
  variant: Variant;
}

const AuthForm: FC<AuthFormProps> = ({ variant }) => {
  const session = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [test, setTest] = useState(false);

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/dashboard");
    }
  }, [session?.status, router]);

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
        .catch(() =>
          toast.error(
            "Something went wrong! Make sure you selected all the necessary fields."
          )
        )
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
    <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
      <div
        className='
        bg-white
          px-[50px]
          py-16
          pb-6
          shadow
          sm:rounded-lg
          sm:px-6
        '
      >
        <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
          <div className='flex items-center justify-center gap-x-5 mb-10'>
            <div className='p-2 bg-black/70 rounded-lg'>
              <MdCastForEducation className='w-12 h-12 text-yellow-300' />
            </div>
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
                : "Create User For EduGrade"}
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
        <div className='w-full flex items-center justify-center flex-col gap-y-3 p-2 pt-8 px-8'>
          {test && (
            <div className="transition">
              <div className='flex w-full flex-row justify-between'>
                <p className='flex flex-row gap-x-5 justify-between w-full'>
                  <div className='flex flex-col items-start w-full flex-1'>
                    <h1 className='font-bold'>Email Adress:</h1>
                    <p>edugradeadmin@lmn.dev</p>
                  </div>
                  <div className='flex flex-col items-start w-full flex-1 pl-6'>
                    <h1 className='font-bold'>Password:</h1>
                    <p>testadmin</p>
                  </div>
                </p>
              </div>
              <div className='flex w-full flex-row justify-between'>
                <p className='flex flex-row gap-x-5 justify-between w-full'>
                  <div className='flex flex-col items-start w-full flex-1'>
                    <h1 className='font-bold'>Email Adress:</h1>
                    <p>nikolastudent@lmn.dev</p>
                  </div>
                  <div className='flex flex-col items-start w-full flex-1 pl-10'>
                    <h1 className='font-bold'>Password:</h1>
                    <p>teststudent</p>
                  </div>
                </p>
              </div>
              <div className='flex w-full flex-row justify-between'>
                <p className='flex flex-row gap-x-5 justify-between w-full'>
                  <div className='flex flex-col items-start w-full flex-1 '>
                    <h1 className='font-bold'>Email Adress:</h1>
                    <p>nikolateacher@lmn.dev</p>
                  </div>
                  <div className='flex flex-col items-start w-full flex-1  pl-10'>
                    <h1 className='font-bold'>Password:</h1>
                    <p>testteacher</p>
                  </div>
                </p>
              </div>
            </div>
          )}
          <div className="mt-3">
            <Button onClick={() => setTest((p) => !p)}>
              {test ? "Hide" : "Show test accounts"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
