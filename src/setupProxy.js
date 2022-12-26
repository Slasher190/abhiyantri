const { createProxyMiddleware } = require('http-proxy-middleware');
const BASE_ADDRESS = 'http://192.168.1.36:8890'
module.exports = function(app) {
  app.use(
    '/rightFitLogin/validateLogin',
    createProxyMiddleware({
      target: BASE_ADDRESS,
      changeOrigin: true,
    })
  );
  app.use(
    '/rightFitPlan/getPlanListLOV',
    createProxyMiddleware({
      target: BASE_ADDRESS,
      changeOrigin: true,
    })
  );
  app.use(
    '/rightFitOrg/saveOrgMaster',
    createProxyMiddleware({
      target: BASE_ADDRESS,
      changeOrigin: true,
    })
  );
  app.use(
    '/rightFitOrg/getOrgMasterList',
    createProxyMiddleware({
      target: BASE_ADDRESS,
      changeOrigin: true,
    })
  );
  app.use(
    'rightFitOrg/getOrgMasterDetail',
    createProxyMiddleware({
      target: BASE_ADDRESS,
      changeOrigin: true,
    })
  );
  app.use(
    '/rightFitDept/saveDeptMaster',
    createProxyMiddleware({
      target: BASE_ADDRESS,
      changeOrigin: true,
    })
  );
  app.use(
    '/rightFitDept/getDeptMasterDetail',
    createProxyMiddleware({
      target: BASE_ADDRESS,
      changeOrigin: true,
    })
  );
  app.use(
    'rightFitDept/getDeptMasterList',
    createProxyMiddleware({
      target: BASE_ADDRESS,
      changeOrigin: true,
    })
  );
};