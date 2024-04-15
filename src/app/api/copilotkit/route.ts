import { CopilotBackend, LangChainAdapter, OpenAIAdapter } from "@copilotkit/backend";
import { ChatCloudflareWorkersAI } from "@langchain/cloudflare";
import { researchWithLangGraph } from "./research";
import { Action } from "@copilotkit/shared";

export const runtime = "edge";

const researchAction: Action<any> = {
  name: "research",
  description:
    "Call this function to conduct research on a certain topic. Respect other notes about when to call this function",
  parameters: [
    {
      name: "topic",
      type: "string",
      description: "The topic to research. 5 characters or longer.",
    },
  ],
  handler: async ({ topic }) => {
    console.log("Researching topic: ", topic);
    return await researchWithLangGraph(topic);
  },
};

export async function POST(req: Request): Promise<Response> {
  const actions: Action<any>[] = [];
  if (process.env["TAVILY_API_KEY"]) {
    actions.push(researchAction);
  }
  const copilotKit = new CopilotBackend({
    actions: actions,
  });

  // NOTE: This only works with tool-calling models
  if (process.env["USE_CLOUDFLARE_AI"] === "yes") {
    const langchainModel = process.env["CLOUDFLARE_AI_MODEL"];

    return copilotKit.response(
      req,
      // new OpenAIAdapter({ model: openaiModel })
      new LangChainAdapter(async (forwardedProps) => {
        const llm = new ChatCloudflareWorkersAI({
          model: langchainModel,
          cloudflareAccountId: process.env.CLOUDFLARE_ACCOUNT_ID,
          cloudflareApiToken: process.env.CLOUDFLARE_API_TOKEN,
          // Pass a custom base URL to use Cloudflare AI Gateway,
          //  see this to set it up:
          //  https://developers.cloudflare.com/ai-gateway/get-started/creating-gateway/

          // baseUrl: `https://gateway.ai.cloudflare.com/v1/ACCOUNT_TAG/GATEWAY/workers-ai/`,
          baseUrl: `https://gateway.ai.cloudflare.com/v1/${process.env['CLOUDFLARE_ACCOUNT_ID']}/tafy-demo/workers-ai/`
        });

        return llm.stream(
          forwardedProps.messages,
          // { tools: forwardedProps.tools }
        );
      }),
    );
  } else { // Use OpenAI
    const openaiModel = process.env["OPENAI_MODEL"];

    return copilotKit.response(
      req,
      new OpenAIAdapter({ model: openaiModel })
    );
  }
}
