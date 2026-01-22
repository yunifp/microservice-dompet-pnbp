const app = require('./src/app');
const sequelize = require('./src/config/database');
require('./src/models/Associations');
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 3004;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Transaction Service running on port ${PORT}`);
  });
});