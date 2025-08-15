import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { prisma } from '@/lib/db'

async function getServices() {
  try {
    const services = await prisma.service.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' }
    })
    return services
  } catch (error) {
    console.error('Failed to fetch services:', error)
    return []
  }
}

export default async function ServicesPage() {
  const services = await getServices()

  return (
    <div className="min-h-screen">
      <Header />
      
      <section className="bg-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Xidmətlərimiz
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Azərbaycanın aparıcı reklam şirkəti kimi sizə geniş spektrdə xidmətlər təqdim edirik
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              // Handle features - ensure it's an array
              let features: string[] = []
              if (service.features) {
                if (Array.isArray(service.features)) {
                  features = service.features.filter((feature): feature is string => typeof feature === 'string')
                } else if (typeof service.features === 'object') {
                  features = Object.values(service.features).filter((feature): feature is string => typeof feature === 'string')
                }
              }

              return (
                <div key={service.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="aspect-video bg-gray-200 flex items-center justify-center overflow-hidden">
                    {service.image ? (
                      service.image.includes('blob.vercel-storage.com') ? (
                        <img
                          src={service.image}
                          alt={service.titleAz}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <Image
                          src={service.image}
                          alt={service.titleAz}
                          width={400}
                          height={225}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      )
                    ) : (
                      <span className="text-gray-500">{service.titleAz}</span>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {service.titleAz}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {service.descriptionAz}
                    </p>
                    
                    {features.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Xüsusiyyətlər:</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {features.slice(0, 3).map((feature, index) => (
                            <li key={index} className="flex items-center">
                              <span className="w-1 h-1 bg-primary-600 rounded-full mr-2"></span>
                              {feature}
                            </li>
                          ))}
                          {features.length > 3 && (
                            <li className="flex items-center">
                              <span className="w-1 h-1 bg-primary-600 rounded-full mr-2"></span>
                              +{features.length - 3} daha
                            </li>
                          )}
                        </ul>
                      </div>
                    )}
                    
                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-flex items-center text-secondary-600 hover:text-secondary-700 font-medium"
                    >
                      Ətraflı məlumat
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
