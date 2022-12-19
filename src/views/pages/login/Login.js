import React, { useState } from 'react'
import styled from 'styled-components'
// import { GlobalStyle } from './Styles/globalStyles'
import { useFormik } from 'formik'
import { signInSchema } from 'src/constants/schemaValidation'
import Wrapper from 'src/scss/_registration'
import { GlobalStyle } from 'src/scss/formStyle'
import { useDispatch, useSelector } from 'react-redux'

const initialValues = {
  email: '',
  password: '',
}
const test = {
  email: 'sudhigupta190@gmail.com',
  password: 'abhi@123',
}
const Registration = () => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)
  // const { email, password, isAuthenticated } = useSelector((state) => state.userAuth)
  const Email = useSelector((state) => state.email)
  const IsAuthenticated = useSelector((state) => state.isAuthenticated)
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: signInSchema,
    onSubmit: (values, action) => {
      // console.log('hello here the value', values)
      handleSubmissionUser(values)
      action.resetForm()
    },
  })
  // console.log('🚀 ~ file: Registration.jsx ~ line 25 ~ Registration ~ errors', errors)
  const handleSubmissionUser = (data) => {
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
      dispatch({
        type: 'userAuth',
        email: '',
      })
      dispatch({
        type: 'userAuth',
        password: '',
      })
      dispatch({
        type: 'userAuth',
        isAuthenticated: false,
      })
    }
    data.preventDefault()
  }
  console.log(Email, IsAuthenticated, 'ans')
  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <div className="container">
          <div className="modal">
            <div className="modal-container">
              <div className="modal-left">
                <h1 className="modal-title">Welcome!</h1>
                <p className="modal-desc">Login Here </p>
                <form onSubmit={handleSubmit}>
                  <div className="input-block">
                    <label htmlFor="email" className="input-label">
                      Email
                    </label>
                    <input
                      type="email"
                      autoComplete="off"
                      name="email"
                      id="email"
                      placeholder="Email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.email && touched.email ? (
                      <p className="form-error">*{errors.email}</p>
                    ) : null}
                  </div>
                  <div className="input-block">
                    <label htmlFor="password" className="input-label">
                      Password
                    </label>
                    <input
                      type="password"
                      autoComplete="off"
                      name="password"
                      id="password"
                      placeholder="Password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.password && touched.password ? (
                      <p className="form-error">*{errors.password}</p>
                    ) : null}
                  </div>
                  <div className="modal-buttons">
                    <a href="#" className="">
                      Want to register using Gmail?
                    </a>
                    <button className="input-button" type="submit">
                      Sign In
                    </button>
                  </div>
                </form>
                <p className="sign-up">
                  Do not have an account? <a href="#/register">Sign Up now</a>
                </p>
              </div>
              <div className="modal-right">
                <img
                  src="https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=dfd2ec5a01006fd8c4d7592a381d3776&auto=format&fit=crop&w=1000&q=80"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  )
}
export default Registration
