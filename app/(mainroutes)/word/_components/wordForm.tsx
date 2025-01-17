"use client";

import React from "react";
import Submits from "@/app/components/Buttons/Submit";
import Toggle from "@/app/components/Buttons/Toggle";
import { WordSchema } from "@/app/schemas/Schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { createWord } from "@/app/actions/PostActions";
import SuccessMessage from "@/app/components/Card/SuccessMessage";

export type InputWord = z.infer<typeof WordSchema>;

interface WordFormProps {
  data: any;
  onSubmitSuccess: (wordId: number) => void;
  isSubmitted?: boolean;
}

const WordForm = ({ data, onSubmitSuccess, isSubmitted }: WordFormProps) => {
  const [showSuccess, setShowSuccess] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputWord>({
    resolver: zodResolver(WordSchema),
    mode: "onChange",
    defaultValues: {
      is_reviewed: false,
    },
  });

  const mutation = useMutation({
    mutationFn: createWord,
    onSuccess: (response) => {
      const wordId = response.data.id;
      setShowSuccess(true);
      onSubmitSuccess(wordId);
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    },
    onSettled: () => {
      setIsSubmitting(false);
    },
  });

  const onSubmit: SubmitHandler<InputWord> = (data) => {
    setIsSubmitting(true);
    mutation.mutate(data);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isSubmitted) return;

    // Instead of setting isSubmitting here, let the form validation run first
    handleSubmit(onSubmit)(e);
  };

  return (
    <>
      <form onSubmit={handleFormSubmit} className="w-fit">
        <div className="flex w-full items-center border-b border-black mt-4 pb-2">
          <label className="flex-shrink-0 w-fit">མ་ཚིག</label>
          <input
            className="ml-2 outline-none flex-grow"
            {...register("lemma")}
            disabled={isSubmitted}
          />
        </div>
        {errors.lemma && (
          <p className="text-red-500 text-sm">{errors.lemma.message}</p>
        )}
        <div className="flex max-sm:flex-col mt-4">
          <div className="flex mr-16">
            <div className="flex items-center">
              <p>མ་ཚིག་གསར་པ།</p>
              <div className="mb-2">
                <Toggle register={register} value="is_modern" />
              </div>
            </div>

            <div className="flex items-center">
              <p className="ml-12">རྒྱུན་སྤྱོད།</p>
              <div className="mb-2">
                <Toggle register={register} value="is_frequent" />
              </div>
            </div>
          </div>

          <div className="flex-1 flex items-center mt-1 space-x-2">
            <label className="shrink-0">འབྱུང་ཁུངས།</label>
            <select
              className="w-fit border-b border-black outline-none"
              {...register("originId")}
              disabled={isSubmitted}
            >
              {data.map((item: any) => (
                <option key={item.id} value={item.id}>
                  {item.language}
                </option>
              ))}
            </select>
          </div>
        </div>

        <input type="hidden" {...register("is_reviewed")} />

        <Submits disabled={isSubmitted || isSubmitting} />
      </form>
      {showSuccess && <SuccessMessage />}
    </>
  );
};

export default WordForm;
