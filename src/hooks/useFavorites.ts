import { useState, useEffect, useCallback } from "react";
import { getUserTier, getMaxFavorites } from "@/data/tools";
import { toast } from "@/hooks/use-toast";

const STORAGE_KEY = "ai-tools-favorites";

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = useCallback((toolId: string) => {
    setFavorites((prev) => {
      if (prev.includes(toolId)) {
        return prev.filter((id) => id !== toolId);
      }
      const tier = getUserTier();
      const max = getMaxFavorites(tier);
      if (prev.length >= max) {
        toast({
          title: "Favorites limit reached",
          description: `Your ${tier} plan allows up to ${max} favorites. Upgrade to save more!`,
          variant: "destructive",
        });
        return prev;
      }
      return [...prev, toolId];
    });
  }, []);

  const isFavorite = useCallback(
    (toolId: string) => favorites.includes(toolId),
    [favorites]
  );

  return { favorites, toggleFavorite, isFavorite };
}
