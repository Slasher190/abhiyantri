import * as Yup from 'yup'
export const signUpSchema = Yup.object({
  name: Yup.string().min(2).max(25).required('Please enter your name'),
  email: Yup.string().email().required('Please enter your email'),
  password: Yup.string().min(6).required('Please enter your password'),
  confirm_password: Yup.string()
    .required()
    .oneOf([Yup.ref('password'), null], 'Password must match'),
})
export const signInSchema = Yup.object({
  email: Yup.string().email().required('Please enter your email'),
  password: Yup.string().min(6).required('Please enter your password'),
})
export const validate = Yup.object().shape({
  firstName: Yup.string().min(2, 'Must be more then one character'),
  lastName: Yup.string().min(2, 'Must be more than 10 characters'),
  email: Yup.string().email('Please enter a vaild email').min(2, 'Must be more than 10 characters'),
  password: Yup.string().min(2, 'Must be more than 10 characters'),
  gender: Yup.string().min(2, 'Must be more than 10 characters').nullable(),
  nationality: Yup.string().min(2, 'Must be more than 10 characters').nullable(),
  birthDate: Yup.string().min(2, 'Must be more than 10 characters').nullable(),
  isSeller: Yup.string().min(2, 'Must be more than 10 characters'),
})
////////////////////////////////////////ORGANISATION///////////////////////////////////////////////
export const organisationMaster = Yup.object().shape({
  orgName: Yup.string()
    .min(3, 'Must be more then two character')
    .max(200, 'Must not be more than 200 characters')
    .required('Cannot Be Empty'),
  domain: Yup.string()
    .min(3, 'Must be more then two character')
    .max(500, 'Must not be more than 500 characters')
    .required('Cannot Be Empty'),
})
//////////////////////////////////////////////////////////////////////////////////////////////////

export const departmentMaster = Yup.object().shape({
  deptName: Yup.string()
    .min(3, 'Must be more then two character')
    .max(200, 'Must not be more than 200 characters')
    .required('Cannot Be Empty'),
})
