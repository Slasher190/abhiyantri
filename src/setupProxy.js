const { createProxyMiddleware } = require('http-proxy-middleware')
const BASE_ADDRESS = 'http://localhost:8890'
module.exports = function (app) {
  app.use(
    '/rightFitLogin/validateLogin',
    createProxyMiddleware({
      target: BASE_ADDRESS,
      changeOrigin: true,
    }),
  )
  app.use(
    '/rightFitPlan/getPlanListLOV',
    createProxyMiddleware({
      target: BASE_ADDRESS,
      changeOrigin: true,
    }),
  )
  app.use(
    '/rightFitOrg/saveOrgMaster',
    createProxyMiddleware({
      target: BASE_ADDRESS,
      changeOrigin: true,
    }),
  )
  app.use(
    '/rightFitOrg/getOrgMasterList',
    createProxyMiddleware({
      target: BASE_ADDRESS,
      changeOrigin: true,
    }),
  )
  app.use(
    '/rightFitOrg/getOrgMasterDetail',
    createProxyMiddleware({
      target: BASE_ADDRESS,
      changeOrigin: true,
    }),
  )
  app.use(
    '/rightFitDept/saveDeptMaster',
    createProxyMiddleware({
      target: BASE_ADDRESS,
      changeOrigin: true,
    }),
  )
  app.use(
    '/rightFitDept/getDeptMasterDetail',
    createProxyMiddleware({
      target: BASE_ADDRESS,
      changeOrigin: true,
    }),
  )
  app.use(
    '/rightFitDept/getDeptMasterList',
    createProxyMiddleware({
      target: BASE_ADDRESS,
      changeOrigin: true,
    }),
  )
  app.use(
    '/rightFitDept/getDeptMasterListByOrg',
    createProxyMiddleware({
      target: BASE_ADDRESS,
      changeOrigin: true,
    }),
  )
  //
  app.use(
    '/rightFitSystem/getSystemSettingList',
    createProxyMiddleware({
      target: BASE_ADDRESS,
      changeOrigin: true,
    }),
  )
  app.use(
    '/rightFitSystem/saveSystemSetting',
    createProxyMiddleware({
      target: BASE_ADDRESS,
      changeOrigin: true,
    }),
  )
  app.use(
    '/rightFitSystem/getSystemSettingDetail',
    createProxyMiddleware({
      target: BASE_ADDRESS,
      changeOrigin: true,
    }),
  )
  //
  app.use(
    '/rightFitRef/saveRefCodeMas',
    createProxyMiddleware({
      target: BASE_ADDRESS,
      changeOrigin: true,
    }),
  )
  app.use(
    'rightFitRef/getRefCodeDetail',
    createProxyMiddleware({
      target: BASE_ADDRESS,
      changeOrigin: true,
    }),
  )
  app.use(
    '/rightFitRef/getRefCodeMasListByOrg',
    createProxyMiddleware({
      target: BASE_ADDRESS,
      changeOrigin: true,
    }),
  )
  //
  app.use(
    '/rightFitRole/saveRoleMaster',
    createProxyMiddleware({
      target: BASE_ADDRESS,
      changeOrigin: true,
    }),
  )
  app.use(
    '/rightFitRole/getRoleDetail',
    createProxyMiddleware({
      target: BASE_ADDRESS,
      changeOrigin: true,
    }),
  )
  app.use(
    '/rightFitRole/getRoleDataByOrg',
    createProxyMiddleware({
      target: BASE_ADDRESS,
      changeOrigin: true,
    }),
  )
  //
  app.use(
    '/rightFitPlan/savePlanMaster',
    createProxyMiddleware({
      target: BASE_ADDRESS,
      changeOrigin: true,
    }),
  )
  app.use(
    '/rightFitPlan/getPlanMasterDetail',
    createProxyMiddleware({
      target: BASE_ADDRESS,
      changeOrigin: true,
    }),
  )
  app.use(
    '/rightFitPlan/getPlanMasterList',
    createProxyMiddleware({
      target: BASE_ADDRESS,
      changeOrigin: true,
    }),
  )
}
