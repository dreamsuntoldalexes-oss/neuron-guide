import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Youtube } from "lucide-react";

interface Props {
  open: boolean;
  videoId?: string;
  searchQuery?: string;
  title?: string;
  fallbackUrl: string;
  onClose: () => void;
}

/**
 * Plays a YouTube video inline via iframe embed.
 * If videoId is provided -> direct embed.
 * If only searchQuery is provided -> embeds YouTube search results page is not allowed,
 *   so we show a friendly fallback that opens YouTube in a new tab.
 */
export default function VideoPlayerModal({ open, videoId, searchQuery, title, fallbackUrl, onClose }: Props) {
  const [errored, setErrored] = useState(false);

  useEffect(() => {
    if (open) setErrored(false);
  }, [open, videoId]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const embedUrl = videoId
    ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`
    : null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-3"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl bg-card rounded-xl overflow-hidden border border-border/40 shadow-2xl"
          >
            <div className="flex items-center justify-between px-3 py-2 border-b border-border/30 bg-background/50">
              <p className="text-sm font-medium text-foreground truncate pr-2">{title || "Now Playing"}</p>
              <button onClick={onClose} className="p-1.5 rounded-full hover:bg-muted/50 transition" aria-label="Close">
                <X className="w-4 h-4 text-foreground" />
              </button>
            </div>

            <div className="relative w-full aspect-video bg-black">
              {embedUrl && !errored ? (
                <iframe
                  src={embedUrl}
                  title={title || "YouTube video player"}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  onError={() => setErrored(true)}
                  className="absolute inset-0 w-full h-full"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-white">
                  <Youtube className="w-12 h-12 text-red-500 mb-3" />
                  <p className="text-sm mb-4">
                    {searchQuery
                      ? "This is a YouTube playlist search. Open it on YouTube to browse all results."
                      : "This video can't play here. Open it on YouTube to watch."}
                  </p>
                  <a
                    href={fallbackUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-red-600 hover:bg-red-700 text-white text-sm font-semibold transition"
                  >
                    <Youtube className="w-4 h-4" /> Watch on YouTube <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-2 px-3 py-2 border-t border-border/30 bg-background/50">
              <a
                href={fallbackUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-red-600 hover:bg-red-700 text-white transition"
              >
                <Youtube className="w-3.5 h-3.5" /> Open on YouTube
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
