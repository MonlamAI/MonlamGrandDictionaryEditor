import { getOrigin, getworddetails } from "@/app/actions/GetActions";
import React from "react";
import Mainclient from "./_components/Mainclient";
const WordDynamic = async ({ params }: any) => {
  const decodedWord = decodeURIComponent(params.id as string);
  const worddetail = await getworddetails(decodedWord);
  const origindata = await getOrigin();
  return (
    <div className="max-w-4xl mx-auto p-4 font-monlam">
      <div className="flex flex-col items-center mb-8">
        <img src="/images/logo.webp" alt="Logo" className="w-16 rounded-md" />
        <p className="text-xl font-semibold mt-2">
          སྨོན་ལམ་ཚིག་མཛོད་ཆེན་མོ་རྩོམ་སྒྲིག་མ་ལག
        </p>
      </div>
      <Mainclient data={origindata} worddetail={worddetail} />
    </div>
  );
};

export default WordDynamic;
