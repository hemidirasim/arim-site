const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const serviceFeatures = {
  'outdoor-advertising': [
    'Yüksək keyfiyyətli çap',
    'Strategik yerləşdirmə',
    '24/7 texniki dəstək',
    'Rəqabətli qiymətlər',
    'Müxtəlif ölçülər',
    'Tez quraşdırma'
  ],
  'digital-marketing': [
    'Hədəflənmiş reklamlar',
    'A/B testləri',
    'Detallı hesabatlar',
    'ROI optimallaşdırma',
    'Kampaniya idarəetməsi',
    'Peşəkar komanda'
  ],
  'media-pr': [
    'Peşəkar PR strategiyası',
    'Media münasibətləri',
    'İmic qurulması',
    'Event təşkili',
    'Krizis idarəetməsi',
    'Nəticə hesabatları'
  ]
}

async function updateServices() {
  try {
    console.log('🔄 Xidmətlər yenilənir...')
    
    for (const [slug, features] of Object.entries(serviceFeatures)) {
      const service = await prisma.service.findUnique({
        where: { slug: slug }
      })
      
      if (service) {
        await prisma.service.update({
          where: { id: service.id },
          data: { features: features }
        })
        console.log(`✅ "${service.titleAz}" yeniləndi`)
      } else {
        console.log(`⚠️  "${slug}" tapılmadı`)
      }
    }
    
    console.log('🎉 Bütün xidmətlər uğurla yeniləndi!')
  } catch (error) {
    console.error('❌ Xəta baş verdi:', error)
  } finally {
    await prisma.$disconnect()
  }
}

updateServices()
