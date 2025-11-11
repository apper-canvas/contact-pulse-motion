import { forwardRef, useState } from "react"
import { cn } from "@/utils/cn"
import ApperIcon from "@/components/ApperIcon"

const Avatar = forwardRef(({
  src,
  alt,
  name,
  size = "md",
  className,
  fallback,
  ...props
}, ref) => {
  const [imageError, setImageError] = useState(false)
  
  const sizes = {
    xs: "w-6 h-6 text-xs",
    sm: "w-8 h-8 text-sm", 
    md: "w-10 h-10 text-base",
    lg: "w-12 h-12 text-lg",
    xl: "w-16 h-16 text-xl",
    "2xl": "w-20 h-20 text-2xl"
  }

  const iconSizes = {
    xs: "w-3 h-3",
    sm: "w-4 h-4",
    md: "w-5 h-5", 
    lg: "w-6 h-6",
    xl: "w-8 h-8",
    "2xl": "w-10 h-10"
  }

  // Generate initials from name
  const getInitials = (name) => {
    if (!name) return "?"
    return name
      .split(" ")
      .map(word => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  // Generate gradient color based on name
  const getGradientColors = (name) => {
    if (!name) return "from-gray-400 to-gray-500"
    
    const colors = [
      "from-blue-400 to-blue-600",
      "from-green-400 to-green-600", 
      "from-purple-400 to-purple-600",
      "from-pink-400 to-pink-600",
      "from-yellow-400 to-yellow-600",
      "from-red-400 to-red-600",
      "from-indigo-400 to-indigo-600",
      "from-teal-400 to-teal-600"
    ]
    
    const hash = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
    return colors[hash % colors.length]
  }

  const shouldShowImage = src && !imageError
  const displayName = name || alt || ""
  const initials = getInitials(displayName)
  const gradientColors = getGradientColors(displayName)

  return (
    <div
      ref={ref}
      className={cn(
        "relative inline-flex items-center justify-center rounded-full overflow-hidden bg-gradient-to-br",
        sizes[size],
        !shouldShowImage && gradientColors,
        className
      )}
      {...props}
    >
      {shouldShowImage ? (
        <img
          src={src}
          alt={alt || name || "Avatar"}
          className="w-full h-full object-cover"
          onError={() => setImageError(true)}
        />
      ) : fallback ? (
        <span className="font-medium text-white">
          {fallback}
        </span>
      ) : initials !== "?" ? (
        <span className="font-medium text-white select-none">
          {initials}
        </span>
      ) : (
        <ApperIcon 
          name="User" 
          className={cn("text-white", iconSizes[size])} 
        />
      )}
    </div>
  )
})

Avatar.displayName = "Avatar"

export default Avatar