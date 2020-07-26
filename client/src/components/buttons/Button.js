import React from 'react'
import PropTypes from 'prop-types'

const Button = ({ children, className = '', type = 'button', ...rest }) => (
  <button
    className={`bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:shadow-outline focus:outline-none shadow-md ${className}`}
    type={type}
    {...rest}
  >
    {children}
  </button>
)

Button.propTypes = {
  type: PropTypes.string,
}

export default Button
