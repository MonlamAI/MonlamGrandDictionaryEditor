import { getuserstatus } from "@/app/actions/GetActions";
import { handleAuth, handleCallback } from "@auth0/nextjs-auth0";
import axios from "axios";


const API_URL ="https://monlam-dictionary-api-wuyq.onrender.com"

const afterCallback = async (req, session, config) => {
  if (session?.user) {
    try {
      const checkuserexist = await getuserstatus(session.user.email);
      if (checkuserexist === 404) {
        const userData = {
          name: session.user.name,
          email: session.user.email,
          role: "user",
          picture: session.user.picture,
        };

        await axios.post(
          API_URL+`/api/user`,
          userData,
          {
            headers: {
              "Content-Type": "application/json",
              apikey: process.env.API_KEY,
            },
          },
        );
      }
    } catch (error) {
      console.error("Failed to create user:", error);
      if (axios.isAxiosError(error)) {
        console.error("API Error details:", {
          status: error.response?.status,
          data: error.response?.data,
        });
      }
    }
  }

  return session;
};

export const GET = handleAuth({
  callback: handleCallback({
    afterCallback,
  }),
});
