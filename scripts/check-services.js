const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function checkServices() {
  try {
    console.log('🔍 Xidmətlər yoxlanılır...')
    
    const services = await prisma.service.findMany({
      orderBy: { order: 'asc' }
    })
    
    console.log(`📊 Cəmi ${services.length} xidmət tapıldı:`)
    
    services.forEach((service, index) => {
      console.log(`\n${index + 1}. ${service.titleAz}`)
      console.log(`   Slug: ${service.slug}`)
      console.log(`   Features:`, service.features)
      console.log(`   Features type:`, typeof service.features)
      console.log(`   Features length:`, Array.isArray(service.features) ? service.features.length : 'Not an array')
    })
    
  } catch (error) {
    console.error('❌ Xəta baş verdi:', error)
  } finally {
    await prisma.$disconnect()
  }
}

checkServices()
