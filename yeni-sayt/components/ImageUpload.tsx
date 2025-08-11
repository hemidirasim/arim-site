'use client'

import { useState, useRef } from 'react'
import { Upload, X, Image as ImageIcon } from 'lucide-react'

interface ImageUploadProps {
  value: string
  onChange: (url: string) => void
  label?: string
  className?: string
}

export default function ImageUpload({ value, onChange, label = 'Şəkil yüklə', className = '' }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState('')
  const [isUrlInput, setIsUrlInput] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    setError('')
    setIsUrlInput(false)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      const data = await response.json()

      if (response.ok) {
        onChange(data.url)
      } else {
        setError(data.error || 'Yükləmə xətası')
      }
    } catch (error) {
      setError('Yükləmə xətası')
    } finally {
      setIsUploading(false)
    }
  }

  const handleRemove = () => {
    onChange('')
    setIsUrlInput(false)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value
    onChange(url)
    
    // Check if it's a local upload URL or external URL
    if (url.startsWith('/uploads/')) {
      setIsUrlInput(false)
      setError('')
    } else if (url.startsWith('http')) {
      setIsUrlInput(true)
      // Only validate external URLs
      try {
        new URL(url)
        setError('')
      } catch {
        setError('Düzgün URL daxil edin')
      }
    } else if (url === '') {
      setIsUrlInput(false)
      setError('')
    } else {
      setIsUrlInput(true)
      setError('Düzgün URL daxil edin')
    }
  }

  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      
      <div className="space-y-4">
        {/* Current Image Preview */}
        {value && (
          <div className="relative">
            <img
              src={value}
              alt="Preview"
              className="w-32 h-32 object-cover rounded-lg border border-gray-300"
            />
            <button
              type="button"
              onClick={handleRemove}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Upload Area */}
        <div className="flex items-center justify-center w-full">
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              {isUploading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-600"></div>
                  <span className="ml-2 text-sm text-gray-600">Yüklənir...</span>
                </div>
              ) : (
                <>
                  <Upload className="w-8 h-8 mb-2 text-gray-400" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Şəkil yükləmək üçün klikləyin</span> və ya sürükləyin
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF, WEBP (max 5MB)</p>
                </>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileSelect}
              disabled={isUploading}
            />
          </label>
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}

        {/* URL Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Və ya şəkil URL-i daxil edin
          </label>
          <input
            type="text"
            value={value}
            onChange={handleUrlChange}
            placeholder="https://example.com/image.jpg və ya /uploads/image.jpg"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          {isUrlInput && value && !value.startsWith('/uploads/') && (
            <p className="text-xs text-gray-500 mt-1">
              Xarici URL üçün tam ünvan daxil edin (https://...)
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
