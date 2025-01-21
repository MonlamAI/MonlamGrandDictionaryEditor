export const tibetanRegex = /^[\u0F00-\u0FFF\u0F00-\u0FFF\s]+$/;
export const typeofMinaOptions = [
  "རྩོམ་སྒྲིག་པ་",
  "གཏེར་སྟོན་",
  "ལོ་ཙཱ་བ་",
  "རྩོམ་པ་པོ་",
] as const;
export const typeMap: { [key: string]: string } = {
  "རྩོམ་སྒྲིག་པ་": "editor",
  "གཏེར་སྟོན་": "terton",
  "ལོ་ཙཱ་བ་": "translator",
  "རྩོམ་པ་པོ་": "author",
};
export function cleanData(data: Record<string, any>): Record<string, any> {
  return Object.fromEntries(
    Object.entries(data).filter(([_, value]) => value !== ""),
  );
}

export const filterSuggestions = (inputValue: string, data: any[]) => {
  return inputValue.trim()
    ? data.filter((option) =>
        option.name.toLowerCase().includes(inputValue.toLowerCase()),
      )
    : [];
};

export const changetibnumtoreal = (data: string) => {
  const tibnum: any = {
    "༡": 1,
    "༢": 2,
    "༣": 3,
    "༤": 4,
    "༥": 5,
    "༦": 6,
    "༧": 7,
    "༨": 8,
    "༩": 9,
    "༠": 0,
  };

  let result = 0;
  for (let i = 0; i < data.length; i++) {
    const char = data[i];
    if (char in tibnum) {
      result = result * 10 + tibnum[char];
    }
  }

  return result;
};

export const findBookById = (id, bookData) => {
  return bookData.find((book: any) => book.id === id);
};

export const findAuthorById = (id, authorData) => {
  return authorData.find((author: any) => author.id === id);
};

export const findEditorById = (id, Editordata) => {
  return Editordata.find((author: any) => author.id === id);
};

export const findTertonById = (id, Tertondata) => {
  return Tertondata.find((author: any) => author.id === id);
};

export const findTranslatorById = (id, Translatordata) => {
  return Translatordata.find((author: any) => author.id === id);
};

export const findPublisherById = (id, PublisherData) => {
  return PublisherData.find((pub: any) => pub.id === id);
};

export const findprintmethodById = (id, printmethoddata) => {
  return printmethoddata.find((data: any) => data.id === id);
};
