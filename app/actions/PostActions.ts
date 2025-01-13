'use server'

import { z } from "zod"
import { bookSchema, CitationSchema, personSchema, PublisherSchema, SenseSchema, WordSchema } from "../schemas/Schema"
import axios from "axios"
import { cleanData, typeMap } from "../utils/util"



export async function createPerson(data: z.infer<typeof personSchema>) {
  try {
    const { type, ...dataToSend } = data
    const pathnav = typeMap[type]
    
    if (!pathnav) {
      throw new Error("Invalid type selected")
    }

    const response = await axios.post(
      `https://api.monlamdictionary.com/api/grand/book/${pathnav}/create`,
      dataToSend,
      {
        headers: {
          apikey: process.env.API_KEY,
          accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
    return { success: true, data: response.data }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.detail || "Form submission failed")
    }
    throw new Error("An unexpected error occurred")
  }
}

export async function createPublisher(data: z.infer<typeof PublisherSchema>) {
    try {
      const response = await axios.post(
        "https://api.monlamdictionary.com/api/grand/book/publisher/create",
        data,
        {
          headers: {
            apikey: process.env.API_KEY,
            accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      return { success: true, data: response.data }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.detail || "Form submission failed")
      }
      throw new Error("An unexpected error occurred")
    }
}

export async function createBook(data: z.infer<typeof bookSchema>) {
  const cleandata=cleanData(data)
  console.log(cleandata)
  try {
    const response = await axios.post(
      "https://api.monlamdictionary.com/api/grand/metadata/book/create",
      cleandata,
      {
        headers: {
          apikey: process.env.API_KEY,
          accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
    return { success: true, data: response.data }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.detail || "Form submission failed")
    }
    throw new Error("An unexpected error occurred")
  }
}

export async function createSense(data: z.infer<typeof SenseSchema>) {
  console.log(data)
}

export async function createWord(data: z.infer<typeof WordSchema>) {
  try {
    const response = await axios.post(
      "https://api.monlamdictionary.com/api/grand/word/create",
      data,
      {
        headers: {
          apikey: process.env.API_KEY,
          accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
    return { success: true, data: response.data }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.detail || "Form submission failed")
    }
    throw new Error("An unexpected error occurred")
  }
}

export async function createCitation(data:z.infer<typeof CitationSchema>){
  try {
    const response = await axios.post(
      "https://api.monlamdictionary.com/api/grand/metadata/citation/create",
      data,
      {
        headers: {
          apikey: process.env.API_KEY,
          accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
    return { success: true, data: response.data }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.detail || "Form submission failed")
    }
    throw new Error("An unexpected error occurred")
  }
}