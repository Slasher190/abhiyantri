import React from 'react'
import axios from 'axios'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  // CTable,
  // CTableBody,
  // CTableCaption,
  // CTableDataCell,
  // CTableHead,
  // CTableHeaderCell,
  // CTableRow,
  // CPaginationItem,
  // CPagination,
} from '@coreui/react'
// import { DocsExample } from 'src/components'
// import { CSVLink } from 'react-csv'
// import { FaFileCsv } from 'react-icons/fa'
// import { AiOutlineDownload } from 'react-icons/ai'
import App from 'src/components/Export/exportToPdf'
import DataTable from 'react-data-table-component'
import DataTableExtensions from 'react-data-table-component-extensions'
import 'react-data-table-component-extensions/dist/index.css'
import { useSelector } from 'react-redux'

const headers = [
  { label: 'Organisation Name', key: 'orgName' },
  { label: 'Plan name', key: 'planName' },
  { label: 'Status', key: 'status' },
  { label: 'Domain', key: 'domain' },
]
const columns = [
  { name: 'Organisation Name', selector: 'orgName', sortable: true },
  { name: 'Plan name', selector: 'planName', sortable: true },
  { name: 'Status', selector: 'status', sortable: true },
  { name: 'Domain', selector: 'domain', sortable: true },
]

const Tables = () => {
  const [data, setData] = React.useState('')
  const token = useSelector((state) => state.accessToken)

  React.useEffect(() => {
    console.log(token, 'Im token')
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
              {/* <CSVLink data={data} headers={headers}>
                <AiOutlineDownload />
                <FaFileCsv />
              </CSVLink> */}
            </CCardHeader>
            <CCardBody>
              {/* <p className="text-medium-emphasis small">
                Use <code>hover</code> property to enable a hover state on table rows within a
                <code>&lt;CTableBody&gt;</code>.
              </p>
              <h1>hello</h1> */}
              <DataTableExtensions columns={columns} data={data}>
                <DataTable
                  // title="Globe"
                  highlightOnHover
                  pagination
                  paginationPerPage={5}
                  paginationRowsPerPageOptions={[5, 15, 25, 50]}
                  paginationComponentOptions={{
                    rowsPerPageText: 'Records per page',
                    rangeSeparatorText: 'out of',
                  }}
                />
              </DataTableExtensions>
              {/* <DocsExample href="components/table#hoverable-rows">
                <CTable hover>
                  <CTableHead>
                    <CTableRow>
                      {headers.map((item) => {
                        return (
                          <CTableHeaderCell scope="col" key={item.id}>
                            {item.label}
                          </CTableHeaderCell>
                        )
                      })}
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {data.map((item, i) => {
                      return (
                        <CTableRow key={i}>
                          <CTableHeaderCell scope="row">{i + 1}</CTableHeaderCell>
                          <CTableDataCell>{item.countryCode}</CTableDataCell>
                          <CTableDataCell>{item.country}</CTableDataCell>
                          <CTableDataCell>{item.name}</CTableDataCell>
                          <CTableDataCell>{item.region}</CTableDataCell>
                          <CTableDataCell>{item.regionCode}</CTableDataCell>
                          <CTableDataCell>{item.latitude}</CTableDataCell>
                          <CTableDataCell>{item.longitude}</CTableDataCell>
                        </CTableRow>
                      )
                    })}
                  </CTableBody>
                </CTable>
              </DocsExample> */}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Tables
