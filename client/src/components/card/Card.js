import React from 'react'
import PropTypes from 'prop-types'
import BiqLogo from '../../assets/images/inverted-logo.png'
import './card.css'

const Card = ({ data = {} }) => {
  return (
    <div className='flex flex-col items-center mt-6'>
      <div className='card flex items-center justify-center text-white border rounded-lg text-4xl font-bold relative shadow'>
        <button className='card-remove text-lg bg-red-600 rounded-full w-8 h-8 flex items-center justify-center shadow-md'>
          x
        </button>
        {data?.score
          ? data.score
          : <img src={BiqLogo} alt='no score' />
        }
      </div>
      <span className='uppercase font-bold'>{data.name}</span>
    </div>
  )
}

Card.propTypes = {
  data: PropTypes.object,
}

export default Card
