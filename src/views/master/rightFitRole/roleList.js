import React from 'react'
// import axios from 'axios'
import axios from 'src/api/axios'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
// import App from 'src/components/Export/exportToPdf'
import DataTable from 'react-data-table-component'
import DataTableExtensions from 'react-data-table-component-extensions'
import 'react-data-table-component-extensions/dist/index.css'
import { useDispatch, useSelector } from 'react-redux'
import Modal from 'src/views/master/rightFitRole/roleDetail'
import RoleMenuList from './roleMenu'
import DataTableCustom from 'src/constants/dataTableCustum'

const Tables = () => {
  const [data, setData] = React.useState('')
  const token = useSelector((state) => state.accessToken)
  const orgId = useSelector((state) => state.orgId)

  const columns = [
    { name: 'Organisation Name', selector: (row) => row?.orgName, sortable: true },
    { name: 'Role Name', selector: (row) => row?.roleName, sortable: true },
    { name: 'Role Status', selector: (row) => row?.roleStatus, sortable: true },
    { name: 'Create Date', selector: (row) => row?.createDt, sortable: true },
    {
      name: 'Edit',
      selector: (row) => row.roleId,
      cell: (row) => <Modal roleId={row?.roleId} />,
      sortable: false,
    },
    {
      name: 'Menu',
      selector: (row) => row.roleId,
      cell: (row) => <RoleMenuList roleId={row?.roleId} />,
      sortable: false,
    },
  ]
  React.useEffect(() => {
    // console.log(token, 'Im tokn')
    try {
      const getData = async () => {
        const res = await axios.get(`/rightFitRole/getRoleDataByOrg?orgId=${parseInt(orgId)}`, {
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
            <CCardHeader>
              <strong style={{ background: '212f56', color: '#fff' }}>Department List</strong>
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
