const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/rightFitLogin/validateLogin',
    createProxyMiddleware({
      target: 'http://192.168.1.36:8890',
      changeOrigin: true,
    })
  );
  app.use(
    '/rightFitPlan/getPlanListLOV',
    createProxyMiddleware({
      target: 'http://192.168.1.36:8890',
      changeOrigin: true,
    })
  );
  app.use(
    '/rightFitOrg/saveOrgMaster',
    createProxyMiddleware({
      target: 'http://192.168.1.36:8890',
      changeOrigin: true,
    })
  );
  app.use(
    '/rightFitOrg/getOrgMasterList',
    createProxyMiddleware({
      target: 'http://192.168.1.36:8890',
      changeOrigin: true,
    })
  );
};