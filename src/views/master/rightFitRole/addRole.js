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
import { roleMaster } from 'src/constants/schemaValidation'
import { CAlert } from '@coreui/react'
import { Wrap } from '@chakra-ui/react'
import Button from 'src/constants/button'
/////////////////////////////////////////////////////////////////API INTEGRATION/////////////////////////////
// "roleId": "1",
// "roleName": "Super",
// "roleStatus": "Active",
// "createBy": "deepak",
// "createDt": "01-Dec-2022",
// "lastUpdateBy": null,
// "lastUpdateDt": "02-Jan-2023",
// "selectAll": null,
// "orgId": "1",
// "orgName": "svaewevgwe",
// "reqResponse": null,
// "reqMessage": null,
// "subRoleMaster": null

// {
//   "roleName": "Hulk __",
//   "roleStatus": "Active",
//   "orgId": "1"
// }

const initialValues = {
  roleName: '',
  orgId: '',
}

const Validation = () => {
  const token = useSelector((state) => state.accessToken)
  const orgId = useSelector((state) => state.orgId)
  const [Status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: roleMaster,
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
      orgId: orgId,
      roleName: Data?.roleName,
    })
    try {
      const res = await axios.post(`/rightFitRole/saveRoleMaster?orgId=${parseInt(orgId)}`, data, {
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
  // console.log(message, 'kdjhkdh')
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
              <strong>Master</strong> <small>Organisation Master</small>
            </CCardHeader>
            <CCardBody>
              <DocsExample href="forms/validation#server-side">
                <CForm className="row g-3 needs-validation" onSubmit={handleSubmit}>
                  <CCol md={4}>
                    <CFormLabel htmlFor="validationServer01">Role Name</CFormLabel>
                    <CFormInput
                      type="text"
                      id="validationServer01"
                      value={values.roleName}
                      // defaultValue="Mark"
                      name="roleName"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      // valid
                      // required
                    />
                    {errors.roleName && touched.roleName ? (
                      <p className="form-error">*{errors.roleName}</p>
                    ) : null}
                  </CCol>
                  <CCol xs={12}>
                    {/* <CButton color="primary" type="submit">
                      Submit form
                    </CButton> */}
                    <Button text="Add Role" load={loading} />
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
