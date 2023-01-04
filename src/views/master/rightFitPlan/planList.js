import React from 'react'
// import axios from 'axios'
import axios from 'src/api/axios'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
// import App from 'src/components/Export/exportToPdf'
import DataTable from 'react-data-table-component'
import DataTableExtensions from 'react-data-table-component-extensions'
import 'react-data-table-component-extensions/dist/index.css'
import { useDispatch, useSelector } from 'react-redux'
import Modal from 'src/views/master/rightFitPlan/planListDetail'
import MenuList from './planMenu'
import DataTableCustom from 'src/constants/dataTableCustum'
const Tables = () => {
  const [data, setData] = React.useState('')
  const dispatch = useDispatch()
  const [id, setId] = React.useState(null)
  const token = useSelector((state) => state.accessToken)
  const orgId = useSelector((state) => state.orgId)

  const columns = [
    { name: 'Plan Name', selector: (row) => row?.planName, sortable: true },
    { name: 'Status', selector: (row) => row?.status, sortable: true },
    { name: 'Create Date', selector: (row) => row?.createDate?.split(' ')[0], sortable: true },
    {
      name: 'Edit',
      selector: (row) => row.planId,
      cell: (row) => <Modal planId={row?.planId} />,
      sortable: false,
    },
    {
      name: 'Menu',
      selector: (row) => row.menuId,
      cell: (row) => <MenuList planId={row?.menuId} />,
      sortable: false,
    },
    {
      name: 'Functionalities',
      selector: (row) => row.planId,
      cell: (row) => <Modal planId={row?.planId} />,
      sortable: false,
    },
  ]
  React.useEffect(() => {
    // console.log(token, 'Im tokn')
    // const interval = setInterval(() => {
    //   console.log('This will run every 10 second!')
    // }, 10000)
    try {
      const getData = async () => {
        const res = await axios.get('/rightFitPlan/getPlanMasterList', {
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

  return (
    <>
      {/* <App /> */}
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong style={{ background: '212f56', color: '#fff' }}>Plan List</strong>
            </CCardHeader>
            <CCardBody>
              <DataTableCustom columns={columns} data={data}></DataTableCustom>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Tables
