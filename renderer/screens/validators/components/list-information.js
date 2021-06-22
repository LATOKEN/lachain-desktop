import React from 'react'
import PropTypes from 'prop-types'

function ListInformation({
  maxBlock,
  validatorsOnline,
  consensusParticipants,
  synced,
  nodes,
}) {
  return (
    <div className="information-table">
      <p>
        Current block: <strong>{maxBlock}</strong>; online validators:{' '}
        <strong>
          {validatorsOnline}/{consensusParticipants}
        </strong>
        ; online nodes :{' '}
        <strong>
          {synced}/{nodes}
        </strong>
      </p>
      <style jsx>{`
        .information-table {
          font-size: 16px;
        }
      `}</style>
    </div>
  )
}

ListInformation.propTypes = {
  maxBlock: PropTypes.number,
  validatorsOnline: PropTypes.number,
  consensusParticipants: PropTypes.number,
  synced: PropTypes.number,
  nodes: PropTypes.number,
}

export default ListInformation
