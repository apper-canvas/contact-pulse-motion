import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import ContactForm from "@/components/molecules/ContactForm"
import ApperIcon from "@/components/ApperIcon"
import { cn } from "@/utils/cn"

const ContactModal = ({ 
  isOpen = false, 
  onClose, 
  contact = null, 
  onSubmit,
  isLoading = false
}) => {
  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose?.()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [isOpen, onClose])

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose?.()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleBackdropClick}
            className="fixed inset-0 modal-backdrop"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.3 }}
            className={cn(
              "relative w-full max-w-2xl max-h-[90vh] bg-white rounded-xl shadow-modal overflow-hidden",
              "border border-gray-200"
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-primary/5 to-secondary/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  <ApperIcon name={contact ? "Edit" : "UserPlus"} className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    {contact ? "Edit Contact" : "Add New Contact"}
                  </h2>
                  <p className="text-sm text-gray-600">
                    {contact ? "Update contact information" : "Create a new contact entry"}
                  </p>
                </div>
              </div>
              
              <button
                onClick={onClose}
                disabled={isLoading}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-50"
              >
                <ApperIcon name="X" className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 max-h-[calc(90vh-120px)] overflow-y-auto">
              <ContactForm
                contact={contact}
                onSubmit={onSubmit}
                onCancel={onClose}
                isLoading={isLoading}
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default ContactModal