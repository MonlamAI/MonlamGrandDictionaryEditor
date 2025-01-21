"use client";
import React from "react";
import LemmaSegment from "./LemmaSegment";
import SenseSegmentation from "./SenseSegmentation";
import { ReviewProvider, ReviewStatus } from "./ReviewManager";

const Mainclient = ({
  worddetail,
  domdata,
  bookData,
  originData,
  posData,
  registerData,
  nameEntityData,
  Authordata,
  Editordata,
  Tertondata,
  Translatordata,
  PublisherData,
  printmethoddata,
  userrole,
}: any) => {
  return (
    <ReviewProvider worddetail={worddetail} userRole={userrole}>
      <div>
        <div className="w-full flex justify-between items-center mb-2">
          <div className="flex text-sm gap-x-2 justify-between w-full items-center p-2 rounded-full">
            <ReviewStatus />
          </div>
        </div>
        <LemmaSegment origindata={originData} worddetail={worddetail} />
        {worddetail.sense.length > 0 && (
          <div>
            {worddetail.sense.map((sense: any, index: number) => (
              <SenseSegmentation
                key={sense.id || index}
                worddetail={{ ...worddetail, sense: [sense] }}
                domaindata={domdata}
                posData={posData}
                registerData={registerData}
                nameEntityData={nameEntityData}
                bookData={bookData}
                authorData={Authordata}
                TranslatorData={Translatordata}
                PublisherData={PublisherData}
                Editordata={Editordata}
                Tertondata={Tertondata}
                printmethoddata={printmethoddata}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </ReviewProvider>
  );
};

export default Mainclient;
