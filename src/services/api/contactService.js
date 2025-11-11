import contactsData from "@/services/mockData/contacts.json";

// Helper to simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// In-memory storage for contacts
let contacts = [...contactsData];

export const contactService = {
  async getAll() {
    await delay(300)
    return [...contacts]
  },

  async getById(id) {
    await delay(200)
    const contact = contacts.find(c => c.Id === parseInt(id))
    if (!contact) {
      throw new Error(`Contact with id ${id} not found`)
    }
    return { ...contact }
  },

  async create(contactData) {
    await delay(400)
    
    // Validation
    if (!contactData.firstName?.trim() || !contactData.lastName?.trim()) {
      throw new Error("First name and last name are required")
    }
    
    if (contactData.email && !this.isValidEmail(contactData.email)) {
      throw new Error("Please enter a valid email address")
    }
    
    if (contactData.phone && !this.isValidPhone(contactData.phone)) {
      throw new Error("Please enter a valid phone number")
    }

// Create new contact
    const newContact = {
      Id: Math.max(...contacts.map(c => c.Id), 0) + 1,
      firstName: contactData.firstName.trim(),
      lastName: contactData.lastName.trim(),
      phone: contactData.phone?.trim() || "",
      email: contactData.email?.trim() || "",
      company: contactData.company?.trim() || "",
      jobTitle: contactData.jobTitle?.trim() || "",
      categories: contactData.categories || [],
      notes: contactData.notes?.trim() || "",
      isFavorite: contactData.isFavorite || false,
      photoUrl: contactData.photoUrl || "",
      attachments: contactData.attachments || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    contacts.push(newContact);
    return { ...newContact };
  },

  async update(id, contactData) {
    await delay(350)
    
    const index = contacts.findIndex(c => c.Id === parseInt(id))
    if (index === -1) {
      throw new Error(`Contact with id ${id} not found`)
    }

    // Validation
    if (!contactData.firstName?.trim() || !contactData.lastName?.trim()) {
      throw new Error("First name and last name are required")
    }
    
    if (contactData.email && !this.isValidEmail(contactData.email)) {
      throw new Error("Please enter a valid email address")
    }
    
    if (contactData.phone && !this.isValidPhone(contactData.phone)) {
      throw new Error("Please enter a valid phone number")
    }

// Update contact
    const updatedContact = {
      ...contacts[index],
      firstName: contactData.firstName.trim(),
      lastName: contactData.lastName.trim(),
      phone: contactData.phone?.trim() || "",
      email: contactData.email?.trim() || "",
      company: contactData.company?.trim() || "",
      jobTitle: contactData.jobTitle?.trim() || "",
      categories: contactData.categories || [],
      notes: contactData.notes?.trim() || "",
      isFavorite: contactData.isFavorite || false,
      photoUrl: contactData.photoUrl || "",
      attachments: contactData.attachments || [],
      updatedAt: new Date().toISOString()
    };

    contacts[index] = updatedContact;
    return { ...updatedContact };
  },

  async delete(id) {
    await delay(250)
    
    const index = contacts.findIndex(c => c.Id === parseInt(id))
    if (index === -1) {
      throw new Error(`Contact with id ${id} not found`)
    }

const deletedContact = contacts[index];
    contacts.splice(index, 1);
    return { ...deletedContact };
  },

  async search(query) {
    await delay(200)
    
    if (!query?.trim()) {
      return [...contacts]
    }

    const searchTerm = query.toLowerCase().trim()
    const filtered = contacts.filter(contact => 
      contact.firstName.toLowerCase().includes(searchTerm) ||
      contact.lastName.toLowerCase().includes(searchTerm) ||
      contact.email.toLowerCase().includes(searchTerm) ||
      contact.phone.replace(/\D/g, '').includes(searchTerm.replace(/\D/g, '')) ||
      contact.company.toLowerCase().includes(searchTerm) ||
      contact.jobTitle.toLowerCase().includes(searchTerm) ||
      contact.notes.toLowerCase().includes(searchTerm) ||
      contact.categories.some(cat => cat.toLowerCase().includes(searchTerm))
    )

    return [...filtered]
  },

  async filterByCategory(category) {
    await delay(200)
    
    if (!category) {
      return [...contacts]
    }

    const filtered = contacts.filter(contact => 
      contact.categories.includes(category)
    )

    return [...filtered]
  },

  async getFavorites() {
    await delay(200)
    
    const favorites = contacts.filter(contact => contact.isFavorite)
    return [...favorites]
  },

  async toggleFavorite(id) {
    await delay(200)
    
    const index = contacts.findIndex(c => c.Id === parseInt(id))
    if (index === -1) {
      throw new Error(`Contact with id ${id} not found`)
    }

contacts[index].isFavorite = !contacts[index].isFavorite;
    contacts[index].updatedAt = new Date().toISOString();
    
    return { ...contacts[index] };
  },

  // Utility validation functions
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  },

isValidPhone(phone) {
    // Allow various phone formats
    const phoneRegex = /^[+]?[\d\s()-.]{10,}$/;
    return phoneRegex.test(phone);
  }
};