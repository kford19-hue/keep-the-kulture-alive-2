import { PropsWithChildren } from "react";

interface PanelProps extends PropsWithChildren {
  className?: string;
}

export function Panel({ children, className = "" }: PanelProps) {
  return <section className={`oracle-panel ${className}`}>{children}</section>;
}
