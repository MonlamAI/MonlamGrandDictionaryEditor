import React from "react";
import {
  getAuthor,
  getEditor,
  getPrintMethod,
  getPublisher,
  getTerton,
  getTranslator,
} from "@/app/actions/GetActions";
import BreadcrumbWrapper from "@/app/components/Card/BreadCrumb";
import WordForm from "./_components/WordForm";

const Word = async () => {
  const [
    PublisherData,
    AuthorData,
    EditorData,
    TertonData,
    TranslatorData,
    PrintMethodData,
  ] = await Promise.all([
    getPublisher(),
    getAuthor(),
    getEditor(),
    getTerton(),
    getTranslator(),
    getPrintMethod(),
  ]);
  return (
    <div className="font-monlam p-2 text-lg sm:ml-16 ml-4 mb-9">
      <img src="/images/logo.webp" className="w-16 rounded-md" alt="Logo" />
      <p className="text-xl font-semibold mt-2">
        སྨོན་ལམ་ཚིག་མཛོད་ཆེན་མོ་རྩོམ་སྒྲིག་མ་ལག
      </p>
      <BreadcrumbWrapper name="དཔེ་ཆ།" />
      <WordForm
        pubdata={PublisherData}
        EditorData={EditorData}
        AuthorData={AuthorData}
        TertonData={TertonData}
        TranslatorData={TranslatorData}
        PrintMethodData={PrintMethodData}
      />
    </div>
  );
};

export default Word;
