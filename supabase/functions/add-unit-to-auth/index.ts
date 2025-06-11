
import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { serve, supabase } from "../shared/utils/edge-functions-utils.ts";

serve(async req => {
    const { user } = await req.json();
    const { data: profile } = await supabase
        .from("profile")
        .select("unit")
        .eq("uid", user.id)
        .single();
    return {
        claims: { unit: profile?.unit ?? null }
    };
});
