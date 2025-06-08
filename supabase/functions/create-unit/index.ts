import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { supabase } from "../shared/supabase-client.ts";
import { serve } from "../shared/utils/edge-functions-utils.ts";

serve(async req => {
    const token = req.headers.get("Authorization")?.replace("Bearer ", "");
    if (!token) {
        return new Response(JSON.stringify({
            error: "Unauthorized"
        }), {
            status: 401
        });
    }
    const { data: authUser } = await supabase.auth.getUser(token);
    const { count: unitCount } = await supabase
        .from('unit')
        .select("*", { count: "exact", head: true })
        .eq('created_by', authUser.user!.id)
        .throwOnError();
    if (unitCount! >= 3) {
        return new Response(JSON.stringify({
            error: "Limit of 3 reached"
        }), {
            status: 403
        });
    }
    const { name } = await req.json();
    // const { data: unit } = await this.supabaseService.client.from('unit').insert({
    //   name,
    //   created_by: authUser.id
    // }).select('id').single().throwOnError();
    const unit = { id: 1 };
    await supabase
        .from('user')
        .update({ unit: unit.id })
        .eq('uid', authUser.user!.id)
        .throwOnError();
    return { success: true };

})
