import { cn } from "@/lib/utils";
import type { OrderStatus } from "@/lib/types";
import { STATUS_COLORS, STATUS_LABELS } from "@/lib/constants";

interface StatusBadgeProps {
  status: OrderStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "px-2 py-0.5 rounded text-[10px] font-semibold font-mono inline-block",
        STATUS_COLORS[status],
        className
      )}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}
