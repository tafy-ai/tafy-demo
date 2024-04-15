import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('Requesting image for text:', req.query.text);

  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    res.status(405).end('Method Not Allowed');
    return;
  }

  const text = req.query.text;

  if (!text || typeof text !== 'string') {
    res.status(400).json({ error: 'Text parameter is required and must be a string.' });
    return;
  }

  console.log('Generating image for text:', text);

  // Ensure the environment variable is loaded properly
  const baseUrl = process.env.APP_URL;
  if (!baseUrl) {
    res.status(500).json({ error: 'Server configuration error: APP_URL is not defined.' });
    return;
  }

  console.log('Using base URL:', baseUrl);
  
  try {
    const workerUrl = `${baseUrl}/api/text2image?text=${encodeURIComponent(text)}`;
    const workerResponse = await fetch(workerUrl);

    if (!workerResponse.ok) {
      throw new Error(`Worker responded with status: ${workerResponse.status}`);
    }

    const imageData = await workerResponse.arrayBuffer();

    res.setHeader('Content-Type', 'image/png');
    res.status(200).send(Buffer.from(imageData));
  } catch (error) {
    res.status(500).json({ error: error.message || 'Failed to process image.' });
  }
}
