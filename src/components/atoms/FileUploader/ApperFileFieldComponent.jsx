import { useState, useEffect, useRef, useMemo } from 'react'

const ApperFileFieldComponent = ({ 
  elementId, 
  config, 
  className = '', 
  style = {} 
}) => {
  const [isReady, setIsReady] = useState(false)
  const [error, setError] = useState(null)
  const elementIdRef = useRef(null)
  const mountedRef = useRef(false)

  // Optimize existingFiles to prevent unnecessary re-renders
  const existingFiles = useMemo(() => {
    if (!config?.existingFiles || !Array.isArray(config.existingFiles)) {
      return []
    }
    return config.existingFiles
  }, [config?.existingFiles?.length, config?.existingFiles?.[0]?.id || config?.existingFiles?.[0]?.Id])

  // Single useEffect for SDK availability, mounting and unmounting
  useEffect(() => {
    let mounted = true

    const initializeComponent = async () => {
      try {
        // Check SDK availability
        if (!window.ApperSDK || !window.ApperSDK.ApperFileUploader) {
          if (mounted) {
            setError('ApperSDK not available')
            setIsReady(false)
          }
          return
        }

        // Mount the file field
        const mounted = await window.ApperSDK.ApperFileUploader.FileField.mount(elementIdRef.current, {
          ...config,
          existingFiles: existingFiles
        })

        if (mounted) {
          mountedRef.current = true
          setIsReady(true)
          setError(null)
        }

      } catch (err) {
        console.error('Failed to mount ApperFileField:', err)
        if (mounted) {
          setError(err.message)
          setIsReady(false)
        }
      }
    }

    // Update files if existingFiles changed and component is ready
    const updateFiles = async () => {
      if (mountedRef.current && config?.existingFiles !== undefined) {
        try {
          if (config.existingFiles && config.existingFiles.length > 0) {
            // Convert and update files
            await window.ApperSDK.ApperFileUploader.FileField.updateFiles(elementIdRef.current, existingFiles)
          } else {
            // Clear files if existingFiles is empty
            await window.ApperSDK.ApperFileUploader.FileField.clearFiles(elementIdRef.current)
          }
        } catch (err) {
          console.error('Failed to update files:', err)
        }
      }
    }

    if (elementId) {
      initializeComponent()
    }

    // Update files when existingFiles changes
    if (isReady && config?.fieldKey) {
      updateFiles()
    }

    // Cleanup function
    return () => {
      mounted = false
      if (mountedRef.current && elementIdRef.current) {
        try {
          window.ApperSDK?.ApperFileUploader?.FileField?.unmount(elementIdRef.current)
          mountedRef.current = false
        } catch (err) {
          console.error('Error during cleanup:', err)
        }
      }
      setIsReady(false)
      setError(null)
    }
  }, [elementId, existingFiles, isReady, config?.fieldKey])

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
        className="min-h-[100px] border-2 border-dashed border-gray-300 rounded-lg p-4"
      >
        {!isReady && !error && (
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