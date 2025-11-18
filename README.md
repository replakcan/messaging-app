# Messaging App

Modern bir mesajlaşma uygulaması. Kullanıcılar arası birebir mesajlaşma, grup mesajlaşması, kişi yönetimi ve kullanıcı durumu takibi gibi özellikler sunar.

## 📋 İçindekiler

- [Özellikler](#özellikler)
- [Teknolojiler](#teknolojiler)
- [Proje Yapısı](#proje-yapısı)
- [Kurulum](#kurulum)
- [Kullanım](#kullanım)
- [API Dokümantasyonu](#api-dokümantasyonu)
- [Postman Collection](#postman-collection)
- [Veritabanı Şeması](#veritabanı-şeması)
- [Geliştirme Durumu](#geliştirme-durumu)

## ✨ Özellikler

### Backend (Tamamlandı ✅)
- JWT tabanlı kimlik doğrulama
- Kullanıcı kayıt ve giriş sistemi
- Birebir mesajlaşma
- Grup mesajlaşması
- Kişi (contact) yönetimi
- Kullanıcı durumu takibi (Online, Offline, Away, Busy)
- Kullanıcı profil yönetimi
- RESTful API yapısı

### Frontend (Geliştirme Aşamasında 🚧)
- React tabanlı kullanıcı arayüzü
- React Router ile routing
- Kimlik doğrulama korumalı rotalar
- Mesajlaşma ve grup yönetimi arayüzleri

## 🛠 Teknolojiler

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **Prisma** - ORM (Object-Relational Mapping)
- **PostgreSQL** - Veritabanı
- **JWT (JSON Web Token)** - Kimlik doğrulama
- **Passport.js** - Authentication middleware
- **bcryptjs** - Şifre hashleme
- **CORS** - Cross-Origin Resource Sharing

### Frontend
- **React 19** - UI kütüphanesi
- **Vite** - Build tool ve dev server
- **React Router v7** - Client-side routing
- **Axios** - HTTP client
- **Lucide React** - İkon kütüphanesi

## 📁 Proje Yapısı

```
messaging-app/
├── backend/
│   ├── app.js                 # Express uygulama giriş noktası
│   ├── auth/                  # Kimlik doğrulama modülleri
│   │   ├── generateToken.js
│   │   ├── isAuth.js
│   │   └── jwtStrategy.js
│   ├── controllers/           # Route controller'ları
│   │   ├── authController.js
│   │   ├── contactsController.js
│   │   ├── groupsController.js
│   │   ├── messagesController.js
│   │   └── usersController.js
│   ├── errors/                # Özel hata sınıfları
│   ├── lib/                   # Yardımcı kütüphaneler
│   ├── prisma/                # Prisma şema ve migration'lar
│   └── routes/                # API route tanımları
│
└── frontend/
    ├── src/
    │   ├── api/               # API çağrıları
    │   ├── components/        # React bileşenleri
    │   ├── contexts/          # React context'leri
    │   ├── hooks/             # Custom React hook'ları
    │   ├── routes/            # Sayfa bileşenleri
    │   └── styles/            # CSS dosyaları
    └── vite.config.js
```

## 🚀 Kurulum

### Gereksinimler
- Node.js (v18 veya üzeri)
- PostgreSQL (v12 veya üzeri)
- npm veya yarn

### Adımlar

1. **Repository'yi klonlayın**
```bash
git clone <repository-url>
cd messaging-app
```

2. **Backend kurulumu**
```bash
cd backend
npm install
```

3. **Veritabanı yapılandırması**
   - PostgreSQL veritabanı oluşturun
   - `backend/` klasöründe `.env` dosyası oluşturun:
```env
DATABASE_URL="postgresql://kullanici:sifre@localhost:5432/veritabani_adi"
JWT_SECRET="gizli_jwt_anahtari_buraya"
PORT=3000
```

4. **Prisma migration'larını çalıştırın**
```bash
cd backend
npx prisma migrate deploy
# veya development için:
npx prisma migrate dev
```

5. **Prisma Client'ı generate edin**
```bash
npx prisma generate
```

6. **Frontend kurulumu**
```bash
cd ../frontend
npm install
```

7. **Frontend environment değişkenleri**
   - `frontend/` klasöründe `.env` dosyası oluşturun (gerekirse):
```env
VITE_API_URL=http://localhost:3000
```

## 💻 Kullanım

### Backend'i çalıştırma
```bash
cd backend
npm start
```
Backend varsayılan olarak `http://localhost:3000` adresinde çalışacaktır.

### Frontend'i çalıştırma
```bash
cd frontend
npm run dev
```
Frontend genellikle `http://localhost:5173` adresinde çalışacaktır (Vite varsayılan portu).

### Production build
```bash
# Frontend için
cd frontend
npm run build
```

## 📡 API Dokümantasyonu

### Kimlik Doğrulama

#### Kullanıcı Kaydı
```
POST /users
Body: {
  "first_name": "string",
  "last_name": "string",
  "age": number,
  "email": "string",
  "password": "string",
  "phone": "string"
}
```

#### Kullanıcı Girişi
```
POST /auth/login
Body: {
  "email": "string",
  "password": "string"
}
Response: { "token": "jwt_token" }
```

#### Kullanıcı Bilgileri
```
GET /auth/me
Headers: { "Authorization": "Bearer <token>" }
```

#### Kullanıcı Bilgilerini Güncelleme
```
PATCH /auth/me
Headers: { "Authorization": "Bearer <token>" }
Body: { ... }
```

#### Hesap Silme
```
DELETE /auth/me
Headers: { "Authorization": "Bearer <token>" }
```

### Mesajlar

#### Tüm Mesajları Getir
```
GET /messages
Headers: { "Authorization": "Bearer <token>" }
```

#### Yeni Mesaj Oluştur
```
POST /messages
Headers: { "Authorization": "Bearer <token>" }
Body: {
  "recieverId": "string" (opsiyonel, birebir mesaj için),
  "groupId": "string" (opsiyonel, grup mesajı için),
  "text": "string"
}
```

#### Mesaj Detayı
```
GET /messages/:messageId
Headers: { "Authorization": "Bearer <token>" }
```

#### Mesaj Düzenle
```
PATCH /messages/:messageId
Headers: { "Authorization": "Bearer <token>" }
Body: { "text": "string" }
```

#### Mesaj Sil
```
DELETE /messages/:messageId
Headers: { "Authorization": "Bearer <token>" }
```

### Gruplar

#### Tüm Grupları Getir
```
GET /groups
Headers: { "Authorization": "Bearer <token>" }
```

#### Yeni Grup Oluştur
```
POST /groups
Headers: { "Authorization": "Bearer <token>" }
Body: {
  "name": "string",
  "description": "string" (opsiyonel)
}
```

#### Grup Detayı
```
GET /groups/:groupId
Headers: { "Authorization": "Bearer <token>" }
```

#### Grup Düzenle
```
PATCH /groups/:groupId
Headers: { "Authorization": "Bearer <token>" }
Body: { "name": "string", "description": "string" }
```

#### Grup Sil
```
DELETE /groups/:groupId
Headers: { "Authorization": "Bearer <token>" }
```

#### Grup Mesajlarını Getir
```
GET /groups/:groupId/messages
Headers: { "Authorization": "Bearer <token>" }
```

#### Grup Mesajı Oluştur
```
POST /groups/:groupId/messages
Headers: { "Authorization": "Bearer <token>" }
Body: { "text": "string" }
```

#### Grup Üyelerini Getir
```
GET /groups/:groupId/members
Headers: { "Authorization": "Bearer <token>" }
```

#### Grup Üyesi Ekle
```
PATCH /groups/:groupId/members
Headers: { "Authorization": "Bearer <token>" }
Body: { "memberId": "string" }
```

#### Grup Üyesi Çıkar
```
DELETE /groups/:groupId/members/:memberId
Headers: { "Authorization": "Bearer <token>" }
```

### Kişiler (Contacts)

#### Tüm Kişileri Getir
```
GET /contacts
Headers: { "Authorization": "Bearer <token>" }
```

#### Yeni Kişi Ekle
```
POST /contacts
Headers: { "Authorization": "Bearer <token>" }
Body: { "contactId": "string" }
```

#### Kişi Bilgisi
```
GET /contacts/:contactId
Headers: { "Authorization": "Bearer <token>" }
```

#### Kişi Sil
```
DELETE /contacts/:contactId
Headers: { "Authorization": "Bearer <token>" }
```

### Konuşmalar

#### Tüm Konuşmaları Getir
```
GET /auth/me/conversations
Headers: { "Authorization": "Bearer <token>" }
```

#### Belirli Bir Konuşmanın Mesajlarını Getir
```
GET /auth/me/conversations/:conId
Headers: { "Authorization": "Bearer <token>" }
```

### Kullanıcılar

#### Kullanıcıları Ara
```
GET /users?search=query
```

#### Kullanıcı Detayı
```
GET /users/:userId
```

## 📬 Postman Collection

API endpoint'lerini test etmek için hazırlanmış Postman collection'ına aşağıdaki linkten ulaşabilirsiniz:

**[Postman Collection Linki](https://dogancanfanclub.postman.co/workspace/My-Workspace~1fdb3bc2-20e4-4ee4-864a-83a801cb98fc/collection/37899889-188a2ec7-4295-4d13-a130-b4587076cc5c?action=share&creator=37899889)**

Collection'ı Postman'e import ederek tüm endpoint'leri kolayca test edebilirsiniz.

## 🗄 Veritabanı Şeması

### User (Kullanıcı)
- `id` (UUID, Primary Key)
- `first_name` (String)
- `last_name` (String)
- `age` (Int)
- `email` (String, Unique)
- `password` (String, Hashed)
- `phone` (String, Unique)
- `status` (Enum: ONLINE, OFFLINE, AWAY, BUSY)
- `status_message` (String, Optional)
- `createdAt` (DateTime)
- `updatedAt` (DateTime)

### Message (Mesaj)
- `id` (UUID, Primary Key)
- `creatorId` (String, Foreign Key -> User)
- `recieverId` (String, Optional, Foreign Key -> User)
- `groupId` (String, Optional, Foreign Key -> Group)
- `text` (String)
- `createdAt` (DateTime)
- `updatedAt` (DateTime)

### Group (Grup)
- `id` (UUID, Primary Key)
- `name` (String)
- `description` (String, Optional)
- `adminId` (String, Foreign Key -> User)
- `createdAt` (DateTime)
- `updatedAt` (DateTime)

### İlişkiler
- Bir kullanıcı birden fazla mesaj gönderebilir
- Bir kullanıcı birden fazla mesaj alabilir
- Bir grup birden fazla mesaj içerebilir
- Bir grup bir admin'e sahiptir
- Bir grup birden fazla üyeye sahip olabilir
- Kullanıcılar birbirlerini kişi olarak ekleyebilir (many-to-many)

## 🔒 Güvenlik

- Şifreler bcryptjs ile hashlenir
- JWT token'lar ile kimlik doğrulama
- Protected route'lar için middleware kullanımı
- CORS yapılandırması
- SQL injection koruması (Prisma ORM)

## 📝 Geliştirme Durumu

### ✅ Tamamlanan
- [x] Backend API geliştirmesi
- [x] JWT kimlik doğrulama sistemi
- [x] Veritabanı şeması ve migration'lar
- [x] Mesajlaşma API'leri
- [x] Grup yönetimi API'leri
- [x] Kişi yönetimi API'leri
- [x] Kullanıcı yönetimi API'leri
- [x] Postman collection

### 🚧 Devam Eden
- [ ] Frontend UI/UX geliştirmesi
- [ ] Frontend-backend entegrasyonu

### 📋 Planlanan
- [ ] Real-time mesajlaşma (WebSocket)
- [ ] Dosya paylaşımı
- [ ] Mesaj bildirimleri
- [ ] Arama fonksiyonları
- [ ] Unit testler
- [ ] Integration testler
- [ ] Docker containerization
- [ ] CI/CD pipeline
- [ ] Production deployment

## 👤 Yazar

**Alper Mutlu Akcan**
- Email: alper.makcan@gmail.com

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 🤝 Katkıda Bulunma

Katkılarınızı bekliyoruz! Lütfen önce bir issue açın veya pull request göndermeden önce değişikliklerinizi tartışın.

## 📞 İletişim

Sorularınız veya önerileriniz için issue açabilir veya email gönderebilirsiniz.

