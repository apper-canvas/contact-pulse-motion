import React, { useState } from "react";
import { motion } from "framer-motion";
import Card from "@/components/atoms/Card";
import Avatar from "@/components/atoms/Avatar";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { categoryService } from "@/services/api/categoryService";

const ContactCard = ({ contact, onEdit, onDelete, onToggleFavorite, onCall, onEmail }) => {
  const [isActionsVisible, setIsActionsVisible] = useState(false)
  
  const categoryColors = categoryService.getCategoryColors()
  const fullName = `${contact.firstName} ${contact.lastName}`.trim()
  
  const handleCall = () => {
    if (contact.phone) {
      window.open(`tel:${contact.phone}`, "_self")
      onCall?.(contact)
    }
  }

  const handleEmail = () => {
    if (contact.email) {
      window.open(`mailto:${contact.email}`, "_self")
      onEmail?.(contact)
    }
  }

  const handleCopyPhone = async () => {
    if (contact.phone) {
      try {
        await navigator.clipboard.writeText(contact.phone)
        // You could add a toast notification here
      } catch (err) {
        console.error("Failed to copy phone number:", err)
      }
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="group relative"
      onMouseEnter={() => setIsActionsVisible(true)}
      onMouseLeave={() => setIsActionsVisible(false)}
    >
      <Card hover className="relative overflow-hidden">
        {/* Favorite indicator */}
        {contact.isFavorite && (
          <div className="absolute top-3 right-3 z-10">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-6 h-6 bg-accent rounded-full flex items-center justify-center shadow-sm"
>
              <ApperIcon name="Heart" className="w-3 h-3 text-white fill-current" />
            </motion.div>
          </div>
        )}

        <div className="flex items-start gap-4">
          <Avatar
            src={contact.photoUrl}
            name={fullName}
            size="lg"
            alt={fullName}
          />
          
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 truncate">
              {fullName}
            </h3>
            
            {contact.jobTitle && contact.company && (
              <p className="text-sm text-gray-600 truncate">
                {contact.jobTitle} at {contact.company}
              </p>
            )}
            
            {contact.phone && (
              <p className="text-sm text-gray-500 font-mono">
                {contact.phone}
              </p>
            )}
            
            {contact.email && (
              <p className="text-sm text-gray-500 truncate">
                {contact.email}
              </p>
            )}
          </div>
        </div>

        {/* Categories */}
        {contact.categories && contact.categories.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {contact.categories.slice(0, 3).map((category, index) => (
              <Badge
                key={index}
                size="sm"
                color={categoryColors[category]}
                className="category-badge"
              >
                {category}
              </Badge>
            ))}
            {contact.categories.length > 3 && (
              <Badge size="sm" variant="outline">
                +{contact.categories.length - 3}
              </Badge>
            )}
          </div>
        )}

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ 
            opacity: isActionsVisible ? 1 : 0,
            y: isActionsVisible ? 0 : 10
          }}
          transition={{ duration: 0.2 }}
          className="absolute top-3 left-3 flex gap-1.5"
        >
          {contact.phone && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleCall}
              className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center shadow-md hover:bg-green-600 transition-colors"
              title="Call"
            >
              <ApperIcon name="Phone" className="w-4 h-4" />
            </motion.button>
          )}
          
          {contact.email && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleEmail}
              className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-md hover:bg-blue-600 transition-colors"
              title="Email"
            >
              <ApperIcon name="Mail" className="w-4 h-4" />
            </motion.button>
          )}
          
          {contact.phone && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleCopyPhone}
              className="w-8 h-8 bg-gray-500 text-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-600 transition-colors"
              title="Copy Phone"
            >
              <ApperIcon name="Copy" className="w-4 h-4" />
            </motion.button>
          )}
        </motion.div>

        {/* Main Actions */}
        <div className="mt-4 flex justify-between items-center">
          <Button
            variant="ghost"
            size="sm"
            icon={contact.isFavorite ? "Heart" : "HeartOff"}
            onClick={() => onToggleFavorite?.(contact)}
            className={contact.isFavorite ? "text-accent hover:text-accent/80" : ""}
          />
          
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              icon="Edit"
              onClick={() => onEdit?.(contact)}
            />
            <Button
              variant="ghost"
              size="sm"
              icon="Trash2"
              onClick={() => onDelete?.(contact)}
              className="text-red-500 hover:text-red-700 hover:bg-red-50"
            />
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

export default ContactCard