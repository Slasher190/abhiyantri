import {
  CCol,
  CButton,
  CModal,
  CModalHeader,
  CModalBody,
  CModalTitle,
  CModalFooter,
  CForm,
  CFormInput,
  CFormSelect,
  CFormCheck,
  CFormFeedback,
  CInputGroup,
  CFormLabel,
  CInputGroupText,
  cilPencil,
} from '@coreui/react'
import styled from 'styled-components'
import Wrapper from 'src/scss/_registration'
import React from 'react'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
// import axios from 'axios'
import axios from 'src/api/axios'
import { organisationMaster } from 'src/constants/schemaValidation'
import { CAlert } from '@coreui/react'
import { Icon } from '@chakra-ui/react'
import EditIcon from '@mui/icons-material/Edit'
const initialValues = {
  orgId: '',
  orgName: '',
  domain: '',
  status: '',
  planId: '',
}
const Form = (props) => {
  const [validated, setValidated] = React.useState(false)
  const [data, setData] = React.useState(null)
  const [planId, setPlanId] = React.useState({})
  const [Status, setStatus] = React.useState('')
  const [message, setMessage] = React.useState('')
  const token = useSelector((state) => state.accessToken)
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
    console.log(' chal gya yanha tak ...', Data)
    const data = JSON.stringify({
      orgId: props?.orgId,
      orgName: Data?.orgName,
      domain: Data?.domain,
      planId: Data?.planId,
      status: Data?.status,
    })
    console.log(data, ' Ye hai data')
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
  React.useEffect(() => {
    try {
      const getDetail = async () => {
        const res = await axios.get(`/rightFitOrg/getOrgMasterDetail?id=${parseInt(props.orgId)}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        setData(res.data)
        console.log(res.data, ' here the data ')
      }
      getDetail()
    } catch (error) {
      console.log(`helloo its ${error}`)
    }
  }, [])
  React.useEffect(() => {
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
  console.log(props?.orgId, ' hurray ')
  return (
    <Wrapper>
      <CForm className="row g-3 needs-validation Wrapper-Box" onSubmit={(e) => handleSubmit(e)}>
        {Status === 'SUCCESS' ? (
          <CAlert color="success" dismissible>
            Updated Successfully !
          </CAlert>
        ) : null}
        {Status === 'FAILED' ? (
          <CAlert color="danger" dismissible>
            User Already Exist {message}
          </CAlert>
        ) : null}
        <CCol md={4}>
          <CFormInput
            type="text"
            value={values.orgName}
            defaultValue={data?.orgName}
            feedbackValid="Looks good!"
            id="validationCustom01"
            label="Organisation Name"
            name="orgName"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.orgName && touched.orgName ? (
            <p className="form-error">*{errors.orgName}</p>
          ) : null}
        </CCol>
        <CCol md={4}>
          <CFormInput
            type="text"
            value={values.domain}
            defaultValue={data?.domain}
            feedbackValid="Looks good!"
            id="validationCustom02"
            label="Domain"
            name="domain"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.domain && touched.domain ? <p className="form-error">*{errors.domain}</p> : null}
        </CCol>
        <CCol md={3}>
          <CFormSelect
            aria-describedby="validationCustom04Feedback"
            feedbackInvalid="Please select a valid state."
            id="validationCustom04"
            label="Status"
            value={values.status}
            // defaultValue={data?.status}
            name="status"
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <option disabled>Choose...</option>
            <option>Active</option>
            <option>Inactive</option>
          </CFormSelect>
        </CCol>
        <CCol md={3}>
          <CFormSelect
            aria-describedby="validationCustom04Feedback"
            feedbackInvalid="Please select a valid state."
            id="validationCustom04"
            value={values.planId}
            defaultValue={data?.planName}
            label="Plan Name"
            name="planId"
            onChange={handleChange}
            onBlur={handleBlur}
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
        </CCol>
        <CCol xs={12}>
          <CFormCheck type="checkbox" id="invalidCheck" label="Agree to terms and conditions" />
          <CFormFeedback invalid>You must agree before submitting.</CFormFeedback>
        </CCol>
        <CCol xs={12}>
          <CButton className="Submitbutton" color="primary" type="submit">
            Submit form
          </CButton>
        </CCol>
      </CForm>
    </Wrapper>
  )
}
const Modal = (props) => {
  const Id = useSelector((state) => state.orgId)
  console.log(Id, ' here the id is')
  const [visible, setVisible] = React.useState(false)
  return (
    <>
      <EditIcon color="disabled" sx={{ m: 0 }} onClick={() => setVisible(!visible)} />
      <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>Modal </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <Form orgId={props?.orgId} />
        </CModalBody>
      </CModal>
    </>
  )
}
export default Modal

Form.propTypes = {
  orgId: PropTypes.string,
}
Modal.propTypes = {
  orgId: PropTypes.string,
}
