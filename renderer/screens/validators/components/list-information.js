import React from 'react'
import PropTypes from 'prop-types'
import {useTranslation} from 'react-i18next'

function ListInformation({
  maxBlock,
  validatorsOnline,
  consensusParticipants,
  synced,
  nodes,
}) {
  const {t} = useTranslation()

  return (
    <div className="information-table">
      <p>
        {t('Current block')}: <strong>{maxBlock}</strong>;{' '}
        {t('Online validators')}:{' '}
        <strong>
          {validatorsOnline}/{consensusParticipants}
        </strong>
        ; {t('Online nodes')} :{' '}
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
