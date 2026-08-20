import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Bell, Check, Trash2, X } from "lucide-react";
import { useNotifications } from "@/hooks/useNotifications";

export default function NotificationBell() {
  const { items, unread, signedIn, markAllRead, markRead, remove } = useNotifications();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  if (!signedIn) return null;

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={unread > 0 ? `Notifications, ${unread} unread` : "Notifications"}
        className="relative p-2 rounded-full border border-border/60 bg-muted/40 hover:border-primary/40 transition"
      >
        <Bell className="w-4 h-4 text-foreground" />
        {unread > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full gradient-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center shadow-lg shadow-primary/40">
            {unread > 9 ? "9+" : unread}
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.18 }}
            className="absolute right-0 mt-2 w-[300px] sm:w-[340px] max-h-[420px] overflow-y-auto glass-card p-3 z-50"
          >
            <div className="flex items-center justify-between pb-2 border-b border-border/40">
              <h3 className="text-sm font-heading font-semibold text-foreground">Notifications</h3>
              <div className="flex items-center gap-1">
                {unread > 0 && (
                  <button onClick={markAllRead} aria-label="Mark all as read" className="text-[11px] text-primary hover:underline">
                    Mark all read
                  </button>
                )}
                <button onClick={() => setOpen(false)} aria-label="Close notifications" className="p-1 rounded-lg hover:bg-muted">
                  <X className="w-3.5 h-3.5 text-muted-foreground" />
                </button>
              </div>
            </div>

            {items.length === 0 ? (
              <p className="text-xs text-muted-foreground py-6 text-center">
                No notifications yet. We'll ping you when new AI tools and updates land.
              </p>
            ) : (
              <ul className="divide-y divide-border/40">
                {items.map((n) => {
                  const content = (
                    <>
                      <div className="flex items-start gap-2">
                        <span className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${n.read ? "bg-transparent" : "bg-primary"}`} />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-foreground">{n.title}</p>
                          <p className="text-[11px] text-muted-foreground mt-0.5">{n.body}</p>
                          <p className="text-[10px] text-muted-foreground/70 mt-1">
                            {new Date(n.created_at).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </>
                  );
                  return (
                    <li key={n.id} className="py-2 flex items-start gap-2">
                      <div className="flex-1 min-w-0" onClick={() => markRead(n.id)}>
                        {n.link ? (
                          n.link.startsWith("http") ? (
                            <a href={n.link} target="_blank" rel="noopener noreferrer">{content}</a>
                          ) : (
                            <Link to={n.link} onClick={() => setOpen(false)}>{content}</Link>
                          )
                        ) : (
                          content
                        )}
                      </div>
                      <div className="flex flex-col gap-1">
                        {!n.read && (
                          <button onClick={() => markRead(n.id)} aria-label="Mark as read" className="p-1 rounded hover:bg-muted">
                            <Check className="w-3 h-3 text-primary" />
                          </button>
                        )}
                        <button onClick={() => remove(n.id)} aria-label="Delete notification" className="p-1 rounded hover:bg-muted">
                          <Trash2 className="w-3 h-3 text-muted-foreground" />
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
