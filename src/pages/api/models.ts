import type { NextApiRequest, NextApiResponse } from "next";

export const runtime = 'edge';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const apiKey = process.env["CLOUDFLARE_API_TOKEN"]; // (req.headers["authorization"] as string)?.split(" ")[1];
  if (!apiKey) {
    return res.status(401).json({ error: "Missing token" });
  }

  return [];
}
