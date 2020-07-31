import React from 'react'
import PropTypes from 'prop-types'

const Input = ({ type = 'text', ...rest }) => (
  <input
    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
    type={type}
    {...rest}
  />
)

Input.propTypes = {
  type: PropTypes.string,
}

export default Input
