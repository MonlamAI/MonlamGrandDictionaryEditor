"use client";
import React, { useState } from "react";
import Breadcrumb from "@/app/components/Card/BreadCrumb";
import Status from "@/app/components/Status";
import { FaPlus } from "@/app/utils/Icon";
import WordForm from "./wordForm";
import Sense from "./Sense";

export default function WordClient({
  domaindata,
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
}: any) {
  const [isSenseOpen, setisSenseOpen] = useState(false);
  const [editingSense, setEditingSense] = useState<any>(null);
  const [wordId, setWordId] = useState<number | null>(null);
  const [senses, setSenses] = useState<any[]>([]);
  const [isWordSubmitted, setIsWordSubmitted] = useState(false);

  const handleAddSense = (senseData: any) => {
    if (editingSense) {
      setSenses((prevSenses) =>
        prevSenses.map((sense) =>
          sense.id === editingSense.id ? senseData : sense,
        ),
      );
      setEditingSense(null);
    } else {
      setSenses((prevSenses) => [...prevSenses, senseData]);
    }
    setisSenseOpen(false);
  };

  const handleEditSense = (sense: any) => {
    const transformedSense = {
      ...sense,
      citationIds: sense.citation
        ? sense.citation.map((cit: any) => cit.id)
        : [],
      domainIds: sense.domain
        ? sense.domain.map((domain: any) => domain.id)
        : [],
    };
    setEditingSense(transformedSense);
    setisSenseOpen(true);
  };
  const handleWordSubmitSuccess = (id: number) => {
    setWordId(id);
    setIsWordSubmitted(true);
  };

  const getPosName = (posId: string) => {
    const pos = posData.find((pos: any) => pos.id === posId);
    return pos ? pos.type : "";
  };

  return (
    <>
      <Breadcrumb name="ཚིག་གསར།" />
      <div className="mt-6">
        <Status statustype="pending" />
      </div>

      <WordForm
        data={originData}
        onSubmitSuccess={handleWordSubmitSuccess}
        isSubmitted={isWordSubmitted}
      />

      <button
        className={`flex text-sm p-2 justify-center items-center mt-8 w-fit rounded-md bg-surface-light border space-x-2 transition-all duration-150 ${
          wordId ? "hover:opacity-80" : "opacity-50 cursor-not-allowed"
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
          onClose={() => {
            setisSenseOpen(false);
            setEditingSense(null);
          }}
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
        {senses.map((sense, i) => (
          <div
            key={sense.id}
            className="border-b border-black w-3/5 rounded-sm shadow-sm p-2 bg-primary-50 font-monlam cursor-pointer"
            onClick={() => handleEditSense(sense)}
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center font-monlam gap-x-2">
                <p className="text-gray-600 text-sm">འགྲེལ་བ། {i + 1}</p>
                <h3 className="text-lg font-medium">{sense.description}</h3>
              </div>

              <div>
                {sense.posId && (
                  <p className="py-2 px-4 text-sm rounded-xl border border-black">
                    {getPosName(sense.posId)}
                  </p>
                )}
              </div>
            </div>
            {sense.citation && sense.citation.length > 0 && (
              <p className="text-sm text-gray-600 mt-2">
                མཆན་གྲངས། {sense.citation.length}
              </p>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
