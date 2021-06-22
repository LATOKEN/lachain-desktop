import React from 'react'
import PropTypes from 'prop-types'

function ModalComponent({changeClass, children, close}) {
  return (
    <div className="E-modal-wrap">
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <div className="E-bg-modal" onClick={close} />
      <div className={`E-modal-content ${changeClass} `}>{children}</div>
    </div>
  )
}

ModalComponent.propTypes = {
  changeClass: PropTypes.string,
  children: PropTypes.node,
  close: PropTypes.func,
}

export default ModalComponent
