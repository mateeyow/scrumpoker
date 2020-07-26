import React from 'react'

const Label = ({ children, className = '', ...rest }) => (
  <label
    className={`block uppercase tracking-wide text-gray-700 text-xs font-bold ${className}`}
    {...rest}
  >
    {children}
  </label>
)

export default Label
