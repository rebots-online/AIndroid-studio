
import * as React from "react"
import { cn } from "@/lib/utils"
import { ChevronRight } from "lucide-react"

const List = React.forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement>
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("space-y-2", className)}
    {...props}
  />
))
List.displayName = "List"

const ListItem = React.forwardRef<
  HTMLLIElement,
  React.LiHTMLAttributes<HTMLLIElement>
>(({ className, children, ...props }, ref) => (
  <li
    ref={ref}
    className={cn(
      "flex items-center text-sm text-muted-foreground",
      className
    )}
    {...props}
  >
    <ChevronRight className="h-4 w-4 mr-2 text-primary shrink-0" />
    <span>{children}</span>
  </li>
))
ListItem.displayName = "ListItem"

export { List, ListItem }
