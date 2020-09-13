import React from 'react'
import PropTypes from 'prop-types'
import { noop } from 'utils/utils'
import Card from './Card'

const CardWithDetails = ({ data = {}, onRemove }) => {
  return (
    <div className='flex flex-col items-center mt-6'>
      <Card
        closeEl={
          <button
            className='card-remove text-lg bg-red-600 rounded-full w-8 h-8 flex items-center justify-center shadow-md'
            onClick={onRemove}
          >
            x
          </button>
        }
        score={data.score}
        onClick={noop}
      />
      <span className='uppercase font-bold'>{data.name}</span>
    </div>
  )
}

CardWithDetails.propTypes = {
  data: PropTypes.object,
  onRemove: PropTypes.func,
}

export default CardWithDetails
