import { SenseSchema } from "@/app/schemas/Schema";
import ReactPortal from "@/app/Wrapper/ReactPortal";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { RxCross2 } from "@/app/utils/Icon";
import { z } from "zod";
import CitationForm from "./Citation";
import { useMutation } from "@tanstack/react-query";
import { createSense, editSense } from "@/app/actions/PostActions";

export type InputSense = z.infer<typeof SenseSchema>;

interface SenseProps {
  onClose: () => void;
  domaindata: any;
  posData: any;
  registerData: any;
  nameEntityData: any;
  onSubmit: (data: InputSense) => void;
  initialData?: InputSense & { id?: string; citation?: any[] };
  wordId: any;
  bookData: any;
  Authordata: any;
  Editordata: any;
  Tertondata: any;
  Translatordata: any;
  PublisherData: any;
  printmethoddata: any;
}

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
  const [selectedParent, setSelectedParent] = useState<string>(
    initialData?.domainIds?.[0] || "",
  );
  // useEffect(() => {
  //   console.log("Component mounted with initialData:", initialData);
  //   console.log("Initial ID:", initialData?.id);
  // }, [initialData]);
  const mutation = useMutation({
    mutationFn: async (data: InputSense) => {
      if (initialData?.id) {
        // console.log("Editing sense with ID:", data.id);
        return editSense({
          ...data,
          id: initialData.id,
          connect_citation_ids: citationIds,
          disconnect_citation_ids:
            initialData.citation
              ?.map((cit) => cit.id)
              .filter((id) => !citationIds.includes(id)) || [],
          connect_domain_ids: data.domainIds,
          disconnect_domain_ids:
            initialData.domainIds?.filter(
              (id: string) => !data.domainIds.includes(id),
            ) || [],
        });
      } else {
        return createSense({ ...data, citationIds });
      }
    },
    onSuccess: (response) => {
      // console.log("Success sensecreted:", response);
      // Check if the response has a data property (from createSense)
      const data = "data" in response ? response.data : response;
      onSubmit(data);
      reset();
      onClose();
    },
    onError: (error) => {
      console.error("Error submitting form:", error);
    },
  });
  const editMutation = useMutation({
    mutationFn: async (data: InputSense & { id: string }) => {
      // console.log("Editing sense:", data);
      // console.log("Initial data ID:", initialData?.id);
      if (!initialData?.id) throw new Error("No ID provided for edit");
      const editPayload: any = {
        description: data.description,
        has_illustration: data.has_illustration,
        example_sentence: data.example_sentence,
        posId: data.posId,
        name_entityId: data.name_entityId,
        registerId: data.registerId,
      };
      if (citationIds.length > 0) {
        editPayload.connect_citation_ids = citationIds;
      }

      if (initialData?.citation?.length > 0) {
        const disconnectIds = initialData.citation
          .map((cit: any) => cit.id)
          .filter((id) => !citationIds.includes(id));
        if (disconnectIds.length > 0) {
          editPayload.disconnect_citation_ids = disconnectIds;
        }
      }

      if (data.domainIds?.length > 0) {
        editPayload.connect_domain_ids = data.domainIds;
      }

      if (initialData?.domainIds?.length > 0) {
        const disconnectDomains = initialData.domainIds.filter(
          (id: string) => !data.domainIds.includes(id),
        );
        if (disconnectDomains.length > 0) {
          editPayload.disconnect_domain_ids = disconnectDomains;
        }
      }

      // console.log("Edit payload:", editPayload);
      return editSense({ ...editPayload, id: data.id });
    },
    onSuccess: (response) => {
      // console.log("Edit mutation success:", response);
      const data = "data" in response ? response.data : response;
      onSubmit(data);
      reset();
      onClose();
    },
    onError: (error) => {
      console.error("Error editing sense:", error);
    },
  });
  const {
    register,
    handleSubmit,
    reset,
    control,
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
  const onError = (errors: any) => {
    console.log("Form validation errors:", errors);
  };
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      console.log("Form errors:", errors);
    }
  }, [errors]);
  const handleFormSubmit = async (data: InputSense) => {
    // console.log("Form submission started");
    try {
      const formattedData = {
        description: data.description,
        has_illustration: data.has_illustration,
        example_sentence: data.example_sentence,
        posId: String(data.posId),
        name_entityId: String(data.name_entityId),
        registerId: String(data.registerId),
        wordId: wordId,
        domainIds: data.domainIds,
      };
      // console.log("i got trigger");
      if (initialData?.id) {
        // console.log("Editing sense:", formattedData);
        editMutation.mutate({ ...formattedData, id: initialData.id });
      } else {
        // console.log("Creating new sense:", formattedData);
        mutation.mutate(formattedData);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleCitationsChange = (newCitationIds: string[]) => {
    // console.log("Citation IDs changed:", newCitationIds);
    setCitationIds(newCitationIds);
  };

  const parents = domaindata.filter((domain: any) => domain.parent_id === null);
  const children = domaindata.filter(
    (domain: any) => domain.parent_id !== null,
  );

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
              onSubmit={handleSubmit(handleFormSubmit, onError)}
              className="mt-6 space-y-6"
              autoComplete="off"
            >
              <div className="space-y-4">
                <div className="flex items-center">
                  <label className="w-24">འགྲེལ་བ།</label>
                  <input
                    className="flex-1 border-b border-black outline-none"
                    {...register("description")}
                  />
                </div>
                {errors.description && (
                  <p className="text-red-500 text-sm">
                    {errors.description.message}
                  </p>
                )}
                <div className="flex items-center">
                  <label className="w-24">དཔེར་བརྗོད་ཚིག་གྲུབ།</label>
                  <input
                    className="flex-1 border-b border-black outline-none"
                    {...register("example_sentence")}
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
                <div className="flex-1">
                  <Controller
                    name="domainIds"
                    control={control}
                    render={({ field }) => (
                      <div className="flex items-center space-x-2">
                        <label>བརྡ་ཆད་དབྱེ་བའི་སྡེ་ཚན།</label>
                        <select
                          className="w-full border-b border-black outline-none pb-2"
                          onChange={(e) => {
                            setSelectedParent(e.target.value);
                            field.onChange([e.target.value]);
                          }}
                          value={selectedParent}
                        >
                          {parents.map((parent: any) => (
                            <option key={parent.id} value={parent.id}>
                              {parent.text}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  />
                </div>
                {selectedParent &&
                  children.some(
                    (child: any) => child.parent_id === selectedParent,
                  ) && (
                    <div className="flex-1">
                      <Controller
                        name="domainIds"
                        control={control}
                        render={({ field }) => (
                          <div className="flex items-center space-x-2">
                            <label>བྱིས་པའི་ཁྱབ་ཁོངས་འདེམས།</label>
                            <select
                              className="w-full border-b border-black outline-none pb-2"
                              onChange={(e) => {
                                const newValue = [
                                  ...field.value,
                                  e.target.value,
                                ];
                                field.onChange(newValue);
                              }}
                            >
                              {children
                                .filter(
                                  (child: any) =>
                                    child.parent_id === selectedParent,
                                )
                                .map((child: any) => (
                                  <option key={child.id} value={child.id}>
                                    {child.text}
                                  </option>
                                ))}
                            </select>
                          </div>
                        )}
                      />
                    </div>
                  )}
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
