import {
  CModal,
  CModalHeader,
  CModalBody,
  CModalTitle,
} from '@coreui/react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
// import axios from 'axios'
import axios from 'src/api/axios'
import EditIcon from '@mui/icons-material/Edit'
import { toggleButtonClasses, Typography } from '@mui/material'

const Modal = (props) => {
  const [visible, setVisible] = React.useState(false)
  const [data, setData] = React.useState('')
  const token = useSelector((state) => state.accessToken)
  const [checked, setChecked] = React.useState([])
  const orgId = useSelector((state) => state.orgId)

  React.useEffect(() => {
    // console.log(token, 'Im tokn')
    // const interval = setInterval(() => {
    //   console.log('This will run every 10 second!')
    // }, 10000)
    try {
      const getData = async () => {
        const res = await axios.get(
          `/rightFitLeadForm/generateLeadFormLink?orgId=${orgId}&deptId=${props?.deptId}`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          },
        )
        console.log(res.data, 'dfh hd')
        setData(res.data)
      }
      getData()
    } catch (error) {
      console.log('thak geaa maai ...', error)
    }
    // return () => clearInterval(interval)
  }, [])
  console.log(checked, ' items ...')
  return (
    <>
      <EditIcon color="disabled" sx={{ m: 0 }} onClick={() => setVisible(!visible)} />
      <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader style={{ backgroundColor: '#212f56', color: 'white' }}>
          <CModalTitle>Generate Lead</CModalTitle>
        </CModalHeader>
        <CModalBody>
         <Typography>
          {data}
         </Typography>
        </CModalBody>
      </CModal>
    </>
  )
}
export default Modal

Modal.propTypes = {
  deptId: PropTypes.string,
}
