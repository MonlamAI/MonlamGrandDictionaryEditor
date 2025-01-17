"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { createPerson } from "@/app/actions/PostActions";
import { changetibnumtoreal, typeofMinaOptions } from "@/app/utils/util";
import Breadcrumb from "@/app/components/Card/BreadCrumb";
import Submits from "@/app/components/Buttons/Submit";
import SuccessMessage from "@/app/components/Card/SuccessMessage";
import { personSchema } from "@/app/schemas/Schema";

type InputMina = z.infer<typeof personSchema>;

const Person = () => {
  const router = useRouter();
  const [showSuccess, setShowSuccess] = React.useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<InputMina>({
    resolver: zodResolver(personSchema),
    mode: "onChange",
  });

  const mutation = useMutation({
    mutationFn: createPerson,
    onSuccess: () => {
      reset();
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        router.push("/");
      }, 3000);
    },
  });

  const onSubmit = async (data: InputMina) => {
    const convertedBirthYear = changetibnumtoreal(data.year_of_birth);
    const convertedDeathYear = changetibnumtoreal(data.year_of_death);
    mutation.mutate({
      ...data,
      year_of_birth: convertedBirthYear,
      year_of_death: convertedDeathYear,
    });
  };

  return (
    <div className="font-monlam sm:px-16 p-4">
      <Image
        src="/images/logo.webp"
        alt="Logo"
        width={64}
        height={64}
        className="rounded-md"
      />
      <p className="text-xl font-semibold mt-2">
        སྨོན་ལམ་ཚིག་མཛོད་ཆེན་མོ་རྩོམ་སྒྲིག་མ་ལག
      </p>

      <Breadcrumb name="མི་སྣ།" />

      <form onSubmit={handleSubmit(onSubmit)} className="mt-9 space-y-4 w-fit">
        <div className="flex items-center space-x-2">
          <label className="shrink-0">རིགས།</label>
          <select
            className="w-64 border-b border-black outline-none"
            {...register("type")}
          >
            {typeofMinaOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.type && (
            <span className="text-red-500 font-monlam text-sm ml-2">
              *{errors.type.message}
            </span>
          )}
        </div>

        <div className="flex items-center">
          <div className="flex items-center border-b border-black pb-2 w-full">
            <label>མིང་།</label>
            <input
              id="name"
              className="ml-2 outline-none w-64"
              {...register("name")}
              disabled={isSubmitting}
            />
          </div>
          {errors.name && (
            <span className="text-red-500 font-monlam text-sm ml-2">
              *{errors.name.message}
            </span>
          )}
        </div>

        <div className="flex items-center">
          <div className="flex items-center justify-between border-b border-black pb-2 w-64">
            <label>སྐྱེས་ལོ།</label>
            <input
              id="birthyear"
              className="outline-none "
              {...register("year_of_birth")}
              disabled={isSubmitting}
            />
          </div>
          {errors.year_of_birth && (
            <span className="text-red-500 text-sm   ml-2">
              *{errors.year_of_birth.message}
            </span>
          )}
        </div>

        <div className="flex items-center">
          <div className="flex items-center justify-between border-b border-black pb-2 w-64">
            <label htmlFor="deathDate">འདས་ལོ།</label>
            <input
              id="deathDate"
              className="outline-none "
              {...register("year_of_death")}
              disabled={isSubmitting}
            />
          </div>
          {errors.year_of_death && (
            <span className="text-red-500 text-sm ml-2">
              *{errors.year_of_death.message}
            </span>
          )}
        </div>

        <div className="flex items-center">
          <div className="flex items-center border-b border-black pb-2 w-full">
            <label htmlFor="race">མི་རིགས།</label>
            <input
              id="race"
              className="ml-2 outline-none w-64"
              {...register("nationality")}
              disabled={isSubmitting}
            />
          </div>
          {errors.nationality && (
            <span className="text-red-500 font-monlam text-sm ml-2">
              *{errors.nationality.message}
            </span>
          )}
        </div>

        <Submits disabled={isSubmitting || mutation.isPending} />
      </form>

      {mutation.isError && (
        <div className="bg-red-100 border w-fit right-0 absolute border-red-400 text-red-700 px-4 py-3 rounded-l-md mt-4">
          {mutation.error.message}
        </div>
      )}

      {showSuccess && <SuccessMessage />}
    </div>
  );
};

export default Person;
