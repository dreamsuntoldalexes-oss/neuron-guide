import { useEffect, useState } from "react";
import { Send, ShieldCheck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export default function AdminNotificationSender() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [link, setLink] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id)
        .eq("role", "admin")
        .maybeSingle();
      setIsAdmin(!!data);
    })();
  }, []);

  if (!isAdmin) return null;

  const send = async () => {
    if (!title.trim() || !body.trim()) {
      toast({ title: "Missing details", description: "Add a title and a message first." });
      return;
    }
    setSending(true);
    const { data, error } = await supabase.functions.invoke("send-notification", {
      body: { title: title.trim(), body: body.trim(), link: link.trim() || undefined, category: "announcement" },
    });
    setSending(false);
    if (error) {
      toast({ title: "Could not send", description: error.message });
      return;
    }
    toast({ title: "Notification sent", description: `Delivered to ${data?.sent ?? 0} users.` });
    setTitle(""); setBody(""); setLink("");
  };

  return (
    <section className="space-y-3">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground px-1 flex items-center gap-2">
        <ShieldCheck className="w-3.5 h-3.5 text-primary" /> Admin — Send notification
      </h2>
      <div className="glass-card p-4 space-y-3">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title (e.g. 12 new AI tools just landed)"
          aria-label="Notification title"
          className="w-full bg-muted/40 border border-border/60 rounded-xl px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50"
        />
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={3}
          placeholder="Message shown to every signed-in user"
          aria-label="Notification message"
          className="w-full bg-muted/40 border border-border/60 rounded-xl px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50"
        />
        <input
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="Optional link (e.g. /tools)"
          aria-label="Notification link"
          className="w-full bg-muted/40 border border-border/60 rounded-xl px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50"
        />
        <button
          onClick={send}
          disabled={sending}
          className="w-full py-2.5 rounded-xl text-sm font-semibold gradient-primary text-primary-foreground flex items-center justify-center gap-2 disabled:opacity-60 active:scale-[0.98] transition"
        >
          <Send className="w-4 h-4" /> {sending ? "Sending…" : "Send to all users"}
        </button>
      </div>
    </section>
  );
}
