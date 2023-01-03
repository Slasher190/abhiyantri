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
import { useFormik, Formik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
// import axios from 'axios'
import axios from 'src/api/axios'
import { systemMaster } from 'src/constants/schemaValidation'
import { CAlert } from '@coreui/react'
import { Icon } from '@chakra-ui/react'
import EditIcon from '@mui/icons-material/Edit'
import Button from 'src/constants/button'
const initialValues = {
  companyName: '',
  smtpHost: '',
  smtpPort: '',
  smtpUserName: '',
  smtpPassword: '',
  emailFrom: '',
  smsSender: '',
}
const Form = (props) => {
  const [validated, setValidated] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [data, setData] = React.useState({})
  const [Status, setStatus] = React.useState('')
  const [message, setMessage] = React.useState('')
  // const [initData, setInitData] = React.useState(initialValues)
  const token = useSelector((state) => state.accessToken)
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: systemMaster,
    onSubmit: (values, action) => {
      console.log(values, ' ...formik')
      setLoading(true)
      // LoginRequest(values)
      saveData(values)
    },
  })
  const saveData = async (Data) => {
    console.log(' chal gya yanha tak ... gh', Data)
    const data = JSON.stringify({
      id: props.orgId,
      companyName: Data?.companyName,
      smtpHost: Data?.smtpHost,
      smtpPort: Data?.smtpPort,
      smtpUserName: Data?.smtpUserName,
      smtpPassword: Data?.smtpPassword,
      emailFrom: Data?.emailFrom,
      smsSender: Data?.smsSender,
    })
    console.log(data, ' Ye hai data')
    try {
      const res = await axios.post('/rightFitSystem/saveSystemSetting', data, {
        headers: {
          authorization: `Bearer ${token}`,
          'content-Type': 'application/json',
        },
      })
      console.log(' chal gya yanha tak ... gh', Data)
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
  React.useEffect(() => {
    try {
      const getDetail = async () => {
        const res = await axios.get(
          `/rightFitSystem/getSystemSettingDetail?id=${parseInt(props.orgId)}`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          },
        )
        // console.log(res.data, ' here the data dekho')
        setData(res.data)
        // initialValues = {
        //   companyName: res?.data?.companyName,
        //   smtpHost: res?.data?.smtpHost,
        //   smtpPort: res?.data?.smtpPort,
        //   smtpUserName: res?.data?.smtpUserName,
        //   smtpPassword: res?.data?.smtpPassword,
        //   emailFrom: res?.data?.emailFrom,
        //   smsSender: res?.data?.smsSender,
        // }
        // console.log(initData, ' sodhyfoyif9brhgf8 gnfirwfghp')
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
          {/* <CButton color="primary" type="submit">
            Submit form
          </CButton> */}
          <Button text="submit" load={loading} />
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
