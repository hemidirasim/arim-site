'use client'

import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useState, useEffect, useCallback, useMemo } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

export const dynamic = 'force-dynamic'
export const revalidate = 0

interface ProjectDetailPageProps {
  params: {
    id: string
  }
}


export default function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const [project, setProject] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    async function fetchProject() {
      try {
        const response = await fetch(`/api/projects/${params.id}`)
        if (response.ok) {
          const data = await response.json()
          setProject(data)
        } else {
          notFound()
        }
      } catch (error) {
        console.error('Error fetching project:', error)
        notFound()
      } finally {
        setLoading(false)
      }
    }
    
    fetchProject()
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  const allImages = useMemo(() => {
    if (!project) return []
    return [
      ...(project.mainImage ? [project.mainImage] : []),
      ...(project.images && Array.isArray(project.images) ? project.images : [])
    ]
  }, [project])

  if (!project) {
    notFound()
  }

  const openModal = useCallback((index: number) => {
    setSelectedImageIndex(index)
    setIsModalOpen(true)
  }, [])

  const closeModal = useCallback(() => {
    setIsModalOpen(false)
  }, [])

  const nextImage = useCallback(() => {
    setSelectedImageIndex((prev) => (prev + 1) % allImages.length)
  }, [allImages.length])

  const prevImage = useCallback(() => {
    setSelectedImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length)
  }, [allImages.length])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isModalOpen) return
      
      if (e.key === 'Escape') {
        closeModal()
      } else if (e.key === 'ArrowLeft') {
        prevImage()
      } else if (e.key === 'ArrowRight') {
        nextImage()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isModalOpen, closeModal, prevImage, nextImage])

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Project Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {project.title}
            </h1>
            {project.partner && (
              <div className="inline-flex items-center px-4 py-2 bg-primary-50 text-primary-700 rounded-full">
                <span className="text-sm font-medium">
                  {project.partner.nameAz}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          {/* Main Image */}
          {project.mainImage && (
            <div 
              className="relative w-full h-96 rounded-lg overflow-hidden shadow-lg cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => openModal(0)}
            >
              <Image
                src={project.mainImage}
                alt={project.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Additional Images */}
          {project.images && Array.isArray(project.images) && project.images.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(project.images as string[]).map((image: string, index: number) => (
                <div 
                  key={index} 
                  className="relative w-full h-64 rounded-lg overflow-hidden shadow-md cursor-pointer hover:scale-105 transition-transform duration-300"
                  onClick={() => openModal(project.mainImage ? index + 1 : index)}
                >
                  <Image
                    src={image}
                    alt={`${project.title} - Foto ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}

          {/* No Images Message */}
          {!project.mainImage && (!project.images || !Array.isArray(project.images) || project.images.length === 0) && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-lg">
                Bu layihə üçün foto yoxdur
              </div>
            </div>
          )}
        </div>

        {/* Back Button */}
        <div className="mt-12 text-center">
          <a
            href="/projects"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 transition-colors duration-200"
          >
            ← Layihələrə Qayıt
          </a>
        </div>
      </div>

      {/* Image Gallery Modal */}
      {isModalOpen && allImages.length > 0 && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center p-4">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Navigation Buttons */}
            {allImages.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10"
                >
                  <ChevronLeft className="w-12 h-12" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10"
                >
                  <ChevronRight className="w-12 h-12" />
                </button>
              </>
            )}

            {/* Main Image */}
            <div className="max-w-7xl max-h-full flex items-center justify-center">
              <img
                src={allImages[selectedImageIndex]}
                alt={`${project.title} - Foto ${selectedImageIndex + 1}`}
                className="max-w-full max-h-full object-contain"
              />
            </div>

            {/* Image Counter */}
            {allImages.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-lg">
                {selectedImageIndex + 1} / {allImages.length}
              </div>
            )}

            {/* Thumbnail Navigation */}
            {allImages.length > 1 && (
              <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex space-x-2 max-w-full overflow-x-auto">
                {allImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 ${
                      index === selectedImageIndex ? 'border-white' : 'border-gray-600'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
