import * as React from "react";
import { cn } from "@/lib/utils";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode;
}

function Select({ className, children, ...props }: SelectProps) {
  return (
    <select
      className={cn(
        "flex h-11 w-full items-center justify-between rounded-xl border border-input bg-card/80 px-3 py-2 text-base transition-colors outline-none ring-ring focus-visible:ring-3 focus-visible:ring-ring/30 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/40 disabled:opacity-50 data-[placeholder]:text-muted-foreground",
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
}

function SelectItem({
  className,
  children,
  ...props
}: React.OptionHTMLAttributes<HTMLOptionElement>) {
  return (
    <option
      className={cn(
        "relative flex cursor-pointer select-none items-center rounded-lg px-3 py-2 text-base outline-none transition-colors focus:bg-muted focus:text-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 md:text-sm",
        className,
      )}
      {...props}
    >
      {children}
    </option>
  );
}

export { Select, SelectItem };
