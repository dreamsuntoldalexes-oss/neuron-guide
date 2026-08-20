import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export type AppNotification = {
  id: string;
  title: string;
  body: string;
  category: string;
  link: string | null;
  read: boolean;
  created_at: string;
};

export function useNotifications() {
  const [items, setItems] = useState<AppNotification[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  const load = useCallback(async (uid: string) => {
    const { data } = await supabase
      .from("notifications")
      .select("id, title, body, category, link, read, created_at")
      .order("created_at", { ascending: false })
      .limit(30);
    setItems((data as AppNotification[]) || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    let channel: ReturnType<typeof supabase.channel> | null = null;
    let cancelled = false;

    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (cancelled) return;
      if (!session) { setLoading(false); return; }
      const uid = session.user.id;
      setUserId(uid);
      await load(uid);

      channel = supabase
        .channel("notifications-feed")
        .on(
          "postgres_changes",
          { event: "INSERT", schema: "public", table: "notifications", filter: `user_id=eq.${uid}` },
          (payload) => {
            const n = payload.new as AppNotification;
            setItems((prev) => [n, ...prev].slice(0, 30));
            toast({ title: `🔔 ${n.title}`, description: n.body });
            try {
              if (typeof Notification !== "undefined" && Notification.permission === "granted") {
                new Notification(n.title, { body: n.body });
              }
            } catch { /* ignore */ }
          },
        )
        .subscribe();
    })();

    return () => {
      cancelled = true;
      if (channel) supabase.removeChannel(channel);
    };
  }, [load]);

  const markAllRead = useCallback(async () => {
    if (!userId) return;
    setItems((prev) => prev.map((n) => ({ ...n, read: true })));
    await supabase.from("notifications").update({ read: true }).eq("user_id", userId).eq("read", false);
  }, [userId]);

  const markRead = useCallback(async (id: string) => {
    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
    await supabase.from("notifications").update({ read: true }).eq("id", id);
  }, []);

  const remove = useCallback(async (id: string) => {
    setItems((prev) => prev.filter((n) => n.id !== id));
    await supabase.from("notifications").delete().eq("id", id);
  }, []);

  return {
    items,
    loading,
    signedIn: !!userId,
    unread: items.filter((n) => !n.read).length,
    markAllRead,
    markRead,
    remove,
  };
}
