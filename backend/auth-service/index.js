const app = require('./src/app');
const sequelize = require('./src/config/database');
require('./src/models/Associations');
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 3001;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Auth Service running professionally on port ${PORT}`);
  });
});