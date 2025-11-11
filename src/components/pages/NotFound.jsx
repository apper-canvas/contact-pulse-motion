import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"

const NotFound = () => {
  const navigate = useNavigate()

  const handleGoHome = () => {
    navigate("/")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-primary/5 flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative mb-8"
        >
          {/* Large 404 */}
          <h1 className="text-8xl md:text-9xl font-bold gradient-text mb-4">
            404
          </h1>
          
          {/* Floating icons */}
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
            className="absolute -top-4 -left-4 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center"
          >
            <ApperIcon name="Search" className="w-6 h-6 text-primary" />
          </motion.div>
          
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
            className="absolute -bottom-4 -right-4 w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center"
          >
            <ApperIcon name="Users" className="w-5 h-5 text-secondary" />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Page Not Found
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Looks like this contact has vanished! The page you're looking for doesn't exist 
            or might have been moved. Let's get you back to your contacts.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="space-y-4"
        >
          <Button
            onClick={handleGoHome}
            variant="primary"
            icon="Home"
            size="lg"
            className="w-full sm:w-auto"
          >
            Back to Contact Hub
          </Button>
          
          <p className="text-sm text-gray-500">
            or try searching for a specific contact using the search bar
          </p>
        </motion.div>

        {/* Decorative elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 flex items-center justify-center gap-4"
        >
          <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent flex-1" />
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
            <ApperIcon name="Heart" className="w-4 h-4 text-white" />
          </div>
          <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent flex-1" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-6 text-xs text-gray-400"
        >
          Error 404 • Contact Hub
        </motion.div>
      </div>
    </div>
  )
}

export default NotFound