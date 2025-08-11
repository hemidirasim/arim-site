const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function createAdmin() {
  try {
    const email = 'admin@arim.az'
    const password = 'admin123'
    const name = 'Admin User'

    // Check if admin already exists
    const existingAdmin = await prisma.user.findUnique({
      where: { email }
    })

    if (existingAdmin) {
      console.log('❌ Admin istifadəçisi artıq mövcuddur!')
      return
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create admin user
    const admin = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: 'ADMIN'
      }
    })

    console.log('✅ Admin istifadəçisi uğurla yaradıldı!')
    console.log('📧 Email:', email)
    console.log('🔑 Şifrə:', password)
    console.log('⚠️  Təhlükəsizlik üçün şifrəni dəyişdirin!')

  } catch (error) {
    console.error('❌ Xəta baş verdi:', error)
  } finally {
    await prisma.$disconnect()
  }
}

createAdmin()
