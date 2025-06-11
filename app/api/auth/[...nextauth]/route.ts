

import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
import { authOptions } from "./options";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    return await NextAuth(req, res, authOptions);
  } catch (error) {
    console.error("NextAuth error:", error);
    res.status(500).json({ error: "Authentication failed" });
  }
};

export { handler as GET, handler as POST };