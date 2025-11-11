import { forwardRef } from "react"
import { cn } from "@/utils/cn"

const Card = forwardRef(({
  children,
  className,
  hover = false,
  padding = "default",
  ...props
}, ref) => {
  const paddingClasses = {
    none: "",
    sm: "p-4",
    default: "p-6",
    lg: "p-8"
  }

  return (
    <div
      ref={ref}
      className={cn(
        "bg-white rounded-lg border border-gray-200 shadow-card transition-all duration-200",
        hover && "card-hover hover:shadow-card-hover cursor-pointer",
        paddingClasses[padding],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
})

Card.displayName = "Card"

export default Card