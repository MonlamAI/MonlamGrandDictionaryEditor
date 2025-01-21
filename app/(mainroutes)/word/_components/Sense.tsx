"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { RxCross2 } from "@/app/utils/Icon";
import ReactPortal from "@/app/Wrapper/ReactPortal";
import { SenseSchema } from "@/app/schemas/Schema";
import CitationForm from "./Citation";
import { createSense, editSense } from "@/app/actions/PostActions";
import LabelSelector from "./LabelSelector";
import { Label, SenseProps } from "../_types/type";

export type InputSense = z.infer<typeof SenseSchema>;

const Sense = ({
  onClose,
  domaindata,
  posData,
  registerData,
  nameEntityData,
  onSubmit,
  initialData,
  wordId,
  bookData,
  Authordata,
  Editordata,
  Tertondata,
  Translatordata,
  PublisherData,
  printmethoddata,
}: SenseProps) => {
  const [citationIds, setCitationIds] = useState<string[]>(
    initialData?.citation?.map((cit) => cit.id) || [],
  );
  const [selectedDomainIds, setSelectedDomainIds] = useState<string[]>(() => {
    if (initialData?.domainIds) {
      return initialData.domainIds;
    }
    return initialData?.domain?.map((domain) => domain.id) || [];
  });
  const mutation = useMutation({
    mutationFn: async (data: InputSense) => {
      if (initialData?.id) {
        const editData = {
          ...data,
          id: initialData.id,
          connect_citation_ids: citationIds,
          disconnect_citation_ids:
            initialData.citation
              ?.map((cit) => cit.id)
              .filter((id) => !citationIds.includes(id)) || [],
          connect_domain_ids: selectedDomainIds,
          disconnect_domain_ids:
            initialData.domain
              ?.map((domain: any) => domain.id)
              .filter((id: string) => !selectedDomainIds.includes(id)) || [],
        };
        return editSense(editData);
      } else {
        const createData = {
          ...data,
          citationIds,
          domainIds: selectedDomainIds,
        };
        return createSense(createData);
      }
    },
    onSuccess: (response) => {
      const data = "data" in response ? response.data : response;
      onSubmit(data);
      reset();
      onClose();
    },
    onError: (error) => {
      console.error("Error submitting form:", error);
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<InputSense>({
    resolver: zodResolver(SenseSchema),
    mode: "onChange",
    defaultValues: initialData || {
      description: "",
      has_illustration: false,
      example_sentence: "",
      posId: posData[0]?.id || "",
      name_entityId: nameEntityData[0]?.id || "",
      registerId: registerData[0]?.id || "",
      domainIds: [],
    },
  });

  const handleDomainSelection = (labels: Label[]) => {
    const domainIds = labels.map((label) => label.id);
    setSelectedDomainIds(domainIds);
  };

  const handleFormSubmit = async (data: InputSense) => {
    try {
      const formattedData = {
        description: data.description,
        has_illustration: data.has_illustration,
        example_sentence: data.example_sentence,
        posId: String(data.posId),
        name_entityId: String(data.name_entityId),
        registerId: String(data.registerId),
        wordId: wordId,
        domainIds: selectedDomainIds,
      };

      mutation.mutate(formattedData);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleCitationsChange = (newCitationIds: string[]) => {
    setCitationIds(newCitationIds);
  };

  return (
    <ReactPortal wrapperId="sense-wrapper">
      <div className="fixed z-40 inset-0 bg-black/50 flex items-start justify-center overflow-hidden font-monlam">
        <div className="bg-white relative w-full max-w-4xl mx-4 my-8 max-h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="p-8">
            <div className="flex justify-between items-center border-b border-gray-200 py-4 z-40 sticky top-0 bg-white">
              <h2 className="text-xl">འགྲེལ་བཤད།</h2>
              <button
                type="button"
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <RxCross2 />
              </button>
            </div>

            <form
              onSubmit={handleSubmit(handleFormSubmit)}
              className="mt-6 space-y-6"
              autoComplete="off"
            >
              <div className="space-y-4">
                <div className="flex w-full items-center">
                  <label className="w-24">འགྲེལ་བ།</label>
                  <textarea
                    className="flex-1 resize-none overflow-hidden border-b border-black outline-none"
                    rows={1}
                    {...register("description")}
                    onInput={(e: any) => {
                      e.target.style.height = "auto";
                      e.target.style.height = e.target.scrollHeight + "px";
                    }}
                  />
                </div>
                {errors.description && (
                  <p className="text-red-500 text-sm">
                    {errors.description.message}
                  </p>
                )}

                <div className="flex w-full items-center">
                  <label className="w-24">དཔེར་བརྗོད་ཚིག་གྲུབ།</label>
                  <textarea
                    className="flex-1 resize-none overflow-hidden border-b border-black outline-none"
                    rows={1}
                    {...register("example_sentence")}
                    onInput={(e: any) => {
                      e.target.style.height = "auto";
                      e.target.style.height = e.target.scrollHeight + "px";
                    }}
                  />
                </div>
                {errors.example_sentence && (
                  <p className="text-red-500 text-sm">
                    {errors.example_sentence.message}
                  </p>
                )}
              </div>

              <div className="flex space-x-4">
                <div className="flex-1 flex items-center space-x-2">
                  <label className="shrink-0">བརྡ་སྤྲོད་དབྱེ་བའི་སྡེ་ཚན།</label>
                  <select
                    className="w-full border-b border-black outline-none pb-2"
                    {...register("posId")}
                  >
                    {posData.map((item: any) => (
                      <option key={item.id} value={item.id}>
                        {item.type}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex-1 flex items-center space-x-2">
                  <label className="shrink-0">སྤྱོད་སྒོ།</label>
                  <select
                    className="w-full border-b border-black outline-none pb-2"
                    {...register("registerId")}
                  >
                    {registerData.map((item: any) => (
                      <option key={item.id} value={item.id}>
                        {item.type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex space-x-4">
                <div className="flex-1 flex items-center space-x-2">
                  <label className="shrink-0">མིང་གི་རྣམ་གྲངས།</label>
                  <select
                    className="w-full border-b border-black outline-none pb-2"
                    {...register("name_entityId")}
                  >
                    {nameEntityData.map((item: any) => (
                      <option key={item.id} value={item.id}>
                        {item.type}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center space-x-4">
                  <span className="text-gray-700">པར་རིས་དགོས།</span>
                  <label className="relative inline-block w-12 h-6 cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      {...register("has_illustration")}
                    />
                    <span className="absolute inset-0 bg-gray-300 rounded-full transition-colors duration-300 ease-in-out peer-checked:bg-blue-500" />
                    <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ease-in-out peer-checked:translate-x-6" />
                  </label>
                </div>
              </div>
              <div className="space-y-2">
                <label>བརྡ་ཆད་དབྱེ་བའི་སྡེ་ཚན།</label>
                <LabelSelector
                  onSelectionChange={handleDomainSelection}
                  initialSelected={initialData?.domainIds}
                  domains={domaindata}
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-600"
                  disabled={isSubmitting}
                >
                  {initialData ? "ཞུ་དག" : "ཉར་ཚགས།"}
                </button>
              </div>
            </form>

            <CitationForm
              bookData={bookData}
              authorData={Authordata}
              Editordata={Editordata}
              Tertondata={Tertondata}
              Translatordata={Translatordata}
              PublisherData={PublisherData}
              printmethoddata={printmethoddata}
              onCitationsChange={handleCitationsChange}
              initialCitations={initialData?.citation}
            />
          </div>
        </div>
      </div>
    </ReactPortal>
  );
};

export default Sense;
