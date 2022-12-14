import * as Yup from 'yup'
export const signUpSchema = Yup.object({
  name: Yup.string().min(2).max(25).required('Please enter your name'),
  email: Yup.string().email().required('Please enter your email'),
  password: Yup.string().min(6).required('Please enter your password'),
  confirm_password: Yup.string()
    .required()
    .oneOf([Yup.ref('password'), null], 'Password must match'),
})

export const validate = Yup.object().shape({
  firstName: Yup.string().min(2, 'Must be more then one character'),
  lastName: Yup.string().min(2, 'Must be more than 10 characters'),
  email: Yup.string().email('Please enter a vaild email').min(2, 'Must be more than 10 characters'),
  password: Yup.string().min(2, 'Must be more than 10 characters'),
  gender: Yup.string().min(2, 'Must be more than 10 characters').nullable(),
  // nationality: Yup.string().min(2, 'Must be more than 10 characters').nullable(),
  // birthDate: Yup.string().min(2, 'Must be more than 10 characters').nullable(),
  // isSeller: Yup.string().min(2, 'Must be more than 10 characters'),
})
