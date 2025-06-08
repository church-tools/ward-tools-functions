import { createClient } from "npm:@supabase/supabase-js";
import { Database } from "../../../../database.types.ts";
import { HttpError } from "./error-utils.ts";

const SUPABASE_URL = (Deno.env.get('PROJECT_SUPABASE_URL') ?? Deno.env.get('SUPABASE_URL'))!;
const SUPABASE_KEY = (Deno.env.get('PROJECT_SUPABASE_ANON_KEY') ?? Deno.env.get('SUPABASE_ANON_KEY'))!;
const SUPABASE_SERVICE_ROLE_KEY = (Deno.env.get('PROJECT_SUPABASE_SERVICE_ROLE_KEY') ?? Deno.env.get('SUPABASE_SERVICE_ROLE_KEY'))!;

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_KEY);
export const supabaseAdmin = createClient<Database>(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

export function serve(handler: (req: Request) => Promise<object | void>) {
    Deno.serve(async req => {
        try {
            const result = await handler(req);
            return new Response(
                JSON.stringify({ data: result }),
                { headers: { "Content-Type": "application/json" } },
            );
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : "Unknown error";
            const status = err instanceof HttpError ? err.status : 500;
            return new Response(
                JSON.stringify({ data: null, error: msg }),
                { headers: { "Content-Type": "application/json" }, status },
            );
        }
    })
}
