# ARIM - Azərbaycan Reklam İstehsalat Mərkəzi

Bu layihə Azərbaycan Reklam İstehsalat Mərkəzi üçün hazırlanmış müasir veb saytdır.

## Quraşdırma

1. Asılılıqları quraşdırın:
```bash
npm install
```

2. Mühit dəyişənlərini təyin edin:
`.env.local` faylı yaradın:
```
DATABASE_URL="postgresql://arimgh_1:aiYjFDtNxRrVdXN2@j2he.your-database.de:5432/arimgh_db1"
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"
```

3. Verilənlər bazasını hazırlayın:
```bash
npx prisma generate
npx prisma db push
```

4. Development serverini başladın:
```bash
npm run dev
```

5. Brauzerinizdə açın: http://localhost:3000

## Admin Paneli

Admin panelinə daxil olmaq üçün: http://localhost:3000/admin

## Texnologiyalar

- Next.js 14
- TypeScript
- Tailwind CSS
- PostgreSQL
- Prisma
