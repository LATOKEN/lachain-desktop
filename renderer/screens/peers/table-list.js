import React from 'react'
import PropTypes from 'prop-types'
import {useTranslation} from 'react-i18next'

function TableList({dataList = []}) {
  const {t} = useTranslation()

  return (
    <div className="table-block P-peers-table">
      <div className="table-header">
        <ul className="table-tr">
          <li title={t('Peer')}>{t('Peer')}</li>
          <li title={t('Height')}>{t('Height')}</li>
        </ul>
      </div>
      <div className="table-body">
        {dataList.map((item, index) => (
          <ul key={index} className="table-tr">
            <li>{item.publicKey || '—'}</li>
            <li>{item.height || '—'}</li>
          </ul>
        ))}
      </div>
    </div>
  )
}

TableList.propTypes = {
  dataList: PropTypes.array,
}

export default TableList
