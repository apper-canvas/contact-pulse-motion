import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Input from "@/components/atoms/Input"
import ApperIcon from "@/components/ApperIcon"
import { cn } from "@/utils/cn"

const SearchBar = ({ 
  value = "", 
  onChange, 
  placeholder = "Search contacts...",
  className,
  autoFocus = false,
  onClear
}) => {
  const [isFocused, setIsFocused] = useState(false)
  const [localValue, setLocalValue] = useState(value)

  useEffect(() => {
    setLocalValue(value)
  }, [value])

  const handleInputChange = (e) => {
    const newValue = e.target.value
    setLocalValue(newValue)
    onChange?.(newValue)
  }

  const handleClear = () => {
    setLocalValue("")
    onChange?.("")
    onClear?.()
  }

  return (
    <motion.div
      animate={{ 
        scale: isFocused ? 1.02 : 1,
        y: isFocused ? -2 : 0
      }}
      transition={{ duration: 0.2 }}
      className={cn("relative", className)}
    >
      <div className={cn(
        "relative transition-all duration-200 search-enhanced rounded-lg",
        isFocused && "shadow-lg"
      )}>
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <ApperIcon 
            name="Search" 
            className={cn(
              "h-5 w-5 transition-colors duration-200",
              isFocused ? "text-primary" : "text-gray-400"
            )} 
          />
        </div>
        
        <input
          type="text"
          value={localValue}
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className={cn(
            "block w-full pl-11 pr-12 py-3 text-gray-900 placeholder-gray-500 bg-white border border-gray-300 rounded-lg transition-all duration-200",
            "focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none",
            "hover:border-gray-400"
          )}
        />
        
        {localValue && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={handleClear}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <ApperIcon name="X" className="h-4 w-4" />
          </motion.button>
        )}
      </div>
      
      {isFocused && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute inset-x-0 top-full mt-2 text-xs text-gray-500 flex items-center gap-2"
        >
          <ApperIcon name="Lightbulb" className="w-3 h-3" />
          Search by name, email, phone, company, or category
        </motion.div>
      )}
    </motion.div>
  )
}

export default SearchBar