import React from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { FaAngleDown, FaAngleUp } from '@/app/utils/Icon';
import AutoSuggestionBook from './AutoSuggestion';
import { z } from 'zod';
import axios from 'axios';
import { createCitation } from '@/app/actions/PostActions';

const LocationSchema = z.object({
  volume: z.string().optional(),
  pageNumber: z.string().optional(),
  lineNumber: z.string().optional(),
  folio: z.string().optional(),
});

const CitationSchema = z.object({
  text: z.string(),
  bookId: z.string(),
  location: LocationSchema,
});

type CitationSchemaType = z.infer<typeof CitationSchema>;

interface Book {
  id: string;
  title: string;
  abbreviated_title: string;
  authorId: string;
  translatorId: string;
  tertonId: string;
  editorId: string;
  publisherId: string;
  collection_name: string;
  year_of_publish: string;
  print_methodId: string;
  digital_ref: string;
}

interface Author {
  id: string;
  name: string;
  year_of_birth: number;
  year_of_death: number;
  nationality: string;
}

interface Publisher {
  id: string;
  name: string;
  location: string;
}

interface PrintMethod {
  id: string;
  name: string;
}

interface CitationField {
  text: string;
  bookId: string;
  location: {
    volume?: string;
    pageNumber?: string;
    lineNumber?: string;
    folio?: string;
  };
}

interface FormData {
  citations: CitationField[];
}

interface CitationFormProps {
  bookData: Book[];
  authorData?: Author[];
  Editordata?: Author[];
  Tertondata?: Author[];
  Translatordata?: Author[];
  PublisherData?: Publisher[];
  printmethoddata?: PrintMethod[];
  onCitationsChange: (citationIds: string[]) => void;
}

const CitationForm = ({
  bookData,
  authorData = [],
  Editordata = [],
  Tertondata = [],
  Translatordata = [],
  PublisherData = [],
  printmethoddata = [],
  onCitationsChange
}: CitationFormProps) => {
  const { control, register, watch } = useForm<FormData>({
    defaultValues: {
      citations: []
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "citations"
  });

  const [openStates, setOpenStates] = React.useState<boolean[]>([]);
  const [citationIds, setCitationIds] = React.useState<string[]>([]);

  const createCitationMutation = useMutation({
    mutationFn:createCitation,
    onSuccess: (data, variables, context) => {
      const index = fields.findIndex(field => 
        field.bookId === variables.bookId && field.text === variables.text
      );
      if (index !== -1) {
        const newCitationIds = [...citationIds];
        newCitationIds[index] = data.id;
        setCitationIds(newCitationIds);
        onCitationsChange(newCitationIds);
      }
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data?.detail || "Citation creation failed");
      } else {
        console.error("An unexpected error occurred");
      }
    }
  });

  const handleSaveCitation = (index: number) => {
    const citation = watch(`citations.${index}`);
    createCitationMutation.mutate(citation);
  };

  const handleRemoveCitation = (index: number) => {
    remove(index);
    const newCitationIds = [...citationIds];
    newCitationIds.splice(index, 1);
    setCitationIds(newCitationIds);
    onCitationsChange(newCitationIds);
    setOpenStates(prev => {
      const newStates = [...prev];
      newStates.splice(index, 1);
      return newStates;
    });
  };

  const toggleAccordion = (index: number) => {
    setOpenStates(prev => {
      const newStates = [...prev];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };

  const transformedBookData = bookData.map(book => ({
    name: book.title,
    id: book.id
  }));

  const findBookById = (id: string): Book | undefined => {
    return bookData.find(book => book.id === id);
  };

  const findAuthorById = (id: string): Author | undefined => {
    return authorData.find(author => author.id === id);
  };

  const findEditorById = (id: string): Author | undefined => {
    return Editordata.find(author => author.id === id);
  };

  const findTertonById = (id: string): Author | undefined => {
    return Tertondata.find(author => author.id === id);
  };

  const findTranslatorById = (id: string): Author | undefined => {
    return Translatordata.find(author => author.id === id);
  };

  const findPublisherById = (id: string): Publisher | undefined => {
    return PublisherData.find(pub => pub.id === id);
  };

  const findprintmethodById = (id: string): PrintMethod | undefined => {
    return printmethoddata.find(data => data.id === id);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-x-4 items-center">
        <p className="font-monlam text-xl font-semibold">མཆན།</p>
        <button
          onClick={(e) => {
            e.stopPropagation();
            append({
              text: '',
              bookId: '',
              location: {}
            });
            setOpenStates(prev => [...prev, true]);
          }}
          className="px-4 py-2 border-gray-300 shadow border rounded-lg"
        >
          +
        </button>
      </div>

      <div className="space-y-2">
        {fields.map((field, index) => {
          const bookId = watch(`citations.${index}.bookId`);
          const selectedBook = findBookById(bookId);
          let translator;
          let Editor;
          let Terton;
          let author;
          let publisher;
          let printmethod;

          if (selectedBook) {
            author = findAuthorById(selectedBook.authorId);
            translator = findTranslatorById(selectedBook.translatorId);
            Editor = findEditorById(selectedBook.editorId);
            Terton = findTertonById(selectedBook.tertonId);
            publisher = findPublisherById(selectedBook.publisherId);
            printmethod = findprintmethodById(selectedBook.print_methodId);
          }

          return (
            <div key={field.id} className="border rounded-lg shadow-sm">
              <div
                onClick={() => toggleAccordion(index)}
                className="flex justify-between items-center p-3 cursor-pointer bg-gray-50 hover:bg-gray-100"
              >
                <span className="font-monlam">མཆན། {index + 1}</span>
                <div className="flex items-center gap-2">
                  {openStates[index] ? <FaAngleUp size={20} /> : <FaAngleDown size={20} />}
                </div>
              </div>

              {openStates[index] && (
                <div className="p-4">
                  <div>
                    <input
                      placeholder="ལུང་།"
                      className="w-full border-b border-black outline-none pb-2"
                      {...register(`citations.${index}.text`)}
                    />
                  </div>

                  <div className="mt-4">
                    <AutoSuggestionBook
                      label="མཚན་བྱང་།"
                      name={`citations.${index}.bookId`}
                      data={transformedBookData}
                      register={register}
                      isSubmitting={false}
                      value={watch(`citations.${index}.bookId`)}
                    />
                  </div>

                  {selectedBook && (
                    <>
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        {selectedBook.abbreviated_title && (
                          <div className="flex items-center space-x-2">
                            <span className="text-gray-600">མཚན་བྱང་བསྡུས་པ།</span>
                            <span className="font-medium">{selectedBook.abbreviated_title}</span>
                          </div>
                        )}
                        {selectedBook.collection_name && (
                          <div className="flex items-center space-x-2">
                            <span className="text-gray-600">རྩོམ་སྒྲིག་གི་རྣམ་པ།</span>
                            <span className="font-medium">{selectedBook.collection_name}</span>
                          </div>
                        )}
                        {selectedBook.year_of_publish && (
                          <div className="flex items-center space-x-2">
                            <span className="text-gray-600">པར་སྐྲུན་ལོ།</span>
                            <span className="font-medium">{selectedBook.year_of_publish}</span>
                          </div>
                        )}
                        {selectedBook.digital_ref && (
                          <div className="flex items-center space-x-2">
                            <span className="text-gray-600">BDRC Link</span>
                            <span className="font-medium">{selectedBook.digital_ref}</span>
                          </div>
                        )}
                        {printmethod && (
                          <div className="flex items-center space-x-2">
                            <span className="text-gray-600">དཔར་སྐྲུན་བྱེད་སྟངས།</span>
                            <span className="font-medium">{printmethod.name}</span>
                          </div>
                        )}
                      </div>

                      {publisher && (
                        <div className="mt-4 border-t pt-4">
                          <h3 className="text-lg font-semibold mb-3">དཔར་ཁང་ཞིབ་ཕྲ།</h3>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center space-x-2">
                              <span className="text-gray-600">མིང་།</span>
                              <span className="font-medium">{publisher.name}</span>
                            </div>
                            {publisher.location && (
                              <div className="flex items-center space-x-2">
                                <span className="text-gray-600">ཆགས་ཡུལ།</span>
                                <span className="font-medium">{publisher.location}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {author && (
                        <div className="mt-4 border-t pt-4">
                          <h3 className="text-lg font-semibold mb-3">རྩོམ་པ་པོའི་ཞིབ་ཕྲ།</h3>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center space-x-2">
                              <span className="text-gray-600">མིང་།</span>
                              <span className="font-medium">{author.name}</span>
                            </div>
                            {author.year_of_birth !== 0 && (
                              <div className="flex items-center space-x-2">
                                <span className="text-gray-600">སྐྱེས་ལོ།</span>
                                <span className="font-medium">{author.year_of_birth}</span>
                              </div>
                            )}
                            {author.year_of_death !== 0 && (
                              <div className="flex items-center space-x-2">
                                <span className="text-gray-600">འདས་ལོ།</span>
                                <span className="font-medium">{author.year_of_death}</span>
                              </div>
                            )}
                            {author.nationality && (
                              <div className="flex items-center space-x-2">
                                <span className="text-gray-600">མི་རིགས།</span>
                                <span className="font-medium">{author.nationality}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {translator && (
                        <div className="mt-4 border-t pt-4">
                          <h3 className="text-lg font-semibold mb-3">ལོ་ཙཱ་བ་ཞིབ་ཕྲ།</h3>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center space-x-2">
                              <span className="text-gray-600">མིང་།</span>
                              <span className="font-medium">{translator.name}</span>
                            </div>
                            {translator.year_of_birth !== 0 && (
                              <div className="flex items-center space-x-2">
                                <span className="text-gray-600">སྐྱེས་ལོ།</span>
                                <span className="font-medium">{translator.year_of_birth}</span>
                              </div>
                            )}
                            {translator.year_of_death !== 0 && (
                              <div className="flex items-center space-x-2">
                                <span className="text-gray-600">འདས་ལོ།</span>
                                <span className="font-medium">{translator.year_of_death}</span>
                              </div>
                            )}
                            {translator.nationality && (
                              <div className="flex items-center space-x-2">
                                <span className="text-gray-600">མི་རིགས།</span>
                                <span className="font-medium">{translator.nationality}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {Editor && (
                        <div className="mt-4 border-t pt-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center space-x-2">
                              <span className="text-gray-600">མིང་།</span>
                              <span className="font-medium">{Editor.name}</span>
                            </div>
                            {Editor.year_of_birth !== 0 && (
                              <div className="flex items-center space-x-2">
                                <span className="text-gray-600">སྐྱེས་ལོ།</span>
                                <span className="font-medium">{Editor.year_of_birth}</span>
                              </div>
                            )}
                            {Editor.year_of_death !== 0 && (
                              <div className="flex items-center space-x-2">
                                <span className="text-gray-600">འདས་ལོ།</span>
                                <span className="font-medium">{Editor.year_of_death}</span>
                              </div>
                            )}
                            {Editor.nationality && (
                              <div className="flex items-center space-x-2">
                                <span className="text-gray-600">མི་རིགས།</span>
                                <span className="font-medium">{Editor.nationality}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {Terton && (
                        <div className="mt-4 border-t pt-4">
                          <h3 className="text-lg font-semibold mb-3">གཏེར་སྟོན་ཞིབ་ཕྲ།</h3>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center space-x-2">
                              <span className="text-gray-600">མིང་།</span>
                              <span className="font-medium">{Terton.name}</span>
                            </div>
                            {Terton.year_of_birth !== 0 && (
                              <div className="flex items-center space-x-2">
                                <span className="text-gray-600">སྐྱེས་ལོ།</span>
                                <span className="font-medium">{Terton.year_of_birth}</span>
                              </div>
                            )}
                            {Terton.year_of_death !== 0 && (
                              <div className="flex items-center space-x-2">
                                <span className="text-gray-600">འདས་ལོ།</span>
                                <span className="font-medium">{Terton.year_of_death}</span>
                              </div>
                            )}
                            {Terton.nationality && (
                              <div className="flex items-center space-x-2">
                                <span className="text-gray-600">མི་རིགས།</span>
                                <span className="font-medium">{Terton.nationality}</span>
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
                        />
                      </div>
                      <div className="flex space-x-2 items-center">
                        <label className="shrink-0">ཤོག་གྲངས།</label>
                        <input 
                          className="w-full border-b border-black outline-none"
                          {...register(`citations.${index}.location.pageNumber`)}
                        />
                      </div>
                      <div className="flex space-x-2 items-center">
                        <label className="shrink-0">ཐིག་ཕྲེང་།</label>
                        <input 
                          className="w-full border-b border-black outline-none"
                          {...register(`citations.${index}.location.lineNumber`)}
                        />
                      </div>
                      <div>
                        <label htmlFor="folio" className="shrink-0">ཐིག་ཕྲེང་།</label>
                        <select 
                          className="border-b w-24 border-black outline-none pb-2"
                          {...register(`citations.${index}.location.folio`)}
                        >
                          <option value="ས">ས་</option>
                          <option value="ན">ན་</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-end space-x-2">
                    <button
                      type="button"
                      onClick={() => handleRemoveCitation(index)}
                      className="px-4 py-2 text-red-500 border border-red-500 rounded hover:bg-red-50"
                    >
                      Remove
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSaveCitation(index)}
                      className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 disabled:bg-gray-400"
                      disabled={
                        !watch(`citations.${index}.bookId`) || 
                        !watch(`citations.${index}.text`) ||
                        createCitationMutation.isPending
                      }
                    >
                      {createCitationMutation.isPending ? 'Saving...' : citationIds[index] ? 'Update' : 'Save'} Citation
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

export default CitationForm;