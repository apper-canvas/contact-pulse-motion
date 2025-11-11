import { forwardRef } from "react"
import { cn } from "@/utils/cn"
import ApperIcon from "@/components/ApperIcon"

const Badge = forwardRef(({
  children,
  className,
  variant = "default",
  size = "md",
  icon,
  color,
  onClick,
  ...props
}, ref) => {
  const baseClasses = "inline-flex items-center font-medium rounded-full transition-all duration-150"
  
  const variants = {
    default: "bg-gray-100 text-gray-800 hover:bg-gray-200",
    primary: "bg-primary/10 text-primary hover:bg-primary/20",
    secondary: "bg-secondary/10 text-secondary hover:bg-secondary/20",
    accent: "bg-accent/10 text-accent hover:bg-accent/20",
    success: "bg-green-100 text-green-800 hover:bg-green-200",
    warning: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
    error: "bg-red-100 text-red-800 hover:bg-red-200",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-50"
  }
  
  const sizes = {
    sm: "px-2 py-0.5 text-xs gap-1",
    md: "px-2.5 py-1 text-xs gap-1.5",
    lg: "px-3 py-1.5 text-sm gap-2"
  }

  const iconSizes = {
    sm: "w-3 h-3",
    md: "w-3.5 h-3.5",
    lg: "w-4 h-4"
  }

  const customStyle = color ? {
    backgroundColor: `${color}20`,
    color: color,
    border: `1px solid ${color}30`
  } : {}

  return (
    <span
      ref={ref}
      onClick={onClick}
      style={customStyle}
      className={cn(
        baseClasses,
        !color && variants[variant],
        sizes[size],
        onClick && "cursor-pointer hover:scale-105 category-badge",
        className
      )}
      {...props}
    >
      {icon && (
        <ApperIcon 
          name={icon} 
          className={iconSizes[size]} 
        />
      )}
      {children}
    </span>
  )
})

Badge.displayName = "Badge"

export default Badge