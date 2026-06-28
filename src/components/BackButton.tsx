import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function BackButton({ fallback = "/home", className = "" }: { fallback?: string; className?: string }) {
  const navigate = useNavigate();
  const handle = () => {
    if (window.history.length > 1) navigate(-1);
    else navigate(fallback);
  };
  return (
    <button
      onClick={handle}
      aria-label="Go back"
      className={`inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition ${className}`}
    >
      <ArrowLeft className="w-4 h-4" /> Back
    </button>
  );
}
