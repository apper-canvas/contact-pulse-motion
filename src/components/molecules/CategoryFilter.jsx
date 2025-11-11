import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Badge from "@/components/atoms/Badge"
import ApperIcon from "@/components/ApperIcon"
import { categoryService } from "@/services/api/categoryService"

const CategoryFilter = ({ selectedCategories = [], onCategoryChange, className }) => {
  const [categories, setCategories] = useState([])
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    loadCategories()
  }, [])

  const loadCategories = async () => {
    try {
      const data = await categoryService.getAll()
      setCategories(data)
    } catch (error) {
      console.error("Failed to load categories:", error)
    }
  }

  const handleCategoryToggle = (categoryName) => {
    const isSelected = selectedCategories.includes(categoryName)
    let newSelection
    
    if (isSelected) {
      newSelection = selectedCategories.filter(cat => cat !== categoryName)
    } else {
      newSelection = [...selectedCategories, categoryName]
    }
    
    onCategoryChange?.(newSelection)
  }

  const clearAllFilters = () => {
    onCategoryChange?.([])
  }

  const visibleCategories = isExpanded ? categories : categories.slice(0, 6)
  const hasMoreCategories = categories.length > 6

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
          <ApperIcon name="Filter" className="w-4 h-4" />
          Categories
        </h3>
        
        {selectedCategories.length > 0 && (
          <button
            onClick={clearAllFilters}
            className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      <div className="space-y-2">
        <motion.div 
          className="flex flex-wrap gap-2"
          layout
        >
          {visibleCategories.map((category) => {
            const isSelected = selectedCategories.includes(category.name)
            
            return (
              <motion.div
                key={category.Id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <Badge
                  color={isSelected ? category.color : undefined}
                  variant={isSelected ? undefined : "outline"}
                  className={`cursor-pointer transition-all duration-200 ${
                    isSelected 
                      ? "shadow-md scale-105" 
                      : "hover:scale-105"
                  }`}
                  onClick={() => handleCategoryToggle(category.name)}
                  icon={category.icon}
                >
                  {category.name}
                  {isSelected && (
                    <ApperIcon name="X" className="w-3 h-3 ml-1" />
                  )}
                </Badge>
              </motion.div>
            )
          })}
        </motion.div>

        {hasMoreCategories && (
          <motion.button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <ApperIcon 
              name={isExpanded ? "ChevronUp" : "ChevronDown"} 
              className="w-3 h-3" 
            />
            {isExpanded ? "Show less" : `Show ${categories.length - 6} more`}
          </motion.button>
        )}
      </div>

      {selectedCategories.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-3 bg-primary/5 rounded-lg border border-primary/10"
        >
          <p className="text-xs text-gray-600 mb-2">Active filters:</p>
          <div className="flex flex-wrap gap-1">
            {selectedCategories.map((categoryName) => {
              const category = categories.find(cat => cat.name === categoryName)
              return (
                <Badge
                  key={categoryName}
                  size="sm"
                  color={category?.color}
                  className="cursor-pointer"
                  onClick={() => handleCategoryToggle(categoryName)}
                >
                  {categoryName}
                  <ApperIcon name="X" className="w-3 h-3 ml-1" />
                </Badge>
              )
            })}
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default CategoryFilter