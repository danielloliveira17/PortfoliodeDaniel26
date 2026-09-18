const SUPABASE_URL = "https://jfwefeufbgswpeobdojn.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_QpxV8A3B05JR4nT1t9WMIQ_v2ADcXTd";

export const supabaseClient =
    window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_PUBLISHABLE_KEY
    );

window.supabaseClient = supabaseClient;