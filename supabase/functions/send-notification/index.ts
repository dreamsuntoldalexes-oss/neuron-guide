import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY")!;
    const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const authHeader = req.headers.get("Authorization") || "";
    if (!authHeader.startsWith("Bearer ")) return json({ error: "Unauthorized" }, 401);

    const userClient = createClient(SUPABASE_URL, ANON_KEY, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: userData, error: userErr } = await userClient.auth.getUser();
    if (userErr || !userData?.user) return json({ error: "Unauthorized" }, 401);
    const caller = userData.user;

    const admin = createClient(SUPABASE_URL, SERVICE_KEY);

    // Only authorized (admin) accounts may send notifications
    const { data: isAdmin } = await admin.rpc("has_role", {
      _user_id: caller.id,
      _role: "admin",
    });
    if (!isAdmin) return json({ error: "Forbidden: admin role required" }, 403);

    const body = await req.json().catch(() => null);
    const title = typeof body?.title === "string" ? body.title.trim() : "";
    const message = typeof body?.body === "string" ? body.body.trim() : "";
    const category = typeof body?.category === "string" ? body.category.slice(0, 40) : "general";
    const link = typeof body?.link === "string" ? body.link.slice(0, 400) : null;
    const targetUserId = typeof body?.userId === "string" ? body.userId : null;

    if (!title || title.length > 160 || !message || message.length > 1000) {
      return json({ error: "title (1-160) and body (1-1000) are required" }, 400);
    }

    let recipients: string[] = [];
    if (targetUserId) {
      recipients = [targetUserId];
    } else {
      const { data: profiles, error } = await admin.from("profiles").select("id");
      if (error) return json({ error: error.message }, 500);
      recipients = (profiles ?? []).map((p: { id: string }) => p.id);
    }

    if (recipients.length === 0) return json({ sent: 0 });

    const rows = recipients.map((user_id) => ({ user_id, title, body: message, category, link }));
    const { error: insertErr } = await admin.from("notifications").insert(rows);
    if (insertErr) return json({ error: insertErr.message }, 500);

    return json({ sent: rows.length });
  } catch (e) {
    return json({ error: e instanceof Error ? e.message : "Unexpected error" }, 500);
  }
});
