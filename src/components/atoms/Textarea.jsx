import { forwardRef } from "react"
import { cn } from "@/utils/cn"
import ApperIcon from "@/components/ApperIcon"

const Textarea = forwardRef(({
  className,
  label,
  error,
  placeholder,
  required = false,
  rows = 4,
  ...props
}, ref) => {
  const textareaId = props.id || `textarea-${Math.random().toString(36).substr(2, 9)}`

  return (
    <div className="space-y-2">
      {label && (
        <label 
          htmlFor={textareaId}
          className="block text-sm font-medium text-gray-700"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      
      <textarea
        ref={ref}
        id={textareaId}
        rows={rows}
        placeholder={placeholder}
        className={cn(
          "block w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-gray-900 placeholder-gray-500 transition-all duration-200",
          "focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none",
          "disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500",
          "resize-none",
          error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
          className
        )}
        {...props}
      />
      
      {error && (
        <p className="text-sm text-red-600 flex items-center gap-1">
          <ApperIcon name="AlertCircle" className="h-4 w-4" />
          {error}
        </p>
      )}
    </div>
  )
})

Textarea.displayName = "Textarea"

export default Textarea