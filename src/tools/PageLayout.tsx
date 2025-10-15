import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type PaddingSize = "default" | "compact" | "none";

interface PageLayoutProps {
  children: ReactNode;
  pagination?: ReactNode;
  className?: string;
  paddingSize?: PaddingSize;
}

const PageLayout = ({ 
  children, 
  pagination = null, 
  className = "", 
  paddingSize = "default" 
}: PageLayoutProps) => {
  const paddingMap: Record<PaddingSize, string> = {
    default: "px-4 py-12 lg:py-18 xl:px-0",
    compact: "px-4 pt-5 pb-12 lg:pb-18 xl:px-0 min-h-[calc(100vh-248px)] relative",
    none: "px-4 xl:px-0 py-5",
  };

  return (
    <div className={cn("container max-w-7xl mx-auto", paddingMap[paddingSize], className)}>
      <div className="flex-grow mb-4 lg:mb-0">
        {children}
      </div>
      {pagination}
    </div>
  );
};

export default PageLayout;