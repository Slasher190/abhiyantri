import React from 'react'

import axios from 'src/api/axios'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import 'react-data-table-component-extensions/dist/index.css'
import { useDispatch, useSelector } from 'react-redux'
import Modal from 'src/views/master/rightFitDept/departmentDetail'
import DataTableCustom from 'src/constants/dataTableCustum'

const Tables = () => {
  const [data, setData] = React.useState()
  const dispatch = useDispatch()
  const [id, setId] = React.useState(null)
  const token = useSelector((state) => state.accessToken)
  const orgId = useSelector((state) => state.orgId)

  const columns = [
    { name: 'Organisation Name', selector: (row) => row?.orgName, sortable: true },
    { name: 'Department name', selector: (row) => row?.deptName, sortable: true },
    { name: 'Status', selector: (row) => row?.status, sortable: true },
    { name: 'Create Date', selector: (row) => row?.createDate.split(' ')[0], sortable: true },
    {
      name: 'Edit',
      selector: (row) => row.deptId,
      cell: (row) => <Modal deptId={row?.deptId} orgId={row?.orgId} />,
      sortable: false,
    },
  ]
  React.useEffect(() => {
    // console.log(token, 'Im tokn')
    try {
      const getData = async () => {
        const res = await axios.get('/rightFitDept/getDeptMasterList', {
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
  }, [])

  return (
    <>
      {/* <App /> */}
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader className="blockquote bg-blue">
              <strong className="text-white ">Department List</strong>
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
