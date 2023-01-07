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
    .required('Cannot be Empty'),
  domain: Yup.string()
    .min(3, 'Must be more then two character')
    .max(500, 'Must not be more than 500 characters')
    .required('Cannot be Empty'),
})
//////////////////////////////////////////////////////////////////////////////////////////////////

export const departmentMaster = Yup.object().shape({
  deptName: Yup.string()
    .min(3, 'Must be more then two character')
    .max(200, 'Must not be more than 200 characters')
    .required('Cannot be Empty'),
})

//////////////////////////////////////////////////////////////////////////////////////////////////

export const systemMaster = Yup.object().shape({
  companyName: Yup.string()
    .min(3, 'Must be more then two character')
    .max(200, 'Must not be more than 200 characters')
    .required('Cannot be Empty'),
  smtpUserName: Yup.string().email().required('Please enter your SMTP username'),
  smtpPort: Yup.number().required('Please enter your SMTP PORT'),
  emailFrom: Yup.string().email().required('Please enter your email'),
  smtpPassword: Yup.string()
    .min(6, 'Must be more then two character')
    .max(200, 'Must not be more than 200 characters')
    .required('Cannot be Empty'),
  smsSender: Yup.string().required('Please fill your sender address'),
  smtpHost: Yup.string().required('Cannot be empty'),
})

export const planName = Yup.object().shape({
  planName: Yup.string()
    .min(3, 'Must be more then two character')
    .max(200, 'Must not be more than 200 characters')
    .required('Cannot be Empty'),
})

export const roleMaster = Yup.object().shape({
  roleName: Yup.string()
    .min(3, 'Must be more then two character')
    .max(200, 'Must not be more than 200 characters')
    .required('Cannot be Empty'),
})

export const refMaster = Yup.object().shape({
  orgName: Yup.string()
    .min(3, 'Must be more then two character')
    .max(200, 'Must not be more than 200 characters')
    .required('Cannot be Empty'),
  refVal1: Yup.string()
    .min(3, 'Must be more then two character')
    .max(200, 'Must not be more than 200 characters')
    .required('Cannot be Empty'),
  refVal2: Yup.string()
    .min(3, 'Must be more then two character')
    .max(200, 'Must not be more than 200 characters')
    .required('Cannot be Empty'),
  refDesc: Yup.string()
    .min(3, 'Must be more then two character')
    .max(200, 'Must not be more than 200 characters')
    .required('Cannot be Empty'),
  refType: Yup.string()
    .min(3, 'Must be more then two character')
    .max(200, 'Must not be more than 200 characters')
    .required('Cannot be Empty'),
})

export const refMasterUpdate = Yup.object().shape({
  orgName: Yup.string()
    .min(3, 'Must be more then two character')
    .max(200, 'Must not be more than 200 characters')
    .required('Cannot be Empty'),
  refVal1: Yup.string()
    .min(3, 'Must be more then two character')
    .max(200, 'Must not be more than 200 characters')
    .required('Cannot be Empty'),
  refVal2: Yup.string()
    .min(3, 'Must be more then two character')
    .max(200, 'Must not be more than 200 characters')
    .required('Cannot be Empty'),
  refDesc: Yup.string()
    .min(3, 'Must be more then two character')
    .max(200, 'Must not be more than 200 characters')
    .required('Cannot be Empty'),
  refType: Yup.string()
    .min(3, 'Must be more then two character')
    .max(200, 'Must not be more than 200 characters')
    .required('Cannot be Empty'),
  refOrder: Yup.number()
    .min(1, 'Must be greater or equal to 1')
    .max(999, 'Must be less or equal to 999')
    .required('Please enter the Reference order number'),
})
export const superRefMasterUpdate = Yup.object().shape({
  refVal1: Yup.string()
    .min(3, 'Must be more then two character')
    .max(200, 'Must not be more than 200 characters')
    .required('Cannot be Empty'),
  refVal2: Yup.string()
    .min(3, 'Must be more then two character')
    .max(200, 'Must not be more than 200 characters')
    .required('Cannot be Empty'),
  refDesc: Yup.string()
    .min(3, 'Must be more then two character')
    .max(200, 'Must not be more than 200 characters')
    .required('Cannot be Empty'),
  refType: Yup.string()
    .min(3, 'Must be more then two character')
    .max(200, 'Must not be more than 200 characters')
    .required('Cannot be Empty'),
  refOrder: Yup.number()
    .min(1, 'Must be greater or equal to 1')
    .max(999, 'Must be less or equal to 999')
    .required('Please enter the Reference order number'),
})
export const planFunctionalities = Yup.object().shape({
  noOfUser: Yup.number()
    .min(1, 'Must be greater or equal to 1')
    .max(999, 'Must be less or equal to 999')
    .required('Please provide valid information .'),
  noOfLeadPage: Yup.number()
    .min(1, 'Must be greater or equal to 1')
    .max(999, 'Must be less or equal to 999')
    .required('Please provide valid information .'),
  leadType: Yup.string()
    .min(3, 'Must be more then two character')
    .max(200, 'Must not be more than 200 characters')
    .required('Cannot be Empty'),
})

// initialValues: {
//   functiponId: '0',
//   planId: props.planId,
//   noOfUser: '',
//   noOfLeadPage: '',
//   leadType: '',
// },
// {
//   "refType": "Authorization Label",
//   "refVal1": "label 2",
//   "refVal2": null,
//   "refDesc": "for authorization labels",
//   "orgId": "1",
//   "orgName": null,
// }
