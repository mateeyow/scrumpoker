import React from 'react'

const Container = ({ children, className = '', ...rest }) => (
  <div
    className={`w-full lg:w-6/12 bg-gray-200 flex flex-col items-center rounded px-4 py-8 ${className}`}
    {...rest}
  >
    {children}
  </div>
)

export default Container
