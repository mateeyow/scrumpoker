import React from 'react'
import { Helmet } from 'react-helmet-async'
import PropTypes from 'prop-types'

const HTMLTitle = ({ title = '' }) => (
  <Helmet>
    <title>{title} - SCRUM Poker </title>
  </Helmet>
)

HTMLTitle.propTypes = {
  title: PropTypes.string,
}

export default HTMLTitle
