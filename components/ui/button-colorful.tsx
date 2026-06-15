import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

interface ButtonColorfulProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
}

export function ButtonColorful({
  className,
  label = "Explore Components",
  ...props
}: ButtonColorfulProps) {
  return (
    <Button
      variant="gradient"
      className={cn("gap-2", className)}
      {...props}
    >
      {label}
      <ArrowUpRight className="w-3.5 h-3.5" />
    </Button>
  );
}
