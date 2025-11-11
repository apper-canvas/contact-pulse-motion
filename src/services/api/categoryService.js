import { getApperClient } from "@/services/apperClient";
import { toast } from "react-toastify";

export const categoryService = {
  async getAll() {
    try {
      const apperClient = getApperClient();
      const response = await apperClient.fetchRecords('categories_c', {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "Name"}},
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "color_c"}},
          {"field": {"Name": "icon_c"}}
        ]
      });

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      // Transform database fields to UI format
      return response.data.map(category => ({
        Id: category.Id,
        name: category.name_c || "",
        color: category.color_c || "#6366F1",
        icon: category.icon_c || "Tag"
      }));
    } catch (error) {
      console.error("Error fetching categories:", error?.response?.data?.message || error);
      return [];
    }
  },

  async getById(id) {
    try {
      const apperClient = getApperClient();
      const response = await apperClient.getRecordById('categories_c', id, {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "Name"}},
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "color_c"}},
          {"field": {"Name": "icon_c"}}
        ]
      });

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      const category = response.data;
      return {
        Id: category.Id,
        name: category.name_c || "",
        color: category.color_c || "#6366F1",
        icon: category.icon_c || "Tag"
      };
    } catch (error) {
      console.error(`Error fetching category ${id}:`, error?.response?.data?.message || error);
      throw error;
    }
  },

  async create(categoryData) {
    try {
      // Validation
      if (!categoryData.name?.trim()) {
        throw new Error("Category name is required");
      }

      const apperClient = getApperClient();
      
      // Transform UI format to database fields
      const dbData = {
        Name: categoryData.name.trim(),
        name_c: categoryData.name.trim(),
        color_c: categoryData.color || "#6366F1",
        icon_c: categoryData.icon || "Tag"
      };

      const response = await apperClient.createRecord('categories_c', {
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
          throw new Error("Failed to create category");
        }

        const createdCategory = successful[0].data;
        return {
          Id: createdCategory.Id,
          name: createdCategory.name_c || "",
          color: createdCategory.color_c || "#6366F1",
          icon: createdCategory.icon_c || "Tag"
        };
      }
    } catch (error) {
      console.error("Error creating category:", error?.response?.data?.message || error);
      throw error;
    }
  },

  async update(id, categoryData) {
    try {
      // Validation
      if (!categoryData.name?.trim()) {
        throw new Error("Category name is required");
      }

      const apperClient = getApperClient();
      
      // Transform UI format to database fields
      const dbData = {
        Id: parseInt(id),
        Name: categoryData.name.trim(),
        name_c: categoryData.name.trim(),
        color_c: categoryData.color || "#6366F1",
        icon_c: categoryData.icon || "Tag"
      };

      const response = await apperClient.updateRecord('categories_c', {
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
          throw new Error("Failed to update category");
        }

        const updatedCategory = successful[0].data;
        return {
          Id: updatedCategory.Id,
          name: updatedCategory.name_c || "",
          color: updatedCategory.color_c || "#6366F1",
          icon: updatedCategory.icon_c || "Tag"
        };
      }
    } catch (error) {
      console.error("Error updating category:", error?.response?.data?.message || error);
      throw error;
    }
  },

  async delete(id) {
    try {
      const apperClient = getApperClient();
      const response = await apperClient.deleteRecord('categories_c', {
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
          throw new Error("Failed to delete category");
        }
        
        return successful.length === 1;
      }
    } catch (error) {
      console.error("Error deleting category:", error?.response?.data?.message || error);
      throw error;
    }
  },

  getCategoryByName(name) {
    // This method is synchronous and used by UI components
    // For now, return null - could be enhanced to cache categories
    return null;
  },

  getCategoryColors() {
    // This method is synchronous and used by UI components
    // For now, return empty object - could be enhanced to cache categories
    return {};
  }
};