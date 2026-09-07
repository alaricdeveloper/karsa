import * as Lucide from "lucide-react";

const ICON_MAP = new Map<string, React.ComponentType<React.SVGProps<SVGSVGElement>>>();

function toPascal(name: string): string {
  return name
    .split("-")
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join("");
}

export function Icon({
  name,
  className,
  ...rest
}: {
  name: string;
  className?: string;
  [key: string]: unknown;
}) {
  let Comp = ICON_MAP.get(name);
  if (!Comp) {
    const Key = toPascal(name) as keyof typeof Lucide;
    Comp = (Lucide[Key] as React.ComponentType<React.SVGProps<SVGSVGElement>>) || Lucide.Circle;
    ICON_MAP.set(name, Comp);
  }
  return (
    <Comp
      className={className}
      width={className?.includes("w-") ? undefined : 24}
      height={className?.includes("h-") ? undefined : 24}
      {...(rest as React.SVGProps<SVGSVGElement>)}
    />
  );
}