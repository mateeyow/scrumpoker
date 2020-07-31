import React from 'react'
import PropTypes from 'prop-types'
import BiqLogo from '../../assets/images/inverted-logo.png'
import './card.css'

const Card = ({ closeEl, score }) => {
  return (
    <div className='card flex items-center justify-center text-white border rounded-lg text-4xl font-bold relative shadow'>
      {closeEl}
      {score || <img src={BiqLogo} alt='no score' />}
    </div>
  )
}

Card.propTypes = {
  closeEl: PropTypes.node,
  score: PropTypes.string,
}

export default Card
