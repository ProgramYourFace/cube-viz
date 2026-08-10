import * as React from "react";

import { cn } from "@/components/ui/utils";

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("cv-skeleton", className)} {...props} />;
}

export { Skeleton };
