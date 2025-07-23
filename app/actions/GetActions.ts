"use server";

import axios from "axios";
const API_URL =process.env?.API_URL
const BASE_URL = API_URL+"/api/grand";

interface WordsResponse {
  words: Word[];
  total_count: number;
  current_page: number;
  total_pages: number;
}

interface Word {
  id: number;
  lemma: string;
  is_modern: boolean | null;
  is_reviewed: boolean;
  origin: string | null;
  sense: string | null;
  originId: string | null;
  is_frequent: boolean;
}

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    apikey: process.env.API_KEY,
    accept: "application/json",
    "Content-Type": "application/json",
  },
});
//get for book
export async function getPublisher() {
  try {
    const response = await apiClient.get("/book/publisher/list");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("API Error:", error.response?.data || error.message);
      throw new Error(`Failed to fetch publishers: ${error.message}`);
    }
    throw error;
  }
}

export async function getEditor() {
  try {
    const response = await apiClient.get("/book/editor/list");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("API Error:", error.response?.data || error.message);
      throw new Error(`Failed to fetch publishers: ${error.message}`);
    }
    throw error;
  }
}

export async function getTerton() {
  try {
    const response = await apiClient.get("/book/terton/list");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("API Error:", error.response?.data || error.message);
      throw new Error(`Failed to fetch publishers: ${error.message}`);
    }
    throw error;
  }
}

export async function getTranslator() {
  try {
    const response = await apiClient.get("/book/translator/list");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("API Error:", error.response?.data || error.message);
      throw new Error(`Failed to fetch publishers: ${error.message}`);
    }
    throw error;
  }
}

export async function getAuthor() {
  try {
    const response = await apiClient.get("/book/author/list");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("API Error:", error.response?.data || error.message);
      throw new Error(`Failed to fetch publishers: ${error.message}`);
    }
    throw error;
  }
}

export async function getPrintMethod() {
  try {
    const response = await apiClient.get("/book/print_method/list");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("API Error:", error.response?.data || error.message);
      throw new Error(`Failed to fetch publishers: ${error.message}`);
    }
    throw error;
  }
}

//get for metadata
export async function getOrigin() {
  try {
    const response = await apiClient.get("/metadata/origin/list");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("API Error:", error.response?.data || error.message);
      throw new Error(`Failed to fetch publishers: ${error.message}`);
    }
    throw error;
  }
}

export async function getPos() {
  try {
    const response = await apiClient.get("/metadata/pos/list");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("API Error:", error.response?.data || error.message);
      throw new Error(`Failed to fetch publishers: ${error.message}`);
    }
    throw error;
  }
}

export async function getRegister() {
  try {
    const response = await apiClient.get("/metadata/register/list");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("API Error:", error.response?.data || error.message);
      throw new Error(`Failed to fetch publishers: ${error.message}`);
    }
    throw error;
  }
}

export async function getNameEntity() {
  try {
    const response = await apiClient.get("/metadata/name_entity/list");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("API Error:", error.response?.data || error.message);
      throw new Error(`Failed to fetch publishers: ${error.message}`);
    }
    throw error;
  }
}

export async function getDomain() {
  try {
    const response = await apiClient.get("/metadata/domain/list");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("API Error:", error.response?.data || error.message);
      throw new Error(`Failed to fetch publishers: ${error.message}`);
    }
    throw error;
  }
}
//citation
export async function getBook() {
  try {
    const response = await apiClient.get("/metadata/book/list");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("API Error:", error.response?.data || error.message);
      throw new Error(`Failed to fetch publishers: ${error.message}`);
    }
    throw error;
  }
}

//sidebar

export async function getWords(
  page: number,
  pageSize: number,
): Promise<WordsResponse> {
  try {
    const response = await apiClient.get<WordsResponse>("/word", {
      params: {
        page,
        page_size: pageSize,
        sort_by: "lemma",
        sort_order: "asc",
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("API Error:", error.response?.data || error.message);
      throw new Error(`Failed to fetch words: ${error.message}`);
    }
    throw error;
  }
}

export async function searchWords(query: string): Promise<WordsResponse> {
  try {
    const response = await apiClient.get<WordsResponse>("/word/search", {
      params: { q: query },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("API Error:", error.response?.data || error.message);
      throw new Error(`Failed to search words: ${error.message}`);
    }
    throw error;
  }
}

export async function getuserstatus(email: string) {
  try {
    const response = await axios.get(
      API_URL+`/api/user/${email}/`,
      {
        headers: {
          apikey: process.env.API_KEY,
          accept: "application/json",
          "Content-Type": "application/json",
        },
      },
    );
    return response.status;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        return 404;
      }
      console.error("API Error:", error.response?.data || error.message);
      throw new Error(`Failed to fetch user: ${error.message}`);
    }
    throw error;
  }
}
export async function getworddetails(id: string) {
  try {
    const response = await apiClient.get(`/word/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("API Error:", error.response?.data || error.message);
      throw new Error(`Failed to fetch publishers: ${error.message}`);
    }
    throw error;
  }
}

export async function getuserrole(email: string) {
  try {
    const response = await axios.get(
      API_URL+`/api/user/${email}`,
      {
        headers: {
          apikey: process.env.API_KEY,
          accept: "application/json",
          "Content-Type": "application/json",
        },
      },
    );
    return response.data.role;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("API Error:", error.response?.data || error.message);
      throw new Error(`Failed to fetch user role: ${error.message}`);
    }
    throw error;
  }
}

export async function getNextUnreviewedWord(): Promise<{
  lemma: string;
} | null> {
  try {
    const initialResponse = await apiClient.get<WordsResponse>("/word", {
      params: {
        page: 1,
        page_size: 1,
        sort_by: "lemma",
        sort_order: "asc",
      },
    });

    const totalWords = initialResponse.data.total_count;
    const pageSize = 100;
    const totalPages = Math.ceil(totalWords / pageSize);

    const randomPage = Math.floor(Math.random() * totalPages) + 1;

    const response = await apiClient.get<WordsResponse>("/word", {
      params: {
        page: randomPage,
        page_size: pageSize,
        sort_by: "lemma",
        sort_order: "asc",
      },
    });

    const unreviewedWords = response.data.words.filter(
      (word) => !word.is_reviewed,
    );

    if (unreviewedWords.length > 0) {
      const randomIndex = Math.floor(Math.random() * unreviewedWords.length);
      return { lemma: unreviewedWords[randomIndex].lemma };
    }

    // If no unreviewed words found on random page, do a sequential search
    for (let page = 1; page <= totalPages; page++) {
      if (page === randomPage) continue; // Skip the page we already checked

      const response = await apiClient.get<WordsResponse>("/word", {
        params: {
          page,
          page_size: pageSize,
          sort_by: "lemma",
          sort_order: "asc",
        },
      });

      const unreviewedWords = response.data.words.filter(
        (word) => !word.is_reviewed,
      );

      if (unreviewedWords.length > 0) {
        const randomIndex = Math.floor(Math.random() * unreviewedWords.length);
        return { lemma: unreviewedWords[randomIndex].lemma };
      }
    }
    return null;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("API Error:", error.response?.data || error.message);
      throw new Error(`Failed to fetch next unreviewed word: ${error.message}`);
    }
    throw error;
  }
}
