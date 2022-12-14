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
import { departmentMaster } from 'src/constants/schemaValidation'
import { CAlert } from '@coreui/react'
import { Icon } from '@chakra-ui/react'
import EditIcon from '@mui/icons-material/Edit'
import { useSelect } from '@mui/base'
import DataTableCustom from 'src/constants/dataTableCustum'
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
    validationSchema: departmentMaster,
    onSubmit: (values, action) => {
      console.log(values, ' ...formik')
      // LoginRequest(values)
      saveData(values)
      action.resetForm()
    },
  })
  const saveData = async (Data) => {
    console.log(' chal gya yanha tak ... gh', Data)
    const data = JSON.stringify({
      deptId: props?.deptId,
      orgId: props?.orgId,
      deptName: Data?.deptName,
      status: Data?.status,
    })
    console.log(data, ' Ye hai data')
    try {
      const res = await axios.post('/rightFitDept/saveDeptMaster', data, {
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
    } catch (error) {
      console.log('Kuch toh gadbad hai ...', error)
    }
  }
  React.useEffect(() => {
    try {
      const getDetail = async () => {
        const res = await axios.get(
          `/rightFitDept/getDeptMasterDetail?id=${parseInt(props.deptId)}`,
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
  console.log(props?.deptId, ' hurray ')
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
            value={values.deptName}
            // defaultValue={data?.orgName}
            id="validationCustom01"
            label="Department Name"
            name="deptName"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.deptName && touched.deptName ? (
            <p className="form-error">*{errors.deptName}</p>
          ) : null}
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
  const orgId = useSelector((state) => state.orgId)
  const [data, setData] = useState([])
  const columns = [
    { name: 'Field Id', selector: (row) => row?.fieldId, sortable: true },
    { name: 'Field Label', selector: (row) => row?.fieldLabel, sortable: true },
    { name: 'Min Lenght', selector: (row) => row?.minLength, sortable: true },
    { name: 'Max Length', selector: (row) => row?.maxLength, sortable: true },
    { name: 'Optional', selector: (row) => row?.optional, sortable: true },
    { name: 'Field Type', selector: (row) => row?.fieldType, sortable: true },
    { name: 'Field Order', selector: (row) => row?.fieldOrder, sortable: true },
  ]
  const [visible, setVisible] = React.useState(false)
  useEffect(() => {
    try {
      const getList = async () => {
        const res = await axios.get(
          `/rightFitDept/getLeadFormDetailById?deptId=${props?.deptId}&orgId=${orgId}`,
        )
        setData(res?.data)
      }
      getList()
    } catch (error) {
      console.log(' and the error is ... ', error)
    }
  })
  return (
    <>
      <EditIcon color="disabled" sx={{ m: 0 }} onClick={() => setVisible(!visible)} />
      <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>Modal </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <DataTableCustom columns={columns} data={data?.leadFormDetail} key={['fieldId']} />
        </CModalBody>
      </CModal>
    </>
  )
}
export default Modal

Form.propTypes = {
  deptId: PropTypes.string,
  orgId: PropTypes.string,
}
Modal.propTypes = {
  deptId: PropTypes.string,
  orgId: PropTypes.string,
}
