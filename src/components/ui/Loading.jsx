import { motion } from "framer-motion"

const Loading = ({ type = "grid" }) => {
  const renderGridSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[...Array(12)].map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-lg border border-gray-200 shadow-card overflow-hidden"
        >
          <div className="p-6">
            <div className="flex items-start gap-4">
              <div className="shimmer w-12 h-12 rounded-full bg-gray-200" />
              <div className="flex-1 space-y-3">
                <div className="shimmer h-4 bg-gray-200 rounded w-3/4" />
                <div className="shimmer h-3 bg-gray-200 rounded w-1/2" />
                <div className="shimmer h-3 bg-gray-200 rounded w-2/3" />
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <div className="shimmer h-6 w-16 bg-gray-200 rounded-full" />
              <div className="shimmer h-6 w-20 bg-gray-200 rounded-full" />
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <div className="shimmer h-8 w-8 bg-gray-200 rounded-full" />
              <div className="shimmer h-8 w-8 bg-gray-200 rounded-full" />
              <div className="shimmer h-8 w-8 bg-gray-200 rounded-full" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )

  const renderListSkeleton = () => (
    <div className="space-y-4">
      {[...Array(8)].map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-lg border border-gray-200 shadow-card p-4"
        >
          <div className="flex items-center gap-4">
            <div className="shimmer w-10 h-10 rounded-full bg-gray-200" />
            <div className="flex-1 space-y-2">
              <div className="shimmer h-4 bg-gray-200 rounded w-1/3" />
              <div className="shimmer h-3 bg-gray-200 rounded w-1/4" />
            </div>
            <div className="flex gap-2">
              <div className="shimmer h-6 w-16 bg-gray-200 rounded-full" />
              <div className="shimmer h-6 w-20 bg-gray-200 rounded-full" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )

  const renderFormSkeleton = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-lg border border-gray-200 shadow-card p-6 space-y-6"
    >
      <div className="shimmer h-8 bg-gray-200 rounded w-1/3" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="space-y-2">
            <div className="shimmer h-4 bg-gray-200 rounded w-1/4" />
            <div className="shimmer h-10 bg-gray-200 rounded" />
          </div>
        ))}
      </div>
      <div className="space-y-2">
        <div className="shimmer h-4 bg-gray-200 rounded w-1/4" />
        <div className="shimmer h-24 bg-gray-200 rounded" />
      </div>
      <div className="flex gap-3">
        <div className="shimmer h-10 w-24 bg-gray-200 rounded" />
        <div className="shimmer h-10 w-20 bg-gray-200 rounded" />
      </div>
    </motion.div>
  )

  if (type === "list") return renderListSkeleton()
  if (type === "form") return renderFormSkeleton()
  return renderGridSkeleton()
}

export default Loading