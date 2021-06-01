import React from 'react'
import PropTypes from 'prop-types'

function ModalComponent({changeClass, children, close}) {
  return (
    <div className="E-modal-wrap">
      <div className="E-bg-modal" onClick={close}/>
      <div className={`E-modal-content ${changeClass} `}>{children}</div>

      <style jsx>{`
        .E-bg-modal {
          background-color: rgba(0, 0, 0, 0.3);
          z-index: 999;
          width: 100vw;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
        }

        .E-modal-wrap {
          padding: 25px 15px;
          width: 100vw;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 9999;
          transition: 0.3s;
          overflow: hidden;
          overflow-y: auto;
        }

        .E-modal-content {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          box-shadow: 0 1px 15px 0 rgba(0, 0, 0, 0.4);
          border-radius: 10px;
          background-color: #fff;
          z-index: 9999;
        }
      `}</style>
    </div>
  )
}

ModalComponent.propTypes = {
  changeClass: PropTypes.string,
  children: PropTypes.node,
  close: PropTypes.func,
}

export default ModalComponent
