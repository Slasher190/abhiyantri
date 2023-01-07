import {
  CCol,
  CButton,
  CModal,
  CModalHeader,
  CModalBody,
  CModalTitle,
  CForm,
  CFormInput,
  CFormSelect,
} from '@coreui/react'
import styled from 'styled-components'
import Button from 'src/constants/button'
import Wrapper from 'src/scss/_registration'
import React from 'react'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
// import axios from 'axios'
import axios from 'src/api/axios'
import { planFunctionalities } from 'src/constants/schemaValidation'
import { CAlert } from '@coreui/react'
import { Icon } from '@chakra-ui/react'
import EditIcon from '@mui/icons-material/Edit'

const Form = (props) => {
  const [validated, setValidated] = React.useState(false)
  const [data, setData] = React.useState(null)
  const [planId, setPlanId] = React.useState({})
  const [loading, setLoading] = React.useState(false)
  const [Status, setStatus] = React.useState('')
  const [message, setMessage] = React.useState('')
  const token = useSelector((state) => state.accessToken)
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      functiponId: '0',
      planId: props.planId,
      noOfUser: '',
      noOfLeadPage: '',
      leadType: '',
    },
    validationSchema: planFunctionalities,
    onSubmit: (values, action) => {
      console.log(values, ' ...formik')
      setLoading(true)
      saveData(values)
      action.resetForm()
    },
  })
  const saveData = async (Data) => {
    console.log(' chal gya yanha tak ... gh', Data)
    const data = {
      functiponId: '0',
      planId: props.planId,
      noOfUser: Data?.noOfUser,
      noOfLeadPage: Data?.noOfLeadPage,
      leadType: Data?.leadType,
    }
    console.log(data, ' Ye hai data')
    try {
      const res = await axios.post('/rightFitPlan/savePlanFunctionDetail', data, {
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
          `/rightFitPlan/getPlanFunctionDetail?id=${parseInt(props.planId)}`,
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
  // console.log(props?.deptId, ' hurray ')
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
            type="number"
            value={values.noOfUser}
            // defaultValue={data?.orgName}
            id="validationCustom01"
            label="Number Of User"
            name="noOfUser"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.noOfUser && touched.noOfUser ? (
            <p className="form-error">*{errors?.noOfUser}</p>
          ) : null}
        </CCol>
        <CCol md={4}>
          <CFormInput
            type="number"
            value={values.noOfLeadPage}
            // defaultValue={data?.orgName}
            id="validationCustom01"
            label="noOfLeadPage"
            name="noOfLeadPage"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.noOfLeadPage && touched.noOfLeadPage ? (
            <p className="form-error">*{errors?.noOfLeadPage}</p>
          ) : null}
        </CCol>
        <CCol md={4}>
          <CFormInput
            type="text"
            value={values.leadType}
            // defaultValue={data?.orgName}
            id="validationCustom01"
            label="leadType"
            name="leadType"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.leadType && touched.leadType ? (
            <p className="form-error">*{errors?.leadType}</p>
          ) : null}
        </CCol>
        
        <CCol xs={12}>
          {/* <CButton className="Submitbutton" color="primary" type="submit">
              Submit form
            </CButton> */}
          <Button text="Update Functionalities" load={loading} />
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
          <CModalTitle>Plan Name</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <Form planId={props?.planId} />
        </CModalBody>
      </CModal>
    </>
  )
}
export default Modal

Form.propTypes = {
  planId: PropTypes.any,
}
Modal.propTypes = {
  planId: PropTypes.any,
}
