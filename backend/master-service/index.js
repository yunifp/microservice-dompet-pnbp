const app = require('./src/app');
const sequelize = require('./src/config/database');
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 3003;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Master Service running on port ${PORT}`);
  });
});