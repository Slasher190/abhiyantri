import React from 'react'
import axios from 'axios'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import App from 'src/components/Export/exportToPdf'
import DataTable from 'react-data-table-component'
import DataTableExtensions from 'react-data-table-component-extensions'
import 'react-data-table-component-extensions/dist/index.css'
import { useDispatch, useSelector } from 'react-redux'
import Modal from 'src/components/PopupModel'

const Tables = () => {
  const [data, setData] = React.useState('')
  const dispatch = useDispatch()
  const [id, setId] = React.useState(null)
  const token = useSelector((state) => state.accessToken)
  const handleClick = (e) => {
    console.log(e)
    // dispatch({
    //   type: 'set',
    //   orgId: id,
    // })
  }
  const columns = [
    { name: 'Organisation Name', selector: (row) => row?.orgName, sortable: true },
    { name: 'Plan name', selector: (row) => row?.planName, sortable: true },
    { name: 'Status', selector: (row) => row?.status, sortable: true },
    { name: 'Domain', selector: (row) => row?.domain, sortable: true },
    {
      name: 'Edit',
      selector: (row) => row.orgId,
      cell: (row) => <Modal orgId={row?.orgId} />,
      sortable: false,
    },
  ]
  // const columns = [
  //   { name: 'Organisation Name', selector: data?.orgName, sortable: true },
  //   { name: 'Plan name', selector: data?.planName, sortable: true },
  //   { name: 'Status', selector: data?.status, sortable: true },
  //   { name: 'Domain', selector: data?.domain, sortable: true },
  //   {
  //     name: 'Edit',
  //     selector: data?.orgId,
  //     cell: (row) => <Modal orgId={row.orgId} />,
  //     sortable: false,
  //   },
  // ]
  console.log(id, ' ...id')
  React.useEffect(() => {
    console.log(token, 'Im tokn')
    try {
      const getData = async () => {
        const res = await axios.get('/rightFitOrg/getOrgMasterList', {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        setData(res.data)
        console.log(res.data)
      }
      getData()
    } catch (error) {
      console.log('thak geaa maai ...', error)
    }
  }, [])

  return (
    <>
      <App />
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Organisation Table</strong>
            </CCardHeader>
            <CCardBody>
              <DataTableExtensions columns={columns} data={data}>
                <DataTable
                  // title="Globe"
                  highlightOnHover
                  pagination
                  exportHeaders={true}
                  paginationPerPage={5}
                  paginationRowsPerPageOptions={[5, 15, 25, 50]}
                  paginationComponentOptions={{
                    rowsPerPageText: 'Records per page',
                    rangeSeparatorText: 'out of',
                  }}
                />
              </DataTableExtensions>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Tables
