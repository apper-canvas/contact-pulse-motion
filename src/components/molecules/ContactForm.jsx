import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Input from "@/components/atoms/Input"
import Textarea from "@/components/atoms/Textarea"
import Button from "@/components/atoms/Button"
import Badge from "@/components/atoms/Badge"
import ApperIcon from "@/components/ApperIcon"
import { categoryService } from "@/services/api/categoryService"

const ContactForm = ({ 
  contact = null, 
  onSubmit, 
  onCancel, 
  isLoading = false 
}) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    company: "",
    jobTitle: "",
    categories: [],
    notes: "",
    isFavorite: false,
    photoUrl: ""
  })
  
  const [errors, setErrors] = useState({})
  const [categories, setCategories] = useState([])
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false)

  useEffect(() => {
    loadCategories()
    
    if (contact) {
      setFormData({
        firstName: contact.firstName || "",
        lastName: contact.lastName || "",
        phone: contact.phone || "",
        email: contact.email || "",
        company: contact.company || "",
        jobTitle: contact.jobTitle || "",
        categories: contact.categories || [],
        notes: contact.notes || "",
        isFavorite: contact.isFavorite || false,
        photoUrl: contact.photoUrl || ""
      })
    }
  }, [contact])

  const loadCategories = async () => {
    try {
      const data = await categoryService.getAll()
      setCategories(data)
    } catch (error) {
      console.error("Failed to load categories:", error)
    }
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }))
    }
  }

  const toggleCategory = (categoryName) => {
    const currentCategories = formData.categories
    const isSelected = currentCategories.includes(categoryName)
    
    const newCategories = isSelected
      ? currentCategories.filter(cat => cat !== categoryName)
      : [...currentCategories, categoryName]
    
    handleInputChange("categories", newCategories)
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required"
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required"
    }
    
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
}
    
if (formData.phone && !/^[+]?[\d\s()-.]{10,}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (validateForm()) {
      onSubmit?.(formData)
    }
  }

  const isEditing = !!contact

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
          <ApperIcon name={isEditing ? "Edit" : "Plus"} className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            {isEditing ? "Edit Contact" : "Add New Contact"}
          </h2>
          <p className="text-gray-600 text-sm">
            {isEditing ? "Update contact information" : "Fill in the contact details below"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="First Name"
          value={formData.firstName}
          onChange={(e) => handleInputChange("firstName", e.target.value)}
          error={errors.firstName}
          required
          icon="User"
          placeholder="Enter first name"
        />
        
        <Input
          label="Last Name"
          value={formData.lastName}
          onChange={(e) => handleInputChange("lastName", e.target.value)}
          error={errors.lastName}
          required
          icon="User"
          placeholder="Enter last name"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => handleInputChange("phone", e.target.value)}
          error={errors.phone}
          icon="Phone"
          placeholder="+1 (555) 123-4567"
        />
        
        <Input
          label="Email"
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          error={errors.email}
          icon="Mail"
          placeholder="contact@example.com"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Company"
          value={formData.company}
          onChange={(e) => handleInputChange("company", e.target.value)}
          icon="Building"
          placeholder="Company name"
        />
        
        <Input
          label="Job Title"
          value={formData.jobTitle}
          onChange={(e) => handleInputChange("jobTitle", e.target.value)}
          icon="Briefcase"
          placeholder="Position or role"
        />
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">
          Categories
        </label>
        
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
            className="w-full flex items-center justify-between px-3 py-2.5 bg-white border border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
          >
            <span className="text-gray-500">
              {formData.categories.length > 0 
                ? `${formData.categories.length} categories selected`
                : "Select categories"
              }
            </span>
            <ApperIcon 
              name={showCategoryDropdown ? "ChevronUp" : "ChevronDown"} 
              className="w-4 h-4 text-gray-400" 
            />
          </button>
          
          {showCategoryDropdown && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-48 overflow-y-auto"
            >
              {categories.map((category) => {
                const isSelected = formData.categories.includes(category.name)
                
                return (
                  <button
                    key={category.Id}
                    type="button"
                    onClick={() => toggleCategory(category.name)}
                    className={`w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-50 transition-colors ${
                      isSelected ? "bg-primary/5" : ""
                    }`}
                  >
                    <ApperIcon name={category.icon} className="w-4 h-4" style={{ color: category.color }} />
                    <span className="flex-1 text-left">{category.name}</span>
                    {isSelected && (
                      <ApperIcon name="Check" className="w-4 h-4 text-primary" />
                    )}
                  </button>
                )
              })}
            </motion.div>
          )}
        </div>
        
        {formData.categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {formData.categories.map((categoryName) => {
              const category = categories.find(cat => cat.name === categoryName)
              return (
                <Badge
                  key={categoryName}
                  color={category?.color}
                  className="cursor-pointer"
                  onClick={() => toggleCategory(categoryName)}
                >
                  {categoryName}
                  <ApperIcon name="X" className="w-3 h-3 ml-1" />
                </Badge>
              )
            })}
          </div>
        )}
      </div>

      <Textarea
        label="Notes"
        value={formData.notes}
        onChange={(e) => handleInputChange("notes", e.target.value)}
        placeholder="Additional notes about this contact..."
        rows={4}
      />

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => handleInputChange("isFavorite", !formData.isFavorite)}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
            formData.isFavorite
              ? "bg-accent/10 text-accent"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          <ApperIcon 
            name={formData.isFavorite ? "Heart" : "HeartOff"} 
            className={`w-4 h-4 ${formData.isFavorite ? "fill-current" : ""}`} 
          />
          {formData.isFavorite ? "Remove from favorites" : "Add to favorites"}
        </button>
      </div>

      <div className="flex gap-3 pt-6 border-t border-gray-200">
        <Button
          type="submit"
          variant="primary"
          icon={isEditing ? "Save" : "Plus"}
          isLoading={isLoading}
          className="flex-1"
        >
          {isEditing ? "Update Contact" : "Add Contact"}
        </Button>
        
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancel
        </Button>
      </div>
    </motion.form>
  )
}

export default ContactForm