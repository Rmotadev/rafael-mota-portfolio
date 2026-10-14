import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "group/btn relative inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-[background-color,color,border-color,transform,box-shadow] duration-300 ease-out active:scale-[0.97]";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-white hover:bg-[#2550f0] shadow-[0_0_0_0_rgba(47,92,255,0)] hover:shadow-[0_8px_30px_-8px_rgba(47,92,255,0.45)]",
  secondary:
    "border border-line-strong bg-white/[0.03] text-fg hover:border-white/25 hover:bg-white/[0.07]",
  ghost: "text-muted hover:text-fg",
};

const sizes: Record<Size, string> = {
  md: "px-5 text-sm",
  lg: "px-6 text-[0.95rem] sm:px-7 sm:min-h-12",
};

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  external?: boolean;
};

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  children,
  external,
  ...props
}: ButtonLinkProps) {
  const externalProps = external ? { target: "_blank", rel: "noopener noreferrer" } : {};
  return (
    <a className={cn(base, variants[variant], sizes[size], className)} {...externalProps} {...props}>
      {children}
    </a>
  );
}

export const buttonClasses = (variant: Variant = "primary", size: Size = "md", className?: string) =>
  cn(base, variants[variant], sizes[size], className);
