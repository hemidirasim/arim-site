const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const contents = [
  {
    key: 'hero_title',
    value: 'Azərbaycan Reklam İstehsalat Mərkəzi',
    valueAz: 'Azərbaycan Reklam İstehsalat Mərkəzi',
    type: 'text'
  },
  {
    key: 'hero_description',
    value: 'Reklamınızı Azərbaycanın istənilən nöqtəsində yerləşdirmək imkanı! Mərkəzi küçələr, metro stansiyaları və ticarət mərkəzləri kimi ərazilərdə bilbordlar, skrollerlər, monitorlar və digər reklam vasitələri ilə tanıtımınızı təmin edirik.',
    valueAz: 'Reklamınızı Azərbaycanın istənilən nöqtəsində yerləşdirmək imkanı! Mərkəzi küçələr, metro stansiyaları və ticarət mərkəzləri kimi ərazilərdə bilbordlar, skrollerlər, monitorlar və digər reklam vasitələri ilə tanıtımınızı təmin edirik.',
    type: 'text'
  },
  {
    key: 'hero_cta',
    value: 'Zəng sorğusu',
    valueAz: 'Zəng sorğusu',
    type: 'text'
  },
  {
    key: 'about_title',
    value: 'Biz kimik?',
    valueAz: 'Biz kimik?',
    type: 'text'
  },
  {
    key: 'about_subtitle',
    value: 'Azərbaycanın reklam bazarında dinamik və peşəkar fəaliyyət!',
    valueAz: 'Azərbaycanın reklam bazarında dinamik və peşəkar fəaliyyət!',
    type: 'text'
  },
  {
    key: 'about_description',
    value: 'Azərbaycan Reklam İstehsalat Mərkəzi 2022-ci ildən etibarən ölkənin reklam bazarında dinamik və peşəkar fəaliyyəti ilə seçilir. Şirkətimizin əsas ixtisaslaşma sahəsi açıq hava və xarici məkanlar üçün iriölçülü reklam konstruksiyalarının istehsalıdır.',
    valueAz: 'Azərbaycan Reklam İstehsalat Mərkəzi 2022-ci ildən etibarən ölkənin reklam bazarında dinamik və peşəkar fəaliyyəti ilə seçilir. Şirkətimizin əsas ixtisaslaşma sahəsi açıq hava və xarici məkanlar üçün iriölçülü reklam konstruksiyalarının istehsalıdır.',
    type: 'text'
  },
  {
    key: 'about_cta',
    value: 'Ətraflı məlumat al',
    valueAz: 'Ətraflı məlumat al',
    type: 'text'
  },
  {
    key: 'services_title',
    value: 'Hansı xidmətləri göstəririk?',
    valueAz: 'Hansı xidmətləri göstəririk?',
    type: 'text'
  },
  {
    key: 'services_cta',
    value: 'Bütün xidmətlərimiz',
    valueAz: 'Bütün xidmətlərimiz',
    type: 'text'
  },
  {
    key: 'partners_title',
    value: 'Tərəfdaşlarımız',
    valueAz: 'Tərəfdaşlarımız',
    type: 'text'
  },
  {
    key: 'partners_cta',
    value: 'Bütün tərəfdaşlarımızı görün',
    valueAz: 'Bütün tərəfdaşlarımızı görün',
    type: 'text'
  },
  {
    key: 'testimonials_title',
    value: 'Müştərilərimizin şərhləri',
    valueAz: 'Müştərilərimizin şərhləri',
    type: 'text'
  },
  // Contact page content
  {
    key: 'contact_title',
    value: 'Əlaqə',
    valueAz: 'Əlaqə',
    type: 'text'
  },
  {
    key: 'contact_subtitle',
    value: 'Bizimlə əlaqə saxlayın və layihəniz haqqında danışaq',
    valueAz: 'Bizimlə əlaqə saxlayın və layihəniz haqqında danışaq',
    type: 'text'
  },
  {
    key: 'contact_form_title',
    value: 'Mesaj göndərin',
    valueAz: 'Mesaj göndərin',
    type: 'text'
  },
  {
    key: 'contact_info_title',
    value: 'Əlaqə məlumatları',
    valueAz: 'Əlaqə məlumatları',
    type: 'text'
  },
  {
    key: 'contact_phone',
    value: '(+994) 50 829 01 01',
    valueAz: '(+994) 50 829 01 01',
    type: 'text'
  },
  {
    key: 'contact_email',
    value: 'info@arim.az',
    valueAz: 'info@arim.az',
    type: 'text'
  },
  {
    key: 'contact_address',
    value: 'Ə.Rəcəbli 12, Bakı, Azərbaycan',
    valueAz: 'Ə.Rəcəbli 12, Bakı, Azərbaycan',
    type: 'text'
  },
  {
    key: 'contact_hours',
    value: 'Bazar ertəsi - Bazar: 11:00 - 21:00',
    valueAz: 'Bazar ertəsi - Bazar: 11:00 - 21:00',
    type: 'text'
  },
  {
    key: 'contact_map_link',
    value: 'https://maps.google.com/?q=Ə.Rəcəbli+12,+Bakı,+Azərbaycan',
    valueAz: 'https://maps.google.com/?q=Ə.Rəcəbli+12,+Bakı,+Azərbaycan',
    type: 'text'
  },
  // Social media links
  {
    key: 'social_title',
    value: 'Sosial şəbəkələr',
    valueAz: 'Sosial şəbəkələr',
    type: 'text'
  },
  {
    key: 'social_facebook',
    value: 'https://facebook.com/arim.az',
    valueAz: 'https://facebook.com/arim.az',
    type: 'text'
  },
  {
    key: 'social_instagram',
    value: 'https://instagram.com/arim.az',
    valueAz: 'https://instagram.com/arim.az',
    type: 'text'
  },
  {
    key: 'social_twitter',
    value: 'https://twitter.com/arim_az',
    valueAz: 'https://twitter.com/arim_az',
    type: 'text'
  },
  {
    key: 'social_linkedin',
    value: 'https://linkedin.com/company/arim-az',
    valueAz: 'https://linkedin.com/company/arim-az',
    type: 'text'
  },
  // FAQ content
  {
    key: 'faq_title',
    value: 'Tez-tez verilən suallar',
    valueAz: 'Tez-tez verilən suallar',
    type: 'text'
  },
  {
    key: 'faq_1_question',
    value: 'Layihə nə qədər vaxt aparır?',
    valueAz: 'Layihə nə qədər vaxt aparır?',
    type: 'text'
  },
  {
    key: 'faq_1_answer',
    value: 'Layihənin ölçüsündən asılı olaraq 1-4 həftə arasında tamamlanır. Kiçik layihələr daha tez, böyük layihələr isə daha uzun vaxt alır.',
    valueAz: 'Layihənin ölçüsündən asılı olaraq 1-4 həftə arasında tamamlanır. Kiçik layihələr daha tez, böyük layihələr isə daha uzun vaxt alır.',
    type: 'text'
  },
  {
    key: 'faq_2_question',
    value: 'Qiymətlər necə hesablanır?',
    valueAz: 'Qiymətlər necə hesablanır?',
    type: 'text'
  },
  {
    key: 'faq_2_answer',
    value: 'Qiymətlər layihənin mürəkkəbliyi, materialların keyfiyyəti və vaxt çərçivəsindən asılı olaraq müəyyən edilir.',
    valueAz: 'Qiymətlər layihənin mürəkkəbliyi, materialların keyfiyyəti və vaxt çərçivəsindən asılı olaraq müəyyən edilir.',
    type: 'text'
  },
  {
    key: 'faq_3_question',
    value: 'Ödəniş şərtləri necədir?',
    valueAz: 'Ödəniş şərtləri necədir?',
    type: 'text'
  },
  {
    key: 'faq_3_answer',
    value: 'Layihələrin 50%-i başlanğıcda, qalan hissəsi isə tamamlandıqdan sonra ödənilir.',
    valueAz: 'Layihələrin 50%-i başlanğıcda, qalan hissəsi isə tamamlandıqdan sonra ödənilir.',
    type: 'text'
  },
  {
    key: 'faq_4_question',
    value: 'Dəstək xidməti var?',
    valueAz: 'Dəstək xidməti var?',
    type: 'text'
  },
  {
    key: 'faq_4_answer',
    value: 'Bəli, bütün layihələrimizə 24/7 texniki dəstək xidməti daxildir.',
    valueAz: 'Bəli, bütün layihələrimizə 24/7 texniki dəstək xidməti daxildir.',
    type: 'text'
  }
]

async function seedContent() {
  try {
    console.log('🌱 Content məlumatları əlavə edilir...')
    
    for (const content of contents) {
      // Check if content already exists
      const existingContent = await prisma.content.findUnique({
        where: { key: content.key }
      })
      
      if (existingContent) {
        console.log(`⚠️  "${content.key}" artıq mövcuddur`)
        continue
      }
      
      await prisma.content.create({
        data: content
      })
      
      console.log(`✅ "${content.key}" əlavə edildi`)
    }
    
    console.log('🎉 Bütün content məlumatları uğurla əlavə edildi!')
  } catch (error) {
    console.error('❌ Xəta baş verdi:', error)
  } finally {
    await prisma.$disconnect()
  }
}

seedContent()
