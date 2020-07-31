import React from 'react'
import PropTypes from 'prop-types'

const Input = ({
  type = 'text',
  name,
  register = () => {},
  validation = {},
  errors = {},
  ...rest
}) => (
  <>
    <input
      className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
      type={type}
      ref={register(validation)}
      name={name}
      {...rest}
    />
    {errors[name] && <span className='text-red-500 text-xs italic'>{errors[name].message}</span>}
  </>
)

Input.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  register: PropTypes.func,
  validation: PropTypes.object,
  errors: PropTypes.object,
}

export default Input
