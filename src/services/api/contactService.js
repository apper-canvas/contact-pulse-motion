import { getApperClient } from "@/services/apperClient";
import { toast } from "react-toastify";

export const contactService = {
  async getAll() {
    try {
      const apperClient = getApperClient();
      const response = await apperClient.fetchRecords('contacts_c', {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "Name"}},
          {"field": {"Name": "first_name_c"}},
          {"field": {"Name": "last_name_c"}},
          {"field": {"Name": "phone_c"}},
          {"field": {"Name": "email_c"}},
          {"field": {"Name": "company_c"}},
          {"field": {"Name": "job_title_c"}},
          {"field": {"Name": "categories_c"}},
          {"field": {"Name": "notes_c"}},
          {"field": {"Name": "is_favorite_c"}},
          {"field": {"Name": "photo_url_c"}},
          {"field": {"Name": "attachments_c"}}
        ]
      });

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      // Transform database fields to UI format
      return response.data.map(contact => ({
        Id: contact.Id,
        firstName: contact.first_name_c || "",
        lastName: contact.last_name_c || "",
        phone: contact.phone_c || "",
        email: contact.email_c || "",
        company: contact.company_c || "",
        jobTitle: contact.job_title_c || "",
        categories: contact.categories_c ? contact.categories_c.split(',') : [],
        notes: contact.notes_c || "",
        isFavorite: contact.is_favorite_c || false,
        photoUrl: contact.photo_url_c || "",
        attachments: contact.attachments_c ? JSON.parse(contact.attachments_c) : []
      }));
    } catch (error) {
      console.error("Error fetching contacts:", error?.response?.data?.message || error);
      return [];
    }
  },

  async getById(id) {
    try {
      const apperClient = getApperClient();
      const response = await apperClient.getRecordById('contacts_c', id, {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "Name"}},
          {"field": {"Name": "first_name_c"}},
          {"field": {"Name": "last_name_c"}},
          {"field": {"Name": "phone_c"}},
          {"field": {"Name": "email_c"}},
          {"field": {"Name": "company_c"}},
          {"field": {"Name": "job_title_c"}},
          {"field": {"Name": "categories_c"}},
          {"field": {"Name": "notes_c"}},
          {"field": {"Name": "is_favorite_c"}},
          {"field": {"Name": "photo_url_c"}},
          {"field": {"Name": "attachments_c"}}
        ]
      });

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      const contact = response.data;
      return {
        Id: contact.Id,
        firstName: contact.first_name_c || "",
        lastName: contact.last_name_c || "",
        phone: contact.phone_c || "",
        email: contact.email_c || "",
        company: contact.company_c || "",
        jobTitle: contact.job_title_c || "",
        categories: contact.categories_c ? contact.categories_c.split(',') : [],
        notes: contact.notes_c || "",
        isFavorite: contact.is_favorite_c || false,
        photoUrl: contact.photo_url_c || "",
        attachments: contact.attachments_c ? JSON.parse(contact.attachments_c) : []
      };
    } catch (error) {
      console.error(`Error fetching contact ${id}:`, error?.response?.data?.message || error);
      throw error;
    }
  },

  async create(contactData) {
    try {
      // Validation
      if (!contactData.firstName?.trim() || !contactData.lastName?.trim()) {
        throw new Error("First name and last name are required");
      }
      
      if (contactData.email && !this.isValidEmail(contactData.email)) {
        throw new Error("Please enter a valid email address");
      }
      
      if (contactData.phone && !this.isValidPhone(contactData.phone)) {
        throw new Error("Please enter a valid phone number");
      }

      const apperClient = getApperClient();
      
      // Transform UI format to database fields
      const dbData = {
        Name: `${contactData.firstName} ${contactData.lastName}`,
        first_name_c: contactData.firstName?.trim() || "",
        last_name_c: contactData.lastName?.trim() || "",
        phone_c: contactData.phone?.trim() || "",
        email_c: contactData.email?.trim() || "",
        company_c: contactData.company?.trim() || "",
        job_title_c: contactData.jobTitle?.trim() || "",
        categories_c: contactData.categories ? contactData.categories.join(',') : "",
        notes_c: contactData.notes?.trim() || "",
        is_favorite_c: contactData.isFavorite || false,
        photo_url_c: contactData.photoUrl || "",
        attachments_c: contactData.attachments ? JSON.stringify(contactData.attachments) : "[]"
      };

      const response = await apperClient.createRecord('contacts_c', {
        records: [dbData]
      });

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to create ${failed.length} records:`, failed);
          failed.forEach(record => {
            record.errors?.forEach(error => toast.error(`${error.fieldLabel}: ${error}`));
            if (record.message) toast.error(record.message);
          });
          throw new Error("Failed to create contact");
        }

        const createdContact = successful[0].data;
        return {
          Id: createdContact.Id,
          firstName: createdContact.first_name_c || "",
          lastName: createdContact.last_name_c || "",
          phone: createdContact.phone_c || "",
          email: createdContact.email_c || "",
          company: createdContact.company_c || "",
          jobTitle: createdContact.job_title_c || "",
          categories: createdContact.categories_c ? createdContact.categories_c.split(',') : [],
          notes: createdContact.notes_c || "",
          isFavorite: createdContact.is_favorite_c || false,
          photoUrl: createdContact.photo_url_c || "",
          attachments: createdContact.attachments_c ? JSON.parse(createdContact.attachments_c) : []
        };
      }
    } catch (error) {
      console.error("Error creating contact:", error?.response?.data?.message || error);
      throw error;
    }
  },

  async update(id, contactData) {
    try {
      // Validation
      if (!contactData.firstName?.trim() || !contactData.lastName?.trim()) {
        throw new Error("First name and last name are required");
      }
      
      if (contactData.email && !this.isValidEmail(contactData.email)) {
        throw new Error("Please enter a valid email address");
      }
      
      if (contactData.phone && !this.isValidPhone(contactData.phone)) {
        throw new Error("Please enter a valid phone number");
      }

      const apperClient = getApperClient();
      
      // Transform UI format to database fields
      const dbData = {
        Id: parseInt(id),
        Name: `${contactData.firstName} ${contactData.lastName}`,
        first_name_c: contactData.firstName?.trim() || "",
        last_name_c: contactData.lastName?.trim() || "",
        phone_c: contactData.phone?.trim() || "",
        email_c: contactData.email?.trim() || "",
        company_c: contactData.company?.trim() || "",
        job_title_c: contactData.jobTitle?.trim() || "",
        categories_c: contactData.categories ? contactData.categories.join(',') : "",
        notes_c: contactData.notes?.trim() || "",
        is_favorite_c: contactData.isFavorite || false,
        photo_url_c: contactData.photoUrl || "",
        attachments_c: contactData.attachments ? JSON.stringify(contactData.attachments) : "[]"
      };

      const response = await apperClient.updateRecord('contacts_c', {
        records: [dbData]
      });

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to update ${failed.length} records:`, failed);
          failed.forEach(record => {
            record.errors?.forEach(error => toast.error(`${error.fieldLabel}: ${error}`));
            if (record.message) toast.error(record.message);
          });
          throw new Error("Failed to update contact");
        }

        const updatedContact = successful[0].data;
        return {
          Id: updatedContact.Id,
          firstName: updatedContact.first_name_c || "",
          lastName: updatedContact.last_name_c || "",
          phone: updatedContact.phone_c || "",
          email: updatedContact.email_c || "",
          company: updatedContact.company_c || "",
          jobTitle: updatedContact.job_title_c || "",
          categories: updatedContact.categories_c ? updatedContact.categories_c.split(',') : [],
          notes: updatedContact.notes_c || "",
          isFavorite: updatedContact.is_favorite_c || false,
          photoUrl: updatedContact.photo_url_c || "",
          attachments: updatedContact.attachments_c ? JSON.parse(updatedContact.attachments_c) : []
        };
      }
    } catch (error) {
      console.error("Error updating contact:", error?.response?.data?.message || error);
      throw error;
    }
  },

  async delete(id) {
    try {
      const apperClient = getApperClient();
      const response = await apperClient.deleteRecord('contacts_c', {
        RecordIds: [parseInt(id)]
      });

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to delete ${failed.length} records:`, failed);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
          throw new Error("Failed to delete contact");
        }
        
        return successful.length === 1;
      }
    } catch (error) {
      console.error("Error deleting contact:", error?.response?.data?.message || error);
      throw error;
    }
  },

  async toggleFavorite(id) {
    try {
      // Get current contact data
      const currentContact = await this.getById(id);
      
      // Update favorite status
      return await this.update(id, {
        ...currentContact,
        isFavorite: !currentContact.isFavorite
      });
    } catch (error) {
      console.error("Error toggling favorite:", error?.response?.data?.message || error);
      throw error;
    }
  },

  // Utility validation functions
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  isValidPhone(phone) {
    // Allow various phone formats
    const phoneRegex = /^[+]?[\d\s()-.]{10,}$/;
    return phoneRegex.test(phone);
  }
};