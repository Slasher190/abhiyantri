const BASE_ADDRESS = 'http://192.168.1.40:8890'

//login
export const LOGIN = `${BASE_ADDRESS}/rightFitLogin/validateLogin`

//Organisation
export const saveOrgMaster = `${BASE_ADDRESS}/rightFitOrg/saveOrgMaster`
export const getOrgMasterList = `${BASE_ADDRESS}/rightFitOrg/getOrgMasterList`
export const getOrgMasterDetail = `${BASE_ADDRESS}/rightFitOrg/getOrgMasterDetail`
export const getDeptMasterListByOrg = `${BASE_ADDRESS}/rightFitDept/getDeptMasterListByOrg`
export const getPlanListLOV = `${BASE_ADDRESS}/rightFitPlan/getPlanListLOV`

//Department
export const getDeptMasterList = `${BASE_ADDRESS}/rightFitDept/getDeptMasterList`
export const getDeptMasterDetail = `${BASE_ADDRESS}/rightFitDept/getDeptMasterDetail`
export const saveDeptMaster = `${BASE_ADDRESS}/rightFitDept/saveDeptMaster`

//System Setting
export const getSystemSettingList = `${BASE_ADDRESS}/rightFitSystem/getSystemSettingList`
export const getSystemSettingDetail = `${BASE_ADDRESS}/rightFitSystem/getSystemSettingDetail`
export const saveSystemSetting = `${BASE_ADDRESS}/rightFitSystem/saveSystemSetting`

//Reference Code
export const getRefCodeDetail = `${BASE_ADDRESS}/rightFitRef/getRefCodeDetail`
export const saveRefCodeMas = `${BASE_ADDRESS}/rightFitRef/saveRefCodeMas`
export const getRefCodeMasListByOrg = `${BASE_ADDRESS}/rightFitRef/getRefCodeMasListByOrg`

//Role
export const getRoleDataByOrg = `${BASE_ADDRESS}/rightFitRole/getRoleDataByOrg`
export const getRoleDetail = `${BASE_ADDRESS}/rightFitRole/getRoleDetail`

//Plan Master
export const getPlanMasterList = `${BASE_ADDRESS}/rightFitPlan/getPlanMasterList`
export const getPlanMasterDetail = `${BASE_ADDRESS}/rightFitPlan/getPlanMasterDetail`
