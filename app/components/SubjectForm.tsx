"use client";

import Variant from "@/types";
import { FC } from "react";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import Input from "@/app/components/inputs/Input";
import Button from "@/app/components/Button";
import { toast } from "react-hot-toast";
import Select from "@/app/components/inputs/Select";
import PageWrapper from "./PageWrapper";

interface SubjectFormProps {
  variant: Variant;
  userRole: string | null | undefined;
}

const SubjectForm: FC<SubjectFormProps> = ({ variant, userRole }) => {
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
      description: "",
      color: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    if (variant === "REGISTER") {
      axios
        .post("/api/create-subject", data)
        .then(() => {
          toast.success("Subject created.");
          router.push("/dashboard/subjects");
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
                  : "Create Subject For EduGrade"}
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
                  id='description'
                  label='Short Description'
                />
                <Select
                  name='color'
                  options={[
                    "#FF6633",
                    "#FFB399",
                    "#FF33FF",
                    "#FFFF99",
                    "#00B3E6",
                    "#E6B333",
                    "#3366E6",
                    "#999966",
                    "#99FF99",
                    "#B34D4D",
                    "#80B300",
                    "#809900",
                    "#E6B3B3",
                    "#6680B3",
                    "#66991A",
                    "#FF99E6",
                    "#CCFF1A",
                    "#FF1A66",
                    "#E6331A",
                    "#33FFCC",
                    "#66994D",
                    "#B366CC",
                    "#4D8000",
                    "#B33300",
                    "#CC80CC",
                    "#66664D",
                    "#991AFF",
                    "#E666FF",
                    "#4DB3FF",
                    "#1AB399",
                    "#E666B3",
                    "#33991A",
                    "#CC9999",
                    "#B3B31A",
                    "#00E680",
                    "#4D8066",
                    "#809980",
                    "#E6FF80",
                    "#1AFF33",
                    "#999933",
                    "#FF3380",
                    "#CCCC00",
                    "#66E64D",
                    "#4D80CC",
                    "#9900B3",
                    "#E64D66",
                    "#4DB380",
                    "#FF4D4D",
                    "#99E6E6",
                    "#6666FF",
                  ]}
                  disabled={isLoading}
                  register={register}
                  errors={errors}
                  required
                  id='color'
                  label='Select Subject color'
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

export default SubjectForm;
