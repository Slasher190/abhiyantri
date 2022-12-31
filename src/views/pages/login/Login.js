import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
// import { GlobalStyle } from './Styles/globalStyles'
import { useFormik } from 'formik'
import { signInSchema } from 'src/constants/schemaValidation'
import Wrapper from 'src/scss/_registration'
import { GlobalStyle } from 'src/scss/formStyle'
import { useDispatch, useSelector } from 'react-redux'
// import axios from 'axios'
import { CAlert } from '@coreui/react'
// import axios from 'axios'
import axios from 'src/api/axios'
import { Link } from 'react-router-dom'
// import Loader from 'src/constants/loader/loader'
import Loader from 'src/constants/loader'
import Button from 'src/constants/button'

const initialValues = {
  email: '',
  password: '',
}
const Registration = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [responsed, setRespond] = useState(null)
  const [error1, setError1] = useState('')
  const [user, setUser] = useState('')
  const sidebarShow = useSelector((state) => state.sidebarShow)
  const username = useSelector((state) => state.userName)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: signInSchema,
    onSubmit: (values, action) => {
      // setLoading(true)
      LoginRequest(values)
    },
  })
  const LoginRequest = async (login) => {
    console.log(login, ' credential')
    try {
      setLoading(true)
      const response = await axios.post(
        `/rightFitLogin/validateLogin?username=${login.email}&password=${login.password}`,
      )
      setRespond(response?.data)
      handleSubmissionUser(response.data)
      console.log(responsed, ' ...data')
    } catch (error) {
      console.log(`hello its ${error}`)
    }
  }
  const handleSubmissionUser = (data) => {
    if (data?.reqResponse === 'FAIL') {
      setError1(data?.reqMessage)
      setUser('')
      console.log(error1)
      setIsAuthenticated(false)
    } else {
      setError1('')
      setUser(data?.userName)
      setIsAuthenticated(true)
      dispatch({
        type: 'userAuth',
        userId: data?.userId,
      })
      dispatch({
        type: 'userAuth',
        userName: data?.userName,
      })
      dispatch({
        type: 'userAuth',
        loginId: data?.loginId,
      })
      dispatch({
        type: 'userAuth',
        roleId: data?.roleId,
      })
      dispatch({
        type: 'userAuth',
        roleName: data?.roleName,
      })
      dispatch({
        type: 'userAuth',
        orgId: data?.orgId,
      })
      dispatch({
        type: 'userAuth',
        orgName: data?.orgName,
      })
      dispatch({
        type: 'userAuth',
        accessToken: data?.accessToken,
      })
      dispatch({
        type: 'userAuth',
        isAuthenticated: true,
      })
      setLoading(false)
      navigate('/')
    }
    // setValue(true)
    // data.preventDefault()
  }
  useEffect(() => {}, [isAuthenticated])
  // <CAlert color="success">A simple success alert—check it out!</CAlert>
  // <CAlert color="danger">A simple danger alert—check it out!</CAlert>
  console.log(isAuthenticated, 'ans')
  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <div className="container">
          <div className="modal">
            <div className="modal-container">
              <div className="modal-left">
                <h1 className=" primeryColor">Welcome!</h1>
                {/* I romoved modal-title */}
                {/* <CAlert color="danger">{error1}</CAlert> */}
                {error1.length > 1 ? (
                  <CAlert color="danger" dismissible>
                    {error1}
                  </CAlert>
                ) : null}
                {user.length > 1 ? (
                  <CAlert color="success" dismissible>
                    Welcome {user} !
                  </CAlert>
                ) : null}

                <p className="modal-desc ">Login Here </p>
                <form onSubmit={handleSubmit}>
                  <div className="input-block">
                    <label htmlFor="email" className=" primeryColor email">
                      {/*Removed input-label */}
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
                    <label htmlFor="password" className="primeryColor password">
                      {/* Removed input-label */}
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
                  {/* {error1.length > 1 ? <p className="form-error">*{error1}</p> : null} */}
                  <div className="modal-buttons">
                    <a href="#" className="">
                      Want to register using Gmail?
                    </a>
                    {/* <button className=" signinButton" type="submit">
                      Sign In
                    </button> */}
                    {/* {loading ? (
                      <Loader />
                    ) : (
                      <button className=" signinButton" type="submit">
                        Sign In
                      </button>
                    )} */}
                    <Button text="Sign In" load={loading} />
                  </div>
                </form>
                <p className="signup">
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
