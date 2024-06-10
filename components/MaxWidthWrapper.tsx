import { cn } from "@/lib/utils";
import { ReactNode } from "react";

const MaxWidthWrapper = ({
  className,
  style,
  children,
}: {
  className?: string;
  style?: React.CSSProperties;
  children?: ReactNode;
}) => {
  return (
    <div
      className={cn("h-dvh w-dvw overflow-auto bg-black", className)}
      style={style}
    >
      {children}
    </div>
  );
};

export default MaxWidthWrapper;
