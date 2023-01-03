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
import { refMasterUpdate, superRefMasterUpdate } from 'src/constants/schemaValidation'
import { CAlert } from '@coreui/react'
import { Icon } from '@chakra-ui/react'
import Button from 'src/constants/button'
import EditIcon from '@mui/icons-material/Edit'
const initialValues = {
  orgId: '',
  orgName: '',
  refType: '',
  refVal1: '',
  refVal2: '',
  refDesc: '',
  refId: '',
  refOrder: 999,
  refStatus: '',
}
const Form = (props) => {
  const [validated, setValidated] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [data, setData] = React.useState(null)
  const [planId, setPlanId] = React.useState({})
  const [Status, setStatus] = React.useState('')
  const [message, setMessage] = React.useState('')
  const token = useSelector((state) => state.accessToken)
  const orgId = useSelector((state) => state.orgId)
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: props?.refBool ? superRefMasterUpdate : refMasterUpdate,
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
      orgId: props?.refBool ? null : orgId,
      refId: props.refId,
      orgName: Data?.orgName,
      refType: Data?.refType,
      refVal1: Data?.refVal1,
      refVal2: Data?.refVal2,
      refDesc: Data?.refDesc,
      refOrder: Data?.refOrder,
      refStatus: Data?.refStatus,
    })
    console.log(data, ' Ye hai data')
    try {
      const res = await axios.post('/rightFitRef/saveRefCodeMas', data, {
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
        const res = await axios.get(`/rightFitRef/getRefCodeDetail?id=${parseInt(props.refId)}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        console.log(res.data, ' here the data dekho')
        setData(res.data)
      }
      getDetail()
    } catch (error) {
      console.log(`helloo its ${error}`)
    }
  }, [])
  // console.log(props?.refOrder, ' hurray ')
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
        {props?.refBool ? null : (
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
        )}
        <CCol md={4}>
          <CFormLabel htmlFor="validationServer01">Reference Number</CFormLabel>
          <CFormInput
            type="text"
            id="validationServer01"
            value={values.refOrder}
            // defaultValue="Mark"
            name="refOrder"
            onChange={handleChange}
            onBlur={handleBlur}
            // valid
            // required
          />
          {errors.refOrder && touched.refOrder ? (
            <p className="form-error">*{errors.refOrder}</p>
          ) : null}
        </CCol>
        <CCol md={4}>
          <CFormSelect
            aria-describedby="validationCustom04Feedback"
            id="validationCustom04"
            label="Status"
            value={values.refStatus}
            // defaultValue={data?.status}
            name="refStatus"
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <option disabled>Choose...</option>
            <option>Active</option>
            <option>Inactive</option>
          </CFormSelect>
        </CCol>
        <CCol xs={12}>
          {/* <CButton color="primary" type="submit">
                      Submit form
                    </CButton> */}
          <Button text="Update Reference" load={loading} />
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
        <CModalHeader>
          <CModalTitle>{props?.refBool ? "Super Update Reference" : "Update Reference"} </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <Form refId={props?.refId} refBool={props?.refBool} />
        </CModalBody>
      </CModal>
    </>
  )
}
export default Modal

Form.propTypes = {
  refId: PropTypes.string,
  refBool: PropTypes.bool,
}
Modal.propTypes = {
  refId: PropTypes.string,
  refBool: PropTypes.bool,
}
