"use server";

import { z } from "zod";
import {
  bookSchema,
  CitationSchema,
  personSchema,
  PublisherSchema,
  SenseSchema,
  WordSchema,
} from "../schemas/Schema";
import axios from "axios";
import { cleanData, typeMap } from "../utils/util";
import { InputWord } from "../(mainroutes)/word/_components/wordForm";


const API_URL ="https://monlam-dictionary-api-wuyq.onrender.com"


export async function createPerson(data: z.infer<typeof personSchema>) {
  try {
    const { type, ...dataToSend } = data;
    const pathnav = typeMap[type];

    if (!pathnav) {
      throw new Error("Invalid type selected");
    }

    const response = await axios.post(
      API_URL+`/api/grand/book/${pathnav}/create`,
      dataToSend,
      {
        headers: {
          apikey: process.env.API_KEY,
          accept: "application/json",
          "Content-Type": "application/json",
        },
      },
    );
    return { success: true, data: response.data };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.detail || "Form submission failed");
    }
    throw new Error("An unexpected error occurred");
  }
}

export async function createPublisher(data: z.infer<typeof PublisherSchema>) {
  try {
    const response = await axios.post(
      API_URL+"/api/grand/book/publisher/create",
      data,
      {
        headers: {
          apikey: process.env.API_KEY,
          accept: "application/json",
          "Content-Type": "application/json",
        },
      },
    );
    return { success: true, data: response.data };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.detail || "Form submission failed");
    }
    throw new Error("An unexpected error occurred");
  }
}

export async function createBook(data: z.infer<typeof bookSchema>) {
  const cleandata = cleanData(data);
  try {
    const response = await axios.post(
      API_URL+"/api/grand/metadata/book/create",
      cleandata,
      {
        headers: {
          apikey: process.env.API_KEY,
          accept: "application/json",
          "Content-Type": "application/json",
        },
      },
    );
    return { success: true, data: response.data };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.detail || "Form submission failed");
    }
    throw new Error("An unexpected error occurred");
  }
}

export async function createSense(data: z.infer<typeof SenseSchema>) {
  try {
    const response = await axios.post(
      API_URL+"/api/grand/sense/create",
      data,
      {
        headers: {
          apikey: process.env.API_KEY,
          accept: "application/json",
          "Content-Type": "application/json",
        },
      },
    );
    return { success: true, data: response.data };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.detail || "Form submission failed");
    }
    throw new Error("An unexpected error occurred");
  }
}
export const editSense = async (
  data: z.infer<typeof SenseSchema> & { id: string },
) => {
  const response = await axios.put(
    API_URL+`/api/grand/sense/edit/${data.id}`,
    data,
    {
      headers: {
        apikey: process.env.API_KEY,
        accept: "application/json",
        "Content-Type": "application/json",
      },
    },
  );
  return response.data;
};
export async function createWord(data: z.infer<typeof WordSchema>) {
  try {
    const response = await axios.post(
      API_URL+"/api/grand/word/create",
      data,
      {
        headers: {
          apikey: process.env.API_KEY,
          accept: "application/json",
          "Content-Type": "application/json",
        },
      },
    );
    return { success: true, data: response.data };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.detail || "Form submission failed");
    }
    throw new Error("An unexpected error occurred");
  }
}

export async function createCitation(data: z.infer<typeof CitationSchema>) {
  try {
    const response = await axios.post(
      API_URL+"/api/grand/metadata/citation/create",
      data,
      {
        headers: {
          apikey: process.env.API_KEY,
          accept: "application/json",
          "Content-Type": "application/json",
        },
      },
    );
    return { success: true, data: response.data };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.detail || "Form submission failed");
    }
    throw new Error("An unexpected error occurred");
  }
}

// In PostActions.ts
export const updateword = async (id: number, data: InputWord) => {
  try {
    const response = await axios.put(
      API_URL+`/api/grand/word/edit/${id}`,
      {
        lemma: data.lemma,
        is_modern: data.is_modern,
        is_reviewed: data.is_reviewed,
        is_frequent: data.is_frequent,
        originId: data.originId,
      },
      {
        headers: {
          apikey: process.env.API_KEY,
          accept: "application/json",
          "Content-Type": "application/json",
        },
      },
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to update word");
  }
};
