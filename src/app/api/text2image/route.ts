
export const runtime = "edge";

// Edge API functions should be async and return a Response object
export async function GET(req: Request): Promise<Response> {
  console.log('Requesting image for text based on query:', new URL(req.url).searchParams.get('text'));

  const url = new URL(req.url);
  const text = url.searchParams.get("text");

  if (!text) {
    return new Response("Text parameter is required and must be a string.", { status: 400 });
  }

  console.log('Generating image for text:', text);

  // Load environment variable directly as it's supported by Workers
  const baseUrl = process.env.APP_URL;
  if (!baseUrl) {
    return new Response('Server configuration error: APP_URL is not defined.', { status: 500 });
  }

  console.log('Using base URL:', baseUrl);

  try {
    const workerUrl = `${baseUrl}/api/text2image?text=${encodeURIComponent(text)}`;
    const response = await fetch(workerUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const imageData = await response.arrayBuffer();

    return new Response(imageData, {
      headers: { 'Content-Type': 'image/png' }
    });
  } catch (error: any) {
    return new Response(`Failed to process image: ${error.message}`, { status: 500 });
  }
}
