import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ContactForm from '@/components/ContactForm'
import { prisma } from '@/lib/db'
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react'

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

export default async function ContactPage() {
  const content = await getContent()

  const contactInfo = [
    {
      icon: Phone,
      title: 'Telefon',
      value: content['contact_phone'] || '(+994) 50 829 01 01',
      link: `tel:${content['contact_phone'] || '+994508290101'}`
    },
    {
      icon: Mail,
      title: 'E-mail',
      value: content['contact_email'] || 'info@arim.az',
      link: `mailto:${content['contact_email'] || 'info@arim.az'}`
    },
    {
      icon: MapPin,
      title: 'Ünvan',
      value: content['contact_address'] || 'Ə.Rəcəbli 12, Bakı, Azərbaycan',
      link: content['contact_map_link'] || '#'
    },
    {
      icon: Clock,
      title: 'İş saatları',
      value: content['contact_hours'] || 'Bazar ertəsi - Bazar: 11:00 - 21:00',
      link: '#'
    }
  ]

  const socialLinks = [
    {
      icon: Facebook,
      name: 'Facebook',
      url: content['social_facebook'] || '#',
      color: 'hover:text-blue-600'
    },
    {
      icon: Instagram,
      name: 'Instagram',
      url: content['social_instagram'] || '#',
      color: 'hover:text-pink-600'
    },
    {
      icon: Twitter,
      name: 'Twitter',
      url: content['social_twitter'] || '#',
      color: 'hover:text-blue-400'
    },
    {
      icon: Linkedin,
      name: 'LinkedIn',
      url: content['social_linkedin'] || '#',
      color: 'hover:text-blue-700'
    }
  ]

  const faqs = [
    {
      question: content['faq_1_question'] || 'Layihə nə qədər vaxt aparır?',
      answer: content['faq_1_answer'] || 'Layihənin ölçüsündən asılı olaraq 1-4 həftə arasında tamamlanır. Kiçik layihələr daha tez, böyük layihələr isə daha uzun vaxt alır.'
    },
    {
      question: content['faq_2_question'] || 'Qiymətlər necə hesablanır?',
      answer: content['faq_2_answer'] || 'Qiymətlər layihənin mürəkkəbliyi, materialların keyfiyyəti və vaxt çərçivəsindən asılı olaraq müəyyən edilir.'
    },
    {
      question: content['faq_3_question'] || 'Ödəniş şərtləri necədir?',
      answer: content['faq_3_answer'] || 'Layihələrin 50%-i başlanğıcda, qalan hissəsi isə tamamlandıqdan sonra ödənilir.'
    },
    {
      question: content['faq_4_question'] || 'Dəstək xidməti var?',
      answer: content['faq_4_answer'] || 'Bəli, bütün layihələrimizə 24/7 texniki dəstək xidməti daxildir.'
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
              {content['contact_title'] || 'Əlaqə'}
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              {content['contact_subtitle'] || 'Bizimlə əlaqə saxlayın və layihəniz haqqında danışaq'}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                {content['contact_form_title'] || 'Mesaj göndərin'}
              </h2>
              
              <ContactForm />
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                {content['contact_info_title'] || 'Əlaqə məlumatları'}
              </h2>
              
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0">
                      <info.icon className="w-6 h-6 text-primary-600" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {info.title}
                      </h3>
                      <a
                        href={info.link}
                        className="text-gray-600 hover:text-primary-600 transition-colors"
                      >
                        {info.value}
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Media Links */}
              {content['social_facebook'] || content['social_instagram'] || content['social_twitter'] || content['social_linkedin'] ? (
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {content['social_title'] || 'Sosial şəbəkələr'}
                  </h3>
                  <div className="flex space-x-4">
                    {socialLinks.map((social, index) => (
                      social.url !== '#' && (
                        <a
                          key={index}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`text-gray-400 ${social.color} transition-colors`}
                          title={social.name}
                        >
                          <social.icon className="w-6 h-6" />
                        </a>
                      )
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            {content['faq_title'] || 'Tez-tez verilən suallar'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
