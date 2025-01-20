"use client";

import React from "react";
import Submits from "@/app/components/Buttons/Submit";
import Toggle from "@/app/components/Buttons/Toggle";
import { WordSchema } from "@/app/schemas/Schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { createWord, updateword } from "@/app/actions/PostActions";
import SuccessMessage from "@/app/components/Card/SuccessMessage";

export type InputWord = z.infer<typeof WordSchema>;

interface WordFormProps {
  data: any;
  onSubmitSuccess: (wordId: number) => void;
  isSubmitted?: boolean;
  wordid?: number;
}

const WordForm = ({
  data,
  onSubmitSuccess,
  isSubmitted,
  wordid,
}: WordFormProps) => {
  const [showSuccess, setShowSuccess] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputWord>({
    resolver: zodResolver(WordSchema),
    mode: "onChange",
    defaultValues: {
      lemma: data?.lemma || "",
      is_modern: data?.is_modern || false,
      is_frequent: data?.is_frequent || false,
      is_reviewed: data?.is_reviewed || false,
      originId: data?.originId || "1",
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

  const updateMutation = useMutation({
    mutationFn: (data: InputWord) => updateword(wordid!, data),
    onSuccess: () => {
      setShowSuccess(true);
      setIsEditing(false);
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    },
    onSettled: () => {
      setIsSubmitting(false);
    },
  });

  const handleCancel = () => {
    setIsSubmitting(false);
    setIsEditing(false);
  };

  const onSubmit: SubmitHandler<InputWord> = (data) => {
    setIsSubmitting(true);
    if (wordid) {
      updateMutation.mutate(data);
    } else {
      mutation.mutate(data);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isSubmitted) return;
    handleSubmit(onSubmit)(e);
  };

  const isInputDisabled = (): boolean => {
    if (isEditing) return false;
    return Boolean(isSubmitted || wordid);
  };

  return (
    <>
      {wordid && !isEditing && (
        <div className="w-2/3 flex justify-end">
          <button
            onClick={() => setIsEditing(true)}
            className="px-2.5 py-0.5 bg-secondary-400 hover:bg-secondary-600 cursor-pointer transition-colors text-primary-50 font-inter text-base rounded-sm"
          >
            Edit
          </button>
        </div>
      )}

      {wordid && isEditing && (
        <div className="w-2/3 flex gap-x-2 justify-end items-center">
          <button
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting}
            className="px-2.5 py-0.5 bg-secondary-400 hover:bg-secondary-600 cursor-pointer transition-colors text-primary-50 font-inter text-base rounded-sm"
          >
            save
          </button>
          <button
            onClick={handleCancel}
            className="px-2.5 py-0.5 bg-gray-500 hover:bg-gray-400 cursor-pointer transition-colors text-primary-50 font-inter text-base rounded-sm"
          >
            cancel
          </button>
        </div>
      )}

      <form onSubmit={handleFormSubmit} className="w-fit">
        <div className="flex w-full items-center border-b border-black mt-4 pb-2">
          <label className="flex-shrink-0 w-fit">མ་ཚིག</label>
          <input
            className="ml-2 outline-none flex-grow"
            {...register("lemma")}
            disabled={isInputDisabled()}
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
                <Toggle
                  register={register}
                  value="is_modern"
                  disabled={isInputDisabled()}
                />
              </div>
            </div>

            <div className="flex items-center">
              <p className="ml-12">རྒྱུན་སྤྱོད།</p>
              <div className="mb-2">
                <Toggle
                  register={register}
                  value="is_frequent"
                  disabled={isInputDisabled()}
                />
              </div>
            </div>
          </div>

          <div className="flex-1 flex items-center mt-1 space-x-2">
            <label className="shrink-0">འབྱུང་ཁུངས།</label>
            <select
              className="w-fit border-b border-black outline-none"
              {...register("originId")}
              disabled={isInputDisabled()}
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

        {!wordid && <Submits disabled={Boolean(isSubmitted || isSubmitting)} />}
      </form>

      {showSuccess && <SuccessMessage />}
    </>
  );
};

export default WordForm;
