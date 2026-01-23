const express = require('express');
const proxy = require('express-http-proxy');
const dotenv = require('dotenv');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swaggerConfig');
const { authMiddleware, rbacMiddleware } = require('./middleware');

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());

const addInternalHeader = (proxyReqOpts) => {
  proxyReqOpts.headers['X-INTERNAL-KEY'] = process.env.GATEWAY_SECRET;
  return proxyReqOpts;
};

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/auth', proxy(process.env.AUTH_SERVICE_URL, {
  proxyReqOptDecorator: addInternalHeader
}));

app.use('/api/users', authMiddleware, rbacMiddleware('ADMIN'), proxy(process.env.RBAC_SERVICE_URL, {
  proxyReqOptDecorator: addInternalHeader
}));

app.use('/api/products', (req, res, next) => {
  if (req.method === 'GET') {
    return authMiddleware(req, res, next);
  }
  return authMiddleware(req, res, () => rbacMiddleware('ADMIN')(req, res, next));
}, proxy(process.env.MASTER_SERVICE_URL, {
  proxyReqOptDecorator: addInternalHeader,
  proxyReqPathResolver: (req) => {
    return '/products' + require('url').parse(req.url).path;
  }
}));

app.use('/api/transactions', authMiddleware, proxy(process.env.TRANSACTION_SERVICE_URL, {
  proxyReqOptDecorator: addInternalHeader
}));

app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});