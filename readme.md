# 💰 DOMPET PNBP  
## Microservices Payment Platform

Platform manajemen pembayaran elektronik berbasis **arsitektur microservices** untuk pengelolaan data **PNBP (Penerimaan Negara Bukan Pajak)**.  
Sistem dirancang modular, scalable, dan aman dengan pendekatan **One Service, One Database**.

---

## 🏗️ Arsitektur Sistem

- Menggunakan **API Gateway** sebagai **Single Entry Point**
- Setiap service memiliki **database terpisah**
- Komunikasi antar-service menggunakan **REST API**
- Keamanan internal menggunakan **Internal Gateway Header**
- Autentikasi dan otorisasi terpusat

---

## 🚀 Tech Stack

**Backend**
- Node.js
- Express.js

**ORM**
- Sequelize

**Database**
- MySQL

**Authentication & Security**
- JWT (JSON Web Token)
- Bcrypt Hashing
- Internal Gateway Header Validation

---

## 🧩 Daftar Service & Port

| Service | Port | Database | Deskripsi |
|------|------|---------|----------|
| API Gateway | 3000 | - | Routing, Authentication & RBAC Middleware |
| Auth Service | 3001 | db_auth_pnbp | Autentikasi & Profil User |
| RBAC Service | 3002 | db_rbac_pnbp | Manajemen User & Role (CRUD) |
| Master Service | 3003 | db_master_pnbp | Manajemen Produk |
| Transaction Service | 3004 | db_transaction_pnbp | Keranjang & Transaksi |

---

## ⚙️ Instalasi & Setup

### Langkah 1: Persiapan Database
Buat **4 database MySQL** sesuai tabel service:
- `db_auth_pnbp`
- `db_rbac_pnbp`
- `db_master_pnbp`
- `db_transaction_pnbp`

---

### Langkah 2: Instalasi Dependensi
Jalankan perintah berikut **di setiap folder service**:

```bash
npm install
```

Catatan:
- Pastikan package **jsonwebtoken** terinstall di folder **api-gateway**

---

### Langkah 3: Seeding Data
Isi data awal untuk testing (Admin, Pembeli, Produk):

```bash
# auth-service
node seed.js

# master-service
node seed.js

# rbac-service
node seed.js
```

---

### Langkah 4: Menjalankan Sistem
Jalankan perintah berikut di **5 terminal terpisah** (Gateway + 4 Services):

```bash
npm start
```

---

## 🧪 Panduan Testing (Postman)

⚠️ **Semua request HARUS melalui API Gateway**  
Base URL:
```
http://localhost:3000/api
```

---

### A. Alur Login (Mendapatkan Token)

**POST** `/auth/login`

```json
{
  "email": "andi@kemendagri.go.id",
  "password": "admin123"
}
```

Action:
- Salin token dari response
- Gunakan sebagai **Bearer Token** di header request selanjutnya

---

### B. Alur Manajemen (Admin Only)

**Lihat User**
```
GET /users/users
```

**Tambah Produk**
```
POST /products/products
```

```json
{
  "name": "Produk Baru",
  "harga": 2000
}
```

---

### C. Alur Transaksi (Pembeli Flow)

**Tambah ke Keranjang**
```
POST /transactions/cart/add
```

```json
{
  "pembeli_id": 2,
  "produk_id": 1
}
```

**Checkout**
```
POST /transactions/checkout
```

```json
{
  "pembeli_id": 2
}
```

Response:
- `kode_billing`
- `expired_at`

---

### D. Konfirmasi Pembayaran (Admin Flow)

**Konfirmasi Pembayaran**
```
PUT /transactions/transactions/:id/pay
```

Aksi:
- Mengubah status transaksi menjadi **SUDAH_DIBAYAR**

---

## 📌 Catatan

- Seluruh request wajib melewati API Gateway
- Internal service tidak dapat diakses langsung
- Sistem ini cocok untuk:
  - Platform pembayaran PNBP
  - Implementasi microservices skala kecil–menengah
  - Proof of Concept arsitektur terdistribusi

---

## 📄 Lisensi

MIT License
