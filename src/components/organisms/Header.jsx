import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useAuth } from "@/layouts/Root";
import React from "react";
import ApperIcon from "@/components/ApperIcon";
import SearchBar from "@/components/molecules/SearchBar";
import Button from "@/components/atoms/Button";

const Header = ({ 
  searchQuery, 
  onSearchChange, 
  onAddContact,
  contactCount = 0,
  selectedCategories = []
}) => {
  const { user, isAuthenticated } = useSelector(state => state.user)
  const { logout } = useAuth()
  const hasActiveFilters = selectedCategories.length > 0

  const handleLogout = async () => {
    await logout()
  }

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

          {/* User Actions */}
          <div className="flex items-center gap-2">
            {isAuthenticated && user && (
              <div className="hidden lg:flex items-center gap-3 mr-3">
                <span className="text-sm text-gray-600">
                  {user.firstName || user.emailAddress}
                </span>
              </div>
            )}
            
            <div className="hidden lg:flex items-center gap-1">
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
              
              {isAuthenticated && (
                <Button
                  onClick={handleLogout}
                  variant="ghost"
                  icon="LogOut"
                  size="sm"
                  className="text-gray-600"
                >
                  Logout
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  )
}

export default Header