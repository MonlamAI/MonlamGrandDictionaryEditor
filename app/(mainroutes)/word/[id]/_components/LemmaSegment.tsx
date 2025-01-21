import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { WordSchema } from "@/app/schemas/Schema";
import {
  MdEdit,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
} from "@/app/utils/Icon";
import Toggleedit from "./Toggleedit";
import { useMutation } from "@tanstack/react-query";
import { updateword } from "@/app/actions/PostActions";
import { LemmaCheckbox } from "./ReviewManager";

const LemmaDropdown = ({ origindata, worddetail }: any) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
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

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    handleSubmit(onSubmit)(e);
  };

  const onSubmit: SubmitHandler<any> = (data) => {
    updateMutation.mutate(data);
  };

  const updateMutation = useMutation({
    mutationFn: (data: any) => updateword(worddetail.id!, data),
    onSuccess: () => {
      setShowSuccess(true);
      setIsEditing(false);
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    },
  });

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className="mb-4 border rounded-lg bg-white shadow-sm">
      <div
        className="flex justify-between items-center p-4 border-b cursor-pointer hover:bg-gray-50"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2">
          {isExpanded ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
          <h2>མ་ཚིག</h2>
        </div>
        <div className="flex items-center gap-x-2 justify-center">
          {!worddetail.is_reviewed && !isEditing ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsEditing(true);
              }}
              className="p-2.5 text-gray-600 hover:bg-gray-100 rounded"
            >
              <MdEdit />
            </button>
          ) : (
            <>
              {!worddetail.is_reviewed && isEditing && (
                <div
                  className="flex gap-x-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={handleSubmit(onSubmit)}
                    className="cursor-pointer hover:bg-gray-100 shadow font-inter flex items-center border rounded-md duration-100 p-2"
                  >
                    <span className="text-sm text-gray-700 font-bold px-2">
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
            </>
          )}
          <LemmaCheckbox />
        </div>
      </div>

      {isExpanded && (
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
              <p className="text-red-500 text-sm">{errors.lemma?.message}</p>
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
                  {origindata.map((item: any) => (
                    <option key={item.id} value={item.id}>
                      {item.language}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </form>
        </div>
      )}

      {showSuccess && (
        <div className="w-full flex justify-end p-2 font-inter text-sm">
          <p className="w-fit text-end p-2 text-success-50 bg-success-600">
            Successfully Saved
          </p>
        </div>
      )}
    </div>
  );
};

export default LemmaDropdown;
