import { motion, AnimatePresence } from "framer-motion"
import Button from "@/components/atoms/Button"
import Avatar from "@/components/atoms/Avatar"
import ApperIcon from "@/components/ApperIcon"

const DeleteConfirmationModal = ({ 
  isOpen = false, 
  onClose, 
  onConfirm,
  contact = null,
  isLoading = false
}) => {
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && !isLoading) {
      onClose?.()
    }
  }

  const contactName = contact ? `${contact.firstName} ${contact.lastName}`.trim() : "this contact"

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
            className="relative w-full max-w-md bg-white rounded-xl shadow-modal border border-gray-200 overflow-hidden"
          >
            <div className="p-6">
              {/* Icon and Header */}
              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-red-50 to-red-100 rounded-full flex items-center justify-center mb-4">
                  <ApperIcon name="Trash2" className="w-8 h-8 text-red-500" />
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Delete Contact
                </h3>
                
                <p className="text-gray-600 text-sm">
                  Are you sure you want to delete {contactName}? This action cannot be undone.
                </p>
              </div>

              {/* Contact Preview */}
              {contact && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gray-50 rounded-lg p-4 mb-6"
                >
                  <div className="flex items-center gap-3">
                    <Avatar
                      src={contact.photoUrl}
                      name={contactName}
                      size="md"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">
                        {contactName}
                      </p>
                      {contact.company && (
                        <p className="text-sm text-gray-600 truncate">
                          {contact.company}
                        </p>
                      )}
                      {contact.email && (
                        <p className="text-sm text-gray-500 truncate">
                          {contact.email}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Warning */}
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-6">
                <div className="flex gap-2">
                  <ApperIcon name="AlertTriangle" className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-red-800">
                      Permanent Deletion
                    </p>
                    <p className="text-xs text-red-700 mt-1">
                      This contact will be permanently removed from your address book. 
                      All associated data will be lost.
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Button
                  onClick={onConfirm}
                  variant="danger"
                  icon="Trash2"
                  isLoading={isLoading}
                  className="flex-1"
                >
                  Delete Contact
                </Button>
                
                <Button
                  onClick={onClose}
                  variant="secondary"
                  disabled={isLoading}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default DeleteConfirmationModal