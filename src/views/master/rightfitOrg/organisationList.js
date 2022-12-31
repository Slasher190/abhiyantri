import React from 'react'
// import axios from 'axios'
import axios from 'src/api/axios'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import 'react-data-table-component-extensions/dist/index.css'
import { useDispatch, useSelector } from 'react-redux'
import Modal from 'src/views/master/rightfitOrg/organisationDetail'
import DataTableCustom from 'src/constants/dataTableCustum'

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
      {/* <App /> */}
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Organisation List</strong>
            </CCardHeader>
            <CCardBody>
              <DataTableCustom columns={columns} data={data} />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Tables
