import { OpenAI } from "npm:@langchain/openai"

console.log("Hello from Functions!")

Deno.serve(async (req) => {

  const model = new OpenAI({
    modelName: "gpt-3.5-turbo-instruct", // Defaults to "gpt-3.5-turbo-instruct" if no model provided.
    temperature: 0.9,
    openAIApiKey: "", // In Node.js defaults to process.env.OPENAI_API_KEY
  });
  const res = await model.call(
    "What would be a good company name a company that makes colorful  socks?"
  );
  console.log(res)
  return new Response(
    JSON.stringify(res),
    { headers: { "Content-Type": "application/json" } },
  )
})
