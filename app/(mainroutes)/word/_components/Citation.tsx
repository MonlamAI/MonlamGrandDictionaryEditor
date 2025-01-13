import React from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { FaAngleDown, FaAngleUp } from '@/app/utils/Icon';
import AutoSuggestionBook from './AutoSuggestion';

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
  print_method: { name: string };
  digital_ref: string;
}

interface Author {
  id: string;
  name: string;
  year_of_birth: number;
  year_of_death: number;
  nationality: string;
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

const CitationForm = ({ 
  bookData, 
  authorData = [] 
}: { 
  bookData: Book[], 
  authorData?: Author[] 
}) => {
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

  const toggleAccordion = (index: number) => {
    setOpenStates(prev => {
      const newStates = [...prev];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };

  const addCitation = () => {
    append({
      text: '',
      bookId: '',
      location: {}
    });
    setOpenStates(prev => [...prev, true]);
  };

  const transformedBookData = bookData.map(book => ({
    name: book.title,
    id: book.id
  }));

  const findBookById = (id: string): Book | undefined => {
    return bookData.find(book => book.id === id);
  };

  const findAuthorById = (id: string): Author | undefined => {
    console.log('i am here')
    return authorData.find(author => author.id === id);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-x-4 items-center">
        <p className="font-monlam text-xl font-semibold">མཆན།</p>
        <button
          onClick={(e) => {e.stopPropagation(); addCitation();}}
          className="px-4 py-2 border-gray-300 shadow border rounded-lg"
        >
          +
        </button>
      </div>

      <div className="space-y-2">
        {fields.map((field, index) => {
          const bookId = watch(`citations.${index}.bookId`);
          const selectedBook = findBookById(bookId);
          let author;
          console.log(selectedBook)
          if (selectedBook) {
            author = findAuthorById(selectedBook.authorId);
            console.log(author)
          }

          return (
            <div
              key={field.id}
              className="border rounded-lg shadow-sm"
            >
              <div
                onClick={() => toggleAccordion(index)}
                className="flex justify-between items-center p-3 cursor-pointer bg-gray-50 hover:bg-gray-100"
              >
                <span className="font-monlam">མཆན། {index + 1}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      remove(index);
                      setOpenStates(prev => {
                        const newStates = [...prev];
                        newStates.splice(index, 1);
                        return newStates;
                      });
                    }}
                    className="text-red-500 hover:text-red-700 px-2"
                  >
                    Remove
                  </button>
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
                      </div>

                      {author && (
                        <div className="mt-4 border-t pt-4">
                          <h3 className="text-lg font-semibold mb-3">རྩོམ་པ་པོའི་ཞིབ་ཕྲ།</h3>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center space-x-2">
                              <span className="text-gray-600">མཚན།</span>
                              <span className="font-medium">{author.name}</span>
                            </div>
                            {author.year_of_birth !== 0 && (
                              <div className="flex items-center space-x-2">
                                <span className="text-gray-600">འཁྲུངས་ལོ།</span>
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
                                <span className="text-gray-600">རྒྱལ་ཁོངས།</span>
                                <span className="font-medium">{author.nationality}</span>
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
                      <select 
                        className="border-b border-black outline-none pb-2"
                        {...register(`citations.${index}.location.folio`)}
                      >
                        <option value="">ཤོག་ལྡེབ།</option>
                        <option value="ས">ས་</option>
                        <option value="ན">ན་</option>
                      </select>
                    </div>
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