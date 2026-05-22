import { useState, useRef } from "react";

export function useAgentLoop() {
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const start = (callback: () => void, intervalMs = 15000) => {
    setRunning(true);
    callback();
    intervalRef.current = setInterval(callback, intervalMs);
  };

  const stop = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setRunning(false);
  };

  return { running, start, stop };
}
