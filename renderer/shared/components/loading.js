import React from 'react'
import PropTypes from 'prop-types'
import {useTranslation} from 'react-i18next'
import {Text} from './typo'
import theme from '../theme'

function Loading({color}) {
  const {t} = useTranslation()

  return <Text color={color}>{t('Loading')}...</Text>
}

Loading.defaultProps = {
  color: theme.colors.white,
}

Loading.propTypes = {
  color: PropTypes.string,
}

export default Loading
