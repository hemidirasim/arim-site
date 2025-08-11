import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CheckCircle, Users, Award, Clock, Target } from 'lucide-react'

export default function AboutPage() {
  const stats = [
    { icon: Users, number: '200+', label: 'Məmnun Müştəri' },
    { icon: Award, number: '2+', label: 'İllik Təcrübə' },
    { icon: Clock, number: '24/7', label: 'Dəstək' },
    { icon: Target, number: '100%', label: 'Uğur Dərəcəsi' }
  ]

  const values = [
    {
      title: 'Keyfiyyət',
      description: 'Hər layihədə yüksək keyfiyyət standartlarına riayət edirik'
    },
    {
      title: 'İnnovasiya',
      description: 'Müasir texnologiyalar və yaradıcı həllər təqdim edirik'
    },
    {
      title: 'Etibarlılıq',
      description: 'Müştərilərimizə verdiyimiz sözü həmişə yerinə yetiririk'
    },
    {
      title: 'Peşəkarlıq',
      description: 'Peşəkar komandamızla hər layihəni uğurla tamamlayırıq'
    }
  ]

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Haqqımızda
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Azərbaycanın aparıcı reklam və marketinq şirkəti kimi 2022-ci ildən etibarən fəaliyyət göstəririk
            </p>
          </div>
        </div>
      </section>

      {/* About Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Biz kimik?</h2>
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                Azərbaycanın reklam bazarında dinamik və peşəkar fəaliyyət!
              </h3>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Azərbaycan Reklam İstehsalat Mərkəzi 2022-ci ildən etibarən ölkənin reklam bazarında 
                dinamik və peşəkar fəaliyyəti ilə seçilir. Şirkətimizin əsas ixtisaslaşma sahəsi 
                açıq hava və xarici məkanlar üçün iriölçülü reklam konstruksiyalarının istehsalıdır.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Mərkəzimiz müasir texnologiyalarla təchiz olunmuş avadanlıqlara malikdir və 
                innovativ yanaşmaları ilə fərqlənir. Biz müştərilərimizə yüksək keyfiyyətli 
                reklam həlləri təqdim edərək, onların biznes uğurlarına töhfə veririk.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center px-6 py-3 bg-secondary-500 hover:bg-secondary-600 text-white font-medium rounded-lg transition-colors"
              >
                Bizimlə əlaqə saxla
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
            <div className="relative">
              <Image
                src="/images/about-us.png"
                alt="ARIM About Us"
                width={600}
                height={400}
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <stat.icon className="w-12 h-12 text-primary-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Dəyərlərimiz
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Missiyamız</h2>
              <p className="text-lg text-gray-200 leading-relaxed">
                Açıq hava və xarici məkanlar üçün yüksək keyfiyyətli iriölçülü reklam 
                konstruksiyaları istehsal edərək, müştərilərimizin reklam ehtiyaclarını 
                tam şəkildə ödəmək və onların biznes uğurlarına töhfə vermək.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">Vizyonumuz</h2>
              <p className="text-lg text-gray-200 leading-relaxed">
                Azərbaycanın ən etibarlı və innovativ reklam konstruksiyaları istehsalçısı 
                olmaq. Müasir texnologiyalar və peşəkar yanaşma ilə reklam sahəsində 
                lider mövqeyə çatmaq.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
