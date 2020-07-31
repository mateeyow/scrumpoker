import React from 'react'
import PropTypes from 'prop-types'
import Card from './Card'

const CardWithDetails = ({ data = {} }) => {
  return (
    <div className='flex flex-col items-center mt-6'>
      <Card
        closeEl={
          <button className='card-remove text-lg bg-red-600 rounded-full w-8 h-8 flex items-center justify-center shadow-md'>
            x
          </button>
        }
        score={data.score}
      />
      <span className='uppercase font-bold'>{data.name}</span>
    </div>
  )
}

CardWithDetails.propTypes = {
  data: PropTypes.object,
}

export default CardWithDetails
