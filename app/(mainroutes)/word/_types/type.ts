import { InputSense } from "../_components/Sense";

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

export interface CitationField {
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
}

export interface SenseProps {
  onClose: () => void;
  domaindata: Label[];
  posData: any;
  registerData: any;
  nameEntityData: any;
  onSubmit: (data: InputSense) => void;
  initialData?: InputSense & {
    id?: string;
    citation?: any[];
    domain?: Label[];
  };
  wordId: string;
  bookData: any;
  Authordata: any;
  Editordata: any;
  Tertondata: any;
  Translatordata: any;
  PublisherData: any;
  printmethoddata: any;
}
export interface Label {
  id: string;
  text: string;
  parent_id: string | null;
}

export interface Label {
  id: string;
  text: string;
  parent_id: string | null;
}

export interface GroupedLabel extends Label {
  children: Label[];
}

export interface LabelSelectorProps {
  onSelectionChange?: (labels: Label[]) => void;
  initialSelected?: string[];
  domains: Label[];
  disabled?: boolean;
}
