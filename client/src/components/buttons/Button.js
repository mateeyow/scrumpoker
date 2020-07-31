import React from 'react'
import PropTypes from 'prop-types'

const kindColor = {
  primary: 'bg-purple-500 hover:bg-purple-700',
  danger: 'bg-red-600 hover:bg-red-700',
  reverse: 'bg-white hover:bg-gray-200 text-bg-purple-500 border border-purple-500',
}
const Button = ({
  children,
  className = '',
  type = 'button',
  size = 'medium',
  kind = 'primary',
  disabled = false,
  ...rest
}) => {
  const pad = size === 'medium' ? 'py-2' : 'py-1'
  const textColor = kind === 'reverse' ? '' : 'text-white'
  const isDisabled = disabled ? 'cursor-not-allowed opacity-50' : ''

  return (
    <button
      className={`uppercase font-bold px-4 rounded focus:shadow-outline focus:outline-none shadow-md ${className} ${pad} ${kindColor[kind]} ${textColor} ${isDisabled}`}
      type={type}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  )
}

Button.propTypes = {
  type: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium']),
  kind: PropTypes.oneOf(['primary', 'danger', 'reverse']),
  disabled: PropTypes.bool,
}

export default Button
