import React from 'react'
import PropTypes from 'prop-types'
import './modal.css'

const Modal = ({ isOpen, divider = true, title, buttons, children }) => {
  if (!isOpen) {
    return null
  }

  return (
    <div className='fixed bottom-0 inset-x-0 px-4 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center'>
      <div className='fixed inset-0 transition-opacity'>
        <div className='absolute inset-0 bg-gray-500 opacity-75' />
      </div>
      <div
        className='bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full'
        role='dialog'
        aria-modal='true'
        aria-labelledby='modal-headline'
      >
        <div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
          <div className='sm:flex sm:items-start'>
            <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full'>
              {title && (
                <h3
                  className='text-lg leading-6 font-medium text-gray-900 modal-title'
                  id='modal-headline'
                >
                  {title}
                </h3>
              )}
              <div className='mt-2'>{children}</div>
            </div>
          </div>
        </div>
        {divider && <hr className='modal-divider' />}
        {buttons && (
          <div className='bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>{buttons}</div>
        )}
      </div>
    </div>
  )
}

Modal.propTypes = {
  isOpen: PropTypes.bool,
  divider: PropTypes.bool,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  buttons: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
}

export default Modal
