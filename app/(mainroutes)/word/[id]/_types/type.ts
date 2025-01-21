export interface Book {
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

export interface Author {
  id: string;
  name: string;
  year_of_birth: number;
  year_of_death: number;
  nationality: string;
}

export interface Publisher {
  id: string;
  name: string;
  location: string;
}

export interface PrintMethod {
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

export interface FormData {
  citations: CitationField[];
}

export interface CitationFormProps {
  bookData: Book[];
  authorData?: Author[];
  Editordata?: Author[];
  Tertondata?: Author[];
  Translatordata?: Author[];
  PublisherData?: Publisher[];
  printmethoddata?: PrintMethod[];
  onCitationsChange: (citationIds: string[]) => void;
  initialCitations?: any[];
  disabled?: boolean;
}
