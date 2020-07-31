import React from 'react'
import PropTypes from 'prop-types'

const Select = ({ options = [], register = () => {}, validation = {}, errors = {}, ...rest }) => (
  <div className='relative'>
    <select
      className='shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
      ref={register}
      {...rest}
    >
      {options.map((option, idx) => (
        <option key={`${option}-${idx}`} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
    <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
      <svg className='fill-current h-4 w-4' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
        <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
      </svg>
    </div>
  </div>
)

Select.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string, value: PropTypes.string })),
  register: PropTypes.func,
  validation: PropTypes.object,
  errors: PropTypes.object,
}

export default Select
