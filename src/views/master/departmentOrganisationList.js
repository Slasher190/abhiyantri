import React from 'react'
// import axios from 'axios'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
// import App from 'src/components/Export/exportToPdf'
import DataTable from 'react-data-table-component'
import DataTableExtensions from 'react-data-table-component-extensions'
import 'react-data-table-component-extensions/dist/index.css'
import { useDispatch, useSelector } from 'react-redux'
import Modal from 'src/views/master/rightFitDept/departmentDetail'
import axios from 'src/api/axios'
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
    // {
    //   name: 'Edit',
    //   selector: (row) => row.deptId,
    //   cell: (row) => <Modal deptId={row?.deptId} orgId={row?.orgId} />,
    //   sortable: false,
    // },
  ]
  React.useEffect(() => {
    // console.log(token, 'Im tokn')
    try {
      const getData = async () => {
        const res = await axios.get(
          `/rightFitDept/getDeptMasterListByOrg?orgId=${parseInt(orgId)}`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          },
        )
        console.log(res.data, 'dff1h rtgarghd')
        setData(res.data)
      }
      getData()
    } catch (error) {
      console.log('thak geaa mai ...', error)
    }
  }, [])

  return (
    <>
      {/* <App /> */}
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Department List</strong>
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
