'use client'
import React, { useState } from "react";
import Breadcrumb from "@/app/components/Card/BreadCrumb";
import Status from "@/app/components/Status";
import { FaPlus } from "@/app/utils/Icon";
import WordForm from "./wordForm";
import Sense from "./Sense";

export default function WordClient({ originData }: any) {
  const [isSenseOpen, setisSenseOpen] = useState(false);
  
  return (
    <>
      <Breadcrumb name="ཚིག་གསར།" />
      <div className="mt-6">
        <Status statustype="pending" />
      </div>
      
      <WordForm data={originData} />
      
      <button
        className="flex text-sm p-2 justify-center items-center mt-8 w-fit rounded-md bg-surface-light border space-x-2 transition-all duration-150 hover:opacity-80"
        onClick={() => setisSenseOpen(true)}
        type="button"
      >
        <p>འགྲེལ་བཤད།</p>
        <FaPlus className="w-4" />
      </button>
      
      {isSenseOpen && (
        <Sense
          isSenseOpen={isSenseOpen}
          onClose={() => setisSenseOpen(false)}
        />
      )}
    </>
  );
}