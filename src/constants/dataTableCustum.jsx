import DataTable, { createTheme } from 'react-data-table-component'
import DataTableExtensions from 'react-data-table-component-extensions'
import 'react-data-table-component-extensions/dist/index.css'
import { makeStyles } from '@material-ui/core/styles'
import LinearProgress from '@material-ui/core/LinearProgress'
import React from 'react'
import ArrowDownward from '@material-ui/icons/ArrowDownward'
import PropTypes from 'prop-types'
import { Center } from '@chakra-ui/react'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}))

const LinearIndeterminate = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <LinearProgress />
    </div>
  )
}
const customStyles = {
  rows: {
    style: {
      textAlign: 'Center',
      minHeight: '40px', // override the row height
    },
  },
  headCells: {
    style: {
      paddingLeft: '8px', // override the cell padding for head cells
      paddingRight: '8px',
    },
  },
  cells: {
    //per block
    style: {
      paddingLeft: '8px', // override the cell padding for data cells
      paddingRight: '8px',
    },
  },
  headCells: {
    style: {
      background: '#212F56',
      color: '#FFF',
    },
  },
  rows: {
    style: {
      hover: '#212F56',
      color: '#01010',
    },
    highlightOnHoverStyle: {
      background: '#00001514',
      color: '#212F56',
    },
  },
  CCardHeader: {
    style: {
      background: '#212F56',
      color: '#01010',
    },
  },
}
createTheme(
  'solarized',
  {
    text: {
      color: '#ffffff',
      primary: '#268bd2',
      secondary: '#2aa198',
    },
    background: {
      default: '#212f56',
    },
    context: {
      background: '#212F56',
      text: '#FFFFFF',
    },
    divider: {
      default: '#073642',
    },
    action: {
      button: 'rgba(0,0,0,.59)',
      hover: '#212F56',
      disabled: 'rgba(0,0,0,.12)',
    },
  },
  'dark',
)
const DataTableCustom = (props) => {
  const [pending, setPending] = React.useState(true)
  const [rows, setRows] = React.useState([])
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setRows(props?.data)
      setPending(false)
    }, 2000)
    return () => clearTimeout(timeout)
  }, [])
  return (
    <DataTableExtensions columns={props?.columns} data={props?.data}>
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
        sortIcon={<ArrowDownward />}
        // theme="solarized"
        progressPending={pending}
        progressComponent={<LinearIndeterminate />}
        customStyles={customStyles}
      />
    </DataTableExtensions>
  )
}
export default DataTableCustom

DataTableCustom.propTypes = {
  columns: PropTypes.any,
  data: PropTypes.any,
}

// export interface TableStyles {
//   table?: {
//       style: CSSObject;
//   };
//   tableWrapper?: {
//       style: CSSObject;
//   };
//   responsiveWrapper?: {
//       style: CSSObject;
//   };
//   header?: {
//       style: CSSObject;
//   };
//   subHeader?: {
//       style: CSSObject;
//   };
// head?: {
//     style: CSSObject;
// };
//   headRow?: {
//       style?: CSSObject;
//       denseStyle?: CSSObject;
//   };
//   headCells?: {
//       style?: CSSObject;
//       draggingStyle?: CSSObject;
//   };
//   contextMenu?: {
//       style?: CSSObject;
//       activeStyle?: CSSObject;
//   };
//   cells?: {
//       style: CSSObject;
//       draggingStyle?: CSSObject;
//   };
//   rows?: {
//       style?: CSSObject;
//       selectedHighlightStyle?: CSSObject;
//       denseStyle?: CSSObject;
//       highlightOnHoverStyle?: CSSObject;
//       stripedStyle?: CSSObject;
//   };
//   expanderRow?: {
//       style: CSSObject;
//   };
//   expanderCell?: {
//       style: CSSObject;
//   };
//   expanderButton?: {
//       style: CSSObject;
//   };
//   pagination?: {
//       style?: CSSObject;
//       pageButtonsStyle?: CSSObject;
//   };
//   noData?: {
//       style: CSSObject;
//   };
//   progress?: {
//       style: CSSObject;
//   };
// }
