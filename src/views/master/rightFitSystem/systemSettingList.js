import React from 'react'
// import axios from 'axios'
import axios from 'src/api/axios'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
// import App from 'src/components/Export/exportToPdf'
import DataTable from 'react-data-table-component'
import DataTableExtensions from 'react-data-table-component-extensions'
import 'react-data-table-component-extensions/dist/index.css'
import { useDispatch, useSelector } from 'react-redux'
import Modal from './systemSettingDetail'

const Tables = () => {
  const [data, setData] = React.useState('')
  const dispatch = useDispatch()
  const [id, setId] = React.useState(null)
  const token = useSelector((state) => state.accessToken)
  // const orgId = useSelector((state) => state.orgId)

  const columns = [
    { name: 'Company Name', selector: (row) => row?.companyName, sortable: true },
    // { name: 'SMTP Host', selector: (row) => row?.smtpHost, sortable: true },
    // { name: 'SMTP Port', selector: (row) => row?.smtpPort, sortable: true },
    { name: 'SMTP UserName', selector: (row) => row?.smtpUserName, sortable: true },
    // { name: 'SMS Sender', selector: (row) => row?.smsSender, sortable: true },
    { name: 'Create Date', selector: (row) => row?.createDate.split(' ')[0], sortable: true },
    {
      name: 'Email From',
      selector: (row) => row.emailFrom,
      sortable: false,
    },
    {
      name: 'Edit',
      selector: (row) => row.id,
      cell: (row) => <Modal orgId={row?.id} />,
      sortable: false,
    },
  ]
  React.useEffect(() => {
    // console.log(token, 'Im tokn')
    try {
      const getData = async () => {
        const res = await axios.get('/rightFitSystem/getSystemSettingList', {
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
              <strong>System Setting List</strong>
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
