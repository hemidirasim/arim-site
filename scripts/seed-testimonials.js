const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const testimonials = [
  {
    name: 'Murad Məmmədov',
    nameAz: 'Murad Məmmədov',
    content: 'ARIM ilə işləmək çox rahatdır. Nəticələr gözlədiyimdən də yaxşı oldu.',
    contentAz: 'ARIM ilə işləmək çox rahatdır. Nəticələr gözlədiyimdən də yaxşı oldu.',
    rating: 5,
    image: null,
    order: 1,
    isActive: true
  },
  {
    name: 'Orxan Əliyev',
    nameAz: 'Orxan Əliyev',
    content: 'Peşəkar komanda və keyfiyyətli xidmət. Çox məmnunam.',
    contentAz: 'Peşəkar komanda və keyfiyyətli xidmət. Çox məmnunam.',
    rating: 5,
    image: null,
    order: 2,
    isActive: true
  },
  {
    name: 'Cəmalə Hüseynova',
    nameAz: 'Cəmalə Hüseynova',
    content: 'Reklamlarımızın effektivliyi artdı. Təşəkkür edirik!',
    contentAz: 'Reklamlarımızın effektivliyi artdı. Təşəkkür edirik!',
    rating: 5,
    image: null,
    order: 3,
    isActive: true
  },
  {
    name: 'Elşən Əhmədov',
    nameAz: 'Elşən Əhmədov',
    content: 'ARIM komandası çox peşəkardır. Layihəmizi vaxtında və keyfiyyətli şəkildə tamamladılar.',
    contentAz: 'ARIM komandası çox peşəkardır. Layihəmizi vaxtında və keyfiyyətli şəkildə tamamladılar.',
    rating: 5,
    image: null,
    order: 4,
    isActive: true
  },
  {
    name: 'Aynur Kərimli',
    nameAz: 'Aynur Kərimli',
    content: 'Rəqəmsal marketinq xidmətləri çox effektiv oldu. Satışlarımız artdı.',
    contentAz: 'Rəqəmsal marketinq xidmətləri çox effektiv oldu. Satışlarımız artdı.',
    rating: 4,
    image: null,
    order: 5,
    isActive: true
  }
]

async function seedTestimonials() {
  try {
    console.log('🌱 Müştəri şərhləri əlavə edilir...')
    
    for (const testimonial of testimonials) {
      const existingTestimonial = await prisma.testimonial.findFirst({
        where: { 
          nameAz: testimonial.nameAz,
          contentAz: testimonial.contentAz
        }
      })
      
      if (existingTestimonial) {
        console.log(`⚠️  "${testimonial.nameAz}" şərhi artıq mövcuddur`)
        continue
      }
      
      const createdTestimonial = await prisma.testimonial.create({
        data: testimonial
      })
      
      console.log(`✅ "${createdTestimonial.nameAz}" şərhi əlavə edildi`)
    }
    
    console.log('🎉 Bütün müştəri şərhləri uğurla əlavə edildi!')
  } catch (error) {
    console.error('❌ Xəta baş verdi:', error)
  } finally {
    await prisma.$disconnect()
  }
}

seedTestimonials()
