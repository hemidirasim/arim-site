import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from 'next/image'
import { prisma } from '@/lib/db'

async function getPartners() {
  try {
    const partners = await prisma.partner.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' }
    })
    return partners
  } catch (error) {
    console.error('Failed to fetch partners:', error)
    return []
  }
}

export default async function PartnersPage() {
  const partners = await getPartners()

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Tərəfdaşlarımız
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Azərbaycanın aparıcı şirkətləri ilə əməkdaşlıq edərək, keyfiyyətli xidmətlər təqdim edirik
            </p>
          </div>
        </div>
      </section>

      {/* Partners Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {partners.map((partner) => (
              <div key={partner.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gray-200 rounded-lg mx-auto mb-4 flex items-center justify-center overflow-hidden">
                    {partner.logo ? (
                      <Image
                        src={partner.logo}
                        alt={partner.nameAz}
                        width={96}
                        height={96}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <span className="text-gray-500 text-lg font-bold">{partner.nameAz}</span>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {partner.nameAz}
                  </h3>
                  {partner.website && (
                    <a
                      href={partner.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                    >
                      Veb saytı ziyarət et →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {partners.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Hələ heç bir tərəfdaş əlavə edilməyib.</p>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Tərəfdaş olmaq istəyirsiniz?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            ARIM ilə əməkdaşlıq edərək, Azərbaycanın reklam bazarında uğur qazanın. 
            Bizimlə əlaqə saxlayın və tərəfdaşlıq imkanları haqqında məlumat alın.
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
