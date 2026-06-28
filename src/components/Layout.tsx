import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import ContactWidget from "./ContactWidget";
import BottomNav from "./BottomNav";
import BackButton from "./BackButton";

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const hidePaths = ["/home", "/", "/welcome", "/login", "/signup", "/onboarding"];
  const showBack = !hidePaths.includes(location.pathname);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {showBack && (
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", damping: 22, stiffness: 250 }}
          className="sticky top-0 z-40 px-3 py-2 bg-background/80 backdrop-blur-lg border-b border-border/30"
        >
          <BackButton />
        </motion.div>
      )}
      <main className="flex-1 pb-24">{children}</main>
      <ContactWidget />
      <BottomNav />
    </div>
  );
}
