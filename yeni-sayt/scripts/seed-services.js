const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const services = [
  {
    title: 'Daxili və Çöl Reklamları',
    titleAz: 'Daxili və Çöl Reklamları',
    description: 'Küçələr, metro stansiyaları və ticarət mərkəzlərində reklam yerləşdirmə xidmətləri',
    descriptionAz: 'Küçələr, metro stansiyaları və ticarət mərkəzlərində reklam yerləşdirmə xidmətləri',
    content: `
      <h2>Daxili və Çöl Reklamları</h2>
      <p>ARIM olaraq, Azərbaycanın ən strategik nöqtələrində reklam yerləşdirmə imkanları təqdim edirik. Bizim xidmətlərimiz:</p>
      
      <h3>Bilbordlar və Skrollerlər</h3>
      <ul>
        <li>Mərkəzi küçələrdə yerləşən iriölçülü bilbordlar</li>
        <li>Yüksək keyfiyyətli skrollerlər</li>
        <li>LED ekranlı dinamik bilbordlar</li>
        <li>3D effektli reklam konstruksiyaları</li>
      </ul>
      
      <h3>Metro Reklamları</h3>
      <ul>
        <li>Metro stansiyalarında reklam yerləri</li>
        <li>Vaqon daxilində reklam materialları</li>
        <li>Metro keçidlərində reklam paneli</li>
        <li>Metro platformalarında reklam konstruksiyaları</li>
      </ul>
      
      <h3>Küçə Reklamları</h3>
      <ul>
        <li>Küçə işıq dirəklərində reklam paneli</li>
        <li>Avtobus dayanacaqlarında reklam yerləri</li>
        <li>Küçə mebelində reklam konstruksiyaları</li>
        <li>Yaya keçidlərində reklam paneli</li>
      </ul>
      
      <h3>Transport Reklamları</h3>
      <ul>
        <li>Avtobus və trolleybus reklamları</li>
        <li>Taksi reklamları</li>
        <li>Yük avtomobillərində reklam materialları</li>
        <li>Metro vaqonlarında reklam yerləri</li>
      </ul>
      
      <h3>Niyə ARIM?</h3>
      <ul>
        <li>Azərbaycanın ən strategik nöqtələrində yerləşmə</li>
        <li>Yüksək keyfiyyətli materiallar və istehsal</li>
        <li>Peşəkar dizayn və quraşdırma</li>
        <li>24/7 texniki dəstək</li>
        <li>Rəqabətli qiymətlər</li>
      </ul>
    `,
    contentAz: `
      <h2>Daxili və Çöl Reklamları</h2>
      <p>ARIM olaraq, Azərbaycanın ən strategik nöqtələrində reklam yerləşdirmə imkanları təqdim edirik. Bizim xidmətlərimiz:</p>
      
      <h3>Bilbordlar və Skrollerlər</h3>
      <ul>
        <li>Mərkəzi küçələrdə yerləşən iriölçülü bilbordlar</li>
        <li>Yüksək keyfiyyətli skrollerlər</li>
        <li>LED ekranlı dinamik bilbordlar</li>
        <li>3D effektli reklam konstruksiyaları</li>
      </ul>
      
      <h3>Metro Reklamları</h3>
      <ul>
        <li>Metro stansiyalarında reklam yerləri</li>
        <li>Vaqon daxilində reklam materialları</li>
        <li>Metro keçidlərində reklam paneli</li>
        <li>Metro platformalarında reklam konstruksiyaları</li>
      </ul>
      
      <h3>Küçə Reklamları</h3>
      <ul>
        <li>Küçə işıq dirəklərində reklam paneli</li>
        <li>Avtobus dayanacaqlarında reklam yerləri</li>
        <li>Küçə mebelində reklam konstruksiyaları</li>
        <li>Yaya keçidlərində reklam paneli</li>
      </ul>
      
      <h3>Transport Reklamları</h3>
      <ul>
        <li>Avtobus və trolleybus reklamları</li>
        <li>Taksi reklamları</li>
        <li>Yük avtomobillərində reklam materialları</li>
        <li>Metro vaqonlarında reklam yerləri</li>
      </ul>
      
      <h3>Niyə ARIM?</h3>
      <ul>
        <li>Azərbaycanın ən strategik nöqtələrində yerləşmə</li>
        <li>Yüksək keyfiyyətli materiallar və istehsal</li>
        <li>Peşəkar dizayn və quraşdırma</li>
        <li>24/7 texniki dəstək</li>
        <li>Rəqabətli qiymətlər</li>
      </ul>
    `,
    slug: 'outdoor-advertising',
    image: null,
    features: [
      'Yüksək keyfiyyətli çap',
      'Strategik yerləşdirmə',
      '24/7 texniki dəstək',
      'Rəqabətli qiymətlər',
      'Müxtəlif ölçülər',
      'Tez quraşdırma'
    ],
    order: 1,
    isActive: true
  },
  {
    title: 'Rəqəmsal Marketinq',
    titleAz: 'Rəqəmsal Marketinq',
    description: 'Google, Yandex, Facebook, Instagram və YouTube platformalarında effektiv reklam həlləri',
    descriptionAz: 'Google, Yandex, Facebook, Instagram və YouTube platformalarında effektiv reklam həlləri',
    content: `
      <h2>Rəqəmsal Marketinq</h2>
      <p>Rəqəmsal dünyada uğur qazanmaq üçün peşəkar rəqəmsal marketinq xidmətləri təqdim edirik. Bizim xidmətlərimiz:</p>
      
      <h3>Google Ads</h3>
      <ul>
        <li>Google Search reklamları</li>
        <li>Google Display Network</li>
        <li>YouTube reklamları</li>
        <li>Google Shopping reklamları</li>
        <li>Google Maps reklamları</li>
      </ul>
      
      <h3>Facebook və Instagram Reklamları</h3>
      <ul>
        <li>Facebook Feed reklamları</li>
        <li>Instagram Story reklamları</li>
        <li>Instagram Feed reklamları</li>
        <li>Facebook Marketplace reklamları</li>
        <li>Messenger reklamları</li>
      </ul>
      
      <h3>SEO (Axtarış Motoru Optimallaşdırması)</h3>
      <ul>
        <li>Veb sayt SEO optimallaşdırması</li>
        <li>Yerli SEO xidmətləri</li>
        <li>Texniki SEO audit</li>
        <li>Məzmun strategiyası</li>
        <li>Backlink qurulması</li>
      </ul>
      
      <h3>E-mail Marketinq</h3>
      <ul>
        <li>E-mail siyahısı yaratma</li>
        <li>Avtomatlaşdırılmış e-mail kampaniyaları</li>
        <li>Personalizasiya edilmiş mesajlar</li>
        <li>A/B testləri</li>
        <li>Kampaniya analitikası</li>
      </ul>
      
      <h3>Niyə ARIM?</h3>
      <ul>
        <li>Peşəkar rəqəmsal marketinq komandası</li>
        <li>Müştəri ehtiyaclarına uyğun strategiya</li>
        <li>Detallı hesabat və analitika</li>
        <li>ROI-ə yönəlmiş yanaşma</li>
        <li>Daimi kampaniya optimallaşdırması</li>
      </ul>
    `,
    contentAz: `
      <h2>Rəqəmsal Marketinq</h2>
      <p>Rəqəmsal dünyada uğur qazanmaq üçün peşəkar rəqəmsal marketinq xidmətləri təqdim edirik. Bizim xidmətlərimiz:</p>
      
      <h3>Google Ads</h3>
      <ul>
        <li>Google Search reklamları</li>
        <li>Google Display Network</li>
        <li>YouTube reklamları</li>
        <li>Google Shopping reklamları</li>
        <li>Google Maps reklamları</li>
      </ul>
      
      <h3>Facebook və Instagram Reklamları</h3>
      <ul>
        <li>Facebook Feed reklamları</li>
        <li>Instagram Story reklamları</li>
        <li>Instagram Feed reklamları</li>
        <li>Facebook Marketplace reklamları</li>
        <li>Messenger reklamları</li>
      </ul>
      
      <h3>SEO (Axtarış Motoru Optimallaşdırması)</h3>
      <ul>
        <li>Veb sayt SEO optimallaşdırması</li>
        <li>Yerli SEO xidmətləri</li>
        <li>Texniki SEO audit</li>
        <li>Məzmun strategiyası</li>
        <li>Backlink qurulması</li>
      </ul>
      
      <h3>E-mail Marketinq</h3>
      <ul>
        <li>E-mail siyahısı yaratma</li>
        <li>Avtomatlaşdırılmış e-mail kampaniyaları</li>
        <li>Personalizasiya edilmiş mesajlar</li>
        <li>A/B testləri</li>
        <li>Kampaniya analitikası</li>
      </ul>
      
      <h3>Niyə ARIM?</h3>
      <ul>
        <li>Peşəkar rəqəmsal marketinq komandası</li>
        <li>Müştəri ehtiyaclarına uyğun strategiya</li>
        <li>Detallı hesabat və analitika</li>
        <li>ROI-ə yönəlmiş yanaşma</li>
        <li>Daimi kampaniya optimallaşdırması</li>
      </ul>
    `,
    slug: 'digital-marketing',
    image: null,
    features: [
      'Hədəflənmiş reklamlar',
      'A/B testləri',
      'Detallı hesabatlar',
      'ROI optimallaşdırma',
      'Kampaniya idarəetməsi',
      'Peşəkar komanda'
    ],
    order: 2,
    isActive: true
  },
  {
    title: 'Media və PR Xidməti',
    titleAz: 'Media və PR Xidməti',
    description: 'Məhsulunuzun tanıtımı və imic qurulması üçün peşəkar PR strategiyaları',
    descriptionAz: 'Məhsulunuzun tanıtımı və imic qurulması üçün peşəkar PR strategiyaları',
    content: `
      <h2>Media və PR Xidməti</h2>
      <p>Şirkətinizin imicini qurmaq və media münasibətlərini idarə etmək üçün peşəkar PR xidmətləri təqdim edirik. Bizim xidmətlərimiz:</p>
      
      <h3>Media Münasibətləri</h3>
      <ul>
        <li>Media ilə əlaqələrin qurulması</li>
        <li>Jurnalistlərlə münasibətlər</li>
        <li>Media təqdimatları</li>
        <li>Press-turların təşkili</li>
        <li>Media monitoring</li>
      </ul>
      
      <h3>Press-relizlər</h3>
      <ul>
        <li>Peşəkar press-reliz yazılması</li>
        <li>Media siyahısının hazırlanması</li>
        <li>Press-relizlərin yayılması</li>
        <li>Media əhatəsinin izlənməsi</li>
        <li>Press-reliz effektivliyinin ölçülməsi</li>
      </ul>
      
      <h3>Event Təşkili</h3>
      <ul>
        <li>Press-konfransların təşkili</li>
        <li>Məhsul təqdimatları</li>
        <li>Korporativ tədbirlər</li>
        <li>Media brifingləri</li>
        <li>Event PR dəstəyi</li>
      </ul>
      
      <h3>İmic Qurulması</h3>
      <ul>
        <li>Şirkət imicinin formalaşdırılması</li>
        <li>Brand strategiyası</li>
        <li>Korporativ kommunikasiya</li>
        <li>Krizis kommunikasiya</li>
        <li>İmic monitoring</li>
      </ul>
      
      <h3>Niyə ARIM?</h3>
      <ul>
        <li>Peşəkar PR komandası</li>
        <li>Geniş media əlaqələri</li>
        <li>Strategik yanaşma</li>
        <li>Ölçülə bilən nəticələr</li>
        <li>Uzunmüddətli münasibətlər</li>
      </ul>
    `,
    contentAz: `
      <h2>Media və PR Xidməti</h2>
      <p>Şirkətinizin imicini qurmaq və media münasibətlərini idarə etmək üçün peşəkar PR xidmətləri təqdim edirik. Bizim xidmətlərimiz:</p>
      
      <h3>Media Münasibətləri</h3>
      <ul>
        <li>Media ilə əlaqələrin qurulması</li>
        <li>Jurnalistlərlə münasibətlər</li>
        <li>Media təqdimatları</li>
        <li>Press-turların təşkili</li>
        <li>Media monitoring</li>
      </ul>
      
      <h3>Press-relizlər</h3>
      <ul>
        <li>Peşəkar press-reliz yazılması</li>
        <li>Media siyahısının hazırlanması</li>
        <li>Press-relizlərin yayılması</li>
        <li>Media əhatəsinin izlənməsi</li>
        <li>Press-reliz effektivliyinin ölçülməsi</li>
      </ul>
      
      <h3>Event Təşkili</h3>
      <ul>
        <li>Press-konfransların təşkili</li>
        <li>Məhsul təqdimatları</li>
        <li>Korporativ tədbirlər</li>
        <li>Media brifingləri</li>
        <li>Event PR dəstəyi</li>
      </ul>
      
      <h3>İmic Qurulması</h3>
      <ul>
        <li>Şirkət imicinin formalaşdırılması</li>
        <li>Brand strategiyası</li>
        <li>Korporativ kommunikasiya</li>
        <li>Krizis kommunikasiya</li>
        <li>İmic monitoring</li>
      </ul>
      
      <h3>Niyə ARIM?</h3>
      <ul>
        <li>Peşəkar PR komandası</li>
        <li>Geniş media əlaqələri</li>
        <li>Strategik yanaşma</li>
        <li>Ölçülə bilən nəticələr</li>
        <li>Uzunmüddətli münasibətlər</li>
      </ul>
    `,
    slug: 'media-pr',
    image: null,
    features: [
      'Peşəkar PR strategiyası',
      'Media münasibətləri',
      'İmic qurulması',
      'Event təşkili',
      'Krizis idarəetməsi',
      'Nəticə hesabatları'
    ],
    order: 3,
    isActive: true
  }
]

async function seedServices() {
  try {
    console.log('🌱 Xidmətlər əlavə edilir...')
    
    for (const service of services) {
      const existingService = await prisma.service.findUnique({
        where: { slug: service.slug }
      })
      
      if (existingService) {
        console.log(`⚠️  "${service.titleAz}" artıq mövcuddur`)
        continue
      }
      
      const createdService = await prisma.service.create({
        data: service
      })
      
      console.log(`✅ "${createdService.titleAz}" əlavə edildi`)
    }
    
    console.log('🎉 Bütün xidmətlər uğurla əlavə edildi!')
  } catch (error) {
    console.error('❌ Xəta baş verdi:', error)
  } finally {
    await prisma.$disconnect()
  }
}

seedServices()
