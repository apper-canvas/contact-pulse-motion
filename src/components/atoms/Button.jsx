import { forwardRef } from "react"
import { motion } from "framer-motion"
import { cn } from "@/utils/cn"
import ApperIcon from "@/components/ApperIcon"

const Button = forwardRef(({
  children,
  className,
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "left",
  isLoading = false,
  disabled = false,
  ...props
}, ref) => {
  const baseClasses = "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
  
  const variants = {
    primary: "bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg focus:ring-primary/20 active:scale-95",
    secondary: "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:shadow-md focus:ring-primary/20 active:scale-95",
    outline: "bg-transparent text-primary border border-primary hover:bg-primary hover:text-white hover:shadow-md focus:ring-primary/20 active:scale-95",
    ghost: "bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:ring-gray-200 active:scale-95",
    danger: "bg-gradient-to-r from-red-500 to-red-600 text-white hover:shadow-lg focus:ring-red-500/20 active:scale-95",
    success: "bg-gradient-to-r from-green-500 to-green-600 text-white hover:shadow-lg focus:ring-green-500/20 active:scale-95"
  }
  
  const sizes = {
    sm: "px-3 py-2 text-sm gap-1.5",
    md: "px-4 py-2.5 text-sm gap-2",
    lg: "px-6 py-3 text-base gap-2.5",
    xl: "px-8 py-4 text-lg gap-3"
  }

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-4 h-4", 
    lg: "w-5 h-5",
    xl: "w-6 h-6"
  }

  return (
    <motion.button
      ref={ref}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={cn(
        baseClasses,
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <ApperIcon 
          name="Loader2" 
          className={cn("animate-spin", iconSizes[size])} 
        />
      )}
      
      {!isLoading && icon && iconPosition === "left" && (
        <ApperIcon 
          name={icon} 
          className={iconSizes[size]} 
        />
      )}
      
      {children}
      
      {!isLoading && icon && iconPosition === "right" && (
        <ApperIcon 
          name={icon} 
          className={iconSizes[size]} 
        />
      )}
    </motion.button>
  )
})

Button.displayName = "Button"

export default Button