"use client";

import React from "react";
import { MdEdit } from "@/app/utils/Icon";
import { SubmitHandler, useForm } from "react-hook-form";
import { InputWord } from "../../_components/wordForm";
import { useMutation } from "@tanstack/react-query";
import { updateword } from "@/app/actions/PostActions";
import { zodResolver } from "@hookform/resolvers/zod";
import { WordSchema } from "@/app/schemas/Schema";
import Toggleedit from "./Toggleedit";
import Status from "@/app/components/Status";

const Mainclient = ({ data, worddetail }: any) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [showSuccess, setShowSuccess] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputWord>({
    resolver: zodResolver(WordSchema),
    mode: "onChange",
    defaultValues: {
      lemma: worddetail?.lemma || "",
      is_modern: worddetail?.is_modern || false,
      is_frequent: worddetail?.is_frequent || false,
      is_reviewed: worddetail?.is_reviewed || false,
      originId: worddetail?.originId || "1",
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: InputWord) => updateword(worddetail.id!, data),
    onSuccess: () => {
      setShowSuccess(true);
      setIsEditing(false);
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    },
  });

  const onSubmit: SubmitHandler<InputWord> = (data) => {
    updateMutation.mutate(data);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    handleSubmit(onSubmit)(e);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleReviewChanges = () => {
    updateMutation.mutate({ ...worddetail, is_reviewed: true });
  };

  return (
    <div>
      <div className=" w-full flex justify-between items-center mb-2 ">
        <div className="flex text-sm gap-x-2 justify-between w-full items-center p-2 rounded-full ">
          <span className="p-2 rounded flex items-center gap-x-2">
            <p>Status:</p>
            {worddetail.is_reviewed == false ? (
              <Status statustype="pending" />
            ) : (
              <Status statustype="reviewed" />
            )}
          </span>
          <button
            className=" bg-success-400 text-success-50 font-inter px-2 py-1 rounded-md"
            // onClick={handleReviewChanges}
          >
            Review Changes
          </button>
        </div>
      </div>
      <div className="mb-4 border rounded-lg bg-white shadow-sm">
        <div className="flex justify-between items-center p-4 border-b">
          <h2>མ་ཚིག</h2>
          <div className="flex items-center gap-x-2 justify-center">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="p-2.5 text-gray-600 hover:bg-gray-100 rounded"
              >
                <MdEdit />
              </button>
            ) : (
              <div className="flex gap-x-2">
                <button
                  onClick={handleSubmit(onSubmit)}
                  className="cursor-pointer  hover:bg-gray-100 shadow font-inter flex items-center  border rounded-md duration-100 p-2"
                >
                  <span className="text-sm  text-gray-700 font-bold px-2">
                    Save
                  </span>
                </button>
                <button
                  onClick={handleCancel}
                  className="px-2.5 py-0.5 cursor-pointer transition-colors text-gray-900 font-inter text-base rounded-md"
                >
                  Cancel
                </button>
              </div>
            )}
            <input
              type="checkbox"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="p-4">
          <form onSubmit={handleFormSubmit} className="w-fit">
            <div className="flex w-full items-center border-b border-black mt-4 pb-2">
              <label className="flex-shrink-0 w-fit">མ་ཚིག</label>
              <input
                className="ml-2 outline-none flex-grow"
                {...register("lemma")}
                disabled={!isEditing}
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
                    <Toggleedit
                      register={register}
                      value="is_modern"
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="flex items-center">
                  <p className="ml-12">རྒྱུན་སྤྱོད།</p>
                  <div className="mb-2">
                    <Toggleedit
                      register={register}
                      value="is_frequent"
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </div>

              <div className="flex-1 flex items-center mt-1 space-x-2">
                <label className="shrink-0">འབྱུང་ཁུངས།</label>
                <select
                  className="w-fit border-b border-black outline-none"
                  {...register("originId")}
                  disabled={!isEditing}
                >
                  {data.map((item: any) => (
                    <option key={item.id} value={item.id}>
                      {item.language}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </form>
        </div>
        {showSuccess && (
          <div className=" w-full  flex justify-end p-2 font-inter text-sm">
            {" "}
            <p className=" w-fit text-end p-2 text-success-50 bg-success-600">
              Successfully Saved
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Mainclient;
