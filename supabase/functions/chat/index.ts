import { createClient } from '@supabase/supabase-js'
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

Deno.serve((req: Request) => {
    return new Response('test')
})