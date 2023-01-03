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
import { roleMaster } from 'src/constants/schemaValidation'
import { CAlert } from '@coreui/react'
import { Icon } from '@chakra-ui/react'
import EditIcon from '@mui/icons-material/Edit'
import Button from 'src/constants/button'
const initialValues = {
  orgId: '',
  roleId: '',
  roleName: '',
  roleStatus: '',
}
const Form = (props) => {
  const [validated, setValidated] = React.useState(false)
  const [data, setData] = React.useState(null)
  const [planId, setPlanId] = React.useState({})
  const [Status, setStatus] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [message, setMessage] = React.useState('')
  const token = useSelector((state) => state.accessToken)
  const orgId = useSelector((state) => state.orgId)
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: roleMaster,
    onSubmit: (values, action) => {
      console.log(values, ' ...formik')
      // LoginRequest(values)
      setLoading(true)
      saveData(values)
      action.resetForm()
    },
  })
  const saveData = async (Data) => {
    console.log(' chal gya yanha tak ... gh', Data)
    const data = JSON.stringify({
      roleId: props?.roleId,
      orgId: orgId,
      roleName: Data?.roleName,
      roleStatus: Data?.roleStatus,
    })
    console.log(data, ' Ye hai data')
    try {
      const res = await axios.post(`/rightFitRole/saveRoleMaster?orgId=${parseInt(orgId)}`, data, {
        headers: {
          authorization: `Bearer ${token}`,
          'content-Type': 'application/json',
        },
      })
      console.log(' chal gya yanha tak ... gh', Data)
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
  React.useEffect(() => {
    try {
      const getDetail = async () => {
        const res = await axios.get(
          `/rightFitRole/getRoleDetail?roleId=${parseInt(props.roleId)}`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          },
        )
        console.log(res.data, ' here the data dekho')
        setData(res.data)
      }
      getDetail()
    } catch (error) {
      console.log(`helloo its ${error}`)
    }
  }, [])
  console.log(props?.roleId, ' hurray ')
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
            {message}
          </CAlert>
        ) : null}
        <CCol md={4}>
          <CFormInput
            type="text"
            value={values.deptName}
            // defaultValue={data?.orgName}
            id="validationCustom01"
            label="Role Name"
            name="roleName"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.roleName && touched.roleName ? (
            <p className="form-error">*{errors.roleName}</p>
          ) : null}
        </CCol>
        <CCol md={3}>
          <CFormSelect
            aria-describedby="validationCustom04Feedback"
            feedbackInvalid="Please select a valid state."
            id="validationCustom04"
            label="Role Status"
            value={values.roleStatus}
            // defaultValue={data?.status}
            name="roleStatus"
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <option disabled>Choose...</option>
            <option>Active</option>
            <option>Inactive</option>
          </CFormSelect>
        </CCol>
        <CCol xs={12}>
          {/* <CButton className="Submitbutton" color="primary" type="submit">
            Submit form
          </CButton> */}
          <Button text="Update Role" load={loading} />
        </CCol>
      </CForm>
    </Wrapper>
  )
}
const Modal = (props) => {
  const [visible, setVisible] = React.useState(false)
  return (
    <>
      <EditIcon color="disabled" sx={{ m: 0 }} onClick={() => setVisible(!visible)} />
      <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader style={{ backgroundColor: '#212f56', color: 'white' }}>
          <CModalTitle>Update role </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <Form roleId={props?.roleId} />
        </CModalBody>
      </CModal>
    </>
  )
}
export default Modal

Form.propTypes = {
  roleId: PropTypes.string,
}
Modal.propTypes = {
  roleId: PropTypes.string,
}
