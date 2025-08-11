import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Star } from 'lucide-react'
import { prisma } from '@/lib/db'
import TestimonialsCarousel from '@/components/TestimonialsCarousel'

async function getServices() {
  try {
    const services = await prisma.service.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
      take: 3
    })
    return services
  } catch (error) {
    console.error('Failed to fetch services:', error)
    return []
  }
}

async function getPartners() {
  try {
    const partners = await prisma.partner.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
      take: 6
    })
    return partners
  } catch (error) {
    console.error('Failed to fetch partners:', error)
    return []
  }
}

async function getTestimonials() {
  try {
    const testimonials = await prisma.testimonial.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' }
    })
    return testimonials
  } catch (error) {
    console.error('Failed to fetch testimonials:', error)
    return []
  }
}

async function getContent() {
  try {
    const contents = await prisma.content.findMany({
      orderBy: { createdAt: 'desc' }
    })
    
    // Convert array to object for easier access
    const contentMap: { [key: string]: string } = {}
    contents.forEach(content => {
      contentMap[content.key] = content.valueAz || content.value
    })
    
    return contentMap
  } catch (error) {
    console.error('Failed to fetch content:', error)
    return {}
  }
}

export default async function HomePage() {
  const [services, partners, testimonials, content] = await Promise.all([
    getServices(),
    getPartners(),
    getTestimonials(),
    getContent()
  ])

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {content['hero_title'] || 'Azərbaycan Reklam İstehsalat Mərkəzi'}
              </h1>
              <p className="text-xl mb-8 text-gray-200 leading-relaxed">
                {content['hero_description'] || 'Reklamınızı Azərbaycanın istənilən nöqtəsində yerləşdirmək imkanı! Mərkəzi küçələr, metro stansiyaları və ticarət mərkəzləri kimi ərazilərdə bilbordlar, skrollerlər, monitorlar və digər reklam vasitələri ilə tanıtımınızı təmin edirik.'}
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-3 bg-secondary-500 hover:bg-secondary-600 text-white font-medium rounded-lg transition-colors"
              >
                {content['hero_cta'] || 'Zəng sorğusu'}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
            <div className="relative">
              {/* Hero Image */}
              <div className="relative overflow-hidden rounded-lg shadow-2xl">
                <Image
                  src={content['hero_image'] || "/images/hero-billboard.jpg"}
                  alt="Digital Billboards"
                  width={600}
                  height={400}
                  className="w-full h-auto rounded-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/50 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <Image
                src={content['about_image'] || "/images/about-us.png"}
                alt="ARIM About Us"
                width={600}
                height={400}
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {content['about_title'] || 'Biz kimik?'}
              </h2>
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                {content['about_subtitle'] || 'Azərbaycanın reklam bazarında dinamik və peşəkar fəaliyyət!'}
              </h3>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {content['about_description'] || 'Azərbaycan Reklam İstehsalat Mərkəzi 2022-ci ildən etibarən ölkənin reklam bazarında dinamik və peşəkar fəaliyyəti ilə seçilir. Şirkətimizin əsas ixtisaslaşma sahəsi açıq hava və xarici məkanlar üçün iriölçülü reklam konstruksiyalarının istehsalıdır.'}
              </p>
              <Link
                href="/about"
                className="inline-flex items-center px-6 py-3 bg-secondary-500 hover:bg-secondary-600 text-white font-medium rounded-lg transition-colors"
              >
                {content['about_cta'] || 'Ətraflı məlumat al'}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            {content['services_title'] || 'Hansı xidmətləri göstəririk?'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {services.map((service: any) => {
              // Handle features - ensure it's an array
              let features: string[] = []
              if (service.features) {
                if (Array.isArray(service.features)) {
                  features = service.features
                } else if (typeof service.features === 'object') {
                  features = Object.values(service.features) as string[]
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
                        />
                      ) : (
                        <Image
                          src={service.image}
                          alt={service.titleAz}
                          width={400}
                          height={225}
                          className="w-full h-full object-cover"
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
                    <Link
                      href={`/services/${service.slug}`}
                      className="text-secondary-600 hover:text-secondary-700 font-medium"
                    >
                      Ətraflı məlumat →
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="text-center">
            <Link
              href="/services"
              className="inline-flex items-center px-8 py-3 bg-secondary-500 hover:bg-secondary-600 text-white font-medium rounded-lg transition-colors"
            >
              {content['services_cta'] || 'Bütün xidmətlərimiz'}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            {content['partners_title'] || 'Tərəfdaşlarımız'}
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {partners.map((partner: any) => (
              <div key={partner.id} className="bg-white rounded-lg shadow-lg p-6 flex items-center justify-center hover:shadow-xl transition-shadow">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg mx-auto mb-3 flex items-center justify-center overflow-hidden">
                    {partner.logo ? (
                      <Image
                        src={partner.logo}
                        alt={partner.nameAz}
                        width={64}
                        height={64}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <span className="text-gray-500 text-xs font-bold">{partner.nameAz}</span>
                    )}
                  </div>
                  <h3 className="text-sm font-medium text-gray-900">
                    {partner.nameAz}
                  </h3>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Link
              href="/partners"
              className="inline-flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors"
            >
              {content['partners_cta'] || 'Bütün tərəfdaşlarımızı görün'}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            {content['testimonials_title'] || 'Müştərilərimizin şərhləri'}
          </h2>
          
          <TestimonialsCarousel testimonials={testimonials} />
        </div>
      </section>

      <Footer />
    </div>
  )
}
