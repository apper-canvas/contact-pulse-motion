import { motion } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"

const ErrorView = ({ 
  error = "Something went wrong", 
  onRetry, 
  title = "Oops! Something went wrong",
  description = "We encountered an error while loading your data. Please try again."
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-12 px-6 text-center"
    >
      <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-full p-6 mb-6">
        <ApperIcon 
          name="AlertTriangle" 
          className="w-12 h-12 text-red-500" 
        />
      </div>
      
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        {title}
      </h3>
      
      <p className="text-gray-600 mb-6 max-w-md">
        {description}
      </p>
      
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 max-w-md">
        <p className="text-sm text-red-700 font-medium">
          {error}
        </p>
      </div>

      {onRetry && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onRetry}
          className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-md hover:shadow-lg"
        >
          <ApperIcon name="RefreshCw" className="w-4 h-4" />
          Try Again
        </motion.button>
      )}
      
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-sm text-gray-500 mt-4"
      >
        If the problem persists, please refresh the page or contact support.
      </motion.p>
    </motion.div>
  )
}

export default ErrorView