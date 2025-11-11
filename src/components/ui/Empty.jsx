import { motion } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"

const Empty = ({ 
  title = "No contacts found",
  description = "Start building your network by adding your first contact.",
  actionText = "Add Contact",
  onAction,
  icon = "Users",
  showAction = true
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center py-16 px-6 text-center"
    >
      <div className="relative mb-8">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full p-8"
        >
          <div className="bg-gradient-to-br from-primary to-secondary rounded-full p-4">
            <ApperIcon 
              name={icon} 
              className="w-12 h-12 text-white" 
            />
          </div>
        </motion.div>
        
        {/* Floating decorative elements */}
        <motion.div
          animate={{ 
            y: [0, -10, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -top-2 -right-2 w-6 h-6 bg-accent/20 rounded-full"
        />
        <motion.div
          animate={{ 
            y: [0, 10, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute -bottom-2 -left-2 w-4 h-4 bg-secondary/20 rounded-full"
        />
      </div>
      
      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-2xl font-bold text-gray-900 mb-3"
      >
        {title}
      </motion.h3>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-gray-600 mb-8 max-w-md leading-relaxed"
      >
        {description}
      </motion.p>

      {showAction && onAction && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onAction}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 group"
        >
          <ApperIcon name="Plus" className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200" />
          {actionText}
        </motion.button>
      )}
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-8 text-sm text-gray-500"
      >
        <p>
          💡 <span className="font-medium">Pro tip:</span> You can quickly import contacts from your existing address book
        </p>
      </motion.div>
    </motion.div>
  )
}

export default Empty