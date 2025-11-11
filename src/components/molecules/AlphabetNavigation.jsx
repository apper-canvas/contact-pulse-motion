import { motion } from "framer-motion"
import { cn } from "@/utils/cn"

const AlphabetNavigation = ({ 
  onLetterClick, 
  activeLetter = null, 
  availableLetters = [],
  className 
}) => {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")

  const handleLetterClick = (letter) => {
    onLetterClick?.(letter === activeLetter ? null : letter)
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className={cn("alphabet-nav", className)}
    >
      <div className="p-3">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
          Jump to
        </h3>
        
        <div className="grid grid-cols-2 gap-1">
          {alphabet.map((letter) => {
            const isActive = letter === activeLetter
            const isAvailable = availableLetters.includes(letter)
            
            return (
              <motion.button
                key={letter}
                whileHover={{ scale: isAvailable ? 1.1 : 1 }}
                whileTap={{ scale: isAvailable ? 0.95 : 1 }}
                onClick={() => isAvailable && handleLetterClick(letter)}
                disabled={!isAvailable}
                className={cn(
                  "w-8 h-8 rounded-lg text-xs font-medium transition-all duration-150",
                  isActive && "bg-primary text-white shadow-sm",
                  !isActive && isAvailable && "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
                  !isAvailable && "text-gray-300 cursor-not-allowed"
                )}
              >
                {letter}
              </motion.button>
            )
          })}
        </div>
        
        {availableLetters.length > 0 && (
          <div className="mt-3 pt-3 border-t border-gray-200">
            <button
              onClick={() => handleLetterClick(null)}
              className={cn(
                "w-full text-xs text-gray-500 hover:text-gray-700 transition-colors",
                activeLetter && "font-medium"
              )}
            >
              {activeLetter ? "Show all" : `${availableLetters.length} letters available`}
            </button>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default AlphabetNavigation