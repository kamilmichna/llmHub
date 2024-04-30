import { createClient } from "npm:@supabase/supabase-js@^2.39.8";

const { SUPABASE_ANON_KEY, SUPABASE_URL, GROQ_KEY } = Deno.env.toObject();
// const client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
import { ChatGroq } from "npm:@langchain/groq";
import { HumanMessage } from "npm:@langchain/core/messages";
import { ChatPromptTemplate } from "npm:@langchain/core/prompts";
import { corsHeaders } from "../cors.ts";

Deno.serve(async (req) => {
    const { method } = req;
    console.log("TEST")
    console.log(method)
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }
    if (method === "POST") {
        const {userMessage} = await req.json()
        if (!userMessage) return new Response("No message provided", {status: 500});
        console.log(userMessage)
        const model = new ChatGroq({
            apiKey: GROQ_KEY,
            modelName: 'gemma-7b-it'
        });

        const template = ChatPromptTemplate.fromMessages(
            [
                new HumanMessage(userMessage)
            ]
        )

        const resp = await template.pipe(model).invoke({})
        if (resp.content.toString()) {
            return new Response(resp.content.toString(),
                { headers: { ...corsHeaders }, status: 200 });
        } else {
            return new Response("Cannot get response", {
                status: 503,
                headers: {...corsHeaders}
            })
        }
    } else {
        return new Response("An error ocurred", {
            status: 405,
            headers: {...corsHeaders}
        })
    }
})