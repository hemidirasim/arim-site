import Link from 'next/link'
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'
import { prisma } from '@/lib/db'

async function getContent() {
  try {
    const contents = await prisma.content.findMany({
      orderBy: { createdAt: 'desc' }
    })
    
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

export default async function Footer() {
  const content = await getContent()

  const socialLinks = [
    { 
      icon: Facebook, 
      href: content['social_facebook'] || '#', 
      label: 'Facebook',
      color: 'hover:text-blue-600'
    },
    { 
      icon: Twitter, 
      href: content['social_twitter'] || '#', 
      label: 'Twitter',
      color: 'hover:text-blue-400'
    },
    { 
      icon: Instagram, 
      href: content['social_instagram'] || '#', 
      label: 'Instagram',
      color: 'hover:text-pink-600'
    },
    { 
      icon: Linkedin, 
      href: content['social_linkedin'] || '#', 
      label: 'LinkedIn',
      color: 'hover:text-blue-700'
    },
  ]

  return (
    <footer className="bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Əlaqə</h3>
            <div className="space-y-2 text-gray-600">
              <p>Ünvan: {content['contact_address'] || 'Ə.Rəcəbli 12, Bakı, Azərbaycan'}</p>
              <p>Telefon: {content['contact_phone'] || '(+994) 50 829 01 01'}</p>
              <p>E-mail: {content['contact_email'] || 'info@arim.az'}</p>
            </div>
          </div>

          {/* Business Hours */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">İş saatları</h3>
            <div className="space-y-1 text-gray-600">
              <p>{content['contact_hours'] || 'Bazar ertəsi - Bazar: 11:00 - 21:00'}</p>
            </div>
          </div>

          {/* Partners Link */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tərəfdaşlarımız</h3>
            <Link 
              href="/partners" 
              className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
            >
              {content['partners_cta'] || 'Tərəfdaşlarımızı görün'} →
            </Link>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm">
            Bütün hüquqlar qorunur © 2025 ARIM
          </p>
          
          {/* Social Media Links */}
          <div className="flex space-x-4 mt-4 md:mt-0">
            {socialLinks.map((social) => (
              social.href !== '#' && (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-gray-400 ${social.color} transition-colors`}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              )
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
