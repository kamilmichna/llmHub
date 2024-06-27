export const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}
// cors handle
    // if (req.method === 'OPTIONS') {
    //     return new Response('ok', { headers: corsHeaders })
    // }