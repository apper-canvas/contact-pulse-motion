import { motion } from "framer-motion"
import Card from "@/components/atoms/Card"
import ApperIcon from "@/components/ApperIcon"

const ContactStats = ({ contacts = [] }) => {
  const totalContacts = contacts.length
  const favoriteContacts = contacts.filter(c => c.isFavorite).length
  const contactsWithPhones = contacts.filter(c => c.phone).length
  const contactsWithEmails = contacts.filter(c => c.email).length
  
  // Get category distribution
  const categoryStats = contacts.reduce((acc, contact) => {
    contact.categories?.forEach(category => {
      acc[category] = (acc[category] || 0) + 1
    })
    return acc
  }, {})
  
  const topCategory = Object.entries(categoryStats)
    .sort(([,a], [,b]) => b - a)[0]

  const stats = [
    {
      label: "Total Contacts",
      value: totalContacts,
      icon: "Users",
      color: "from-blue-500 to-blue-600",
      change: null
    },
    {
      label: "Favorites",
      value: favoriteContacts,
      icon: "Heart",
      color: "from-pink-500 to-pink-600",
      percentage: totalContacts > 0 ? Math.round((favoriteContacts / totalContacts) * 100) : 0
    },
    {
      label: "With Phone",
      value: contactsWithPhones,
      icon: "Phone",
      color: "from-green-500 to-green-600",
      percentage: totalContacts > 0 ? Math.round((contactsWithPhones / totalContacts) * 100) : 0
    },
    {
      label: "With Email",
      value: contactsWithEmails,
      icon: "Mail",
      color: "from-purple-500 to-purple-600",
      percentage: totalContacts > 0 ? Math.round((contactsWithEmails / totalContacts) * 100) : 0
    }
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stat.value.toLocaleString()}
                </p>
                {stat.percentage !== undefined && (
                  <p className="text-xs text-gray-500">
                    {stat.percentage}% of total
                  </p>
                )}
              </div>
              
              <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center`}>
                <ApperIcon name={stat.icon} className="w-6 h-6 text-white" />
              </div>
            </div>
            
            {/* Subtle background pattern */}
            <div className="absolute top-0 right-0 w-32 h-32 opacity-5 overflow-hidden">
              <div className={`w-full h-full bg-gradient-to-br ${stat.color} transform rotate-12 translate-x-8 -translate-y-8`} />
            </div>
          </Card>
        </motion.div>
      ))}
      
      {/* Top Category Card */}
      {topCategory && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="sm:col-span-2 lg:col-span-4"
        >
          <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  Most Popular Category
                </p>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold gradient-text">
                    {topCategory[0]}
                  </h3>
                  <span className="text-sm text-gray-500">
                    ({topCategory[1]} contacts)
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-xs text-gray-500">Distribution</p>
                  <div className="flex gap-1 mt-1">
                    {Object.entries(categoryStats)
                      .sort(([,a], [,b]) => b - a)
                      .slice(0, 5)
                      .map(([category, count]) => (
                        <div
                          key={category}
                          className="h-2 bg-gradient-to-r from-primary to-secondary rounded-full"
                          style={{
                            width: `${(count / totalContacts) * 60}px`,
                            minWidth: '4px'
                          }}
                        />
                      ))
                    }
                  </div>
                </div>
                
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  <ApperIcon name="BarChart3" className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  )
}

export default ContactStats