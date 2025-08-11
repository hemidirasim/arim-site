# 🚀 ARIM Website - Apache Server Deployment

## 📋 Serverdə Quraşdırma Addımları:

### 1. Faylları serverə yükləyin
- Bütün faylları serverin `public_html` qovluğuna yükləyin

### 2. Terminal açın (cPanel Terminal və ya SSH)
```bash
cd public_html
```

### 3. Dependencies yükləyin
```bash
npm ci --only=production
```

### 4. Environment dəyişənlərini tənzimləyin
```bash
nano .env.production
# Domain adını dəyişdirin: NEXTAUTH_URL="https://your-domain.com"
```

### 5. Prisma client yaradın
```bash
npx prisma generate
```

### 6. Database migration
```bash
npx prisma db push
```

### 7. Demo məlumatları əlavə edin
```bash
npm run seed:all
npm run create:admin
```

### 8. Build edin
```bash
npm run build
```

### 9. PM2 ilə başladın
```bash
npm install -g pm2
pm2 start npm --name "arim" -- start
pm2 startup
pm2 save
```

## 🔑 Admin Giriş:
- **URL**: https://your-domain.com/admin/login
- **Email**: admin@arim.az
- **Şifrə**: admin123

## 📞 Dəstək:
Problem yaranarsa:
- PM2 logları: `pm2 logs arim`
- Status yoxlamaq: `pm2 status`
- Yenidən başlatmaq: `pm2 restart arim`
