import {
  CCol,
  CButton,
  CTableBody,
  CModal,
  CModalHeader,
  CModalBody,
  CModalTitle,
  CForm,
  CFormInput,
  CFormSelect,
  CTableRow,
  CTableDataCell,
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
import DataTable, { createTheme } from 'react-data-table-component'
import DataTableExtensions from 'react-data-table-component-extensions'
// import 'react-data-table-component-extensions/dist/index.css'
import '../../../scss/dataTable.css'
import { makeStyles } from '@material-ui/core/styles'
import LinearProgress from '@material-ui/core/LinearProgress'
import ArrowDownward from '@material-ui/icons/ArrowDownward'
import { Center } from '@chakra-ui/react'
// import Checkbox from '@mui/material/Checkbox'
import Checkbox from '@material-ui/core/Checkbox'
import { toggleButtonClasses, Typography } from '@mui/material'

const Modal = (props) => {
  const [visible, setVisible] = React.useState(false)
  const [data, setData] = React.useState([])
  const token = useSelector((state) => state.accessToken)
  const columns = [{ name: 'Plan Name', selector: (row) => row?.menuName, sortable: true }]
  const [checked, setChecked] = React.useState([])

  const handleCheck = (event) => {
    var updatedList = [...checked]
    if (event.target.checked) {
      updatedList = [...checked, event.target.value]
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1)
    }
    setChecked(updatedList)
  }
  var isChecked = (item) => (checked.includes(item) ? 'checked-item' : 'not-checked-item')
  const checkedItems = checked.length
    ? checked.reduce((total, item) => {
        return total + ', ' + item
      })
    : ''

  React.useEffect(() => {
    // console.log(token, 'Im tokn')
    // const interval = setInterval(() => {
    //   console.log('This will run every 10 second!')
    // }, 10000)
    try {
      const getData = async () => {
        const res = await axios.get('/rightFitPlan/getPlanMenuDetail', {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        console.log(res.data, 'dfh hd')
        setData(res.data)
      }
      getData()
    } catch (error) {
      console.log('thak geaa maai ...', error)
    }
    // return () => clearInterval(interval)
  }, [])
  const handleSubmit = async () => {
    const arr = []
    console.log(checked, ' solihfjo')
    data.map((item) => {
      if (item.menuId.includes(checked)) {
        console.log(checked.length, ' active case')
        arr.push({
          id: 0,
          planId: props.planId,
          menuId: item.menuId,
          menuName: item.menuName,
          status: 'Active',
        })
      } else {
        console.log(checked.length, ' Passive case')
        arr.push({
          id: 0,
          planId: props.planId,
          menuId: item.menuId,
          menuName: item.menuName,
          status: 'Inactive',
        })
      }
    })
    console.log(arr, ' arrayaof data')
    const data1 = JSON.stringify(arr)
    try {
      console.log(data1, 'json file ajsjj')
      const res = await axios.post('/rightFitPlan/savePlanMenuDetail', data1, {
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
  console.log(checked, ' items ...')
  return (
    <>
      <EditIcon color="disabled" sx={{ m: 0 }} onClick={() => setVisible(!visible)} />
      <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader style={{ backgroundColor: '#212f56', color: 'white' }}>
          <CModalTitle>Menu Name</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CTableBody>
            {data?.map((row) => (
              <CTableRow key={row.menuId}>
                <CTableDataCell align="left">
                  <input value={row.menuId} type="checkbox" onChange={handleCheck} />
                </CTableDataCell>
                <CTableDataCell>
                  <Typography className={isChecked(row.menuName)}>{row.menuName}</Typography>
                </CTableDataCell>
              </CTableRow>
            ))}
            <button onClick={() => handleSubmit()}>Submit</button>
          </CTableBody>
        </CModalBody>
      </CModal>
    </>
  )
}
export default Modal

Modal.propTypes = {
  planId: PropTypes.string,
}
