const bcrypt = require('bcrypt');
const sequelize = require('./src/config/database');
const { User, UserRole } = require('./src/models/Associations');

const seed = async () => {
  try {
    await sequelize.sync({ force: true });

    const hashedPassword = await bcrypt.hash('admin123', 10);

    const admin = await User.create({
      name: 'Administrator',
      email: 'admin@kemendagri.go.id',
      password: hashedPassword,
      status: true
    });

    await UserRole.create({
      user_id: admin.id,
      role: 'ADMIN'
    });

    const pembeliPassword = await bcrypt.hash('pembeli123', 10);
    const pembeli = await User.create({
      name: 'Andi Pratama',
      email: 'andi@kemendagri.go.id',
      password: pembeliPassword,
      status: true
    });

    await UserRole.create({
      user_id: pembeli.id,
      role: 'PEMBELI'
    });

    process.exit(0);
  } catch (error) {
    process.exit(1);
  }
};

seed();