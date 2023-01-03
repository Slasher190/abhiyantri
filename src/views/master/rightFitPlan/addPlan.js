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
import { Formik, useFormik } from 'formik'
import { planName } from 'src/constants/schemaValidation'
import { CAlert } from '@coreui/react'
import { Wrap } from '@chakra-ui/react'
import Button from 'src/constants/button'
/////////////////////////////////////////////////////////////////API INTEGRATION/////////////////////////////
const initialValues = {
  planName: '',
}

const Validation = () => {
  const token = useSelector((state) => state.accessToken)
  const [loading, setLoading] = useState(false)
  const orgId = useSelector((state) => state.orgId)
  const [Status, setStatus] = useState('')
  const [message, setMessage] = useState('')
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: planName,
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
      planName: Data?.planName,
    })
    try {
      const res = await axios.post('/rightFitPlan/savePlanMaster', data, {
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
            User Already Exist {message}
          </CAlert>
        ) : null}
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Master</strong> <small>Organisation Master</small>
            </CCardHeader>
            <CCardBody>
              <DocsExample href="forms/validation#server-side">
                <CForm className="row g-3 needs-validation" onSubmit={handleSubmit}>
                  <CCol md={4}>
                    <CFormLabel htmlFor="validationServer01">Plan Name</CFormLabel>
                    <CFormInput
                      type="text"
                      id="validationServer01"
                      value={values.planName}
                      // defaultValue="Mark"
                      name="planName"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      // valid
                      // required
                    />
                    {errors.planName && touched.planName ? (
                      <p className="form-error">*{errors.planName}</p>
                    ) : null}
                  </CCol>
                  <CCol xs={12}>
                    {/* <CButton color="primary" type="submit">
                      Submit form
                    </CButton> */}
                    <Button text="Submit Plan" load={loading} />
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
