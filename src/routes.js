import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

const Home = React.lazy(() => import('./views/home/home'))

const Cards = React.lazy(() => import('./views/base/cards/Cards'))

// master

// Organisation
const addOrganisation = React.lazy(() => import('./views/master/rightfitOrg/addOrganistion'))
const listOrganisation = React.lazy(() => import('./views/master/rightfitOrg/organisationList'))

// Department
const addDepartment = React.lazy(() => import('./views/master/rightFitDept/addDepartment'))
const listDepartment = React.lazy(() => import('./views/master/rightFitDept/departmentList'))

// Org Depar
const departmentOrganisationList = React.lazy(() =>
  import('./views/master/departmentOrganisationList'),
)

// systemSetting
const systemSettingList = React.lazy(() =>
  import('./views/master/rightFitSystem/systemSettingList'),
)
const addSystemSetting = React.lazy(() => import('./views/master/rightFitSystem/addSystem'))
const routes = [
  { path: '/', exact: true, name: 'Home', element: Home },

  { path: '/dashboard', name: 'Dashboard', element: Dashboard },

  { path: '/base', name: 'Base', element: Cards, exact: true },

  { path: '/master', name: 'Master', element: addOrganisation, exact: true },
  { path: '/master/addOrganisation', name: 'Add Organisataion', element: addOrganisation },
  { path: '/master/listOrganisation', name: 'Organisation List', element: listOrganisation },

  { path: '/master/addDepartment', name: 'Add Department', element: addDepartment },
  { path: '/master/listDepartment', name: 'Department List', element: listDepartment },
  {
    path: '/master/departmentOrganisationList',
    name: 'Department List',
    element: departmentOrganisationList,
  },
  { path: '/master/systemSettingList', name: 'System Setting List', element: systemSettingList },
  { path: '/master/addSystemSetting', name: 'Add System Setting', element: addSystemSetting },
]

export default routes
