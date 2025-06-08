import { createClient } from "npm:@supabase/supabase-js";
import { Database } from "../../../database.types.ts";

const SUPABASE_URL = (Deno.env.get('PROJECT_SUPABASE_URL') ?? Deno.env.get('SUPABASE_URL'))!;
const SUPABASE_SERVICE_ROLE_KEY = (Deno.env.get('PROJECT_SUPABASE_SERVICE_ROLE_KEY') ?? Deno.env.get('SUPABASE_SERVICE_ROLE_KEY'))!;

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
