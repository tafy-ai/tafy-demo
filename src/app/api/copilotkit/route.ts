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

  const langchainModel = process.env["CLOUDFLARE_AI_MODEL"];

  // return copilotKit.response(
  //   req,
  //   new OpenAIAdapter({ model: langchainModel })
  // );

  return copilotKit.response(
    req,
    new LangChainAdapter(async (forwardedProps) => {
      const model = new ChatCloudflareWorkersAI({
        model: langchainModel, // "@cf/meta/llama-2-7b-chat-int8",
        cloudflareAccountId: process.env.CLOUDFLARE_ACCOUNT_ID,
        cloudflareApiToken: process.env.CLOUDFLARE_API_TOKEN,
        // Pass a custom base URL to use Cloudflare AI Gateway
        // baseUrl: `https://gateway.ai.cloudflare.com/v1/{YOUR_ACCOUNT_ID}/{GATEWAY_NAME}/workers-ai/`,
      });
      // const model = new ChatOpenAI(
      //   { modelName: "gpt-4-1106-preview" }
      // );
      return model.stream(
        forwardedProps.messages,
        // [
        //   ["system", "You are a helpful assistant that translates English to German."],
        //   ["human", `Translate "I love programming".`],
        // ]
      );
      // return model.stream(
      //   forwardedProps.messages, 
      //   { tools: forwardedProps.tools }
      // );
    }),
  );
  
}
