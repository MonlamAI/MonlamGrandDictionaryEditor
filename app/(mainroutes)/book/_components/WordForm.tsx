"use client";
import { createBook } from "@/app/actions/PostActions";
import Submits from "@/app/components/Buttons/Submit";
import SuccessMessage from "@/app/components/Card/SuccessMessage";
import { bookSchema } from "@/app/schemas/Schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import AutoSuggestion from "./AutoSuggestion";
import { changetibnumtoreal } from "@/app/utils/util";

type WordType = z.infer<typeof bookSchema>;
const WordForm = ({
  pubdata,
  EditorData,
  TertonData,
  TranslatorData,
  PrintMethodData,
  AuthorData,
}: any) => {
  const [showSuccess, setShowSuccess] = React.useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<WordType>({
    resolver: zodResolver(bookSchema),
    mode: "onChange",
  });

  const mutation = useMutation({
    mutationFn: createBook,
    onSuccess: () => {
      reset();
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        router.push("/");
      }, 2000);
    },
  });
  const onSubmit = async (data: WordType) => {
    const convertedYear = changetibnumtoreal(data.year_of_publish);
    mutation.mutate({
      ...data,
      year_of_publish: convertedYear,
    });
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="w-fit my-9">
        <div className="flex flex-col">
          <div className="flex w w-full items-center">
            <label className="w-24">མཚན་བྱང་།</label>
            <textarea
              className="flex-1 resize-none overflow-hidden border-b border-black outline-none"
              rows={1}
              {...register("title")}
              disabled={isSubmitting}
              onInput={(e: any) => {
                e.target.style.height = "auto";
                e.target.style.height = e.target.scrollHeight + "px";
              }}
            />
          </div>

          {errors.title && (
            <span className="text-red-500 font-monlam text-sm ml-2">
              *{errors.title.message}
            </span>
          )}
        </div>
        <div className="flex mt-3 max-sm:flex-col justify-between gap-4">
          <div className="flex flex-col">
            <div className="flex space-x-2  w-full items-center">
              <label className=" shrink-0">མཚན་བྱང་བསྡུས་པ།</label>
              <textarea
                className="flex-1 resize-none overflow-hidden border-b border-black outline-none"
                rows={1}
                {...register("abbreviated_title")}
                disabled={isSubmitting}
                onInput={(e: any) => {
                  e.target.style.height = "auto";
                  e.target.style.height = e.target.scrollHeight + "px";
                }}
              />
            </div>

            {errors.abbreviated_title && (
              <span className="text-red-500 font-monlam text-sm ml-2">
                *{errors.abbreviated_title.message}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <div className="flex items-center border-b border-black pb-2 w-fit">
              <label>པར་སྐྲུན་ལོ།</label>
              <input
                id="yearofpublish"
                className="ml-2 outline-none w-64"
                {...register("year_of_publish")}
                disabled={isSubmitting}
              />
            </div>
            {errors.year_of_publish && (
              <span className="text-red-500 font-monlam text-sm ml-2">
                *{errors.year_of_publish.message}
              </span>
            )}
          </div>
        </div>
        <div className="flex mt-3 max-sm:flex-col justify-between gap-4">
          <div className="flex flex-col">
            <div className="flex items-center border-b border-black pb-2 w-fit">
              <label>རྩོམ་སྒྲིག་གི་རྣམ་པ།</label>
              <input
                className="ml-2 outline-none text-lg w-64"
                {...register("collection_name")}
                disabled={isSubmitting}
              />
            </div>
            {errors.collection_name && (
              <span className="text-red-500 font-monlam text-sm ml-2">
                *{errors.collection_name.message}
              </span>
            )}
          </div>
          <div className="flex flex-col w-72">
            <div className="flex items-center space-x-2 border-b border-black pb-2">
              <label className="shrink-0">དཔར་སྐྲུན་བྱེད་སྟངས།</label>
              <select
                className={`w-64 outline-none ${errors.print_methodId ? "border-red-500" : ""}`}
                {...register("print_methodId")}
                disabled={isSubmitting}
              >
                {PrintMethodData.map((method: any) => (
                  <option className="text-sm" key={method.id} value={method.id}>
                    {method.name}
                  </option>
                ))}
              </select>
            </div>
            {errors.print_methodId && (
              <span className="text-red-500 text-sm mt-1">
                {errors.print_methodId.message}
              </span>
            )}
          </div>
        </div>
        <div className="flex max-sm:flex-col justify-between mt-3 gap-4">
          <AutoSuggestion
            label="རྩོམ་སྒྲིག་པ་མིང་།"
            name="editorId"
            data={EditorData}
            register={register}
            isSubmitting={isSubmitting}
          />

          <AutoSuggestion
            label="གཏེར་སྟོན་མིང་།"
            name="tertonId"
            data={TertonData}
            register={register}
            isSubmitting={isSubmitting}
          />
        </div>
        <div className="flex max-sm:flex-col justify-between mt-3 gap-4">
          <AutoSuggestion
            label="རྩོམ་པ་པོ་མིང་།"
            name="authorId"
            data={AuthorData}
            register={register}
            isSubmitting={isSubmitting}
          />

          <AutoSuggestion
            label="ལོ་ཙཱ་བ་མིང་།"
            name="translatorId"
            data={TranslatorData}
            register={register}
            isSubmitting={isSubmitting}
          />
        </div>
        <div className=" mt-2">
          <AutoSuggestion
            label="དཔེ་སྐྲུན་མིང་།"
            name="publisherId"
            data={pubdata}
            register={register}
            isSubmitting={isSubmitting}
            type="publisher"
          />
        </div>
        <div className="flex flex-col mt-3">
          <div className="flex items-center font-inter text-sm border-b border-black pb-2 w-fit">
            <label className=" font-bold">BDRC LINK</label>
            <input
              className="ml-2 outline-none w-64"
              {...register("digital_ref")}
              disabled={isSubmitting}
            />
          </div>
          {errors.digital_ref && (
            <span className="text-red-500 font-monlam text-sm ml-2">
              *{errors.digital_ref.message}
            </span>
          )}
        </div>
        <div className="mt-6">
          <Submits disabled={isSubmitting} />
        </div>
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

export default WordForm;
