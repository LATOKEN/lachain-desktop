import React from 'react'
import PropTypes from 'prop-types'
import {useTranslation} from 'react-i18next'

function ListInformation({cycleStage}) {
  const {t} = useTranslation()

  return (
    <div className="information-table">
      <p>
        {t('Cycle stage')}: <strong>{cycleStage}</strong>
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
  cycleStage: PropTypes.number,
}

export default ListInformation
