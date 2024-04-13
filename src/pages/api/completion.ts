import type { NextApiRequest, NextApiResponse } from "next";
import { defaultConfig, getCloudflareCompletion } from "@/utils/Cloudflare";
import { CloudflareRequest } from "@/utils/Cloudflare";

export const config = {
  runtime: "edge",
};

interface Response {
  content?: string;
  error?: string;
}

export default async function handler(
  req: Request,
  res: NextApiResponse<Response>
) {
  const {
    model,
    max_tokens,
    temperature,
    top_p,
    frequency_penalty,
    presence_penalty,
    messages,
  } = await req.json();

  if (!messages) {
    return new Response("Missing messages", { status: 400 });
  }

  const token = process.env["CLOUDFLARE_API_TOKEN"] || ''; // Ensure token is a string
  /*if (!token) {
    return new Response("Missing token", { status: 401 });
  }*/

  const config = {
  };

  const payload: CloudflareRequest = {
    ...config,
    messages,
  };

  try {
    // Check if token is not an empty string before calling the function
    if (token === '') {
      throw new Error('Missing Cloudflare API token');
    }
    const stream = await getCloudflareCompletion(token, payload);
    return new Response(stream);
  } catch (e: any) {
    return new Response(e.message || "Error fetching response.", {
      status: 500,
    });
  }
}
