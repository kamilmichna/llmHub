const { GROQ_KEY } = Deno.env.toObject();
import { ChatGroq } from "npm:@langchain/groq";
import { AgentExecutor, createStructuredChatAgent } from "npm:langchain/agents";
import { WikipediaQueryRun } from "npm:@langchain/community/tools/wikipedia_query_run";
import { prompt } from './prompt.ts'
import { StructuredToolInterface } from "npm:@langchain/core/tools";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
export const createAgent = async () => {
    try {
        const tools = [
            new WikipediaQueryRun({
                topKResults: 5,
                maxDocContentLength: 100,
            }),
        ] as unknown as StructuredToolInterface[];
        const model = new ChatGroq({
            apiKey: GROQ_KEY,
            modelName: 'gemma-7b-it',
            verbose: true
        });

        const agent = await createStructuredChatAgent({
            llm: model,
            tools,
            prompt: prompt
        });

        const agentExecutor = new AgentExecutor({
            agent,
            tools: tools,
            returnIntermediateSteps: true,
        })

        return agentExecutor;
    } catch (e) {
        console.error(e)
    }
}

export const getUserData = async (req: Request) => {
    const authHeader = req.headers.get('Authorization')!
    console.log(authHeader)
    const supabaseClient = createClient(
        Deno.env.get('SUPABASE_URL') ?? '',
        Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    )

    // Get the session or user object
    const token = authHeader.replace('Bearer ', '')
    const { data } = await supabaseClient.auth.getUser(token)
    const user = data.user

    console.log("FETCHED USER", JSON.stringify(user))
}