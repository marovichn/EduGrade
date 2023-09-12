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

interface AuthFormProps {
  variant: Variant;
}

const AuthForm: FC<AuthFormProps> = ({ variant }) => {
  const session = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

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
            router.push("/conversations");
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
            router.push("/conversations");
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
          px-4
          py-8
          shadow
          sm:rounded-lg
          sm:px-10
        '
      >
        <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
          <div className='flex items-center justify-center gap-x-5 mb-10'>
            <div className="p-2 bg-black/70 rounded-lg">
              <MdCastForEducation className='w-12 h-12 text-yellow-300'></MdCastForEducation>
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
              {variant === "LOGIN" ? "Sign in to your account" : "Create User"}
            </h2>
          </div>
          {variant === "REGISTER" && (
            <Input
              disabled={isLoading}
              register={register}
              errors={errors}
              required
              id='name'
              label='Name'
            />
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
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
