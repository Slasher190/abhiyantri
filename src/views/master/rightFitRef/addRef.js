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
import { refMaster } from 'src/constants/schemaValidation'
import { CAlert } from '@coreui/react'
import { Wrap } from '@chakra-ui/react'
import Button from 'src/constants/button'
/////////////////////////////////////////////////////////////////API INTEGRATION/////////////////////////////

const initialValues = {
  refType: '',
  refVal1: '',
  refVal2: '',
  refDesc: '',
  orgId: '',
  orgName: '',
}

const Validation = () => {
  const token = useSelector((state) => state.accessToken)
  const orgId = useSelector((state) => state.orgId)
  const [Status, setStatus] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: refMaster,
    onSubmit: (values, action) => {
      console.log(values, ' ...formik ewrt')
      // LoginRequest(values)
      setLoading(true)
      saveData(values)
      action.resetForm()
    },
  })
  const saveData = async (Data) => {
    // console.log(' chal gya yanha tak ...', data)
    console.log(' chal gya yanha tak ...', Data)
    const data = JSON.stringify({
      refType: Data?.refType,
      refVal1: Data?.refVal1,
      refVal2: Data?.refVal2,
      refDesc: Data?.refDesc,
      orgId: orgId,
      orgName: Data?.orgName,
    })
    try {
      const res = await axios.post('/rightFitRef/saveRefCodeMas', data, {
        headers: {
          authorization: `Bearer ${token}`,
          'content-Type': 'application/json',
        },
      })
      console.log(res.data, ' ...response')
      if (res.data.reqResponse === 'FAILED') {
        setStatus('FAILED')
        setMessage(res.data.reqMessage)
      } else if (res.data.reqResponse === 'SUCCESS') {
        setStatus('SUCCESS')
      }
      setLoading(false)
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
            {message}
          </CAlert>
        ) : null}
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Master</strong> <small>Reference Master</small>
            </CCardHeader>
            <CCardBody>
              <DocsExample href="forms/validation#server-side">
                <CForm className="row g-3 needs-validation" onSubmit={handleSubmit}>
                  <CCol md={4}>
                    <CFormLabel htmlFor="validationServer01">Reference Type</CFormLabel>
                    <CFormInput
                      type="text"
                      id="validationServer01"
                      value={values.refType}
                      // defaultValue="Mark"
                      name="refType"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      // valid
                      // required
                    />
                    {errors.refType && touched.refType ? (
                      <p className="form-error">*{errors.refType}</p>
                    ) : null}
                  </CCol>
                  <CCol md={4}>
                    <CFormLabel htmlFor="validationServer01">Reference Val1</CFormLabel>
                    <CFormInput
                      type="text"
                      id="validationServer01"
                      value={values.refVal1}
                      // defaultValue="Mark"
                      name="refVal1"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      // valid
                      // required
                    />
                    {errors.refVal1 && touched.refVal1 ? (
                      <p className="form-error">*{errors.refVal1}</p>
                    ) : null}
                  </CCol>
                  <CCol md={4}>
                    <CFormLabel htmlFor="validationServer01">Reference Val2</CFormLabel>
                    <CFormInput
                      type="text"
                      id="validationServer01"
                      value={values.refVal2}
                      // defaultValue="Mark"
                      name="refVal2"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      // valid
                      // required
                    />
                    {errors.refVal2 && touched.refVal2 ? (
                      <p className="form-error">*{errors.refVal2}</p>
                    ) : null}
                  </CCol>
                  <CCol md={4}>
                    <CFormLabel htmlFor="validationServer01">Reference Desc</CFormLabel>
                    <CFormInput
                      type="text"
                      id="validationServer01"
                      value={values.refDesc}
                      // defaultValue="Mark"
                      name="refDesc"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      // valid
                      // required
                    />
                    {errors.refDesc && touched.refDesc ? (
                      <p className="form-error">*{errors.refDesc}</p>
                    ) : null}
                  </CCol>
                  <CCol md={4}>
                    <CFormLabel htmlFor="validationServer01">Organisation Name</CFormLabel>
                    <CFormInput
                      type="text"
                      id="validationServer01"
                      value={values.orgName}
                      // defaultValue="Mark"
                      name="orgName"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      // valid
                      // required
                    />
                    {errors.orgName && touched.orgName ? (
                      <p className="form-error">*{errors.orgName}</p>
                    ) : null}
                  </CCol>
                  <CCol xs={12}>
                    {/* <CButton color="primary" type="submit">
                      Submit form
                    </CButton> */}
                    <Button text="Add Reference" load={loading} />
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
