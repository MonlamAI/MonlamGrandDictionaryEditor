'use server'

import { z } from "zod"
import { bookSchema, personSchema, PublisherSchema } from "../schemas/Schema"
import axios from "axios"

const typeMap: { [key: string]: string } = {
  "རྩོམ་སྒྲིག་པ་": "editor",
  "གཏེར་སྟོན་": "terton",
  "ལོ་ཙཱ་བ་": "translator",
  "རྩོམ་པ་པོ་": "author",
}

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
  try {
    const response = await axios.post(
      "https://api.monlamdictionary.com/api/grand/metadata/book/create",
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

