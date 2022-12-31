import Button from 'rsuite/Button'
import React from 'react'
import PropTypes from 'prop-types'
import '../../node_modules/rsuite/dist/rsuite.css'
const Button1 = (props) => {
  return (
    <Button
      appearance="primary"
      style={{ backgroundColor: '#212f56' }}
      loading={props.load}
      type="submit"
    >
      {props.text}
    </Button>
  )
}
export default Button1

Button1.propTypes = {
  text: PropTypes.string,
  load: PropTypes.bool,
}
