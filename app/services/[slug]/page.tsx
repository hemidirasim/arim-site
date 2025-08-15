import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, CheckCircle, Star } from 'lucide-react'
import { prisma } from '@/lib/db'
import { notFound } from 'next/navigation'

interface ServiceDetailProps {
  params: { slug: string }
}

async function getService(slug: string) {
  try {
    const service = await prisma.service.findUnique({
      where: { slug: slug },
      select: {
        id: true,
        titleAz: true,
        descriptionAz: true,
        contentAz: true,
        image: true,
        features: true,
        slug: true
      }
    })
    return service
  } catch (error) {
    console.error('Failed to fetch service:', error)
    return null
  }
}

export default async function ServiceDetailPage({ params }: ServiceDetailProps) {
  const service = await getService(params.slug)
  
  if (!service) {
    notFound()
  }

  // Handle features - ensure it's an array
  let features: string[] = []
  if (service.features) {
    if (Array.isArray(service.features)) {
      features = service.features.filter((feature): feature is string => typeof feature === 'string')
    } else if (typeof service.features === 'object') {
      // If it's a JSON object, try to convert to array
      try {
        // If it's already an array-like object, use Object.values
        if (service.features && typeof service.features === 'object' && !Array.isArray(service.features)) {
          features = Object.values(service.features).filter((feature): feature is string => typeof feature === 'string')
        }
      } catch (error) {
        console.error('Error converting features:', error)
        features = []
      }
    }
  }



  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Link
              href="/services"
              className="inline-flex items-center text-gray-300 hover:text-white mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Bütün xidmətlərə qayıt
            </Link>
            <h1 className="text-4xl font-bold mb-4">{service.titleAz}</h1>
            <p className="text-xl text-gray-200">{service.descriptionAz}</p>
          </div>
        </div>
      </section>

      {/* Service Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {service.image && (
                <div className="mb-8">
                  {service.image.includes('blob.vercel-storage.com') ? (
                    <img
                      src={service.image}
                      alt={service.titleAz}
                      className="w-full h-auto rounded-lg shadow-lg"
                      loading="lazy"
                    />
                  ) : (
                    <Image
                      src={service.image}
                      alt={service.titleAz}
                      width={800}
                      height={400}
                      className="w-full h-auto rounded-lg shadow-lg"
                      priority={false}
                      loading="lazy"
                    />
                  )}
                </div>
              )}
              
              <div className="prose prose-lg max-w-none">
                <div dangerouslySetInnerHTML={{ __html: service.contentAz || '' }} />
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Features */}
              {features.length > 0 && (
                <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Xidmət Xüsusiyyətləri
                  </h3>
                  <ul className="space-y-3">
                    {features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              

              
              {/* Why Choose Us */}
              <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Niyə ARIM?
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-primary-600 font-bold text-sm">1</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Peşəkar Komanda</h4>
                      <p className="text-sm text-gray-600">Təcrübəli və peşəkar işçilər</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-primary-600 font-bold text-sm">2</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Yüksək Keyfiyyət</h4>
                      <p className="text-sm text-gray-600">Müasir texnologiyalar və materiallar</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-primary-600 font-bold text-sm">3</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Tez Çatdırılma</h4>
                      <p className="text-sm text-gray-600">Vaxtında və keyfiyyətli iş</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Contact CTA */}
              <div className="bg-primary-600 text-white rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">
                  Bu xidmət haqqında məlumat alın
                </h3>
                <p className="text-primary-100 mb-6">
                  Peşəkarlarımız sizinlə əlaqə saxlayacaq və bütün suallarınızı cavablandıracaq.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center w-full px-6 py-3 bg-white text-primary-600 font-medium rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Əlaqə saxla
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
