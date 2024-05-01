import { corsHeaders } from "../cors.ts";
import { createAgent, getUserData } from "./util.ts";

Deno.serve(async (req) => {
    const { method } = req;

    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    if (method === "POST") {
        await getUserData(req)
        
        const { userMessage } = await req.json()
        if (!userMessage) return new Response("No message provided", { status: 500 });
        console.log(userMessage)

        const agentExecutor = await createAgent();
        if (!agentExecutor) throw Error("Can`t initialize agent executor");
        const resp = await agentExecutor.invoke({
            input: userMessage,
            username: "Kamil",
            date: new Date().toDateString(),
        })

        console.log(resp)
        if (resp.output) {
            return new Response(resp.output,
                { headers: { ...corsHeaders }, status: 200 });
        } else {
            return new Response("Cannot get response", {
                status: 503,
                headers: { ...corsHeaders }
            })
        }
    } else {
        return new Response("An error ocurred", {
            status: 405,
            headers: { ...corsHeaders }
        })
    }
})