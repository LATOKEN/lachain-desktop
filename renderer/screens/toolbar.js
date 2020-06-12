import React from 'react'
import PropTypes from 'prop-types'
import {Button} from '../shared/components'
import theme from '../shared/theme'
import Flex from '../shared/components/flex'

function Toolbar(props) {
  return <Flex justify="space-between" align="center" {...props} />
}

export function ToolbarItem({isCurrent, ...props}) {
  return (
    <Button
      css={{
        background: isCurrent ? theme.colors.gray2 : theme.colors.white,
        color: isCurrent ? theme.colors.primary : theme.colors.muted,
        textTransform: 'capitalize',
        marginRight: theme.spacings.small,
      }}
      {...props}
    />
  )
}

ToolbarItem.propTypes = {
  isCurrent: PropTypes.bool.isRequired,
}

export default Toolbar
