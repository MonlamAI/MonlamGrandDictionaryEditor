import {
  getAuthor,
  getBook,
  getDomain,
  getEditor,
  getNameEntity,
  getOrigin,
  getPos,
  getPrintMethod,
  getPublisher,
  getRegister,
  getTerton,
  getTranslator,
  getworddetails,
} from "@/app/actions/GetActions";
import React from "react";
import Mainclient from "./_components/Mainclient";
const WordDynamic = async ({ params }: any) => {
  const decodedWord = decodeURIComponent(params.id as string);
  const worddetail = await getworddetails(decodedWord);
  const [
    domaindata,
    originData,
    posData,
    registerData,
    nameEntityData,
    bookdata,
    Authordata,
    Editordata,
    Tertondata,
    Translatordata,
    PublisherData,
    printmethoddata,
  ] = await Promise.all([
    getDomain(),
    getOrigin(),
    getPos(),
    getRegister(),
    getNameEntity(),
    getBook(),
    getAuthor(),
    getEditor(),
    getTerton(),
    getTranslator(),
    getPublisher(),
    getPrintMethod(),
  ]);

  return (
    <div className="max-w-4xl mx-auto p-4 font-monlam">
      <div className="flex flex-col items-center mb-8">
        <img src="/images/logo.webp" alt="Logo" className="w-16 rounded-md" />
        <p className="text-xl font-semibold mt-2">
          སྨོན་ལམ་ཚིག་མཛོད་ཆེན་མོ་རྩོམ་སྒྲིག་མ་ལག
        </p>
      </div>
      <Mainclient
        worddetail={worddetail}
        domdata={domaindata}
        bookData={bookdata}
        originData={originData}
        posData={posData}
        registerData={registerData}
        nameEntityData={nameEntityData}
        Authordata={Authordata}
        Editordata={Editordata}
        Tertondata={Tertondata}
        Translatordata={Translatordata}
        PublisherData={PublisherData}
        printmethoddata={printmethoddata}
      />
    </div>
  );
};

export default WordDynamic;
