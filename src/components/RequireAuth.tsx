import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

/**
 * Blocks app pages for signed-out users. After logging out, users land on /login.
 */
export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<"checking" | "in" | "out">("checking");
  const location = useLocation();

  useEffect(() => {
    let mounted = true;

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;
      if (!session) {
        try { localStorage.removeItem("ai-tools-user"); } catch { /* ignore */ }
      }
      setStatus(session ? "in" : "out");
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!mounted) return;
      setStatus(session ? "in" : "out");
    });

    return () => { mounted = false; subscription.unsubscribe(); };
  }, []);

  if (status === "checking") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-10 h-10 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
      </div>
    );
  }

  if (status === "out") {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return <>{children}</>;
}
