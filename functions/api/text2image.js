import { Ai } from './vendor/@cloudflare/ai.js';

export default {
  async fetch(request, env) {
    try {
      const ai = new Ai(env.AI);
      const url = new URL(request.url);
      const promptText = url.searchParams.get('text');
      
      if (!promptText) {
        return new Response('Query parameter "text" is required.', { status: 400 });
      }

      const inputs = { prompt: promptText };

      const response = await ai.run('@cf/stabilityai/stable-diffusion-xl-base-1.0', inputs);

      return new Response(response, {
        headers: {'content-type': 'image/png'}
      });
    } catch (error) {
      return new Response(`Error processing request: ${error.message}`, { status: 500 });
    }
  }
};
