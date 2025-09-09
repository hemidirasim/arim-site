import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from 'next/image'
import { prisma } from '@/lib/db'

// Force dynamic rendering to prevent caching issues
export const dynamic = 'force-dynamic'
export const revalidate = 0

async function getProjects() {
  try {
    const projects = await prisma.project.findMany({
      where: { isActive: true },
      include: {
        partner: true
      },
      orderBy: { order: 'asc' }
    })
    return projects
  } catch (error) {
    console.error('Failed to fetch projects:', error)
    return []
  }
}

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Layihələrimiz
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Tərəfdaşlarımızla birlikdə həyata keçirdiyimiz uğurlu layihələrimizi kəşf edin
            </p>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <div key={project.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  {/* Main Image */}
                  <div className="aspect-video bg-gray-200 overflow-hidden">
                    {project.mainImage ? (
                      project.mainImage.includes('blob.vercel-storage.com') ? (
                        <img
                          src={project.mainImage}
                          alt={project.titleAz}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Image
                          src={project.mainImage}
                          alt={project.titleAz}
                          width={400}
                          height={300}
                          className="w-full h-full object-cover"
                        />
                      )
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200">
                        <span className="text-gray-500 text-lg">Foto yox</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {project.titleAz}
                      </h3>
                      {project.partner && (
                        <span className="text-sm text-primary-600 bg-primary-50 px-2 py-1 rounded-full">
                          {project.partner.nameAz}
                        </span>
                      )}
                    </div>
                    
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {project.descriptionAz}
                    </p>
                    
                    {/* Additional Images Preview */}
                    {project.images && project.images.length > 0 && (
                      <div className="flex space-x-2 mb-4">
                        {project.images.slice(0, 3).map((image, index) => (
                          <div key={index} className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden">
                            {image.includes('blob.vercel-storage.com') ? (
                              <img
                                src={image}
                                alt={`Əlavə foto ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <Image
                                src={image}
                                alt={`Əlavə foto ${index + 1}`}
                                width={48}
                                height={48}
                                className="w-full h-full object-cover"
                              />
                            )}
                          </div>
                        ))}
                        {project.images.length > 3 && (
                          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                            <span className="text-xs text-gray-500">+{project.images.length - 3}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Hələ layihə yoxdur</h3>
                <p className="text-gray-500">Tezliklə layihələrimizi burada görə biləcəksiniz.</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Layihə təklifiniz var?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Bizimlə əməkdaşlıq edərək, layihənizi həyata keçirək. 
            Peşəkar komandamız sizin ideyalarınızı reallığa çevirəcək.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors"
          >
            Bizimlə əlaqə saxla
          </a>
        </div>
      </section>

      <Footer />
    </div>
  )
}
