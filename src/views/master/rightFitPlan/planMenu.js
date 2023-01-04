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
import { planName } from 'src/constants/schemaValidation'
import { CAlert } from '@coreui/react'
import { Icon } from '@chakra-ui/react'
import EditIcon from '@mui/icons-material/Edit'
import DataTableCustom from 'src/constants/dataTableCustum'

const columns = [{ name: 'Menu Name', selector: (row) => row?.menuName, sortable: true }]
const Modal = (props) => {
  const [visible, setVisible] = React.useState(false)
  const token = useSelector((state) => state.accessToken)
  const [data, setData] = React.useState('')
  const saveData = async (Data) => {
    console.log(' chal gya yanha tak ... gh', Data)
    const data = JSON.stringify({
      planId: props?.planId,
      status: Data?.status,
      planName: Data?.planName,
    })
    console.log(data, ' Ye hai data')
    try {
      const res = await axios.post('/rightFitPlan/savePlanMaster', data, {
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
        const res = await axios.get(`/rightFitPlan/getPlanMenuDetail`, {
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
  return (
    <>
      <EditIcon color="disabled" sx={{ m: 0 }} onClick={() => setVisible(!visible)} />
      <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader style={{ backgroundColor: '#212f56', color: 'white' }}>
          <CModalTitle>Plan Name</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <DataTableCustom columns={columns} data={data} ></DataTableCustom>
        </CModalBody>
      </CModal>
    </>
  )
}
export default Modal

Modal.propTypes = {
  planId: PropTypes.string,
}
