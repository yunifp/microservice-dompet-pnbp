const dotenv = require('dotenv');
dotenv.config();

const internalOnly = (req, res, next) => {
  const apiKey = req.headers['x-internal-key'];
  if (apiKey !== process.env.GATEWAY_SECRET) {
    return res.status(403).json({ message: 'Forbidden: Internal access only' });
  }
  next();
};

module.exports = { internalOnly };