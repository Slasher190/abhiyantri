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
import { cilLockLocked, cilUser } from '@coreui/icons'
import { useForm, Controller } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
// import { values } from 'core-js/core/array'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { signUpSchema } from '../../../../src/constants/schemaValidation'
const defaultValue = {
  email: '',
  password: '',
  name: '',
  username: '',
  confirm_password: '',
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
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: defaultValue,
    validationSchema: signUpSchema,
    onSubmit: (values, action) => {
      // console.log('🚀 ~ file: Registration.jsx ~ line 11 ~ Registration ~ values', values)
      action.resetForm()
    },
  })
  // console.log('🚀 ~ file: Registration.jsx ~ line 25 ~ Registration ~ errors', errors)
  const [value, setValue] = useState({})
  const Email = useSelector((state) => state.email)
  const [currStatus, setCurrStatus] = useState('')
  const handleSubmissionUser = (data) => {
    setValue(data)
    dispatch({
      type: 'userAuth',
      email: data.email,
    })
    dispatch({
      type: 'userAuth',
      password: data.password,
    })
  }
  const handleSubmissionRegister = (data) => {
    setValue(data)
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
    if (currStatus === 'SignIn') {
      handleSubmissionUser(data)
    } else if (currStatus === 'Register') {
      handleSubmissionRegister(data)
    }
  }
  console.log(value, 'kshdgfkgh', currStatus)
  return (
    <form onSubmit={(data) => handleSubmit(setValue(data))} className="form">
      <div className="section">
        <div className="container">
          <div className="row full-height justify-content-center">
            <div className="col-12 text-center align-self-center py-5">
              <div className="section pb-5 pt-5 pt-sm-2 text-center">
                <h6 className="mb-0 pb-3">
                  <span>Log In </span>
                  <span>Sign Up</span>
                </h6>
                <input className="checkbox" type="checkbox" id="reg-log" name="reg-log" />
                <label htmlFor="reg-log"></label>
                <div className="card-3d-wrap mx-auto">
                  <div className="card-3d-wrapper">
                    <div className="card-front">
                      <div className="center-wrap">
                        <div className="section text-center">
                          <h4 className="mb-4 pb-3">Log In</h4>
                          <div className="form-group">
                            {/* <Controller
                              control={control}
                              name="email"
                              render={({ field }) => (
                                <input
                                  type="email"
                                  name="logemail"
                                  className="form-style"
                                  placeholder="Your Email"
                                  id="logemail"
                                  autoComplete="off"
                                  {...field}
                                />
                              )}
                            /> */}
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
                              onBlur={() => handleBlur}
                            />

                            <i className="input-icon uil uil-lock-alt"></i>
                          </div>
                          <button
                            href="/"
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
                              onBlur={() => handleBlur}
                            />

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
                              onBlur={() => handleBlur}
                            />

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
                              onBlur={() => handleBlur}
                            />
                            <i className="input-icon uil uil-lock-alt"></i>
                          </div>
                          <button
                            href="#"
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
