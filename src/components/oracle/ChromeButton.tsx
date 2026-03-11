import { ButtonHTMLAttributes, ReactNode } from "react";

interface ChromeButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export function ChromeButton({ children, className = "", ...props }: ChromeButtonProps) {
  return (
    <button type="button" className={`chrome-button disabled:opacity-40 ${className}`} {...props}>
      {children}
    </button>
  );
}
