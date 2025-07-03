"use client";

import React, { useRef } from "react";
import { cn } from "@/lib/utils";
import { useClickOutside } from "@/hooks/use-click-outside";

interface DropdownProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  children: React.ReactNode;
}

interface DropdownTriggerProps {
  children: React.ReactNode;
  className?: string;
  "aria-label"?: string;
  onClick?: () => void;
}

interface DropdownContentProps {
  children: React.ReactNode;
  className?: string;
  align?: "start" | "center" | "end";
}

export function Dropdown({ isOpen, setIsOpen, children }: DropdownProps) {
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, () => setIsOpen(false));

  return (
    <div ref={ref} className="relative">
      {children}
    </div>
  );
}

export function DropdownTrigger({
  children,
  className,
  onClick,
  ...props
}: DropdownTriggerProps) {
  return (
    <button
      type="button"
      className={cn("cursor-pointer", className)}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}

export function DropdownContent({
  children,
  className,
  align = "start",
}: DropdownContentProps) {
  const alignmentClasses = {
    start: "left-0",
    center: "left-1/2 -translate-x-1/2",
    end: "right-0",
  };

  return (
    <div
      className={cn(
        "absolute top-full z-50 mt-2 rounded-lg",
        alignmentClasses[align],
        className,
      )}
    >
      {children}
    </div>
  );
} 