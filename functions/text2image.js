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

      const inputs = {
        prompt: promptText === 'hello'
          ? 'Delicious food is the best way to make your day better.'
          : promptText,
        max_tokens: 100,
        temperature: 0.5,
      };
      // console.log('Inputs:', inputs);

      const response = await ai.run(env.CLOUDFLARE_TEXT2IMAGE_MODEL, inputs);

      return new Response(response, {
        headers: {'content-type': 'image/png'}
      });
    } catch (error) {
      return new Response(`Error processing request: ${error.message}`, { status: 500 });
    }
  }
};
