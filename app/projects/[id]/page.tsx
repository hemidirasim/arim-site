'use client'

import { notFound } from 'next/navigation'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useEffect, useState } from 'react'
import Script from 'next/script'

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

  useEffect(() => {
    // Initialize Fancybox when jQuery and Fancybox are loaded
    const initFancybox = () => {
      if (typeof window !== 'undefined' && (window as any).jQuery && (window as any).jQuery.fancybox) {
        (window as any).jQuery('[data-fancybox="gallery"]').fancybox({
          buttons: [
            "zoom",
            "slideShow",
            "thumbs",
            "close"
          ],
          loop: true,
          protect: true
        })
      }
    }

    // Check if already loaded
    initFancybox()

    // If not loaded yet, wait for it
    const checkInterval = setInterval(initFancybox, 100)
    
    // Cleanup
    return () => {
      clearInterval(checkInterval)
      if (typeof window !== 'undefined' && (window as any).jQuery && (window as any).jQuery.fancybox) {
        (window as any).jQuery.fancybox.destroy()
      }
    }
  }, [project])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!project) {
    notFound()
  }

  const allImages = [
    ...(project.mainImage ? [project.mainImage] : []),
    ...(project.images && Array.isArray(project.images) ? project.images : [])
  ]

  return (
    <div className="min-h-screen">
      {/* Fancybox CDN Scripts */}
      <Script
        src="https://code.jquery.com/jquery-3.6.0.min.js"
        strategy="beforeInteractive"
      />
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.5.7/jquery.fancybox.min.js"
        strategy="afterInteractive"
      />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.5.7/jquery.fancybox.min.css"
      />
      
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
            <div className="relative w-full h-96 rounded-lg overflow-hidden shadow-lg cursor-pointer">
              <a
                data-fancybox="gallery"
                data-src={project.mainImage}
                data-caption={project.title}
              >
                <Image
                  src={project.mainImage}
                  alt={project.title}
                  fill
                  className="object-cover hover:opacity-90 transition-opacity"
                  priority
                />
              </a>
            </div>
          )}

          {/* Additional Images */}
          {project.images && Array.isArray(project.images) && project.images.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(project.images as string[]).map((image: string, index: number) => (
                <div key={index} className="relative w-full h-64 rounded-lg overflow-hidden shadow-md cursor-pointer">
                  <a
                    data-fancybox="gallery"
                    data-src={image}
                    data-caption={`${project.title} - Foto ${index + 1}`}
                  >
                    <Image
                      src={image}
                      alt={`${project.title} - Foto ${index + 1}`}
                      fill
                      className="object-cover hover:opacity-90 transition-opacity"
                    />
                  </a>
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

      <Footer />
    </div>
  )
}