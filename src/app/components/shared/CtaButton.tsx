import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../ui/utils";

const ctaButtonVariants = cva(
  "inline-flex items-center justify-center rounded-[3px] font-bold transition-opacity disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:opacity-90",
        outline: "bg-transparent text-primary border border-primary hover:bg-primary/10",
      },
      size: {
        md: "h-10 px-4 text-sm",
        lg: "h-11 px-8 text-[15px]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

type CtaButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof ctaButtonVariants>;

export function CtaButton({ className, variant, size, ...props }: CtaButtonProps) {
  return <button className={cn(ctaButtonVariants({ variant, size, className }))} {...props} />;
}
