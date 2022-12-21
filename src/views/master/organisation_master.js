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
import axios from 'axios'

const Validation = () => {
  const token = useSelector((state) => state.accessToken)
  const [planId, setPlanId] = useState({})
  const [formData, setFormData] = useState(null)

  const data = JSON.stringify({
    orgName: formData?.organisationName,
    domain: formData?.domain,
    planId: formData?.plan,
  })
  const saveData = async () => {
    console.log(' chal gya yanha tak ...', data)
    try {
      const res = await axios.post('/rightFitOrg/saveOrgMaster', data, {
        headers: {
          authorization: `Bearer ${token}`,
          'content-Type': 'application/json',
        },
      })
      console.log(res.data, ' ...response')
    } catch (error) {
      console.log('Kuch toh gadbad hai ...', error)
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    // let target = e.target
    const data = {
      organisationName: e.target[0].value,
      domain: e.target[1].value,
      plan: e.target[2].value === 'Super' ? 1 : 2,
    }
    setFormData(data)
    console.log(formData)
    saveData()
  }
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

  return (
    <CRow>
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
                    defaultValue="Mark"
                    // valid
                    required
                  />
                  <CFormFeedback
                  // valid
                  >
                    Looks good!
                  </CFormFeedback>
                </CCol>
                <CCol md={4}>
                  <CFormLabel htmlFor="validationServer02">Domain</CFormLabel>
                  <CFormInput
                    type="text"
                    id="validationServer02"
                    defaultValue="Otto"
                    // valid
                    required
                  />
                  <CFormFeedback
                  // valid
                  >
                    Looks good!
                  </CFormFeedback>
                </CCol>

                <CCol md={3}>
                  <CFormLabel htmlFor="validationServer04">City</CFormLabel>
                  <CFormSelect
                    id="validationServer04"
                    // invalid
                  >
                    <option disabled>Choose...</option>
                    {Object.keys(planId).map((key, index) => {
                      return <option key={index}>{planId[key]}</option>
                    })}
                  </CFormSelect>
                  <CFormFeedback invalid>Please provide a valid city.</CFormFeedback>
                </CCol>
                {/* <CCol xs={12}>
                  <CFormCheck
                    type="checkbox"
                    id="invalidCheck"
                    label="Agree to terms and conditions"
                    // invalid
                    required
                  />
                  <CFormFeedback
                  // invalid
                  >
                    You must agree before submitting.
                  </CFormFeedback>
                </CCol> */}
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
  )
}

export default Validation
