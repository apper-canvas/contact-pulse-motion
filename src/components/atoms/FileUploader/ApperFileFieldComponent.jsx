import { useState, useEffect, useRef, useMemo } from 'react'

const ApperFileFieldComponent = ({ 
  elementId, 
  config, 
  className = '', 
  style = {} 
}) => {
const [isReady, setIsReady] = useState(false)
  const [error, setError] = useState(null)
  const [isSDKLoading, setIsSDKLoading] = useState(true)
  const elementIdRef = useRef(null)
  const mountedRef = useRef(false)
  console.log('elementId1:', elementId)

  // Optimize existingFiles to prevent unnecessary re-renders
  const existingFiles = useMemo(() => {
    if (!config?.existingFiles || !Array.isArray(config.existingFiles)) {
      return []
    }
    return config.existingFiles
  }, [config?.existingFiles?.length, config?.existingFiles?.[0]?.id || config?.existingFiles?.[0]?.Id])

  // Single useEffect for SDK availability, mounting and unmounting
useEffect(() => {
    let componentMounted = true
    let sdkCheckInterval = null
    let attemptCount = 0
    const maxAttempts = 50
    const checkInterval = 5000 // 5 seconds

    const checkSDKAvailability = async () => {
      try {
        if (window.ApperSDK && window.ApperSDK.ApperFileUploader && window.ApperSDK.ApperFileUploader.FileField) {
          if (componentMounted) {
            setIsSDKLoading(false)
            setError(null)
            await initializeComponent()
          }
          if (sdkCheckInterval) {
            clearInterval(sdkCheckInterval)
            sdkCheckInterval = null
          }
          return true
        }
        return false
      } catch (err) {
        console.error('Error checking SDK availability:', err)
        return false
      }
    }

const getErrorMessage = (error) => {
      if (typeof error === 'string') return error
      if (error && typeof error.message === 'string') return error.message
      if (error && error.toString) return error.toString()
      return 'An unknown error occurred'
    }

    const initializeComponent = async () => {
      try {
        if (!window.ApperSDK || !window.ApperSDK.ApperFileUploader) {
          throw new Error('ApperSDK not loaded. Please ensure the SDK script is included before this component.')
        }

        // Mount the file field
        console.log('elementIdRef.current:', elementIdRef.current)
        const mountResult = await window.ApperSDK.ApperFileUploader.FileField.mount(elementIdRef.current, {
          ...config,
          existingFiles: existingFiles
        })

        if (componentMounted && mountResult) {
          mountedRef.current = true
          setIsReady(true)
          setError(null)
        }

      } catch (err) {
        console.error('Failed to mount ApperFileField:', err)
        if (componentMounted) {
          setError(getErrorMessage(err))
          setIsReady(false)
        }
      }
    }

    const updateFiles = async () => {
      if (mountedRef.current && elementIdRef.current && window.ApperSDK?.ApperFileUploader?.FileField) {
        try {
          if (existingFiles && existingFiles.length > 0) {
            await window.ApperSDK.ApperFileUploader.FileField.updateFiles(elementIdRef.current, existingFiles)
          } else {
            await window.ApperSDK.ApperFileUploader.FileField.clearFiles(elementIdRef.current)
          }
} catch (err) {
          console.error('Failed to update files:', getErrorMessage(err))
        }
      }
    }

  // Start SDK availability check
  console.log('elementId2:', elementId)
    if (elementId) {
      const startSDKCheck = async () => {
        const isAvailable = await checkSDKAvailability()
        
        if (!isAvailable && componentMounted) {
          // Start polling for SDK availability
          sdkCheckInterval = setInterval(async () => {
            attemptCount++
            
            if (attemptCount >= maxAttempts) {
              if (componentMounted) {
                setError('ApperSDK failed to load after maximum attempts')
                setIsSDKLoading(false)
              }
              if (sdkCheckInterval) {
                clearInterval(sdkCheckInterval)
                sdkCheckInterval = null
              }
              return
            }

            const available = await checkSDKAvailability()
            if (available && sdkCheckInterval) {
              clearInterval(sdkCheckInterval)
              sdkCheckInterval = null
            }
          }, checkInterval)
        }
      }

      startSDKCheck()
    }

    // Update files when existingFiles changes and component is ready
    if (isReady && mountedRef.current) {
      updateFiles()
    }

    // Cleanup function
    return () => {
      componentMounted = false
      
      if (sdkCheckInterval) {
        clearInterval(sdkCheckInterval)
        sdkCheckInterval = null
      }
      
      if (mountedRef.current && elementIdRef.current) {
        try {
          window.ApperSDK?.ApperFileUploader?.FileField?.unmount(elementIdRef.current)
          mountedRef.current = false
} catch (err) {
          console.error('Error during cleanup:', getErrorMessage(err))
        }
      }
      
      setIsReady(false)
      setError(null)
      setIsSDKLoading(true)
    }
  }, [elementId, existingFiles])

  return (
    <div className={`apper-file-field ${className}`} style={style}>
      {error && (
        <div className="text-red-500 text-sm mb-2 p-2 bg-red-50 border border-red-200 rounded">
          Error: {error}
        </div>
      )}
<div 
        ref={elementIdRef}
        id={elementId}
        className={className || "min-h-[100px] border-2 border-dashed border-gray-300 rounded-lg p-4"}
        style={style}
      >
{isSDKLoading && !error && (
          <div className="flex items-center justify-center text-gray-500">
            <div className="animate-spin w-5 h-5 border-2 border-primary border-t-transparent rounded-full mr-2"></div>
            Loading ApperSDK...
          </div>
        )}
        
        {!isReady && !isSDKLoading && !error && (
          <div className="flex items-center justify-center text-gray-500">
            <div className="animate-spin w-5 h-5 border-2 border-primary border-t-transparent rounded-full mr-2"></div>
            Loading file uploader...
          </div>
        )}
      </div>
    </div>
  )
}

export default ApperFileFieldComponent