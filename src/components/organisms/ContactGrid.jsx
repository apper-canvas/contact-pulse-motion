import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import ContactCard from "@/components/molecules/ContactCard"
import AlphabetNavigation from "@/components/molecules/AlphabetNavigation"
import Loading from "@/components/ui/Loading"
import ErrorView from "@/components/ui/ErrorView"
import Empty from "@/components/ui/Empty"

const ContactGrid = ({ 
  contacts = [], 
  loading = false, 
  error = null,
  onEdit, 
  onDelete, 
  onToggleFavorite,
  onAddContact,
  onRetry
}) => {
  const [selectedLetter, setSelectedLetter] = useState(null)
  
  // Get available letters from contacts
  const getAvailableLetters = () => {
    const letters = new Set()
contacts.forEach(contact => {
      const firstLetter = contact.firstName?.charAt(0).toUpperCase()
      if (firstLetter && firstLetter.match(/[A-Z]/)) {
        letters.add(firstLetter)
      }
    })
    return Array.from(letters).sort()
  }

  // Filter contacts by selected letter
  const getFilteredContacts = () => {
    if (!selectedLetter) return contacts
    
return contacts.filter(contact => 
      contact.firstName?.charAt(0).toUpperCase() === selectedLetter
    )
  }

  const availableLetters = getAvailableLetters()
  const filteredContacts = getFilteredContacts()

  // Loading state
  if (loading) {
    return <Loading type="grid" />
  }

  // Error state
  if (error) {
    return (
      <ErrorView
        error={error}
        onRetry={onRetry}
        title="Failed to load contacts"
        description="We couldn't load your contacts. Please try again."
      />
    )
  }

  // Empty state
  if (contacts.length === 0) {
    return (
      <Empty
        title="No contacts yet"
        description="Start building your network by adding your first contact. You can store names, phone numbers, emails, and organize them by categories."
        actionText="Add Your First Contact"
        onAction={onAddContact}
        icon="UserPlus"
      />
    )
  }

  // Filtered empty state
  if (filteredContacts.length === 0 && selectedLetter) {
    return (
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-48 flex-shrink-0">
          <AlphabetNavigation
            onLetterClick={setSelectedLetter}
            activeLetter={selectedLetter}
            availableLetters={availableLetters}
          />
        </div>
        
        <div className="flex-1">
          <Empty
            title={`No contacts starting with "${selectedLetter}"`}
            description="Try selecting a different letter or clear the filter to see all contacts."
            actionText="Show All Contacts"
            onAction={() => setSelectedLetter(null)}
            icon="Search"
            showAction={true}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Alphabet Navigation - Hidden on mobile, sticky on desktop */}
      <div className="hidden lg:block lg:w-48 flex-shrink-0">
        <AlphabetNavigation
          onLetterClick={setSelectedLetter}
          activeLetter={selectedLetter}
          availableLetters={availableLetters}
        />
      </div>

      {/* Mobile Alphabet Navigation */}
      <div className="lg:hidden">
        <div className="bg-white border border-gray-200 rounded-lg p-3 mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-700">Quick Jump</h3>
            {selectedLetter && (
              <button
                onClick={() => setSelectedLetter(null)}
                className="text-xs text-gray-500 hover:text-gray-700"
              >
                Show all
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-1">
            {availableLetters.map((letter) => (
              <button
                key={letter}
                onClick={() => setSelectedLetter(letter === selectedLetter ? null : letter)}
                className={`w-8 h-8 rounded-lg text-xs font-medium transition-all ${
                  letter === selectedLetter
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {letter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Grid */}
      <div className="flex-1">
        {selectedLetter && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 flex items-center gap-2"
          >
            <h2 className="text-lg font-semibold text-gray-900">
              Contacts starting with "{selectedLetter}"
            </h2>
            <span className="text-sm text-gray-500">
              ({filteredContacts.length} {filteredContacts.length === 1 ? 'contact' : 'contacts'})
            </span>
          </motion.div>
        )}

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredContacts.map((contact, index) => (
              <motion.div
                key={contact.Id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{
                  duration: 0.2,
                  delay: Math.min(index * 0.05, 0.5) // Stagger with max delay
                }}
              >
                <ContactCard
                  contact={contact}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onToggleFavorite={onToggleFavorite}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Results summary */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 text-center text-gray-500 text-sm"
        >
          Showing {filteredContacts.length} of {contacts.length} contacts
          {selectedLetter && (
            <button
              onClick={() => setSelectedLetter(null)}
              className="ml-2 text-primary hover:text-primary/80 font-medium"
            >
              • Show all contacts
            </button>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default ContactGrid