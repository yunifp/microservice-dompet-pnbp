const sequelize = require('./src/config/database');
const Product = require('./src/models/Product');

const seed = async () => {
  try {
    await sequelize.sync({ force: true });

    await Product.bulkCreate([
      {
        name: 'Pemadanan Data & Dokumen Kependudukan',
        harga: 5000.00
      },
      {
        name: 'Verifikasi Data Kependudukan Berbasis Web',
        harga: 3500.00
      },
      {
        name: 'Buku Cetakan Data Agregat Penduduk',
        harga: 10000.00
      }
    ]);

    process.exit(0);
  } catch (error) {
    process.exit(1);
  }
};

seed();