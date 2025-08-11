# 🚀 ARIM Website Deployment Guide

## Server Tələbləri

- **OS**: Ubuntu 20.04+ və ya CentOS 8+
- **Node.js**: 18.x və ya daha yuxarı
- **Nginx**: Reverse proxy üçün
- **PM2**: Process manager üçün
- **SSL Certificate**: HTTPS üçün

## 📋 Deployment Addımları

### 1. Serverə bağlanın
```bash
ssh user@your-server-ip
```

### 2. Lazım olan proqramları yükləyin
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install -y nodejs npm nginx git curl

# CentOS/RHEL
sudo yum update
sudo yum install -y nodejs npm nginx git curl
```

### 3. Node.js versiyasını yoxlayın
```bash
node --version  # 18.x və ya daha yuxarı olmalıdır
npm --version
```

### 4. PM2 yükləyin
```bash
sudo npm install -g pm2
```

### 5. Layihəni serverə yükləyin
```bash
# Layihə qovluğuna keçin
cd /var/www/
sudo git clone https://github.com/your-username/arim.git
sudo chown -R $USER:$USER arim
cd arim
```

### 6. Environment dəyişənlərini tənzimləyin
```bash
# .env.production faylını redaktə edin
nano .env.production

# Domain adını dəyişdirin
NEXTAUTH_URL="https://your-domain.com"
```

### 7. Dependencies yükləyin
```bash
npm ci --only=production
```

### 8. Prisma client yaradın
```bash
npx prisma generate
```

### 9. Database migration edin
```bash
npx prisma db push
```

### 10. Demo məlumatları əlavə edin
```bash
npm run seed:all
npm run create:admin
```

### 11. Application build edin
```bash
npm run build
```

### 12. PM2 ilə başladın
```bash
# PM2 config faylını redaktə edin
nano ecosystem.config.js

# Domain adını dəyişdirin
NEXTAUTH_URL: 'https://your-domain.com'

# PM2 ilə başladın
pm2 start ecosystem.config.js --env production

# PM2-ni sistem başlanğıcına əlavə edin
pm2 startup
pm2 save
```

### 13. Nginx konfiqurasiyası
```bash
# Nginx config faylını kopyalayın
sudo cp nginx.conf /etc/nginx/sites-available/arim

# Domain adını dəyişdirin
sudo nano /etc/nginx/sites-available/arim

# SSL sertifikat yollarını dəyişdirin
ssl_certificate /path/to/your/ssl/certificate.crt;
ssl_certificate_key /path/to/your/ssl/private.key;

# Uploads və images yollarını dəyişdirin
location /uploads/ {
    alias /var/www/arim/public/uploads/;
}

location /images/ {
    alias /var/www/arim/public/images/;
}

# Site-ı aktivləşdirin
sudo ln -s /etc/nginx/sites-available/arim /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 14. Uploads qovluğunu yaradın
```bash
mkdir -p public/uploads
chmod 755 public/uploads
```

### 15. Firewall tənzimləməsi
```bash
# Ubuntu/Debian
sudo ufw allow 80
sudo ufw allow 443
sudo ufw allow 22

# CentOS/RHEL
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-service=https
sudo firewall-cmd --permanent --add-service=ssh
sudo firewall-cmd --reload
```

## 🔧 İdarəetmə Əmrləri

### PM2 ilə
```bash
# Status yoxlamaq
pm2 status

# Logları görmək
pm2 logs arim-website

# Yenidən başlatmaq
pm2 restart arim-website

# Dayandırmaq
pm2 stop arim-website

# Silmək
pm2 delete arim-website
```

### Nginx ilə
```bash
# Status yoxlamaq
sudo systemctl status nginx

# Yenidən başlatmaq
sudo systemctl restart nginx

# Konfiqurasiya test etmək
sudo nginx -t
```

## 🔒 SSL Sertifikatı

### Let's Encrypt ilə (Pulsuz)
```bash
# Certbot yükləyin
sudo apt install certbot python3-certbot-nginx

# Sertifikat alın
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Avtomatik yeniləmə
sudo crontab -e
# Bu sətri əlavə edin:
0 12 * * * /usr/bin/certbot renew --quiet
```

## 📊 Monitoring

### PM2 Monitoring
```bash
# Web interfeysi
pm2 plus

# Terminal monitoring
pm2 monit
```

### Log faylları
```bash
# PM2 logları
pm2 logs arim-website

# Nginx logları
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

## 🚨 Troubleshooting

### Application işləmir
```bash
# PM2 status yoxlayın
pm2 status

# Logları yoxlayın
pm2 logs arim-website

# Port yoxlayın
netstat -tlnp | grep :3000
```

### Database bağlantı problemi
```bash
# Database bağlantısını test edin
npx prisma db pull

# Environment dəyişənlərini yoxlayın
echo $DATABASE_URL
```

### Nginx problemi
```bash
# Konfiqurasiya test edin
sudo nginx -t

# Logları yoxlayın
sudo tail -f /var/log/nginx/error.log
```

## 🔄 Yeniləmə

### Kod yeniləməsi
```bash
cd /var/www/arim
git pull origin main
npm ci --only=production
npx prisma generate
npm run build
pm2 restart arim-website
```

### Environment dəyişənləri yeniləməsi
```bash
nano .env.production
pm2 restart arim-website
```

## 📞 Dəstək

Problem yaranarsa:
1. PM2 loglarını yoxlayın: `pm2 logs arim-website`
2. Nginx loglarını yoxlayın: `sudo tail -f /var/log/nginx/error.log`
3. Database bağlantısını test edin: `npx prisma db pull`
