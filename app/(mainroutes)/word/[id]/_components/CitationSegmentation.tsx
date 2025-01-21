import React, { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { FaAngleDown, FaAngleUp } from "@/app/utils/Icon";
import { createCitation } from "@/app/actions/PostActions";
import AutoSug from "./AutoSug";
import { CitationFormProps, FormData } from "../_types/type";
import {
  findAuthorById,
  findBookById,
  findEditorById,
  findprintmethodById,
  findPublisherById,
  findTertonById,
  findTranslatorById,
} from "@/app/utils/util";

const CitationSegmentation = ({
  bookData,
  authorData = [],
  Editordata = [],
  Tertondata = [],
  Translatordata = [],
  PublisherData = [],
  printmethoddata = [],
  onCitationsChange,
  initialCitations = [],
  disabled = false,
}: CitationFormProps) => {
  const { control, register, watch } = useForm<FormData>({
    defaultValues: {
      citations:
        initialCitations.map((citation) => ({
          text: citation.text,
          bookId: citation.bookId,
          location: {
            volume: citation.location?.volume || "",
            pageNumber: citation.location?.pageNumber || "",
            lineNumber: citation.location?.lineNumber || "",
            folio: citation.location?.folio || "",
          },
        })) || [],
    },
  });

  const { fields } = useFieldArray({
    control,
    name: "citations",
  });

  const [openStates, setOpenStates] = React.useState<boolean[]>(
    new Array(initialCitations.length).fill(false),
  );
  const [citationIds, setCitationIds] = React.useState<string[]>(
    initialCitations.map((citation) => citation.id) || [],
  );

  const createCitationMutation = useMutation({
    mutationFn: createCitation,
    onSuccess: (data) => {
      const index = fields.length - 1;
      if (index !== -1) {
        const newCitationIds = [...citationIds];
        const citationId = data.data?.id;
        newCitationIds[index] = citationId;
        setCitationIds(newCitationIds);
        onCitationsChange(newCitationIds);
      }
    },
  });

  const handleSaveCitation = (index: number) => {
    const citation = watch(`citations.${index}`);
    createCitationMutation.mutate(citation);
  };

  const toggleAccordion = (index: number) => {
    setOpenStates((prev) => {
      const newStates = [...prev];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };

  const transformedBookData = bookData.map((book) => ({
    name: book.title,
    id: book.id,
  }));

  useEffect(() => {
    if (initialCitations.length > 0) {
      onCitationsChange(initialCitations.map((citation) => citation.id));
    }
  }, []);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {fields.map((field, index) => {
          const bookId = watch(`citations.${index}.bookId`);
          const selectedBook = findBookById(bookId, bookData);
          let translator;
          let Editor;
          let Terton;
          let author;
          let publisher;
          let printmethod;

          if (selectedBook) {
            author = findAuthorById(selectedBook.authorId, authorData);
            translator = findTranslatorById(
              selectedBook.translatorId,
              Translatordata,
            );
            Editor = findEditorById(selectedBook.editorId, Editordata);
            Terton = findTertonById(selectedBook.tertonId, Tertondata);
            publisher = findPublisherById(
              selectedBook.publisherId,
              PublisherData,
            );
            printmethod = findprintmethodById(
              selectedBook.print_methodId,
              printmethoddata,
            );
          }

          return (
            <div key={field.id} className="border rounded-lg shadow-sm">
              <div
                onClick={() => toggleAccordion(index)}
                className={`flex justify-between items-center p-3 cursor-pointerbg-gray-50 hover:bg-gray-100`}
              >
                <span className="font-monlam">མཆན། {index + 1}</span>
                <div className="flex items-center gap-2">
                  {openStates[index] ? (
                    <FaAngleUp size={20} />
                  ) : (
                    <FaAngleDown size={20} />
                  )}
                </div>
              </div>

              {openStates[index] && (
                <div className="p-4">
                  <div className="flex space-x-2  w-full items-center">
                    <label className=" shrink-0">ལུང་།</label>
                    <textarea
                      disabled={disabled}
                      className="w-full border-b border-black outline-none pb-2"
                      rows={1}
                      {...register(`citations.${index}.text`)}
                      onInput={(e: any) => {
                        e.target.style.height = "auto";
                        e.target.style.height = e.target.scrollHeight + "px";
                      }}
                    />
                  </div>

                  <div className="mt-4">
                    <AutoSug
                      label="མཚན་བྱང་།"
                      name={`citations.${index}.bookId`}
                      data={transformedBookData}
                      register={register}
                      isSubmitting={false}
                      value={watch(`citations.${index}.bookId`)}
                      disabled={disabled}
                    />
                  </div>

                  {selectedBook && (
                    <>
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        {selectedBook.abbreviated_title && (
                          <div className="flex items-center space-x-2">
                            <span className="text-gray-600">
                              མཚན་བྱང་བསྡུས་པ།
                            </span>
                            <span className="font-medium">
                              {selectedBook.abbreviated_title}
                            </span>
                          </div>
                        )}
                        {selectedBook.collection_name && (
                          <div className="flex items-center space-x-2">
                            <span className="text-gray-600">
                              རྩོམ་སྒྲིག་གི་རྣམ་པ།
                            </span>
                            <span className="font-medium">
                              {selectedBook.collection_name}
                            </span>
                          </div>
                        )}
                        {selectedBook.year_of_publish && (
                          <div className="flex items-center space-x-2">
                            <span className="text-gray-600">པར་སྐྲུན་ལོ།</span>
                            <span className="font-medium">
                              {selectedBook.year_of_publish}
                            </span>
                          </div>
                        )}
                        {selectedBook.digital_ref && (
                          <div className="flex items-center space-x-2">
                            <span className="text-gray-600">BDRC Link</span>
                            <span className="font-medium">
                              {selectedBook.digital_ref}
                            </span>
                          </div>
                        )}
                        {printmethod && (
                          <div className="flex items-center space-x-2">
                            <span className="text-gray-600">
                              དཔར་སྐྲུན་བྱེད་སྟངས།
                            </span>
                            <span className="font-medium">
                              {printmethod.name}
                            </span>
                          </div>
                        )}
                      </div>

                      {publisher && (
                        <div className="mt-4 border-t pt-4">
                          <h3 className="text-lg font-semibold mb-3">
                            དཔར་ཁང་ཞིབ་ཕྲ།
                          </h3>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center space-x-2">
                              <span className="text-gray-600">མིང་།</span>
                              <span className="font-medium">
                                {publisher.name}
                              </span>
                            </div>
                            {publisher.location && (
                              <div className="flex items-center space-x-2">
                                <span className="text-gray-600">ཆགས་ཡུལ།</span>
                                <span className="font-medium">
                                  {publisher.location}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {author && (
                        <div className="mt-4 border-t pt-4">
                          <h3 className="text-lg font-semibold mb-3">
                            རྩོམ་པ་པོའི་ཞིབ་ཕྲ།
                          </h3>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center space-x-2">
                              <span className="text-gray-600">མིང་།</span>
                              <span className="font-medium">{author.name}</span>
                            </div>
                            {author.year_of_birth !== 0 && (
                              <div className="flex items-center space-x-2">
                                <span className="text-gray-600">སྐྱེས་ལོ།</span>
                                <span className="font-medium">
                                  {author.year_of_birth}
                                </span>
                              </div>
                            )}
                            {author.year_of_death !== 0 && (
                              <div className="flex items-center space-x-2">
                                <span className="text-gray-600">འདས་ལོ།</span>
                                <span className="font-medium">
                                  {author.year_of_death}
                                </span>
                              </div>
                            )}
                            {author.nationality && (
                              <div className="flex items-center space-x-2">
                                <span className="text-gray-600">མི་རིགས།</span>
                                <span className="font-medium">
                                  {author.nationality}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {translator && (
                        <div className="mt-4 border-t pt-4">
                          <h3 className="text-lg font-semibold mb-3">
                            ལོ་ཙཱ་བ་ཞིབ་ཕྲ།
                          </h3>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center space-x-2">
                              <span className="text-gray-600">མིང་།</span>
                              <span className="font-medium">
                                {translator.name}
                              </span>
                            </div>
                            {translator.year_of_birth !== 0 && (
                              <div className="flex items-center space-x-2">
                                <span className="text-gray-600">སྐྱེས་ལོ།</span>
                                <span className="font-medium">
                                  {translator.year_of_birth}
                                </span>
                              </div>
                            )}
                            {translator.year_of_death !== 0 && (
                              <div className="flex items-center space-x-2">
                                <span className="text-gray-600">འདས་ལོ།</span>
                                <span className="font-medium">
                                  {translator.year_of_death}
                                </span>
                              </div>
                            )}
                            {translator.nationality && (
                              <div className="flex items-center space-x-2">
                                <span className="text-gray-600">མི་རིགས།</span>
                                <span className="font-medium">
                                  {translator.nationality}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {Editor && (
                        <div className="mt-4 border-t pt-4">
                          <h3 className="text-lg font-semibold mb-3">
                            རྩོམ་སྒྲིག་པ་ཞིབ་ཕྲ།
                          </h3>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center space-x-2">
                              <span className="text-gray-600">མིང་།</span>
                              <span className="font-medium">{Editor.name}</span>
                            </div>
                            {Editor.year_of_birth !== 0 && (
                              <div className="flex items-center space-x-2">
                                <span className="text-gray-600">སྐྱེས་ལོ།</span>
                                <span className="font-medium">
                                  {Editor.year_of_birth}
                                </span>
                              </div>
                            )}
                            {Editor.year_of_death !== 0 && (
                              <div className="flex items-center space-x-2">
                                <span className="text-gray-600">འདས་ལོ།</span>
                                <span className="font-medium">
                                  {Editor.year_of_death}
                                </span>
                              </div>
                            )}
                            {Editor.nationality && (
                              <div className="flex items-center space-x-2">
                                <span className="text-gray-600">མི་རིགས།</span>
                                <span className="font-medium">
                                  {Editor.nationality}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {Terton && (
                        <div className="mt-4 border-t pt-4">
                          <h3 className="text-lg font-semibold mb-3">
                            གཏེར་སྟོན་ཞིབ་ཕྲ།
                          </h3>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center space-x-2">
                              <span className="text-gray-600">མིང་།</span>
                              <span className="font-medium">{Terton.name}</span>
                            </div>
                            {Terton.year_of_birth !== 0 && (
                              <div className="flex items-center space-x-2">
                                <span className="text-gray-600">སྐྱེས་ལོ།</span>
                                <span className="font-medium">
                                  {Terton.year_of_birth}
                                </span>
                              </div>
                            )}
                            {Terton.year_of_death !== 0 && (
                              <div className="flex items-center space-x-2">
                                <span className="text-gray-600">འདས་ལོ།</span>
                                <span className="font-medium">
                                  {Terton.year_of_death}
                                </span>
                              </div>
                            )}
                            {Terton.nationality && (
                              <div className="flex items-center space-x-2">
                                <span className="text-gray-600">མི་རིགས།</span>
                                <span className="font-medium">
                                  {Terton.nationality}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  <div className="mt-4">
                    <label className="block text-xl font-bold mb-2">
                      ཆགས་ས།
                    </label>
                    <div className="grid grid-cols-4 gap-4">
                      <div className="flex space-x-2 items-center">
                        <label className="shrink-0">པོད་ཕྲེང་།</label>
                        <input
                          className="w-full border-b border-black outline-none"
                          {...register(`citations.${index}.location.volume`)}
                          disabled={disabled}
                        />
                      </div>
                      <div className="flex space-x-2 items-center">
                        <label className="shrink-0">ཤོག་གྲངས།</label>
                        <input
                          className="w-full border-b border-black outline-none"
                          {...register(
                            `citations.${index}.location.pageNumber`,
                          )}
                          disabled={disabled}
                        />
                      </div>
                      <div className="flex space-x-2 items-center">
                        <label className="shrink-0">ཐིག་ཕྲེང་།</label>
                        <input
                          className="w-full border-b border-black outline-none"
                          {...register(
                            `citations.${index}.location.lineNumber`,
                          )}
                          disabled={disabled}
                        />
                      </div>
                      <div>
                        <label htmlFor="folio" className="shrink-0">
                          ཤོག་ལྡེབ་
                        </label>
                        <select
                          className="border-b w-24 border-black outline-none pb-2"
                          {...register(`citations.${index}.location.folio`)}
                          disabled={disabled}
                        >
                          <option value="བ">བ།</option>
                          <option value="ན">ན།</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-end space-x-2">
                    <button
                      type="button"
                      onClick={() => handleSaveCitation(index)}
                      className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 disabled:bg-gray-400"
                      disabled={
                        disabled ||
                        !watch(`citations.${index}.bookId`) ||
                        !watch(`citations.${index}.text`) ||
                        createCitationMutation.isPending
                      }
                    >
                      {createCitationMutation.isPending
                        ? "Saving..."
                        : citationIds[index]
                          ? "Update"
                          : "Save"}{" "}
                      Citation
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CitationSegmentation;
