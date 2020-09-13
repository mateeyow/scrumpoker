import React from 'react'
import PropTypes from 'prop-types'
import BiqLogo from '../../assets/images/inverted-logo.png'
import './card.css'

const Card = ({ closeEl, score, onClick }) => {
  return (
    <div
      className='card flex items-center justify-center text-white border rounded-lg text-4xl font-bold relative shadow mx-auto'
      onClick={() => onClick(score)}
      onKeyPress={() => onClick(score)}
      role='button'
      tabIndex={0}
    >
      {closeEl}
      {score || <img src={BiqLogo} alt='no score' />}
    </div>
  )
}

Card.propTypes = {
  closeEl: PropTypes.node,
  score: PropTypes.string,
  onClick: PropTypes.func,
}

export default Card
