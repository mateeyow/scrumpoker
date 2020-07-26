import React from 'react'
import { Helmet } from 'react-helmet-async'
import PropTypes from 'prop-types'

const HTMLTitle = ({ title = '' }) => {
  return (
    <Helmet>
      <title>{title} - SCRUM Poker</title>
    </Helmet>
  )
}

HTMLTitle.propTypes = {
  title: PropTypes.string
}

export default HTMLTitle
