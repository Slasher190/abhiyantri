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

//Plan
const listPlan = React.lazy(() => import('./views/master/rightFitPlan/planList'))
const addPlan = React.lazy(() => import('./views/master/rightFitPlan/addPlan'))

//Ref
const listRef = React.lazy(() => import('./views/master/rightFitRef/refList'))
const addRef = React.lazy(() => import('./views/master/rightFitRef/addRef'))
const superRefList = React.lazy(() => import('./views/master/rightFitRef/superRefList'))

//Role
const listRole = React.lazy(() => import('./views/master/rightFitRole/roleList'))
const addRole = React.lazy(() => import('./views/master/rightFitRole/addRole'))

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

  { path: '/master/listPlan', name: 'Plan List', element: listPlan },
  { path: '/master/addPlan', name: 'Add Plan', element: addPlan },

  { path: '/master/listRef', name: 'Ref List', element: listRef },
  { path: '/master/superListRef', name: 'Ref List', element: superRefList },
  { path: '/master/addRef', name: 'Add Ref', element: addRef },

  { path: '/master/addRole', name: 'Add Role', element: addRole },
  { path: '/master/listRole', name: 'Role List', element: listRole },
]

export default routes
