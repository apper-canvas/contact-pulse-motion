import { motion } from "framer-motion"
import SearchBar from "@/components/molecules/SearchBar"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"

const Header = ({ 
  searchQuery, 
  onSearchChange, 
  onAddContact,
  contactCount = 0,
  selectedCategories = []
}) => {
  const hasActiveFilters = selectedCategories.length > 0

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border-b border-gray-200 sticky top-0 z-40 backdrop-blur-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          {/* Logo and Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <ApperIcon name="Users" className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold gradient-text">
                Contact Hub
              </h1>
              <p className="text-sm text-gray-600">
                {contactCount} contacts
                {hasActiveFilters && (
                  <span className="ml-2 text-primary font-medium">
                    (filtered)
                  </span>
                )}
              </p>
            </div>
          </div>

          {/* Search and Actions */}
          <div className="flex items-center gap-4 flex-1 max-w-2xl mx-8">
            <SearchBar
              value={searchQuery}
              onChange={onSearchChange}
              placeholder="Search contacts by name, email, phone, or company..."
              className="flex-1"
            />
            
            <Button
              onClick={onAddContact}
              variant="primary"
              icon="Plus"
              className="whitespace-nowrap"
            >
              Add Contact
            </Button>
          </div>

          {/* Quick Actions */}
          <div className="hidden lg:flex items-center gap-2">
            <Button
              variant="ghost"
              icon="Download"
              size="sm"
              className="text-gray-600"
            >
              Export
            </Button>
            
            <Button
              variant="ghost"
              icon="Upload"
              size="sm"
              className="text-gray-600"
            >
              Import
            </Button>
          </div>
        </div>
      </div>
    </motion.header>
  )
}

export default Header