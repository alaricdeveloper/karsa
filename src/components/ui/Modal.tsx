"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  maxWidth?: string;
}

export function Modal({
  open,
  onClose,
  children,
  className,
  maxWidth = "max-w-md",
}: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 bg-sand-900/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
    >
      <div
        className={cn(
          "bg-white border-t sm:border border-sand-300 rounded-t-3xl sm:rounded-2xl w-full max-h-[92vh] sm:max-h-[90vh] flex flex-col shadow-2xl font-sans",
          maxWidth,
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}
