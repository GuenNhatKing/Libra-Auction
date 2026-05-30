"use client";

import React from "react";

interface SurfaceCardProps {
  children: React.ReactNode;
  className?: string;
  padding?: "sm" | "md" | "lg";
  hover?: boolean;
  onClick?: () => void;
}

export default function SurfaceCard({
  children,
  className = "",
  padding = "md",
  hover = false,
  onClick,
}: SurfaceCardProps) {
  const paddingClasses = {
    sm: "p-3",
    md: "p-5",
    lg: "p-8",
  };

  return (
    <div
      className={`bg-white rounded-2xl border border-gray-100 shadow-sm ${
        paddingClasses[padding]
      } ${hover ? "hover:shadow-md transition-shadow cursor-pointer" : ""} ${className}`}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
    >
      {children}
    </div>
  );
}
