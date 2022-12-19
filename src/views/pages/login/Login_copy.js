import '../../../scss/loginForm.scss'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
// import {
//   CButton,
//   CCard,
//   CCardBody,
//   CCardGroup,
//   CCol,
//   CContainer,
//   CForm,
//   CFormInput,
//   CInputGroup,
//   CInputGroupText,
//   CRow,
// } from '@coreui/react'
import CIcon from '@coreui/icons-react'
// import { Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { useForm, Controller } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
// import { values } from 'core-js/core/array'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { signUpSchema, signInSchema } from '../../../../src/constants/schemaValidation'
import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'

const initialValuesRegister = {
  email: '',
  password: '',
  name: '',
  username: '',
  confirm_password: '',
}
const initialValuesSignIn = {
  email: '',
  password: '',
}
const test = {
  email: 'sudhigupta190@gmail.com',
  password: 'abhi@123',
}
// const Login = () => {
//   return (
//     <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
//       <CContainer>
//         <CRow className="justify-content-center">
//           <CCol md={8}>
//             <CCardGroup>
//               <CCard className="p-4">
//                 <CCardBody>
//                   <CForm>
//                     <h1>Login</h1>
//                     <p className="text-medium-emphasis">Sign In to your account</p>
//                     <CInputGroup className="mb-3">
//                       <CInputGroupText>
//                         <CIcon icon={cilUser} />
//                       </CInputGroupText>
//                       <CFormInput placeholder="Username" autoComplete="username" />
//                     </CInputGroup>
//                     <CInputGroup className="mb-4">
//                       <CInputGroupText>
//                         <CIcon icon={cilLockLocked} />
//                       </CInputGroupText>
//                       <CFormInput
//                         type="password"
//                         placeholder="Password"
//                         autoComplete="current-password"
//                       />
//                     </CInputGroup>
//                     <CRow>
//                       <CCol xs={6}>
//                         <CButton color="primary" className="px-4">
//                           Login
//                         </CButton>
//                       </CCol>
//                       <CCol xs={6} className="text-right">
//                         <CButton color="link" className="px-0">
//                           Forgot password?
//                         </CButton>
//                       </CCol>
//                     </CRow>
//                   </CForm>
//                 </CCardBody>
//               </CCard>
//               <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
//                 <CCardBody className="text-center">
//                   <div>
//                     <h2>Sign up</h2>
//                     <p>
//                       Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
//                       tempor incididunt ut labore et dolore magna aliqua.
//                     </p>
//                     <Link to="/register">
//                       <CButton color="primary" className="mt-3" active tabIndex={-1}>
//                         Register Now!
//                       </CButton>
//                     </Link>
//                   </div>
//                 </CCardBody>
//               </CCard>
//             </CCardGroup>
//           </CCol>
//         </CRow>
//       </CContainer>
//     </div>
//   )
// }

const Login = () => {
  const dispatch = useDispatch()
  // const { email, password, username, name } = useSelector((state) => state.custom)
  // const { handleSubmit, reset, control, register } = useForm({
  //   defaultValue,
  //   resolver: yupResolver(validate),
  // })
  const [signIn, setSignIn] = useState(false)
  const [curr, setCurr] = useState(false)
  const Email = useSelector((state) => state.email)
  const [currStatus, setCurrStatus] = useState('')
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: !curr ? initialValuesSignIn : initialValuesRegister,
    validationSchema: !curr ? signInSchema : signUpSchema,
    onSubmit: (values, action) => {
      if (values.email === test.email && values.password === test.password && !curr) {
        // setValue(values)
        handleSubmission(values)
      } else {
        setSignIn(false)
      }
      // console.log(values)

      if (curr) {
        // setValue(values)
        handleSubmission(values)
        action.resetForm()
      } else {
        // setValue(false)
      }
    },
  })
  const handleSubmissionUser = (data) => {
    // setValue(data)
    // console.log(data)
    data.preventDefault()
    if (data.email === test.email && data.password === test.password) {
      // setValue(true)
      dispatch({
        type: 'userAuth',
        email: data.email,
      })
      dispatch({
        type: 'userAuth',
        password: data.password,
      })
      dispatch({
        type: 'userAuth',
        isAuthenticated: true,
      })
    } else {
    }
  }
  const handleSubmissionRegister = (data) => {
    // setValue(data)
    data.preventDefault()
    dispatch({
      type: 'register',
      username: data.username,
    })
    dispatch({
      type: 'register',
      email: data.email,
    })
    dispatch({
      type: 'register',
      password: data.password,
    })
    dispatch({
      type: 'register',
      name: data.name,
    })
  }

  const handleSubmission = (data) => {
    // setData(data)
    // console.log('kbjdfkasjgduigh ......')
    data.preventDefault()
    if (currStatus === 'SignIn') {
      handleSubmissionUser(data)
    } else if (currStatus === 'Register') {
      handleSubmissionRegister(data)
    }
  }
  const handleClick = () => {
    setCurr(!curr)
    //login = false
    //signup = true
  }
  // console.log(value, 'kshdgfkgh', currStatus, Email)
  console.log(curr, ' swipe ')
  return (
    <form onSubmit={() => handleSubmit()} className="form">
      <div className="section">
        <div className="container">
          <div className="row full-height justify-content-center">
            <div className="col-12 text-center align-self-center py-5">
              <div className="section pb-5 pt-5 pt-sm-2 text-center">
                <h6 className="mb-0 pb-3">
                  <span>Log In </span>
                  <span>Sign Up</span>
                </h6>
                <input
                  className="checkbox"
                  type="checkbox"
                  id="reg-log"
                  name="reg-log"
                  onChange={() => handleClick()}
                />
                <label htmlFor="reg-log"></label>
                <div className="card-3d-wrap mx-auto">
                  <div className="card-3d-wrapper">
                    <div className="card-front">
                      <div className="center-wrap">
                        <div className="section text-center">
                          <h4 className="mb-4 pb-3">Log In</h4>
                          <div className="form-group">
                            <input
                              type="email"
                              name="email"
                              className="form-style"
                              placeholder="Your Email"
                              id="logemail"
                              autoComplete="off"
                              value={values.email}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            {errors.email && touched.email ? (
                              <p className="form-error">*{errors.email}</p>
                            ) : null}

                            <i className="input-icon uil uil-at"></i>
                          </div>
                          <div className="form-group mt-2">
                            <input
                              type="password"
                              name="password"
                              className="form-style"
                              placeholder="Your Password"
                              id="logpass"
                              autoComplete="off"
                              value={values.password}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            {errors.password && touched.password ? (
                              <p className="form-error">*{errors.password}</p>
                            ) : null}

                            <i className="input-icon uil uil-lock-alt"></i>
                          </div>
                          <button
                            href="/dashboard"
                            type="submit"
                            className="btn mt-4"
                            onClick={() => setCurrStatus('SignIn')}
                          >
                            submit
                          </button>
                          <p className="mb-0 mt-4 text-center">
                            <a href="#0" className="link">
                              Forgot your password?
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="card-back">
                      <div className="center-wrap">
                        <div className="section text-center">
                          <h4 className="mb-4 pb-3">Sign Up</h4>
                          <div className="form-group">
                            <input
                              type="text"
                              name="name"
                              className="form-style"
                              placeholder="Your Full Name"
                              id="logname"
                              autoComplete="off"
                              value={values.name}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            {errors.name && touched.name ? (
                              <p className="form-error">*{errors.name}</p>
                            ) : null}

                            <i className="input-icon uil uil-user"></i>
                          </div>
                          <div className="form-group mt-2">
                            <input
                              type="email"
                              name="email"
                              className="form-style"
                              placeholder="Your Email"
                              id="logemail"
                              autoComplete="off"
                              value={values.email}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            {errors.email && touched.email ? (
                              <p className="form-error">*{errors.email}</p>
                            ) : null}

                            <i className="input-icon uil uil-at"></i>
                          </div>
                          <div className="form-group mt-2">
                            <input
                              type="password"
                              name="password"
                              className="form-style"
                              placeholder="Your Password"
                              id="logpass"
                              autoComplete="off"
                              value={values.password}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            {errors.password && touched.password ? (
                              <p className="form-error">*{errors.password}</p>
                            ) : null}
                            <i className="input-icon uil uil-lock-alt"></i>
                          </div>
                          <div className="form-group mt-2">
                            <input
                              type="password"
                              name="confirm_password"
                              className="form-style"
                              placeholder="confirm_password"
                              id="logpass"
                              autoComplete="off"
                              value={values.confirm_password}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            {errors.confirm_password && touched.confirm_password ? (
                              <p className="form-error">*{errors.confirm_password}</p>
                            ) : null}
                            <i className="input-icon uil uil-lock-alt"></i>
                          </div>
                          <button
                            // href="#"
                            className="btn mt-4"
                            type="submit"
                            onClick={() => setCurrStatus('Register')}
                          >
                            submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}

export default Login
