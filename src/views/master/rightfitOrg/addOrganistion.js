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
import { organisationMaster } from 'src/constants/schemaValidation'
import { CAlert } from '@coreui/react'
import { Wrap } from '@chakra-ui/react'
/////////////////////////////////////////////////////////////////API INTEGRATION/////////////////////////////
const initialValues = {
  orgName: '',
  domain: '',
  planId: '',
}

const Validation = () => {
  const token = useSelector((state) => state.accessToken)
  const [planId, setPlanId] = useState({})
  const [Status, setStatus] = useState('')
  const [message, setMessage] = useState('')
  const [formData, setFormData] = useState(null)
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: organisationMaster,
    onSubmit: (values, action) => {
      console.log(values, ' ...formik')
      // LoginRequest(values)
      saveData(values)
    },
  })
  const saveData = async (Data) => {
    // console.log(' chal gya yanha tak ...', data)
    console.log(' chal gya yanha tak ...', Data)
    const data = JSON.stringify({
      orgName: Data?.orgName,
      domain: Data?.domain,
      planId: Data?.planId,
    })
    try {
      const res = await axios.post('/rightFitOrg/saveOrgMaster', data, {
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
  // const handleSubmit = (e) => {
  //   e.preventDefault()
  //   // let target = e.target
  //   const data = {
  //     organisationName: e.target[0].value,
  //     domain: e.target[1].value,
  //     plan: e.target[2].value,
  //   }
  //   setFormData(data)
  //   console.log(formData)
  //   saveData()
  // }
  useEffect(() => {
    try {
      const getDetail = async () => {
        const res = await axios.get('/rightFitPlan/getPlanListLOV', {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        setPlanId(res.data)
      }
      getDetail()
    } catch (error) {
      console.log(`helloo its ${error}`)
    }
  }, [])
  console.log(planId, ' heree', 'dhdgli   fgivi')
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
                <CForm className="row g-3 needs-validation" onSubmit={(e) => handleSubmit(e)}>
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
                    <CFormFeedback
                    // valid
                    >
                      {/* Looks good! */}
                    </CFormFeedback>
                  </CCol>
                  <CCol md={4}>
                    <CFormLabel htmlFor="validationServer02">Domain</CFormLabel>
                    <CFormInput
                      type="text"
                      id="validationServer02"
                      value={values.domain}
                      // defaultValue="Otto"
                      // valid
                      // required
                      name="domain"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.domain && touched.domain ? (
                      <p className="form-error">*{errors.domain}</p>
                    ) : null}
                    <CFormFeedback
                    // valid
                    >
                      {/* Looks good! */}
                    </CFormFeedback>
                  </CCol>

                  <CCol md={3}>
                    <CFormLabel htmlFor="validationServer04"></CFormLabel>
                    <CFormSelect
                      id="validationServer04"
                      value={values.planId}
                      // defaultValue={data?.planName}
                      label="Plan Name"
                      name="planId"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      // invalid
                    >
                      <option disabled>Choose...</option>
                      {Object.keys(planId).map((key, index) => {
                        return (
                          <option value={key} key={index}>
                            {planId[key]}
                          </option>
                        )
                      })}
                    </CFormSelect>
                    {/* <CFormFeedback invalid>Please provide a valid city.</CFormFeedback> */}
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
