import { getworddetails } from "@/app/actions/GetActions";
import React from "react";

const Worddynamic = async ({ params }: any) => {
  const decodedWord = decodeURIComponent(params.id as string);
  const worddetail = await getworddetails(decodedWord);
  return (
    <div className=" flex flex-col items-center w-full h-40 justify-center font-monlam">
      <p>WORD:{worddetail.lemma}</p>
      <p>ORIGIN:{worddetail.origin?.language}</p>
    </div>
  );
};

export default Worddynamic;
