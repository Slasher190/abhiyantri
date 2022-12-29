import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormCheck,
  CFormInput,
  CFormFeedback,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import { DocsExample } from 'src/components'
import { useSelector } from 'react-redux'
// import axios from 'axios'
import axios from 'src/api/axios'
import Wrapper from 'src/scss/_registration'
import { useFormik } from 'formik'
import { systemMaster } from 'src/constants/schemaValidation'
import { CAlert } from '@coreui/react'
import { Wrap } from '@chakra-ui/react'
/////////////////////////////////////////////////////////////////API INTEGRATION/////////////////////////////
const initialValues = {
  companyName: '',
  smtpHost: '',
  smtpPort: '',
  smtpUserName: '',
  smtpPassword: '',
  emailFrom: '',
  smsSender: '',
}

const Validation = () => {
  const token = useSelector((state) => state.accessToken)
  // const orgId = useSelector((state) => state.orgId)
  const [Status, setStatus] = useState('')
  const [message, setMessage] = useState('')
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: systemMaster,
    onSubmit: (values, action) => {
      console.log(values, ' ...formik ewrt')
      // LoginRequest(values)
      saveData(values)
    },
  })
  const saveData = async (Data) => {
    // console.log(' chal gya yanha tak ...', data)
    console.log(' chal gya yanha tak ...', Data)
    const data = JSON.stringify({
      companyName: Data?.companyName,
      smtpHost: Data?.smtpHost,
      smtpPort: Data?.smtpPort,
      smtpUserName: Data?.smtpUserName,
      smtpPassword: Data?.smtpPassword,
      emailFrom: Data?.emailFrom,
      smsSender: Data?.smsSender,
    })
    try {
      const res = await axios.post('/rightFitSystem/saveSystemSetting', data, {
        headers: {
          authorization: `Bearer ${token}`,
          'content-Type': 'application/json',
        },
      })
      console.log(res.data, ' ...response')
      if (res.data.reqResponse === 'FAILED') {
        setStatus('FAILED')
      } else if (res.data.reqResponse === 'SUCCESS') {
        setStatus('SUCCESS')
        setMessage(res.data.reqMessage)
      }
    } catch (error) {
      console.log('Kuch toh gadbad hai ...', error)
    }
  }
  // console.log(planId, ' heree', 'dhdgli   fgivi')
  //////////////////////////////////////////////////////////////////////////////////
  return (
    <Wrapper>
      <CRow>
        {Status === 'SUCCESS' ? (
          <CAlert color="success" dismissible>
            Added Successfully !
          </CAlert>
        ) : null}
        {Status === 'FAILED' ? (
          <CAlert color="danger" dismissible>
            User Already Exist {message}
          </CAlert>
        ) : null}
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Master</strong> <small>System Setting</small>
            </CCardHeader>
            <CCardBody>
              <DocsExample href="forms/validation#server-side">
                <CForm className="row g-3 needs-validation" onSubmit={handleSubmit}>
                  <CCol md={4}>
                    <CFormLabel htmlFor="validationServer01">Company Name</CFormLabel>
                    <CFormInput
                      type="text"
                      id="validationServer01"
                      value={values.companyName}
                      // defaultValue="Mark"
                      name="companyName"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      // valid
                      // required
                    />
                    {errors.companyName && touched.companyName ? (
                      <p className="form-error">*{errors.companyName}</p>
                    ) : null}
                  </CCol>
                  <CCol md={4}>
                    <CFormLabel htmlFor="validationServer01">Email From</CFormLabel>
                    <CFormInput
                      type="text"
                      id="validationServer01"
                      value={values.emailFrom}
                      // defaultValue="Mark"
                      name="emailFrom"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      // valid
                      // required
                    />
                    {errors.emailFrom && touched.emailFrom ? (
                      <p className="form-error">*{errors.emailFrom}</p>
                    ) : null}
                  </CCol>
                  <CCol md={4}>
                    <CFormLabel htmlFor="validationServer01">SMS Sender</CFormLabel>
                    <CFormInput
                      type="text"
                      id="validationServer01"
                      value={values.smsSender}
                      // defaultValue="Mark"
                      name="smsSender"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      // valid
                      // required
                    />
                    {errors.smsSender && touched.smsSender ? (
                      <p className="form-error">*{errors.smsSender}</p>
                    ) : null}
                  </CCol>
                  <CCol md={4}>
                    <CFormLabel htmlFor="validationServer01">SMTP UserName</CFormLabel>
                    <CFormInput
                      type="text"
                      id="validationServer01"
                      value={values.smtpUserName}
                      // defaultValue="Mark"
                      name="smtpUserName"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      // valid
                      // required
                    />
                    {errors.smtpUserName && touched.smtpUserName ? (
                      <p className="form-error">*{errors.smtpUserName}</p>
                    ) : null}
                  </CCol>
                  <CCol md={4}>
                    <CFormLabel htmlFor="validationServer01">SMTP Password</CFormLabel>
                    <CFormInput
                      type="password"
                      id="validationServer01"
                      value={values.smtpPassword}
                      // defaultValue="Mark"
                      name="smtpPassword"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      // valid
                      // required
                    />
                    {errors.smtpPassword && touched.smtpPassword ? (
                      <p className="form-error">*{errors.smtpPassword}</p>
                    ) : null}
                  </CCol>
                  <CCol md={4}>
                    <CFormLabel htmlFor="validationServer01">SMTP Host</CFormLabel>
                    <CFormInput
                      type="text"
                      id="validationServer01"
                      value={values.smtpHost}
                      // defaultValue="Mark"
                      name="smtpHost"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      // valid
                      // required
                    />
                    {errors.smtpHost && touched.smtpHost ? (
                      <p className="form-error">*{errors.smtpHost}</p>
                    ) : null}
                  </CCol>
                  <CCol md={4}>
                    <CFormLabel htmlFor="validationServer01">SMTP Port</CFormLabel>
                    <CFormInput
                      type="text"
                      id="validationServer01"
                      value={values.deptName}
                      // defaultValue="Mark"
                      name="smtpPort"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      // valid
                      // required
                    />
                    {errors.smtpPort && touched.smtpPort ? (
                      <p className="form-error">*{errors.smtpPort}</p>
                    ) : null}
                  </CCol>
                  <CCol xs={12}>
                    <CButton color="primary" type="submit">
                      Submit form
                    </CButton>
                  </CCol>
                </CForm>
              </DocsExample>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </Wrapper>
  )
}

export default Validation
