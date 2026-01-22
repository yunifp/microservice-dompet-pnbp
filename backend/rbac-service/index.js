const app = require('./src/app');
const sequelize = require('./src/config/database');
require('./src/models/Associations');
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 3002;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`RBAC Service running on port ${PORT}`);
  });
});