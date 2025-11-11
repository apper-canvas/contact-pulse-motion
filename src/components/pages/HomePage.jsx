import { useState, useEffect, useCallback } from "react"
import { toast } from "react-toastify"
import Header from "@/components/organisms/Header"
import ContactGrid from "@/components/organisms/ContactGrid"
import ContactModal from "@/components/organisms/ContactModal"
import DeleteConfirmationModal from "@/components/organisms/DeleteConfirmationModal"
import CategoryFilter from "@/components/molecules/CategoryFilter"
import ContactStats from "@/components/molecules/ContactStats"
import { contactService } from "@/services/api/contactService"

const HomePage = () => {
  // Data state
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Filter and search state
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategories, setSelectedCategories] = useState([])
  const [filteredContacts, setFilteredContacts] = useState([])

  // Modal state
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [editingContact, setEditingContact] = useState(null)
  const [deletingContact, setDeletingContact] = useState(null)
  const [modalLoading, setModalLoading] = useState(false)

  // Load contacts on component mount
  useEffect(() => {
    loadContacts()
  }, [])

  // Filter contacts when search query or categories change
  useEffect(() => {
    filterContacts()
  }, [contacts, searchQuery, selectedCategories])

  const loadContacts = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await contactService.getAll()
      setContacts(data)
    } catch (err) {
      setError(err.message)
      console.error("Failed to load contacts:", err)
    } finally {
      setLoading(false)
    }
  }

  const filterContacts = useCallback(() => {
    let filtered = [...contacts]

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim()
      filtered = filtered.filter(contact => 
        contact.firstName.toLowerCase().includes(query) ||
        contact.lastName.toLowerCase().includes(query) ||
        contact.email.toLowerCase().includes(query) ||
        contact.phone.replace(/\D/g, '').includes(query.replace(/\D/g, '')) ||
        contact.company.toLowerCase().includes(query) ||
        contact.jobTitle.toLowerCase().includes(query) ||
        contact.notes.toLowerCase().includes(query) ||
        contact.categories.some(cat => cat.toLowerCase().includes(query))
      )
    }

    // Apply category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(contact =>
        selectedCategories.some(category => 
          contact.categories.includes(category)
        )
      )
    }

    // Sort by name
    filtered.sort((a, b) => {
      const nameA = `${a.firstName} ${a.lastName}`.toLowerCase()
      const nameB = `${b.firstName} ${b.lastName}`.toLowerCase()
      return nameA.localeCompare(nameB)
    })

    setFilteredContacts(filtered)
  }, [contacts, searchQuery, selectedCategories])

  const handleAddContact = () => {
    setEditingContact(null)
    setIsContactModalOpen(true)
  }

  const handleEditContact = (contact) => {
    setEditingContact(contact)
    setIsContactModalOpen(true)
  }

  const handleDeleteContact = (contact) => {
    setDeletingContact(contact)
    setIsDeleteModalOpen(true)
  }

  const handleContactSubmit = async (contactData) => {
    try {
      setModalLoading(true)
      
      if (editingContact) {
        // Update existing contact
        const updatedContact = await contactService.update(editingContact.Id, contactData)
        setContacts(prev => prev.map(c => 
          c.Id === editingContact.Id ? updatedContact : c
        ))
        toast.success(`${contactData.firstName} ${contactData.lastName} has been updated!`)
      } else {
        // Create new contact
        const newContact = await contactService.create(contactData)
        setContacts(prev => [newContact, ...prev])
        toast.success(`${contactData.firstName} ${contactData.lastName} has been added to your contacts!`)
      }
      
      setIsContactModalOpen(false)
      setEditingContact(null)
    } catch (err) {
      toast.error(err.message)
      console.error("Failed to save contact:", err)
    } finally {
      setModalLoading(false)
    }
  }

  const handleDeleteConfirm = async () => {
    if (!deletingContact) return

    try {
      setModalLoading(true)
      await contactService.delete(deletingContact.Id)
      setContacts(prev => prev.filter(c => c.Id !== deletingContact.Id))
      toast.success(`${deletingContact.firstName} ${deletingContact.lastName} has been deleted`)
      setIsDeleteModalOpen(false)
      setDeletingContact(null)
    } catch (err) {
      toast.error(err.message)
      console.error("Failed to delete contact:", err)
    } finally {
      setModalLoading(false)
    }
  }

  const handleToggleFavorite = async (contact) => {
    try {
      const updatedContact = await contactService.toggleFavorite(contact.Id)
      setContacts(prev => prev.map(c => 
        c.Id === contact.Id ? updatedContact : c
      ))
      
      const action = updatedContact.isFavorite ? "added to" : "removed from"
      toast.success(`${contact.firstName} ${contact.lastName} ${action} favorites`)
    } catch (err) {
      toast.error(err.message)
      console.error("Failed to toggle favorite:", err)
    }
  }

  const handleRetry = () => {
    loadContacts()
  }

  const handleSearchChange = (value) => {
    setSearchQuery(value)
  }

  const handleCategoryChange = (categories) => {
    setSelectedCategories(categories)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        onAddContact={handleAddContact}
        contactCount={filteredContacts.length}
        selectedCategories={selectedCategories}
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <ContactStats contacts={contacts} />

        {/* Filters and Content */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Filters */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg border border-gray-200 shadow-card p-4 sticky top-24">
              <CategoryFilter
                selectedCategories={selectedCategories}
                onCategoryChange={handleCategoryChange}
              />
            </div>
          </aside>

          {/* Contact Grid */}
          <div className="flex-1">
            <ContactGrid
              contacts={filteredContacts}
              loading={loading}
              error={error}
              onEdit={handleEditContact}
              onDelete={handleDeleteContact}
              onToggleFavorite={handleToggleFavorite}
              onAddContact={handleAddContact}
              onRetry={handleRetry}
            />
          </div>
        </div>
      </main>

      {/* Contact Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        contact={editingContact}
        onSubmit={handleContactSubmit}
        isLoading={modalLoading}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        contact={deletingContact}
        onConfirm={handleDeleteConfirm}
        isLoading={modalLoading}
      />
    </div>
  )
}

export default HomePage