import { cn } from "@/lib/utils";

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function BentoCard({
  children,
  className,
  hover = true,
}: BentoCardProps) {
  return (
    <div
      className={cn(
        "bg-white border border-[#E5E5E0] rounded-2xl",
        hover && "transition-colors duration-200 hover:border-[#A3A39E]",
        className
      )}
    >
      {children}
    </div>
  );
}
