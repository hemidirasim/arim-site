const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const partners = [
  {
    name: 'Coca-Cola',
    nameAz: 'Coca-Cola',
    logo: null,
    website: 'https://www.coca-cola.az',
    order: 1,
    isActive: true
  },
  {
    name: 'Samsung',
    nameAz: 'Samsung',
    logo: null,
    website: 'https://www.samsung.com/az',
    order: 2,
    isActive: true
  },
  {
    name: 'Hyundai',
    nameAz: 'Hyundai',
    logo: null,
    website: 'https://www.hyundai.az',
    order: 3,
    isActive: true
  },
  {
    name: 'VOGUE',
    nameAz: 'VOGUE',
    logo: null,
    website: 'https://www.vogue.com',
    order: 4,
    isActive: true
  },
  {
    name: 'TDK',
    nameAz: 'TDK',
    logo: null,
    website: 'https://www.tdk.com',
    order: 5,
    isActive: true
  },
  {
    name: 'Barclays',
    nameAz: 'Barclays',
    logo: null,
    website: 'https://www.barclays.com',
    order: 6,
    isActive: true
  }
]

async function seedPartners() {
  try {
    console.log('🌱 Tərəfdaşlar əlavə edilir...')
    
    for (const partner of partners) {
      const existingPartner = await prisma.partner.findFirst({
        where: { nameAz: partner.nameAz }
      })
      
      if (existingPartner) {
        console.log(`⚠️  "${partner.nameAz}" artıq mövcuddur`)
        continue
      }
      
      const createdPartner = await prisma.partner.create({
        data: partner
      })
      
      console.log(`✅ "${createdPartner.nameAz}" əlavə edildi`)
    }
    
    console.log('🎉 Bütün tərəfdaşlar uğurla əlavə edildi!')
  } catch (error) {
    console.error('❌ Xəta baş verdi:', error)
  } finally {
    await prisma.$disconnect()
  }
}

seedPartners()
