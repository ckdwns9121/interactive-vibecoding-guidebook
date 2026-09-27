import { useState, useCallback, useEffect, useRef } from "react";

export function useCopyToClipboard(resetDelayMs = 2000) {
  const [isCopied, setIsCopied] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mounted = useRef(true);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);
  const reset = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    setIsCopied(false);
    setError(null);
  }, []);
  const copy = useCallback(
    async (text: string): Promise<boolean> => {
      if (timer.current) clearTimeout(timer.current);
      try {
        await navigator.clipboard.writeText(text);
        if (mounted.current) {
          setIsCopied(true);
          setError(null);
          if (resetDelayMs > 0) timer.current = setTimeout(() => setIsCopied(false), resetDelayMs);
        }
        return true;
      } catch (err) {
        if (mounted.current) {
          setError(err instanceof Error ? err : new Error("Copy failed"));
          setIsCopied(false);
        }
        return false;
      }
    },
    [resetDelayMs],
  );
  return { isCopied, error, copy, reset };
}
export default useCopyToClipboard;
