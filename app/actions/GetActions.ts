'use server'

import axios from "axios"

//get for book
export async function getPublisher() {
    try {
        const response = await axios.get(
            `https://api.monlamdictionary.com/api/grand/book/publisher/list`,
            {
                headers: {
                    apikey: process.env.API_KEY,
                    accept: "application/json",
                    "Content-Type": "application/json",
                },
            }
        )
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('API Error:', error.response?.data || error.message);
            throw new Error(`Failed to fetch publishers: ${error.message}`);
          }
          throw error;
    }
}

export async function getEditor() {
    try {
        const response = await axios.get(
            `https://api.monlamdictionary.com/api/grand/book/editor/list`,
            {
                headers: {
                    apikey: process.env.API_KEY,
                    accept: "application/json",
                    "Content-Type": "application/json",
                },
            }
        )
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('API Error:', error.response?.data || error.message);
            throw new Error(`Failed to fetch publishers: ${error.message}`);
          }
          throw error;
    }
}

export async function getTerton() {
    try {
        const response = await axios.get(
            `https://api.monlamdictionary.com/api/grand/book/terton/list`,
            {
                headers: {
                    apikey: process.env.API_KEY,
                    accept: "application/json",
                    "Content-Type": "application/json",
                },
            }
        )
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('API Error:', error.response?.data || error.message);
            throw new Error(`Failed to fetch publishers: ${error.message}`);
          }
          throw error;
    }
}

export async function getTranslator() {
    try {
        const response = await axios.get(
            `https://api.monlamdictionary.com/api/grand/book/translator/list`,
            {
                headers: {
                    apikey: process.env.API_KEY,
                    accept: "application/json",
                    "Content-Type": "application/json",
                },
            }
        )
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('API Error:', error.response?.data || error.message);
            throw new Error(`Failed to fetch publishers: ${error.message}`);
          }
          throw error;
    }
}

export async function getAuthor() {
    try {
        const response = await axios.get(
            `https://api.monlamdictionary.com/api/grand/book/author/list`,
            {
                headers: {
                    apikey: process.env.API_KEY,
                    accept: "application/json",
                    "Content-Type": "application/json",
                },
            }
        )
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('API Error:', error.response?.data || error.message);
            throw new Error(`Failed to fetch publishers: ${error.message}`);
          }
          throw error;
    }
}

export async function getPrintMethod() {
    try {
        const response = await axios.get(
            `https://api.monlamdictionary.com/api/grand/book/print_method/list`,
            {
                headers: {
                    apikey: process.env.API_KEY,
                    accept: "application/json",
                    "Content-Type": "application/json",
                },
            }
        )
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('API Error:', error.response?.data || error.message);
            throw new Error(`Failed to fetch publishers: ${error.message}`);
          }
          throw error;
    }
}
