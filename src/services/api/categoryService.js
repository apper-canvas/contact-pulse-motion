import categoriesData from "@/services/mockData/categories.json"

// Helper to simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// In-memory storage for categories
let categories = [...categoriesData]

export const categoryService = {
  async getAll() {
    await delay(200)
    return [...categories]
  },

  async getById(id) {
    await delay(150)
    const category = categories.find(c => c.Id === parseInt(id))
    if (!category) {
      throw new Error(`Category with id ${id} not found`)
    }
    return { ...category }
  },

  async create(categoryData) {
    await delay(300)
    
    // Validation
    if (!categoryData.name?.trim()) {
      throw new Error("Category name is required")
    }
    
    // Check for duplicate names
    if (categories.some(c => c.name.toLowerCase() === categoryData.name.toLowerCase().trim())) {
      throw new Error("Category name already exists")
    }

    // Create new category
    const newCategory = {
      Id: Math.max(...categories.map(c => c.Id), 0) + 1,
      name: categoryData.name.trim(),
      color: categoryData.color || "#6366F1",
      icon: categoryData.icon || "Tag"
    }

    categories.push(newCategory)
    return { ...newCategory }
  },

  async update(id, categoryData) {
    await delay(300)
    
    const index = categories.findIndex(c => c.Id === parseInt(id))
    if (index === -1) {
      throw new Error(`Category with id ${id} not found`)
    }

    // Validation
    if (!categoryData.name?.trim()) {
      throw new Error("Category name is required")
    }
    
    // Check for duplicate names (excluding current category)
    if (categories.some(c => c.Id !== parseInt(id) && c.name.toLowerCase() === categoryData.name.toLowerCase().trim())) {
      throw new Error("Category name already exists")
    }

    // Update category
    const updatedCategory = {
      ...categories[index],
      name: categoryData.name.trim(),
      color: categoryData.color || categories[index].color,
      icon: categoryData.icon || categories[index].icon
    }

    categories[index] = updatedCategory
    return { ...updatedCategory }
  },

  async delete(id) {
    await delay(250)
    
    const index = categories.findIndex(c => c.Id === parseInt(id))
    if (index === -1) {
      throw new Error(`Category with id ${id} not found`)
    }

    const deletedCategory = categories[index]
    categories.splice(index, 1)
    return { ...deletedCategory }
  },

  getCategoryByName(name) {
    return categories.find(c => c.name === name) || null
  },

  getCategoryColors() {
    return categories.reduce((colors, category) => {
      colors[category.name] = category.color
      return colors
    }, {})
  }
}