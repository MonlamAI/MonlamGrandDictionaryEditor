'use client'
import React, { useState } from "react";
import Breadcrumb from "@/app/components/Card/BreadCrumb";
import Status from "@/app/components/Status";
import { FaPlus } from "@/app/utils/Icon";
import WordForm from "./wordForm";
import Sense from "./Sense";
import SenseCard from "./SenseCard";

export default function WordClient({domaindata,bookData, originData, posData, registerData, nameEntityData,Authordata,Editordata,Tertondata,Translatordata,PublisherData,printmethoddata }: any) {
  const [isSenseOpen, setisSenseOpen] = useState(false);
  const [senses, setSenses] = useState<any[]>([]);
  const [editingSense, setEditingSense] = useState<any>(null);
  const [wordId, setWordId] = useState<number | null>(null);

  const handleAddSense = (senseData: any) => {
    if (editingSense) {
      setSenses(senses.map(sense => 
        sense.id === editingSense.id ? { ...senseData, id: editingSense.id } : sense
      ));
      setEditingSense(null);
    } else {
      setSenses([...senses, { ...senseData, id: Date.now() }]);
    }
    setisSenseOpen(false);
  };

  const handleEditSense = (sense: any) => {
    setEditingSense(sense);
    setisSenseOpen(true);
  };

  const handleWordSubmitSuccess = (id: number) => {
    setWordId(id);
    console.log('Word ID set in client:', id); 
  };

  return (
    <>
      <Breadcrumb name="ཚིག་གསར།" />
      <div className="mt-6">
        <Status statustype="pending" />
      </div>

      <WordForm data={originData} onSubmitSuccess={handleWordSubmitSuccess} />

      <button
        className={`flex text-sm p-2 justify-center items-center mt-8 w-fit rounded-md bg-surface-light border space-x-2 transition-all duration-150 ${
          wordId ? 'hover:opacity-80' : 'opacity-50 cursor-not-allowed'
        }`}
        onClick={() => {
          if (wordId) {
            setisSenseOpen(true);
            setEditingSense(null);
          }
        }}
        disabled={!wordId}
        type="button"
      >
        <p>འགྲེལ་བཤད།</p>
        <FaPlus className="w-4" />
      </button>

      {isSenseOpen && (
        <Sense
          onClose={() => setisSenseOpen(false)}
          onSubmit={handleAddSense}
          domaindata={domaindata}
          nameEntityData={nameEntityData}
          posData={posData}
          registerData={registerData}
          initialData={editingSense}
          bookData={bookData}
          wordId={wordId}
          Authordata={Authordata}
          Editordata={Editordata}
          Tertondata={Tertondata}
          Translatordata={Translatordata}
          PublisherData={PublisherData}
          printmethoddata={printmethoddata}
        />
      )}

      <div className="mt-8 space-y-4">
        {senses.map((sense) => (
          <SenseCard sense={sense} key={sense.id} handleEditSense={handleEditSense} />
        ))}
      </div>
    </>
  );
}