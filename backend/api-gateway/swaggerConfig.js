const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'DOMPET PNBP API Documentation',
    version: '1.0.0',
    description: 'Dokumentasi API Terpusat untuk Microservices DOMPET PNBP'
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'API Gateway Server'
    }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    }
  },
  paths: {
    '/api/auth/login': {
      post: {
        tags: ['Auth'],
        summary: 'Login User',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  email: { type: 'string' },
                  password: { type: 'string' }
                }
              }
            }
          }
        },
        responses: {
          200: { description: 'Login Berhasil' }
        }
      }
    },
    '/api/users/users': {
      get: {
        tags: ['RBAC'],
        summary: 'Ambil Semua Data User (Admin Only)',
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: 'Daftar User Berhasil Diambil' }
        }
      }
    },
    '/api/products/products': {
      get: {
        tags: ['Master Service'],
        summary: 'Ambil Semua Produk',
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: 'Daftar Produk Berhasil Diambil' }
        }
      }
    },
    '/api/transactions/checkout': {
      post: {
        tags: ['Transaction Service'],
        summary: 'Checkout Keranjang (Generate Billing)',
        security: [{ bearerAuth: [] }],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  pembeli_id: { type: 'integer' }
                }
              }
            }
          }
        },
        responses: {
          200: { description: 'Billing Berhasil Dibuat' }
        }
      }
    }
  }
};

module.exports = swaggerDocument;