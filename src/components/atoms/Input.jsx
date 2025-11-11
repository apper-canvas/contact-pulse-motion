import { forwardRef } from "react"
import { cn } from "@/utils/cn"
import ApperIcon from "@/components/ApperIcon"

const Input = forwardRef(({
  className,
  type = "text",
  label,
  error,
  icon,
  placeholder,
  required = false,
  ...props
}, ref) => {
  const inputId = props.id || `input-${Math.random().toString(36).substr(2, 9)}`

  return (
    <div className="space-y-2">
      {label && (
        <label 
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <ApperIcon 
              name={icon} 
              className="h-5 w-5 text-gray-400" 
            />
          </div>
        )}
        
        <input
          ref={ref}
          id={inputId}
          type={type}
          placeholder={placeholder}
          className={cn(
            "block w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-gray-900 placeholder-gray-500 transition-all duration-200",
            "focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none",
            "disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500",
            icon && "pl-10",
            error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
            className
          )}
          {...props}
        />
      </div>
      
      {error && (
        <p className="text-sm text-red-600 flex items-center gap-1">
          <ApperIcon name="AlertCircle" className="h-4 w-4" />
          {error}
        </p>
      )}
    </div>
  )
})

Input.displayName = "Input"

export default Input