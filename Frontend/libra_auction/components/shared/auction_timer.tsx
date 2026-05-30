"use client";

import { useEffect, useState } from "react";

interface AuctionTimerProps {
  endTimeMs: number;
  isPaused: boolean;
  onTick?: (timeLeftMs: number) => void;
  onEnd?: () => void;
  size?: "sm" | "md" | "lg";
}

export default function AuctionTimer({
  endTimeMs,
  isPaused,
  onTick,
  onEnd,
  size = "md",
}: AuctionTimerProps) {
  const [timeLeftMs, setTimeLeftMs] = useState(() =>
    Math.max(0, endTimeMs - Date.now())
  );
  const [pausedAt, setPausedAt] = useState<number | null>(null);
  const [pausedRemaining, setPausedRemaining] = useState<number | null>(null);

  useEffect(() => {
    if (isPaused) {
      // Capture the remaining time when paused
      if (pausedAt === null) {
        setPausedAt(Date.now());
        setPausedRemaining(Math.max(0, endTimeMs - Date.now()));
      }
      return;
    }

    // If resuming from pause, adjust endTime
    if (pausedAt !== null && pausedRemaining !== null) {
      // Timer continues from where it was paused
      setPausedAt(null);
      setPausedRemaining(null);
    }

    const interval = setInterval(() => {
      const remaining = Math.max(0, endTimeMs - Date.now());
      setTimeLeftMs(remaining);
      onTick?.(remaining);

      if (remaining <= 0) {
        clearInterval(interval);
        onEnd?.();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [endTimeMs, isPaused, pausedAt, pausedRemaining, onTick, onEnd]);

  const displayMs = isPaused && pausedRemaining !== null ? pausedRemaining : timeLeftMs;

  const hours = Math.floor(displayMs / (1000 * 60 * 60));
  const minutes = Math.floor((displayMs % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((displayMs % (1000 * 60)) / 1000);

  const pad = (n: number) => n.toString().padStart(2, "0");
  const timeStr = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;

  // Color based on time remaining
  const getColorClass = () => {
    if (isPaused) return "text-yellow-600";
    if (displayMs <= 60 * 1000) return "text-red-600"; // < 1 min
    if (displayMs <= 5 * 60 * 1000) return "text-yellow-600"; // < 5 min
    return "text-green-600";
  };

  const sizeClasses = {
    sm: "text-lg font-semibold",
    md: "text-2xl font-bold",
    lg: "text-4xl font-bold tracking-wider",
  };

  return (
    <div className="flex items-center justify-center gap-3">
      <div className={`${sizeClasses[size]} ${getColorClass()} font-mono`} suppressHydrationWarning>
        {isPaused ? (
          <span className="flex items-center gap-2">
            <span className="animate-pulse">⏸</span>
            <span className="line-through opacity-60">{timeStr}</span>
            <span className="text-yellow-600 text-sm font-sans ml-2">
              TẠM DỪNG
            </span>
          </span>
        ) : displayMs <= 0 ? (
          <span className="text-red-600">ĐÃ KẾT THÚC</span>
        ) : (
          timeStr
        )}
      </div>
    </div>
  );
}
