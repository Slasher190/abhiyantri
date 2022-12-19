import React from 'react'
import axios from 'axios'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableCaption,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CPaginationItem,
  CPagination,
} from '@coreui/react'
import { DocsExample } from 'src/components'
import { CSVLink } from 'react-csv'
import { FaFileCsv } from 'react-icons/fa'
import { AiOutlineDownload } from 'react-icons/ai'
import App from 'src/components/Export/exportToPdf'
import DataTable from 'react-data-table-component'

const headers = [
  { label: 'Id', key: 'id' },
  { label: 'Country Code', key: 'countryCode' },
  { label: 'Country', key: 'country' },
  { label: 'Name', key: 'name' },
  { label: 'Region', key: 'region' },
  { label: 'Region Code', key: 'regionCode' },
  { label: 'Latitude', key: 'latitude' },
  { label: 'Longitude', key: 'longitude' },
]
const columns = [
  { name: 'Id', selector: 'id', sortable: true },
  { name: 'Country Code', selector: 'countryCode', sortable: true },
  { name: 'Country', selector: 'country', sortable: true },
  { name: 'Name', selector: 'name', sortable: true },
  { name: 'Region', selector: 'region', sortable: true },
  { name: 'Region Code', selector: 'regionCode', sortable: true },
  { name: 'Latitude', selector: 'latitude', sortable: true },
  { name: 'Longitude', selector: 'longitude', sortable: true },
]
const data = []
// const DataList = ({ data }) => {
//   return (
//     <>
//       {data.map((item) => {
//         return (
//           <CTableRow key={item.id}>
//             <CTableHeaderCell scope="row">{item.id}</CTableHeaderCell>
//             <CTableDataCell>{item.countryCode}</CTableDataCell>
//             <CTableDataCell>{item.country}</CTableDataCell>
//             <CTableDataCell>{item.name}</CTableDataCell>
//             <CTableDataCell>{item.region}</CTableDataCell>
//             <CTableDataCell>{item.regionCode}</CTableDataCell>
//             <CTableDataCell>{item.latitude}</CTableDataCell>
//             <CTableDataCell>{item.longitude}</CTableDataCell>
//           </CTableRow>
//         )
//       })}
//     </>
//   )
// }
const pageArray = [1, 2, 3, 4, 5]
const Tables = () => {
  const [post, setPost] = React.useState(null)
  // const [numberOfPage, setNumberOfPage] = React.useState(1)
  // const [currPage, setCurrPage] = React.useState(1)

  React.useEffect(() => {
    const options = {
      method: 'GET',
      url: 'https://wft-geo-db.p.rapidapi.com/v1/geo/adminDivisions',
      headers: {
        'X-RapidAPI-Key': '53fa27b24amsh4434edb036ce8fdp1240ddjsnf833a435c871',
        'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
      },
    }

    axios
      .request(options)
      .then(function (response) {
        setPost(response.data)
        // console.log(response.data, 'sdfs')
      })
      .catch(function (error) {
        console.error(error)
      })
  }, [])
  if (post) {
    // console.log(post.data, ' ....')

    // console.log(headers, ' ....')
    // if (post.data.length <= 10)
    post.data.map((item) => {
      data.push({
        id: item.id,
        countryCode: item.countryCode,
        country: item.country,
        name: item.name,
        region: item.region,
        regionCode: item.regionCode,
        latitude: item.latitude,
        longitude: item.longitude,
      })
    })
  }
  if (data.length > 0) {
    // let numberOfData = data.length
    // setNumberOfPage(numberOfData / 5 + (numberOfData % 5))
    // for (let i = 1; i <= numberOfPage; i++) {
    //   pageArray.push(i)
    // }
    // console.log(data.length, ' ....', currPage)
  }
  // const handlePageInfo = (item) => {
  //   setCurrPage(item)
  //   item.preventDefault()
  // }

  return (
    <>
      <App />
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              {/* <strong>React Table</strong> <small>Hoverable rows</small> */}
              <CSVLink data={data} headers={headers}>
                <AiOutlineDownload />
                <FaFileCsv />
              </CSVLink>
            </CCardHeader>
            <CCardBody>
              {/* <p className="text-medium-emphasis small">
                Use <code>hover</code> property to enable a hover state on table rows within a
                <code>&lt;CTableBody&gt;</code>.
              </p>
              <h1>hello</h1> */}
              <DataTable
                title="Globe"
                columns={columns}
                // data={data}
                highlightOnHover
                pagination
                paginationPerPage={5}
                paginationRowsPerPageOptions={[5, 15, 25, 50]}
                paginationComponentOptions={{
                  rowsPerPageText: 'Records per page',
                  rangeSeparatorText: 'out of',
                }}
              />
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
      {/* <CPagination className="justify-content-center" aria-label="Page navigation example">
        <CPaginationItem disabled>Previous</CPaginationItem>
        <CPaginationItem>Previous</CPaginationItem>
        {pageArray.map((val, i) => {
          return (
            <CPaginationItem key={i} onClick={() => setCurrPage(val)}>
              {val}
            </CPaginationItem>
          )
        })}
        <CPaginationItem>Next</CPaginationItem>
      </CPagination> */}
    </>
  )
}

export default Tables
