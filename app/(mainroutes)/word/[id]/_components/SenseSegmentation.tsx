import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { SenseSchema } from "@/app/schemas/Schema";
import { editSense } from "@/app/actions/PostActions";
import LabelSelector from "../../_components/LabelSelector";
import { MdEdit, MdExpandMore, MdExpandLess } from "react-icons/md";
import CitationSegmentation from "./CitationSegmentation";
import { SenseCheckbox } from "./ReviewManager";

export type InputSense = z.infer<typeof SenseSchema>;

const SenseSegmentation = ({
  worddetail,
  domaindata,
  posData,
  registerData,
  nameEntityData,
  bookData,
  Authordata,
  Editordata,
  Tertondata,
  Translatordata,
  PublisherData,
  printmethoddata,
  index,
}: any) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [citationIds, setCitationIds] = useState<string[]>([]);
  const [selectedDomainIds, setSelectedDomainIds] = useState<string[]>([]);

  useEffect(() => {
    if (worddetail?.sense[0]) {
      setCitationIds(
        worddetail.sense[0].citation?.map((cit: any) => cit.id) || [],
      );
      setSelectedDomainIds(
        worddetail.sense[0].domain?.map((domain: any) => domain.id) || [],
      );
    }
  }, [worddetail]);

  const mutation = useMutation({
    mutationFn: async (data: InputSense) => {
      if (worddetail?.sense[0]?.id) {
        const editData = {
          ...data,
          id: worddetail.sense[0].id,
          connect_citation_ids: citationIds,
          disconnect_citation_ids:
            worddetail.sense[0].citation
              ?.map((cit: any) => cit.id)
              .filter((id: any) => !citationIds.includes(id)) || [],
          connect_domain_ids: selectedDomainIds,
          disconnect_domain_ids:
            worddetail.sense[0].domain
              ?.map((domain: any) => domain.id)
              .filter((id: string) => !selectedDomainIds.includes(id)) || [],
        };
        return editSense(editData);
      }
    },
    onSuccess: () => {
      setIsEditing(false);
    },
    onError: (error) => {
      console.error("Error submitting form:", error);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<InputSense>({
    resolver: zodResolver(SenseSchema),
    mode: "onChange",
    defaultValues: {
      description: worddetail.sense[0]?.description || "",
      has_illustration: worddetail.sense[0]?.has_illustration || false,
      example_sentence: worddetail.sense[0]?.example_sentence || "",
      posId: worddetail.sense[0]?.posId || posData[0]?.id || "",
      name_entityId:
        worddetail.sense[0]?.name_entityId || nameEntityData[0]?.id || "",
      registerId: worddetail.sense[0]?.registerId || registerData[0]?.id || "",
      domainIds: [],
    },
  });

  const description = watch("description");
  const handleDomainSelection = (labels: any[]) => {
    const domainIds = labels.map((label) => label.id);
    setSelectedDomainIds(domainIds);
  };

  const handleFormSubmit = async (data: InputSense) => {
    try {
      const formattedData = {
        ...data,
        wordId: worddetail.id,
        domainIds: selectedDomainIds,
      };
      mutation.mutate(formattedData);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setSelectedDomainIds(
      worddetail.sense[0]?.domain?.map((domain: any) => domain.id) || [],
    );
  };

  const handleCitationsChange = (newCitationIds: string[]) => {
    setCitationIds(newCitationIds);
  };

  return (
    <div className="mb-4 border rounded-lg bg-white shadow-sm">
      <div
        className="flex justify-between items-center p-4 border-b cursor-pointer"
        onClick={() => !isEditing && setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-4">
          {isExpanded ? (
            <MdExpandLess className="text-xl" />
          ) : (
            <MdExpandMore className="text-xl" />
          )}
          <h2>འགྲེལ་བཤད།</h2>
          {!isExpanded && (
            <span className="text-gray-600 truncate max-w-md">
              {description || "No description"}
            </span>
          )}
        </div>
        <div className="flex items-center gap-x-2 justify-center">
          {!worddetail.is_reviewed && !isEditing ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsEditing(true);
                setIsExpanded(true);
              }}
              className="p-2.5 text-gray-600 hover:bg-gray-100 rounded"
            >
              <MdEdit />
            </button>
          ) : (
            <div>
              {!worddetail.is_reviewed && isEditing && (
                <div
                  className="flex gap-x-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={handleSubmit(handleFormSubmit)}
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
            </div>
          )}
          <SenseCheckbox index={index} />
        </div>
      </div>

      {isExpanded && (
        <>
          <form className="mt-6 space-y-6 p-4">
            <div className="space-y-4">
              <div className="flex w-full items-center">
                <label className="w-24">འགྲེལ་བ།</label>
                <textarea
                  className="flex-1 resize-none overflow-hidden border-b border-black outline-none"
                  rows={1}
                  {...register("description")}
                  disabled={!isEditing}
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
                  disabled={!isEditing}
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
                  disabled={!isEditing}
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
                  disabled={!isEditing}
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
                  disabled={!isEditing}
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
                    disabled={!isEditing}
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
                initialSelected={selectedDomainIds}
                domains={domaindata}
                disabled={!isEditing}
              />
            </div>
          </form>
          <div className="mt-6 p-3 border-t">
            <CitationSegmentation
              bookData={bookData}
              authorData={Authordata}
              Editordata={Editordata}
              Tertondata={Tertondata}
              Translatordata={Translatordata}
              PublisherData={PublisherData}
              printmethoddata={printmethoddata}
              onCitationsChange={handleCitationsChange}
              initialCitations={worddetail.sense[0]?.citation}
              disabled={!isEditing}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default SenseSegmentation;
