# 💰 DOMPET PNBP  
## Microservices Payment Platform

Platform manajemen pembayaran elektronik berbasis **arsitektur microservices** untuk pengelolaan data **PNBP (Penerimaan Negara Bukan Pajak)**.  
Sistem ini mencakup **Backend modular** dengan pendekatan **One Service, One Database** serta **Frontend modern** yang responsif dan terintegrasi melalui **API Gateway**.

---

## 🏗️ Arsitektur Sistem

- **Microservices Architecture**  
  Backend terbagi menjadi layanan-layanan kecil yang independen.

- **API Gateway**  
  Bertindak sebagai **Single Entry Point** untuk seluruh request dari client (Frontend/Postman).

- **Database Isolation**  
  Setiap service memiliki database sendiri untuk menjaga integritas dan desentralisasi data.

- **Security**
  - **JWT (JSON Web Token)** untuk autentikasi user
  - **Internal Gateway Header** untuk memastikan service hanya dapat diakses melalui Gateway

- **Frontend**
  - Single Page Application (SPA)
  - Terintegrasi penuh dengan API Gateway

---

## 🚀 Tech Stack

### Frontend
- Framework: React + Vite  
- Language: TypeScript  
- Styling: Tailwind CSS  
- UI Components: Shadcn UI (Radix UI)  
- State & Fetching: Axios, React Hooks  
- Routing: React Router DOM  

### Backend
- Runtime: Node.js  
- Framework: Express.js  
- ORM: Sequelize  
- Database: MySQL  
- Proxy (Gateway): express-http-proxy  

---

## 🧩 Daftar Service & Port

| Service | Port | Database | Deskripsi |
|------|------|---------|----------|
| Frontend | 5173 | - | Antarmuka Pengguna (Web App) |
| API Gateway | 3000 | - | Routing, Auth Validation & Proxy |
| Auth Service | 3001 | db_auth_pnbp | Login, Register & Profil User |
| RBAC Service | 3002 | db_rbac_pnbp | Manajemen User, Role & Permission |
| Master Service | 3003 | db_master_pnbp | Manajemen Data Master (Produk) |
| Transaction Service | 3004 | db_transaction_pnbp | Keranjang (Cart) & Transaksi |

---

## ⚙️ Konfigurasi Environment (.env)

Buat file `.env` di masing-masing folder berikut.

### 1. Frontend (`/frontend/.env`)
```
VITE_API_URL=http://localhost:3000/api
```

---

### 2. API Gateway (`/backend/api-gateway/.env`)
```
PORT=3000

AUTH_SERVICE_URL=http://localhost:3001
RBAC_SERVICE_URL=http://localhost:3002
MASTER_SERVICE_URL=http://localhost:3003
TRANSACTION_SERVICE_URL=http://localhost:3004

GATEWAY_SECRET=gateway-secret-pnbp-2026
JWT_SECRET=pnbp-jwt-secret-key-2026
```

---

### 3. Auth Service (`/backend/auth-service/.env`)
```
PORT=3001

DB_NAME=db_auth_pnbp
DB_USER=root
DB_PASSWORD=
DB_HOST=127.0.0.1

JWT_SECRET=pnbp-jwt-secret-key-2026
GATEWAY_SECRET=gateway-secret-pnbp-2026
```

---

### 4. RBAC Service (`/backend/rbac-service/.env`)
```
PORT=3002

DB_NAME=db_rbac_pnbp
DB_USER=root
DB_PASSWORD=
DB_HOST=127.0.0.1

GATEWAY_SECRET=gateway-secret-pnbp-2026
```

---

### 5. Master Service (`/backend/master-service/.env`)
```
PORT=3003

DB_NAME=db_master_pnbp
DB_USER=root
DB_PASSWORD=
DB_HOST=127.0.0.1

GATEWAY_SECRET=gateway-secret-pnbp-2026
```

---

### 6. Transaction Service (`/backend/transaction-service/.env`)
```
PORT=3004

DB_NAME=db_transaction_pnbp
DB_USER=root
DB_PASSWORD=
DB_HOST=127.0.0.1

GATEWAY_URL=http://localhost:3000/api
GATEWAY_SECRET=gateway-secret-pnbp-2026
```

Catatan:  
Sesuaikan `DB_USER` dan `DB_PASSWORD` dengan konfigurasi MySQL lokal Anda.

---

## 🛠️ Instalasi & Setup

### Langkah 1: Persiapan Database
Buat 4 database MySQL kosong:
- `db_auth_pnbp`
- `db_rbac_pnbp`
- `db_master_pnbp`
- `db_transaction_pnbp`

---

### Langkah 2: Instalasi Dependensi

**Backend**  
Jalankan di setiap folder service (api-gateway, auth, rbac, master, transaction):
```
npm install
```

**Frontend**
```
cd frontend
npm install
```

---

### Langkah 3: Seeding Data (Backend)

Isi data awal (Admin, Role, Produk Dummy):
```
# backend/auth-service
node seed.js

# backend/rbac-service
node seed.js

# backend/master-service
node seed.js
```

---

## ▶️ Cara Menjalankan Aplikasi

Jalankan **6 terminal** secara bersamaan.

**Terminal 1 – API Gateway**
```
cd backend/api-gateway
npm start
```

**Terminal 2 – Auth Service**
```
cd backend/auth-service
npm start
```

**Terminal 3 – RBAC Service**
```
cd backend/rbac-service
npm start
```

**Terminal 4 – Master Service**
```
cd backend/master-service
npm start
```

**Terminal 5 – Transaction Service**
```
cd backend/transaction-service
npm start
```

**Terminal 6 – Frontend**
```
cd frontend
npm run dev
```

Akses aplikasi Frontend di:
```
http://localhost:5173
```

---

## 🧪 Panduan Testing API (Postman / Manual)

⚠️ Semua request **HARUS melalui API Gateway**  
Base URL:
```
http://localhost:3000/api
```

### 1. Autentikasi (Login)
**POST** `/auth/login`
```json
{
  "email": "andi@kemendagri.go.id",
  "password": "admin123"
}
```

Gunakan token sebagai **Bearer Token** untuk request selanjutnya.

---

### 2. Produk (Master Data)
- **GET** `/products/products`
- **POST** `/products/products` (Admin Only)

---

### 3. Transaksi
- **POST** `/transactions/cart/add`
- **POST** `/transactions/checkout`
- **PUT** `/transactions/transactions/:id/pay`

---

## 📌 Catatan Penting

- Backend service tidak dapat diakses langsung tanpa header `x-gateway-secret`
- API Gateway memvalidasi JWT dan RBAC
- Token JWT disimpan oleh Frontend (cookies/local storage)
- Cocok untuk:
  - Sistem pembayaran PNBP
  - Implementasi microservices
  - Proof of Concept arsitektur terdistribusi

---

## 📄 Lisensi

MIT License
